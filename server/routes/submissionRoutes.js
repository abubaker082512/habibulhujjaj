const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// GET all submissions (protected - admin only)
router.get('/', authMiddleware, async (req, res) => {
  const { data, error } = await req.supabase
    .from('submissions')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    if (error.message.includes('relation "submissions" does not exist')) {
      return res.json([]);
    }
    return res.status(500).json({ message: error.message });
  }
  res.json(data || []);
});

// POST create submission (public)
router.post('/', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });
  
  const { data, error } = await req.supabase
    .from('submissions')
    .insert([{
      name,
      email: email || '',
      phone: phone || '',
      subject: subject || 'General Booking',
      message: message || '',
      created_at: new Date().toISOString()
    }])
    .select();
    
  if (error) return res.status(400).json({ message: error.message });
  res.status(201).json(data[0]);
});

// DELETE submission (protected - admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  const { error } = await req.supabase
    .from('submissions')
    .delete()
    .eq('id', req.params.id);
    
  if (error) return res.status(500).json({ message: error.message });
  res.json({ message: 'Submission deleted' });
});

module.exports = router;
