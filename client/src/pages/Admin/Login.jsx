import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// Use environment variable or current origin for API
const API_BASE = import.meta.env.VITE_API_URL || ''

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@rehmanumrah.com')
  const [password, setPassword] = useState('admin123')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, { email, password })
      localStorage.setItem('token', res.data.token)
      navigate('/admin/dashboard')
    } catch (err) {
      console.error('Login error:', err)
      if (err.response) {
        setError(err.response.data?.message || 'Invalid credentials')
      } else if (err.request) {
        setError('Cannot connect to server. Please try again later.')
      } else {
        setError('An error occurred. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#013334]">
      <div className="bg-white p-6 sm:p-8 md:p-12 rounded-2xl shadow-2xl w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-notoSerif font-bold text-[#013334]">Admin Login</h1>
          <p className="text-on-surface-variant text-sm mt-2">Habibulhujaj Umrah & Travels</p>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2 text-primary">Email</label>
            <input 
              className="w-full bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 text-sm" 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 text-primary">Password</label>
            <input 
              className="w-full bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 text-sm" 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#CD9933] text-white p-4 rounded-lg font-bold hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined animate-spin">progress_activity</span>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <a href="/" className="text-[#CD9933] text-sm hover:underline">← Back to Website</a>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
