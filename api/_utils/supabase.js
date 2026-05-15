const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const isConfigured = Boolean(supabaseUrl && supabaseAnonKey);
const hasServiceRole = Boolean(supabaseServiceKey);

if (!isConfigured) {
  console.warn('[Supabase] ⚠ Missing credentials. Set SUPABASE_URL and SUPABASE_KEY in Vercel Environment Variables.');
}
if (!hasServiceRole) {
  console.warn('[Supabase] ⚠ SUPABASE_SERVICE_ROLE_KEY is not set. Write operations will be blocked by RLS.');
}

// Public read-only client (respects RLS — safe for SELECT)
const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// Admin client — bypasses RLS for INSERT/UPDATE/DELETE
// REQUIRES SUPABASE_SERVICE_ROLE_KEY to be set in Vercel
const supabaseAdmin = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseServiceKey || supabaseAnonKey || 'placeholder-key',
  { auth: { autoRefreshToken: false, persistSession: false } }
);

// Named exports — use: const { supabase, supabaseAdmin } = require('./_utils/supabase')
module.exports = { supabase, supabaseAdmin, isConfigured, hasServiceRole };
