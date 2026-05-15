-- ============================================================
-- FLIGHTS PAGE SETUP
-- Run this in your Supabase SQL Editor
-- ============================================================

-- ─── 1. Flight Destinations Table ───────────────────────────
CREATE TABLE IF NOT EXISTS flights_destinations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  price_start NUMERIC DEFAULT 0,
  category TEXT DEFAULT 'Most Popular',
  booking_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE flights_destinations ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "flights_public_read" ON flights_destinations;
CREATE POLICY "flights_public_read" ON flights_destinations FOR SELECT USING (true);

DROP POLICY IF EXISTS "flights_admin_all" ON flights_destinations;
CREATE POLICY "flights_admin_all" ON flights_destinations FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ─── 2. Initial CMS Content for Flights Page ───────────────
INSERT INTO cms_content (id, content)
VALUES (
  'cms_flights',
  '{
    "heroTitle": "BOOK YOUR DREAM JOURNEY WITH REHMAN UMRAH & TRAVELS",
    "heroSubtitle": "DISCOVER THE BEST DEALS ON FLIGHTS AND TRAVEL PACKAGES WORLDWIDE",
    "adventureTitle": "YOUR NEXT ADVENTURE BEGINS HERE!",
    "adventureSubtitle": "Discover the best flight deals and travel packages tailored to your needs. From luxury vacations to spiritual journeys, we make your travel dreams a reality.",
    "trustTitle": "TIRED OF OVERPRICED FLIGHTS, VISA HASSLES, AND GENERIC TRAVEL PLANS?",
    "trustSubtitle": "We provide transparent pricing and expert guidance for all your travel needs. Experience travel like never before with our dedicated service and global network.",
    "destinationsTitle": "YOUR DESTINATION AWAITS — WHERE WILL YOU GO?",
    "destinationsSubtitle": "Pick your destination and let us handle the rest.",
    "popularTitle": "Most Popular Places",
    "feature1": "Lowest Flight Booking with Best Services",
    "feature2": "Max Success Guarantee with Expert Guidance",
    "feature3": "24/7 Customer Care — From Letters to Landing",
    "feature4": "Customized Packages — Umrah, HM, Management, Business",
    "feature5": "Price Match Promise: Find it cheaper? We''ll beat it!"
  }'
)
ON CONFLICT (id) DO NOTHING;
