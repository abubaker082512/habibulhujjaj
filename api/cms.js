const jwt = require('jsonwebtoken');
const { supabase, supabaseAdmin, isConfigured, hasServiceRole } = require('./_utils/supabase');

const isAuthenticated = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('[CMS] Auth failed: Missing or malformed Authorization header');
    return false;
  }
  try {
    const token = authHeader.split(' ')[1];
    if (!token) throw new Error('Token is empty');
    jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    return true;
  } catch (e) {
    console.log('[CMS] Auth failed:', e.message);
    return false;
  }
};

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const url = new URL(req.url, `http://${req.headers.host}`);
  const id = url.searchParams.get('id');

  // ─── GET ───────────────────────────────────────────────────
  if (req.method === 'GET') {
    if (!isConfigured) return res.json(id ? {} : {});

    try {
      let query = supabase.from('cms_content').select('*');
      if (id) query = query.eq('id', id);

      const { data, error } = await query;
      if (error) {
        console.log('[CMS] Supabase GET error:', error.message);
        return res.json(id ? {} : {});
      }

      if (id) {
        return res.json(data && data[0] ? data[0].content : {});
      } else {
        const mapped = {};
        (data || []).forEach(item => { mapped[item.id] = item.content; });
        return res.json(mapped);
      }
    } catch (err) {
      console.error('[CMS] GET error:', err.message);
      return res.json(id ? {} : {});
    }
  }

  // ─── POST (upsert) ─────────────────────────────────────────
  if (req.method === 'POST') {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ error: 'Authentication required. Please log in again.' });
    }
    if (!id) {
      return res.status(400).json({ error: 'Content ID is required as ?id=... query param' });
    }
    if (!isConfigured) {
      return res.status(503).json({ error: 'Database not configured. Add SUPABASE_URL and SUPABASE_KEY to Vercel Environment Variables.' });
    }
    if (!hasServiceRole) {
      console.error('[CMS] SUPABASE_SERVICE_ROLE_KEY is not set.');
      return res.status(503).json({ error: 'SUPABASE_SERVICE_ROLE_KEY is missing from Vercel Environment Variables. This key is required for saving content.' });
    }

    try {
      let body = req.body;
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch { body = {}; }
      }

      const { data, error } = await supabaseAdmin
        .from('cms_content')
        .upsert(
          { id, content: body || {}, updated_at: new Date().toISOString() },
          { onConflict: 'id' }
        )
        .select();

      if (error) throw error;

      console.log('[CMS] Saved:', id);
      return res.json({ success: true, id, data: data?.[0] });
    } catch (err) {
      console.error('[CMS] POST error:', err.message);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};