-- ============================================================
-- SUPABASE COMPLETE SETUP & RLS FIX
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor)
-- This fixes: "new row violates row-level security policy"
-- ============================================================

-- ─── 1. CMS Content Table ────────────────────────────────────
CREATE TABLE IF NOT EXISTS cms_content (
  id TEXT PRIMARY KEY,
  content JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE cms_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "cms_content_public_read" ON cms_content;
CREATE POLICY "cms_content_public_read"
  ON cms_content FOR SELECT USING (true);

DROP POLICY IF EXISTS "cms_content_service_all" ON cms_content;
CREATE POLICY "cms_content_service_all"
  ON cms_content FOR ALL TO service_role
  USING (true) WITH CHECK (true);


-- ─── 2. Packages Table ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC DEFAULT 0,
  category TEXT DEFAULT 'Economy',
  duration TEXT,
  location TEXT,
  hotel_name TEXT,
  distance_from_haram TEXT,
  airline TEXT,
  stars INTEGER DEFAULT 4,
  badge TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "packages_public_read" ON packages;
CREATE POLICY "packages_public_read"
  ON packages FOR SELECT USING (true);

DROP POLICY IF EXISTS "packages_service_all" ON packages;
CREATE POLICY "packages_service_all"
  ON packages FOR ALL TO service_role
  USING (true) WITH CHECK (true);


-- ─── 3. Tours Table ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tours (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  price NUMERIC DEFAULT 0,
  duration TEXT,
  image_url TEXT,
  highlights JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE tours ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "tours_public_read" ON tours;
CREATE POLICY "tours_public_read"
  ON tours FOR SELECT USING (true);

DROP POLICY IF EXISTS "tours_service_all" ON tours;
CREATE POLICY "tours_service_all"
  ON tours FOR ALL TO service_role
  USING (true) WITH CHECK (true);


-- ─── 4. Visa Services Table (matches api/visa.js) ────────────
CREATE TABLE IF NOT EXISTS visa_services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  processing_time TEXT,
  fee TEXT,
  documents JSONB DEFAULT '[]',
  icon TEXT DEFAULT 'description',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE visa_services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "visa_services_public_read" ON visa_services;
CREATE POLICY "visa_services_public_read"
  ON visa_services FOR SELECT USING (true);

DROP POLICY IF EXISTS "visa_services_service_all" ON visa_services;
CREATE POLICY "visa_services_service_all"
  ON visa_services FOR ALL TO service_role
  USING (true) WITH CHECK (true);


-- ─── 5. Gallery Table ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  src TEXT NOT NULL,
  label TEXT,
  category TEXT DEFAULT 'Kaaba',
  type TEXT DEFAULT 'standard',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "gallery_public_read" ON gallery;
CREATE POLICY "gallery_public_read"
  ON gallery FOR SELECT USING (true);

DROP POLICY IF EXISTS "gallery_service_all" ON gallery;
CREATE POLICY "gallery_service_all"
  ON gallery FOR ALL TO service_role
  USING (true) WITH CHECK (true);


-- ─── 6. Blog Posts Table (matches api/blog.js) ───────────────
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT DEFAULT 'Guides',
  image_url TEXT,
  read_time TEXT,
  featured BOOLEAN DEFAULT false,
  date TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "blog_posts_public_read" ON blog_posts;
CREATE POLICY "blog_posts_public_read"
  ON blog_posts FOR SELECT USING (true);

DROP POLICY IF EXISTS "blog_posts_service_all" ON blog_posts;
CREATE POLICY "blog_posts_service_all"
  ON blog_posts FOR ALL TO service_role
  USING (true) WITH CHECK (true);


-- ─── 7. Storage Bucket for Media Uploads ─────────────────────
INSERT INTO storage.buckets (id, name, public)
  VALUES ('uploads', 'uploads', true)
  ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "uploads_public_read" ON storage.objects;
CREATE POLICY "uploads_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'uploads');

DROP POLICY IF EXISTS "uploads_public_insert" ON storage.objects;
CREATE POLICY "uploads_public_insert"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'uploads');

DROP POLICY IF EXISTS "uploads_service_delete" ON storage.objects;
CREATE POLICY "uploads_service_delete"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'uploads');
