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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { url } = req;
  const urlObj = new URL(url, `http://${req.headers.host}`);
  let id = urlObj.searchParams.get('id');
  if (!id) {
    const match = url.match(/\/([a-f0-9-]{36})(?:\?|$)/i);
    if (match) id = match[1];
  }

  // ─── GET ───────────────────────────────────────────────────
  if (req.method === 'GET') {
    try {
      if (id) {
        const { data, error } = await supabase.from('packages').select('*').eq('id', id).single();
        if (error) throw error;
        if (!data) return res.status(404).json({ message: 'Package not found' });
        return res.json(data);
      } else {
        const { data, error } = await supabase.from('packages').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        return res.json(data || []);
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  // Write operations require auth + service role
  if (!isAuthenticated(req)) return res.status(401).json({ message: 'Authentication required' });
  if (!hasServiceRole) return res.status(503).json({ message: 'SUPABASE_SERVICE_ROLE_KEY is not configured on the server.' });

  // ─── POST ──────────────────────────────────────────────────
  if (req.method === 'POST') {
    try {
      const body = { ...req.body };
      if (body.price) body.price = parseFloat(body.price);
      const { data, error } = await supabaseAdmin.from('packages').insert([body]).select();
      if (error) throw error;
      return res.status(201).json(data[0]);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  // ─── PUT ───────────────────────────────────────────────────
  if (req.method === 'PUT') {
    if (!id) return res.status(400).json({ message: 'ID is required' });
    try {
      const body = { ...req.body, updated_at: new Date().toISOString() };
      if (body.price) body.price = parseFloat(body.price);
      const { data, error } = await supabaseAdmin.from('packages').update(body).eq('id', id).select();
      if (error) throw error;
      return res.json(data[0]);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  // ─── DELETE ────────────────────────────────────────────────
  if (req.method === 'DELETE') {
    if (!id) return res.status(400).json({ message: 'ID is required' });
    try {
      const { error } = await supabaseAdmin.from('packages').delete().eq('id', id);
      if (error) throw error;
      return res.json({ message: 'Package deleted' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
};