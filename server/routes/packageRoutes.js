const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// GET all packages (public)
router.get('/', async (req, res) => {
  const { data, error } = await req.supabase
    .from('packages')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) return res.status(500).json({ message: error.message });
  res.json(data || []);
});

// GET single package (public)
router.get('/:id', async (req, res) => {
  const { data, error } = await req.supabase
    .from('packages')
    .select('*')
    .eq('id', req.params.id)
    .single();
    
  if (error) return res.status(404).json({ message: 'Package not found' });
  if (!data) return res.status(404).json({ message: 'Package not found' });
  res.json(data);
});

// POST create package (protected)
router.post('/', authMiddleware, async (req, res) => {
  const { data, error } = await req.supabase
    .from('packages')
    .insert([req.body])
    .select();
    
  if (error) return res.status(400).json({ message: error.message });
  res.status(201).json(data[0]);
});

// POST seed 2 dummy packages (protected)
router.post('/seed', authMiddleware, async (req, res) => {
  const dummyPackages = [
    {
      title: 'Premium 5-Star Executive Umrah',
      description: 'Experience the ultimate spiritual journey with our premium 5-star package. Stay at the iconic Pullman ZamZam hotel, just 150 meters from the Masjid Al-Haram.',
      price: 485000,
      category: '5 Star',
      duration: '15 Days',
      location: 'Makkah & Madinah',
      hotel_name: 'Pullman ZamZam Makkah',
      distance_from_haram: '150m from Haram',
      image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdBRKj372X3XEdAkE-8DFUWUG3imKQ3ac1b9USL1W0C7BBcveBszqF8mJwUnrjm_5pqskUDnrMUG5yx4QEV-eq5AZXw1KY6sy0X29rpzsJ0PgTNtzNIKD6UJk5_i92ULJFJC4ETiDGG5sBM3I5psHDr_G9s4mWI7IBISEwh_FOp8XWve3y6kl_TDJzu-I1o55kkiAvkMjUJOG_qFJqigRHzs8XXys3tPtXSAhE7XP1c17NsdmgiYoT9NlK4oiCiDUJZtS4VqPVr2_y',
      includes: ['E-Visa Processing', 'Return Flights (Qatar Airways)', 'VIP Ground Transfer', 'Guided Ziyarat', 'Daily Buffet Breakfast & Dinner', '24/7 Tour Manager Support'],
      stars: 5,
      badge: 'Best Seller',
      airline: 'Qatar Airways'
    },
    {
      title: 'Silver 4-Star Comfort Umrah',
      description: 'Our most popular family package offering the perfect balance of comfort and value.',
      price: 325000,
      category: '4 Star',
      duration: '10 Days',
      location: 'Makkah & Madinah',
      hotel_name: 'Al-Shohada Hotel',
      distance_from_haram: '300m from Haram',
      image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3_91cdPdyWpCst8uVkcSEkdZVScCJV50Uz8dmehZ72dVc-AfHZbJoQzWGsgyEAxSfLd4WFy_TcxoatRlFL9pYi7TlRzV0SRDbRgWohXX1z0OTxHqAQTG9iS5gpGUB5Z_H6pitDxZUMKSXLEM0yFiSDg8vEdV9EQFTltpcz7I4kc00gPiHi3Ng2O0p0E9HLJPYcB4wTjtqGLQVhxvHDrhAIguL_9WFBZysggur9-whO305qAImVClX1qsUEVVKYQmL9mKjsOC2BAkA',
      includes: ['E-Visa Processing', 'Return Flights (Saudi Airlines)', 'Shared Ground Transfer', 'Guided Ziyarat', 'Breakfast Included', '24/7 Support'],
      stars: 4,
      badge: 'Popular Choice',
      airline: 'Saudi Airlines'
    }
  ];

  const { data, error } = await req.supabase
    .from('packages')
    .insert(dummyPackages)
    .select();

  if (error) return res.status(400).json({ message: error.message });
  res.status(201).json({ message: `Seeded ${data.length} packages`, packages: data });
});

// DELETE package (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  const { error } = await req.supabase
    .from('packages')
    .delete()
    .eq('id', req.params.id);
    
  if (error) return res.status(500).json({ message: error.message });
  res.json({ message: 'Package deleted' });
});

module.exports = router;
