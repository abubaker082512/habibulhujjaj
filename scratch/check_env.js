console.log("SUPABASE_URL:", process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL ? "Exists" : "Undefined");
console.log("SUPABASE_KEY:", process.env.SUPABASE_KEY || process.env.VITE_SUPABASE_ANON_KEY ? "Exists" : "Undefined");
console.log("SUPABASE_SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "Exists" : "Undefined");
console.log("ENV KEYS:", Object.keys(process.env).filter(k => k.includes("SUPABASE") || k.includes("VITE")));
