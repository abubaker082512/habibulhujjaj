-- Create the packages table
CREATE TABLE IF NOT EXISTS packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  category TEXT DEFAULT 'Economy',
  duration TEXT,
  location TEXT,
  imageUrl TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

-- Create policies
-- 1. Allow public to read packages
CREATE POLICY "Allow public read access" 
ON packages FOR SELECT 
USING (true);

-- 2. Allow administrative access (Full access)
-- Note: This assumes you are using the Service Role Key for the backend.
CREATE POLICY "Allow all access for service role" 
ON packages FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);
