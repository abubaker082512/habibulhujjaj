-- =============================================
-- REHMAN UMRAH & TRAVELS - SUPABASE SETUP
-- Run this SQL in your Supabase SQL Editor
-- =============================================

-- CLEANUP (Ensures a clean setup with the correct schema)
DROP TABLE IF EXISTS packages CASCADE;
DROP TABLE IF EXISTS tours CASCADE;
DROP TABLE IF EXISTS visa_services CASCADE;
DROP TABLE IF EXISTS gallery CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS cms_content CASCADE;

-- 1. PACKAGES TABLE
CREATE TABLE IF NOT EXISTS packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC,
  category TEXT DEFAULT 'Economy',
  duration TEXT,
  location TEXT,
  hotel_name TEXT,
  distance_from_haram TEXT,
  image_url TEXT,
  airline TEXT,
  stars INTEGER DEFAULT 4,
  badge TEXT,
  includes TEXT[],
  itinerary JSONB,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. INTERNATIONAL TOURS TABLE
CREATE TABLE IF NOT EXISTS tours (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  price NUMERIC,
  duration TEXT,
  image_url TEXT,
  highlights TEXT[],
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. VISA SERVICES TABLE
CREATE TABLE IF NOT EXISTS visa_services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  processing_time TEXT,
  fee TEXT,
  icon TEXT DEFAULT 'description',
  documents TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. GALLERY TABLE
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  src TEXT NOT NULL,
  label TEXT,
  category TEXT DEFAULT 'Kaaba',
  type TEXT DEFAULT 'standard',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. BLOG POSTS TABLE
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT,
  image_url TEXT,
  read_time TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. CMS CONTENT TABLE
CREATE TABLE IF NOT EXISTS cms_content (
  id TEXT PRIMARY KEY,
  content JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- =============================================

ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE visa_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_content ENABLE ROW LEVEL SECURITY;

-- =============================================
-- RLS POLICIES - PUBLIC READ, ADMIN WRITE
-- =============================================

-- Packages: Anyone can read, authenticated users can write
CREATE POLICY "Public can view packages" ON packages FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert packages" ON packages FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update packages" ON packages FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete packages" ON packages FOR DELETE USING (auth.role() = 'authenticated');

-- Tours: Anyone can read, authenticated users can write
CREATE POLICY "Public can view tours" ON tours FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert tours" ON tours FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update tours" ON tours FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete tours" ON tours FOR DELETE USING (auth.role() = 'authenticated');

-- Visa: Anyone can read, authenticated users can write
CREATE POLICY "Public can view visa services" ON visa_services FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert visa services" ON visa_services FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update visa services" ON visa_services FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete visa services" ON visa_services FOR DELETE USING (auth.role() = 'authenticated');

-- Gallery: Anyone can read, authenticated users can write
CREATE POLICY "Public can view gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert gallery" ON gallery FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update gallery" ON gallery FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete gallery" ON gallery FOR DELETE USING (auth.role() = 'authenticated');

-- Blog: Anyone can read, authenticated users can write
CREATE POLICY "Public can view blog posts" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert blog posts" ON blog_posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update blog posts" ON blog_posts FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete blog posts" ON blog_posts FOR DELETE USING (auth.role() = 'authenticated');

-- CMS Content: Public can read, authenticated users can write
CREATE POLICY "Public can view cms content" ON cms_content FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert cms content" ON cms_content FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update cms content" ON cms_content FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete cms content" ON cms_content FOR DELETE USING (auth.role() = 'authenticated');

-- =============================================
-- SEED DATA - PACKAGES
-- =============================================

INSERT INTO packages (title, description, price, category, duration, location, hotel_name, distance_from_haram, image_url, airline, stars, badge, includes, itinerary) VALUES
('Premium 5-Star Executive Umrah', 'Experience the ultimate spiritual journey with our premium 5-star package. Stay at the iconic Pullman ZamZam hotel, just 150 meters from the Masjid Al-Haram.', 485000, '5 Star', '15 Days', 'Makkah & Madinah', 'Pullman ZamZam Makkah', '150m from Haram', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdBRKj372X3XEdAkE-8DFUWUG3imKQ3ac1b9USL1W0C7BBcveBszqF8mJwUnrjm_5pqskUDnrMUG5yx4QEV-eq5AZXw1KY6sy0X29rpzsJ0PgTNtzNIKD6UJk5_i92ULJFJC4ETiDGG5sBM3I5psHDr_G9s4mWI7IBISEwh_FOp8XWve3y6kl_TDJzu-I1o55kkiAvkMjUJOG_qFJqigRHzs8XXys3tPtXSAhE7XP1c17NsdmgiYoT9NlK4oiCiDUJZtS4VqPVr2_y', 'Qatar Airways', 5, 'Best Seller', 
 ARRAY['E-Visa Processing', 'Return Flights (Qatar Airways)', 'VIP Ground Transfer', 'Guided Ziyarat Makkah & Madinah', 'Daily Buffet Breakfast & Dinner', '24/7 Tour Manager Support'],
 '[{"day":"Day 01","title":"Arrival & Makkah Check-in","description":"Arrival at Jeddah Airport, VIP GMC transfer to Makkah. Perform Umrah under scholar guidance."},{"day":"Day 02 - 07","title":"Makkah Devotion","description":"Daily prayers in Masjid Al-Haram. Guided Ziyarat to Mina, Arafat & Muzdalifah on Day 3."},{"day":"Day 08 - 13","title":"Madinah Munawwarah","description":"Transfer to Madinah. Stay at Anwar Al Madinah Movenpick. Daily Fajr at Masjid Nabawi."},{"day":"Day 14 - 15","title":"Departure","description":"Final prayers at Masjid Nabawi. Farewell Tawaf in Makkah then transfer to airport."}]'::jsonb),

('Silver 4-Star Comfort Umrah', 'Our most popular family package offering the perfect balance of comfort and value. Stay at Al-Shohada Hotel, just 300 meters from the Haram.', 325000, '4 Star', '10 Days', 'Makkah & Madinah', 'Al-Shohada Hotel', '300m from Haram', 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3_91cdPdyWpCst8uVkcSEkdZVScCJV50Uz8dmehZ72dVc-AfHZbJoQzWGsgyEAxSfLd4WFy_TcxoatRlFL9pYi7TlRzV0SRDbRgWohXX1z0OTxHqAQTG9iS5gpGUB5Z_H6pitDxZUMKSXLEM0yFiSDg8vEdV9EQFTltpcz7I4kc00gPiHi3Ng2O0p0E9HLJPYcB4wTjtqGLQVhxvHDrhAIguL_9WFBZysggur9-whO305qAImVClX1qsUEVVKYQmL9mKjsOC2BAkA', 'Saudi Airlines', 4, 'Popular Choice',
 ARRAY['E-Visa Processing', 'Return Flights (Saudi Airlines)', 'Shared Ground Transfer', 'Guided Ziyarat Makkah', 'Breakfast Included', '24/7 Support Line'],
 '[{"day":"Day 01","title":"Arrival & Umrah","description":"Arrival at Jeddah, transfer to Makkah hotel. Perform Umrah with group guide."},{"day":"Day 02 - 05","title":"Makkah Prayers","description":"All five prayers in Haram. Full-day Ziyarat of historical Makkah sites on Day 3."},{"day":"Day 06 - 09","title":"Madinah Stay","description":"Transfer to Madinah. Prayers at Masjid Nabawi, Ziyarat of Uhud, Quba mosque & more."},{"day":"Day 10","title":"Departure","description":"Check-out and transfer to airport. Farewell dua with group."}]'::jsonb),

('Spiritual Ramadan 2024', 'Experience the blessed month of Ramadan in the holy cities. Full iftar and suhoor provided, with special Taraweeh prayers at Masjid Al-Haram.', 750000, 'Ramadan', '30 Days', 'Makkah & Madinah', 'Dar Al Eiman Grand', '200m from Haram', 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0LUe8DBs6mr578_8-2rCv85B1fSGUnt1I0JeY6VCP13gvKcXOSuQN20B8yyCGUalnauFjp-7PXrQHfZc81fClbi4Y51FKF3AgmNo_WAvbPfWwlMksw02OxLGeliL9fXwIDQy6zi6mBt72o6pbuQfNejTb2P8-MsB_LzXSulKKW6JIrcuX_AVIxvZtOvVNTcRjpRsjWlgLthPSmBMS7LQni7NObK0Z2NVuXC1Fwpyo0DA1bzO5JkQdnTpwDyIBxSRfImfbwrXaNF59', 'Various', 4, 'Limited',
 ARRAY['E-Visa Processing', 'Return Flights', 'Hotel Accommodation', 'Full Iftar & Suhur', 'Guided Ziyarat', '24/7 Support'],
 '[{"day":"Day 01","title":"Arrival & Umrah","description":"Arrival at Jeddah, transfer to Makkah. Perform Umrah upon arrival."},{"day":"Day 02 - 15","title":"Ramadan in Makkah","description":"Fast in the holy month. Taraweeh at Haram. Ziyarat of historical sites."},{"day":"Day 16 - 28","title":"Madinah Stay","description":"Transfer to Madinah for remaining Ramadan. Iftar at Masjid Nabawi."},{"day":"Day 29 - 30","title":"Eid & Departure","description":"Celebrate Eid Al-Fitr in Madinah. Departure after Eid prayers."}]'::jsonb),

('Royal Suites Collection', 'The ultimate luxury experience. Raffles Makkah offers world-class suites with panoramic views of the Holy Kaaba. Private transfers and butler service included.', 980000, '5 Star', '07 Days', 'Makkah & Madinah', 'Raffles Makkah', 'Inside Clock Tower', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUqhQvXdmXntutgQNw439DJ2g4eby54ExQ7ovVzpherZzYoDIMWSfjuoq-pLcHYRa26UOYkjpll3nqA_UaSv0631v_QxoE7eujuTlkIq-R18tW4l1cM6J25NQ_lnmK7WjpXsbtJ0hmNiYQrzvh-U5FoYMQ_0y6HpIyCg5MUWVAnZpkpOnz4djr09D6mLQFN1gg0pbjNEZDCaRh2w_baUqbwlml3jMs6ck_bKp5H8wQ_YZyoJPk7e_YZJXJMy5WkLJZkJ31ORsCy_rb', 'Emirates', 5, 'Gold Standard',
 ARRAY['E-Visa Processing', 'Business Class Flights', 'Raffles Suite Accommodation', 'Private GMC Transfer', 'Personal Butler Service', 'All Meals Included', 'VIP Ziyarat'],
 '[{"day":"Day 01","title":"VIP Arrival","description":"Business class arrival, private transfer to Raffles. Suite check-in with welcome amenities."},{"day":"Day 02 - 04","title":"Makkah in Luxury","description":"Prayers with Kaaba view. Private Ziyarat with expert guide. Butler assists with all arrangements."},{"day":"Day 05 - 06","title":"Madinah Royal Treatment","description":"Helicopter or private car transfer. Stay at The Oberoi Madinah. Prayers at Masjid Nabawi."},{"day":"Day 07","title":"Farewell Departure","description":"Final Tawaf, private transfer to airport. Business class departure."}]'::jsonb);

-- =============================================
-- SEED DATA - TOURS
-- =============================================

INSERT INTO tours (title, subtitle, description, price, duration, image_url, highlights) VALUES
('Turkey Tour', 'Istanbul, Cappadocia, Antalya', 'Discover the rich history and stunning landscapes of Turkey. From the Blue Mosque to hot air balloons in Cappadocia.', 285000, '10 Days / 9 Nights', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDo34TNKnDfPALrJLu5UciOIr7LARLN_xMd56yq9UtN280tkvjiEnxN3TtX2PclWHifVh-nu8QV_2cBRDHQyvPmPzZGIZNdK59dTjZS_Z7zyQnU3g6H9XtU6VzrOpldicf7vIybJnfw64PVqTVsjONncJK9U_xFuHg1W1wWMoj67jRKKTctsOdONWmyphd-lo0jqhdNTCIXpryZF3G0yfAhu2sIiRgcLLrXo2593SUcftSq5rTTctJCZOjzrrlvn1FRx-ijiWOD06Kn',
 ARRAY['Blue Mosque', 'Cappadocia Balloon Ride', 'Grand Bazaar', 'Pamukkale']),

('Dubai Tour', 'Dubai, Abu Dhabi, Sharjah', 'Experience the dazzling city of Dubai with desert safaris, Burj Khalifa, and luxury shopping.', 195000, '7 Days / 6 Nights', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUQYOVnZnCAbJnFrX1nyML3VQoCv0DXi5Irz0Y73qxzjrCnv9Fjfew89pvxdv8ZCASmG7JXvm6ivVtlWSDgDNl6WD5Qkh9yA9ePoYhW5-2lqFxEm_UD-gdv3y855ixx1a4TNrQKs_YDGiCBrtJNtbyqSVu-OpnZy8NM7Q_OjK_9-EAJxvTxySJdH3PL-NHtQ5wCIWYnxE88P2f-rJ9uHs3kO3HDAd20k7SpB0jq8u4Sn1BDaHihQy3xKayJDzjSbhMkeSgMrymfb39',
 ARRAY['Burj Khalifa', 'Desert Safari', 'Dubai Frame', 'Sheikh Zayed Mosque']),

('Malaysia Tour', 'Kuala Lumpur, Genting, Penang', 'Explore the vibrant culture and natural beauty of Malaysia from the Petronas Towers to Genting Highlands.', 175000, '8 Days / 7 Nights', 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3zaexyac9JYbgc7JJW579-lS9WPkAgTeUI7Z4f5Gl08eeqwiSxGeYnsEo-duQ9zPlj4ciIjAaAHQxZpJWRSzi7QTPiBvQTt5PnQL360TdVEtcUe8-A1xE2f5tRkgQevJB0FH9BEKMxS9GfArHkUk1mmMGLjWSTTIINCUnMLvlQIt-niCyleGQ6NoGhUF9wsVc4M84ENHV6AyrYG2HEoJD3DrsDsNwuv-5k4zPqoMOXRMxOHGoe_2H7qk6_JElzjsy7uAvRdhWRfDf',
 ARRAY['Petronas Towers', 'Genting Highlands', 'Batu Caves', 'Gurney Drive']),

('Europe Tour', 'Paris, Swiss, Rome', 'A grand European adventure covering the most iconic cities and landscapes of the continent.', 550000, '12 Days / 11 Nights', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBv-MVsZqKBwhFPBQ8VFiq3TU0N5EnqlsYH2DbJRB5qbT_Cq8D2o6SSJOfghgRCyIin6rAX9gA_gYojLbuUrx53KQNs5-IEFKUuQCSPDJADWJ4WR-wdlDFUu341hUW3bpPXn5i_22fhWnEfLqshrlO64tuM__-1f54SpwlxVe2bQGSh0jdBOS_x6jW2ttrKZoyb_W-fAUeq6l6DZazJ7KXpOFW-pVOA24jVsXFRRGsk7z2EjtSS0-inrhXqDyByLzKRQqLQX-m_UhJv',
 ARRAY['Eiffel Tower', 'Swiss Alps', 'Colosseum', 'Lucerne']);

-- =============================================
-- SEED DATA - VISA SERVICES
-- =============================================

INSERT INTO visa_services (title, description, processing_time, fee, icon, documents) VALUES
('Umrah Visa', 'Specialized visa processing for pilgrims traveling to Saudi Arabia for Umrah rituals.', '3-5 Business Days', 'PKR 15,000', 'mosque',
 ARRAY['Valid Passport', 'Passport Photos', 'Vaccination Certificate', 'Travel Itinerary']),

('Saudi Tourist Visa', 'Explore the Kingdom of Saudi Arabia with our tourist visa services.', '5-7 Business Days', 'PKR 12,000', 'flight',
 ARRAY['Valid Passport', 'Passport Photos', 'Hotel Booking', 'Return Ticket']),

('Dubai Visa', 'Visit the dazzling city of Dubai with our streamlined visa processing.', '3-5 Business Days', 'PKR 8,000', 'apartment',
 ARRAY['Valid Passport', 'Passport Photos', 'Bank Statement', 'Hotel Booking']),

('Turkey Visa', 'Discover the rich history and stunning landscapes of Turkey.', '7-10 Business Days', 'PKR 18,000', 'travel_explore',
 ARRAY['Valid Passport', 'Passport Photos', 'Travel Insurance', 'Proof of Accommodation']),

('Schengen Visa', 'Travel across 27 European countries with a single Schengen visa.', '10-15 Business Days', 'PKR 25,000', 'globe',
 ARRAY['Valid Passport', 'Passport Photos', 'Travel Insurance', 'Bank Statements', 'Cover Letter']);

-- =============================================
-- SEED DATA - GALLERY
-- =============================================

INSERT INTO gallery (src, label, category, type) VALUES
('https://lh3.googleusercontent.com/aida-public/AB6AXuCO_IRY7jvBnnEtX8feErOYDc3DDZMVDuLQ1G_-Q1DoQQayK1NTWJyzzRXm2KsAFGn339aj0b-tuGncnjQ0V3K-XmiIiHg3AijaZnqIo4UsydMi9JV0-IjYu_s4tx3NoWWTd1W9KhPH9HtlEPzGHl8nYSQlk5f7NN0qw8_LI1MzvHh3zcU_lIcPDRNAuXmmI-rnDOOdgCbLLkSCPGQ0JgN5KrWAOqKuAd3rOXOU6R652ysKci4tHEynrqMAWTIfuMyWNbpXbl-5Ymxe', 'The Circle of Faith', 'Kaaba', 'wide'),
('https://lh3.googleusercontent.com/aida-public/AB6AXuCUGaehS0Bt67L1RAqyen3fOEt1z86N6uxfZ0K2PEErMKMiZV4drU-2JWd6VSfjLNoysYsUCnNjngX2KNQJ8UHjzTI8wzUjn0dRQVUGEDMcsW9XzECUjxiXzwmymgp7aad5U9C29USk8o4deQVGPRq1k072Ho2jWxW8gAE9YQAYgM5vJXNh1_6Jh9RwKfOtyza-f7F_spyjDq5voWUR5oiwwbAHKawNiEgAP4RCQeVEZjXK7hsbudBi4SZ6NEt10zy6az0ztNzmz7TT', 'Celestial Spires', 'Masjid Nabawi', 'tall'),
('https://lh3.googleusercontent.com/aida-public/AB6AXuDK2_oTGnpwIr8lGrvHvbVteJFQ_LmysVmiqZ5CPGEjvBQGYjLYOxIKAbuLI3tMM2DniH-IFinQIS_Zl3CuQI6-v0_qPMi-ADy6G-HrKVrQFGb39jox7uMyXFr5IS0jd-xe7YOjNLxfISzbJJdypjwKvZ2h-FnT5TsPIKi-1Oqd4ncbi7bu0gmX_UqH-u-KdFmnn3KHOG_45iJ5tXaRIJA9XCO-_E6R9LERBfCgUqIAEgqNZOJvwAhHVbW4i2ve3nrfIKmny2BzaQaR', 'Sacred Architecture', 'Ziyarat', 'standard'),
('https://lh3.googleusercontent.com/aida-public/AB6AXuAzn1-JLxXAdX_feF-ubKekQz_wAt4HqUvvdPeuTKh3tfBk99cfsH9pHef7zWZCICJHNS70tFKGeQ-d2LsqZUyHehxW0ISwfuQU6gPsaP3m3pWaRkRyE970BTN7g8b8nZTMNxe5KaXgncRVyFMZPAfegI2yk1EvcZBAntULYnm2eqJHZUhrmp-vABbcygSSWynHygdTOcq6kqOpSS9UUEK-mZBp18OFxE9AORCbA595M3yMWzAcQuG8SeGuvBQpAFlHsw7ERHUc0A3T', 'Pilgrims Path', 'Umrah Groups', 'standard'),
('https://lh3.googleusercontent.com/aida-public/AB6AXuCNDTdnKX6NYAJ-QJo4iIhbwDoIli-XdCyKqFl3b1Dp3vRZecvJr_WhCIG7mPQD_IEnuARtnAo-nbJDE5GuYgGT6WwSIosL1A2xuXb7X5cWKhYsc-3UXkX1h1vaAvdIi-Gv0uK4DmICIgXY3dVhXhCd9gK8gkMQPvJAqgXVNdG8Nq1hgp1ru5E6Ssyynux0aFffU5qALnB-hVBp394WBESmgDJwh0Qbp1zmK7OHAZQqvLA1ygv7UctkbEAPc4GTatP-RkTuYPseLVXz', 'Light & Geometry', 'Kaaba', 'tall'),
('https://lh3.googleusercontent.com/aida-public/AB6AXuDcmggnP0CNRP5uiq7143MZmxCE8ru5VvAuKNkeovFm0A2rAgD1ZNRZ4knso4Qvk8LjeeXQGqmOBggt_NiMpvC9qu9ZSCVDImY6vXL9fpcQz8QlXwNOJWd32NvIBuUWQUI28JWgdG-4bo5639jTzgHwHmOqFUPM8uHHCktGtPR0LPJxIs7LSvKLv3JxvAFq0vDdodaABfSAdbQJLIW7QLfn50-XX7mbmQBL4Uk0sKmlYRy8hNQRJWeMDFx5R3ViWdiSNVdPYnVHKHkE', 'The Path of History', 'Ziyarat', 'wide'),
('https://lh3.googleusercontent.com/aida-public/AB6AXuC5y1PBgaoz7gr2OO5Anm-bHirxOS35chx9DgNuvh2l3gpzZnpSVkvtsklwE8kU2DvufQEFd9VmGtGRqXGufLBDzW2WKJXJBWwl-EhNn0nmK7_wehlFTH6LlZ4cljEHKUWKzEH_AlOrVia5-VUJVWke__Dgk-Psrzrs-e1QbYWd0Rjt_v2AtGGmXRGOuoEaMwI6TgiyBhhQuNveTCCGJi172qW3IGal75gfDU-0_1fqGlvdko-cBqFhMtfy3Z547fVcn3wElsNv2oZX', 'Lanterns of Devotion', 'Umrah Groups', 'standard');

-- =============================================
-- SEED DATA - BLOG POSTS
-- =============================================

INSERT INTO blog_posts (title, excerpt, content, category, image_url, read_time, featured) VALUES
('How to Perform Umrah Step by Step', 'A comprehensive guide for first-time pilgrims covering every ritual of Umrah, from Ihram to Tawaf and Sa''i.', 'Full content here...', 'Guides', 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_umMwNrlCdZQQHw-gkNmIlvZ1RKy4ljfjZeHztDWu0Wgt9uTVwcC8SCXvvdKqtiQ8v5oNtA7grwHPXPG15OXDFYiqHvhKUVG17-erSKGUK7O2pmJY9mWZ8iyijELGBy-NB61ei7aEg5jsvtpBXbL0ND3vwZ9Ne6f9J7_W6D_0YJrVDA7ESbokU67XJ37dAjbcdx3wsCdGyi4dHRNDLRtl1twWIlv-M0rr3r0kY69jtOec16g7y6ZNh513s3PPjOvnH00dJr_aRChe', '8 min read', true),

('Best Time for Umrah: A Complete Seasonal Guide', 'Discover the best months to visit Makkah and Madinah based on weather, crowd levels, and spiritual significance.', 'Full content here...', 'Planning', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoKHIP0C3QMaqa0Klr2dM78ntz2OMNGskdqZpgaSJ-t6CzhN9wtM0mVM_VfSXuA51y498oLIAKD-uoj3lEBnBE8WmcWNOLOSOq9dH9S0lGZIfFBT1ZhI-DDgNOWBLRTwE3G7J0rMP7EcoWJ320MQ5b4uQ8mPqH3otJS4kmYLSdyP7CkobPzxStF_dClqG1HjjpMwEyFmBv7FGdx4exw17NjJDYM-FTizn97bzsUtNLtNiN42PQQll7lzJbJk6og1ghe9D9P9QPzoGt', '6 min read', false),

('Top Ziyarat Places in Madinah You Must Visit', 'Explore the most significant historical and religious sites in Madinah, from Masjid Quba to Mount Uhud.', 'Full content here...', 'Destinations', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGAIsAHsj1aeHsF48svRjVUbf98DzT-X9LQhfvfa-q2PJlyI09AuEIY6srDte53YCFFWCd2EaqKD-uoj3lEBnBE8WmcWNOLOSOq9dH9S0lGZIfFBT1ZhI-DDgNOWBLRTwE3G7J0rMP7EcoWJ320MQ5b4uQ8mPqH3otJS4kmYLSdyP7CkobPzxStF_dClqG1HjjpMwEyFmBv7FGdx4exw17NjJDYM-FTizn97bzsUtNLtNiN42PQQll7lzJbJk6og1ghe9D9P9QPzoGt', '7 min read', false);

-- =============================================
-- SEED DATA - CMS CONTENT
-- =============================================

INSERT INTO cms_content (id, content) VALUES
('cms_home', '{
  "heroTitle": "Your Trusted Partner for Umrah & International Tours",
  "heroSubtitle": "Embark on a spiritual journey of a lifetime with our premium, all-inclusive Umrah packages and bespoke international travel experiences.",
  "heroCta": "View Umrah Packages",
  "heroWhatsApp": "Contact on WhatsApp"
}'),
('page_media', '{}');

-- =============================================
-- STORAGE BUCKETS (Run separately in Supabase Dashboard)
-- =============================================
-- Go to Storage > Create Bucket > Name: "uploads"
-- Set it to Public
-- Or run this via Supabase API:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('uploads', 'uploads', true);

-- =============================================
-- DONE - All tables created and seeded!
-- =============================================
