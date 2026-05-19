const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// A simple admin login (You should hash passwords and use a User model in a real app)
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'admin@habibulhujjaj.com' && password === 'Habib@786') {
    const token = jwt.sign({ id: 'admin' }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1d' });
    res.json({ token, user: { email: 'admin@habibulhujjaj.com', role: 'admin' } });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
