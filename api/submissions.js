const jwt = require('jsonwebtoken');
const { supabase, supabaseAdmin, hasServiceRole } = require('./_utils/supabase');

const isAuthenticated = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
  try {
    jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET || 'secretkey');
    return true;
  } catch { return false; }
};

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const url = new URL(req.url, `http://${req.headers.host}`);
  let id = url.searchParams.get('id');
  if (!id) {
    const match = req.url.match(/\/([a-f0-9-]{36})(?:\?|$)/i);
    if (match) id = match[1];
  }

  // ─── GET (Admin only) ───────────────────────────────────────
  if (req.method === 'GET') {
    if (!isAuthenticated(req)) return res.status(401).json({ message: 'Authentication required' });
    try {
      let query = supabase.from('submissions').select('*').order('created_at', { ascending: false });
      if (id) query = query.eq('id', id).single();
      const { data, error } = await query;
      if (error) {
        // If the table doesn't exist yet, return an empty array instead of 500 error
        if (error.code === 'PGRST116' || error.message.includes('relation "submissions" does not exist')) {
          return res.json(id ? null : []);
        }
        throw error;
      }
      return res.json(id ? data : (data || []));
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  // ─── POST (Public - anyone can submit a contact form) ────────
  if (req.method === 'POST') {
    try {
      const body = req.body || {};
      const { name, email, phone, subject, message } = body;
      
      if (!name) return res.status(400).json({ message: 'Name is required' });
      
      // Use supabaseAdmin to insert because public might be blocked by RLS policies
      const { data, error } = await supabaseAdmin.from('submissions').insert([{
        name,
        email: email || '',
        phone: phone || '',
        subject: subject || 'General Booking',
        message: message || '',
        created_at: new Date().toISOString()
      }]).select();
      
      if (error) {
        // Handle case where table might not exist
        if (error.message.includes('relation "submissions" does not exist')) {
          return res.status(503).json({ 
            message: 'Submissions database table does not exist. Please run the setup SQL in Supabase Dashboard first.' 
          });
        }
        throw error;
      }
      
      return res.status(201).json(data[0]);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  // ─── DELETE (Admin only) ────────────────────────────────────
  if (req.method === 'DELETE') {
    if (!isAuthenticated(req)) return res.status(401).json({ message: 'Authentication required' });
    if (!hasServiceRole) return res.status(503).json({ message: 'SUPABASE_SERVICE_ROLE_KEY is not configured.' });
    if (!id) return res.status(400).json({ message: 'ID is required' });
    
    try {
      const { error } = await supabaseAdmin.from('submissions').delete().eq('id', id);
      if (error) throw error;
      return res.json({ message: 'Submission deleted' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
};
