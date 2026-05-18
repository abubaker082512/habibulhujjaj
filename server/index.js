const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("CRITICAL: SUPABASE_URL or SUPABASE_KEY is missing!");
}

const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseKey || 'placeholder');

// Middleware
app.use(cors());
app.use(express.json());

// Attach supabase to req
app.use((req, res, next) => {
  req.supabase = supabase;
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('Habib Ul Hujjaj API (Supabase) is running...');
});

// Admin Auth
app.use('/api/auth', require('./routes/authRoutes'));

// Packages
app.use('/api/packages', require('./routes/packageRoutes'));

// Submissions
app.use('/api/submissions', require('./routes/submissionRoutes'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
