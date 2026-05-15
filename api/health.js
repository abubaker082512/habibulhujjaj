module.exports = (req, res) => {
  // Simple health check for production to verify env wiring (do not leak secrets)
  res.setHeader('Content-Type', 'application/json')
  res.status(200).json({
    status: 'ok',
    env: {
      VITE_API_URL: Boolean(process.env.VITE_API_URL),
      VITE_SUPABASE_URL: Boolean(process.env.VITE_SUPABASE_URL),
      VITE_SUPABASE_ANON_KEY: Boolean(process.env.VITE_SUPABASE_ANON_KEY),
      SUPABASE_URL: Boolean(process.env.SUPABASE_URL),
      JWT_SECRET: Boolean(process.env.JWT_SECRET)
    }
  })
}
