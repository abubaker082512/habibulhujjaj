import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { createClient } from '@supabase/supabase-js'

const API_BASE = import.meta.env.VITE_API_URL || ''

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null

const tabs = [
  { id: 'packages', label: 'Umrah Packages', icon: 'mosque' },
  { id: 'tours', label: 'International Tours', icon: 'flight' },
  { id: 'visa', label: 'Visa Services', icon: 'description' },
  { id: 'flights', label: 'Flights', icon: 'flight_takeoff' },
  { id: 'gallery', label: 'Gallery', icon: 'photo_library' },
  { id: 'blog', label: 'Blog', icon: 'article' },
  { id: 'page-media', label: 'Page Media', icon: 'image' },
  { id: 'cms', label: 'Content CMS', icon: 'edit_note' },
  { id: 'settings', label: 'Site Settings', icon: 'settings' },
]

// Media Upload Component (Photo or Video)
const MediaUpload = ({ value, onChange, label = 'Media', type = 'image' }) => {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(value)
  const [mediaType, setMediaType] = useState(type)

  const acceptTypes = mediaType === 'video' ? 'video/*' : 'image/*'

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (supabase) {
      setUploading(true)
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const { data, error } = await supabase.storage
        .from('uploads')
        .upload(fileName, file)

      if (error) {
        alert('Upload failed: ' + error.message)
        setUploading(false)
        return
      }

      const { data: { publicUrl } } = supabase.storage
        .from('uploads')
        .getPublicUrl(data.path)

      onChange(publicUrl)
      setPreview(publicUrl)
      setUploading(false)
    } else {
      const reader = new FileReader()
      reader.onloadend = () => {
        const dataUrl = reader.result
        onChange(dataUrl)
        setPreview(dataUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-widest text-outline">{label}</label>
        <select 
          value={mediaType} 
          onChange={(e) => setMediaType(e.target.value)}
          className="text-xs bg-surface border border-outline-variant px-2 py-1 rounded"
        >
          <option value="image">Photo</option>
          <option value="video">Video</option>
        </select>
      </div>
      <div className="flex items-center gap-4">
        <label className="flex-1 flex items-center gap-2 bg-surface border border-outline-variant hover:border-[#001c1d] py-3 px-3 rounded-lg cursor-pointer transition-colors">
          <span className="material-symbols-outlined text-outline">{mediaType === 'video' ? 'videocam' : 'add_photo_alternate'}</span>
          <span className="text-sm text-on-surface-variant truncate flex-1">
            {uploading ? 'Uploading...' : 'Click to upload ' + (mediaType === 'video' ? 'video' : 'image')}
          </span>
          <input type="file" accept={acceptTypes} onChange={handleFileChange} disabled={uploading} className="hidden" />
        </label>
        {preview && (
          <button onClick={() => { onChange(''); setPreview('') }} className="text-red-500 hover:text-red-700">
            <span className="material-symbols-outlined">delete</span>
          </button>
        )}
      </div>
      {preview && (
        <div className="mt-2">
          {mediaType === 'video' || preview.includes('video') || preview.includes('.mp4') ? (
            <video src={preview} controls className="w-full max-h-48 rounded-lg border border-outline-variant" />
          ) : (
            <img src={preview} alt="Preview" className="w-full max-h-48 object-cover rounded-lg border border-outline-variant" />
          )}
        </div>
      )}
      {value && !value.startsWith('data:') && (
        <input 
          className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 px-3 text-xs text-on-surface-variant rounded-lg" 
          value={value} 
          onChange={e => { onChange(e.target.value); setPreview(e.target.value) }} 
          placeholder="Or paste URL here" 
        />
      )}
    </div>
  )
}

// Image Upload Component
const ImageUpload = ({ value, onChange, label = 'Image' }) => {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(value)

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (supabase) {
      setUploading(true)
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const { data, error } = await supabase.storage
        .from('uploads')
        .upload(fileName, file)

      if (error) {
        alert('Upload failed: ' + error.message)
        setUploading(false)
        return
      }

      const { data: { publicUrl } } = supabase.storage
        .from('uploads')
        .getPublicUrl(data.path)

      onChange(publicUrl)
      setPreview(publicUrl)
      setUploading(false)
    } else {
      const reader = new FileReader()
      reader.onloadend = () => {
        const dataUrl = reader.result
        onChange(dataUrl)
        setPreview(dataUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold uppercase tracking-widest text-outline">{label}</label>
      <div className="flex items-center gap-4">
        <label className="flex-1 flex items-center gap-2 bg-surface border-0 border-b border-outline-variant focus-within:border-[#001c1d] py-2 px-1 cursor-pointer">
          <span className="material-symbols-outlined text-outline text-sm">cloud_upload</span>
          <span className="text-sm text-on-surface-variant truncate flex-1">
            {uploading ? 'Uploading...' : 'Choose file'}
          </span>
          <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} className="hidden" />
        </label>
        {preview && (
          <img src={preview} alt="Preview" className="w-12 h-12 object-cover rounded-lg border border-outline-variant" />
        )}
      </div>
      {value && !value.startsWith('data:') && (
        <input className="w-full bg-surface border-0 border-b border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 text-xs text-on-surface-variant" value={value} onChange={e => onChange(e.target.value)} placeholder="Or paste image URL" />
      )}
    </div>
  )
}

// Page Media Configuration
const pageMediaConfig = [
  {
    page: 'Homepage',
    section: 'Hero Section',
    items: [
      { key: 'home_hero_image', label: 'Hero Background Image', type: 'image', description: 'Main hero section background image' },
      { key: 'home_hero_video', label: 'Hero Background Video', type: 'video', description: 'Optional video background (replaces image)' },
    ]
  },
  {
    page: 'Homepage',
    section: 'Backgrounds',
    items: [
      { key: 'home_about_bg', label: 'About Section Background', type: 'image', description: 'Background for About Us section' },
      { key: 'home_packages_bg', label: 'Packages Section Background', type: 'image', description: 'Background for Packages section' },
      { key: 'home_gallery_bg', label: 'Gallery Section Background', type: 'image', description: 'Background for Gallery section' },
      { key: 'home_testimonials_bg', label: 'Testimonials Section Background', type: 'image', description: 'Background for Testimonials section' },
    ]
  },
  {
    page: 'About Page',
    section: 'About Page Media',
    items: [
      { key: 'about_hero_image', label: 'Hero Image', type: 'image', description: 'About page hero image' },
      { key: 'about_section_image', label: 'Main Content Image', type: 'image', description: 'Image in main content area' },
      { key: 'about_video', label: 'Promotional Video', type: 'video', description: 'Optional company video' },
    ]
  },
  {
    page: 'Contact Page',
    section: 'Contact Page Media',
    items: [
      { key: 'contact_hero_image', label: 'Hero Image', type: 'image', description: 'Contact page hero image' },
      { key: 'contact_map_image', label: 'Map Placeholder Image', type: 'image', description: 'Map or location image' },
    ]
  },
  {
    page: 'Gallery Page',
    section: 'Gallery Page Media',
    items: [
      { key: 'gallery_hero_image', label: 'Hero Image', type: 'image', description: 'Gallery page hero image' },
      { key: 'gallery_banner', label: 'Banner Image', type: 'image', description: 'Additional banner for gallery' },
    ]
  },
  {
    page: 'Visa Services',
    section: 'Visa Page Media',
    items: [
      { key: 'visa_hero_image', label: 'Hero Image', type: 'image', description: 'Visa services hero image' },
      { key: 'visa_banner', label: 'Banner/Background', type: 'image', description: 'Banner or background image' },
    ]
  },
  {
    page: 'International Tours',
    section: 'Tours Page Media',
    items: [
      { key: 'tours_hero_image', label: 'Hero Image', type: 'image', description: 'Tours page hero image' },
      { key: 'tours_video', label: 'Promotional Video', type: 'video', description: 'Tours promotional video' },
    ]
  },
  {
    page: 'FAQ Page',
    section: 'FAQ Page Media',
    items: [
      { key: 'faq_hero_image', label: 'Hero Image', type: 'image', description: 'FAQ page hero image' },
    ]
  },
  {
    page: 'Blog Page',
    section: 'Blog Page Media',
    items: [
      { key: 'blog_hero_image', label: 'Hero Image', type: 'image', description: 'Blog page hero image' },
    ]
  },
  {
    page: 'Flights Page',
    section: 'Flights Page Media',
    items: [
      { key: 'flightsHero', label: 'Hero Image', type: 'image', description: 'Flights page hero image' },
    ]
  },
  {
    page: 'Umrah Packages',
    section: 'Packages Page Media',
    items: [
      { key: 'packages_hero_image', label: 'Hero Image', type: 'image', description: 'Packages page hero image' },
      { key: 'packages_video', label: 'Umrah Video', type: 'video', description: 'Promotional Umrah video' },
    ]
  },
]

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('packages')
  const [packages, setPackages] = useState([])
  const [tours, setTours] = useState([])
  const [visaServices, setVisaServices] = useState([])
  const [flights, setFlights] = useState([])
  const [galleryItems, setGalleryItems] = useState([])
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const [pageMedia, setPageMedia] = useState({})
  const [mediaSaving, setMediaSaving] = useState(false)

  const [packageForm, setPackageForm] = useState({
    title: '', description: '', price: '', category: 'Economy',
    duration: '', location: '', hotel_name: '', distance_from_haram: '',
    image_url: '', airline: '', stars: 4, badge: ''
  })
  const [tourForm, setTourForm] = useState({ title: '', subtitle: '', description: '', price: '', duration: '', image_url: '', highlights: '' })
  const [visaForm, setVisaForm] = useState({ title: '', description: '', processing_time: '', fee: '', documents: '' })
  const [flightForm, setFlightForm] = useState({ name: '', description: '', image_url: '', price_start: '', category: 'Most Popular', booking_url: '' })
  const [blogForm, setBlogForm] = useState({ title: '', excerpt: '', content: '', category: 'Guides', image_url: '', read_time: '' })
  const [galleryForm, setGalleryForm] = useState({ src: '', label: '', category: 'Kaaba' })

  const authHdr = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` })

  useEffect(() => {
    if (!localStorage.getItem('token')) { navigate('/admin/login'); return }
    
    // Add axios interceptor for 401
    const interceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token')
          navigate('/admin/login')
        }
        return Promise.reject(error)
      }
    )

    fetchAll()
    loadPageMedia()
    
    return () => axios.interceptors.response.eject(interceptor)
  }, [navigate])

  const loadPageMedia = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/cms?id=page_media`)
      if (res.data && Object.keys(res.data).length > 0) setPageMedia(res.data)
    } catch (err) { console.error('Error loading page media:', err) }
  }

  const savePageMedia = async () => {
    setMediaSaving(true)
    try {
      await axios.post(`${API_BASE}/api/cms?id=page_media`, pageMedia, { headers: authHdr() })
      alert('Page media saved successfully!')
    } catch (err) { alert('Save failed: ' + (err.response?.data?.error || err.message)) }
    setMediaSaving(false)
  }

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [pkgR, tourR, visaR, galR, blogR, flightR] = await Promise.allSettled([
        axios.get(`${API_BASE}/api/packages`),
        axios.get(`${API_BASE}/api/tours`),
        axios.get(`${API_BASE}/api/visa`),
        axios.get(`${API_BASE}/api/gallery`),
        axios.get(`${API_BASE}/api/blog`),
        axios.get(`${API_BASE}/api/flights`),
      ])
      if (pkgR.status === 'fulfilled') setPackages(Array.isArray(pkgR.value.data) ? pkgR.value.data : [])
      if (tourR.status === 'fulfilled') setTours(Array.isArray(tourR.value.data) ? tourR.value.data : [])
      if (visaR.status === 'fulfilled') setVisaServices(Array.isArray(visaR.value.data) ? visaR.value.data : [])
      if (galR.status === 'fulfilled') setGalleryItems(Array.isArray(galR.value.data) ? galR.value.data : [])
      if (blogR.status === 'fulfilled') setBlogPosts(Array.isArray(blogR.value.data) ? blogR.value.data : [])
      if (flightR.status === 'fulfilled') setFlights(Array.isArray(flightR.value.data) ? flightR.value.data : [])
    } catch (err) { console.error('Fetch error:', err) }
    setLoading(false)
  }

  const fetchData = fetchAll

  const handleAddPackage = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API_BASE}/api/packages`, { ...packageForm, price: parseFloat(packageForm.price) || 0 }, { headers: authHdr() })
      setPackageForm({ title: '', description: '', price: '', category: 'Economy', duration: '', location: '', hotel_name: '', distance_from_haram: '', image_url: '', airline: '', stars: 4, badge: '' })
      fetchAll()
      alert('Package added successfully!')
    } catch (err) { alert('Error: ' + (err.response?.data?.message || err.message)) }
  }

  const handleDeletePackage = async (id) => {
    if (!confirm('Delete this package?')) return
    try {
      await axios.delete(`${API_BASE}/api/packages?id=${id}`, { headers: authHdr() })
      fetchAll()
    } catch { alert('Error deleting package') }
  }

  const handleAddTour = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API_BASE}/api/tours`, { ...tourForm, price: parseFloat(tourForm.price) || 0 }, { headers: authHdr() })
      setTourForm({ title: '', subtitle: '', description: '', price: '', duration: '', image_url: '', highlights: '' })
      fetchAll()
      alert('Tour added!')
    } catch (err) { alert('Error: ' + (err.response?.data?.message || err.message)) }
  }

  const handleDeleteTour = async (id) => {
    if (!confirm('Delete this tour?')) return
    try { await axios.delete(`${API_BASE}/api/tours?id=${id}`, { headers: authHdr() }); fetchAll() }
    catch { alert('Error deleting tour') }
  }

  const handleAddVisa = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API_BASE}/api/visa`, visaForm, { headers: authHdr() })
      setVisaForm({ title: '', description: '', processing_time: '', fee: '', documents: '' })
      fetchAll()
      alert('Visa service added!')
    } catch (err) { alert('Error: ' + (err.response?.data?.message || err.message)) }
  }

  const handleDeleteVisa = async (id) => {
    if (!confirm('Delete this service?')) return
    try { await axios.delete(`${API_BASE}/api/visa?id=${id}`, { headers: authHdr() }); fetchAll() }
    catch { alert('Error deleting') }
  }

  const handleAddFlight = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API_BASE}/api/flights`, { ...flightForm, price_start: parseFloat(flightForm.price_start) || 0 }, { headers: authHdr() })
      setFlightForm({ name: '', description: '', image_url: '', price_start: '', category: 'Most Popular', booking_url: '' })
      fetchAll()
      alert('Destination added!')
    } catch (err) { alert('Error: ' + (err.response?.data?.message || err.message)) }
  }

  const handleDeleteFlight = async (id) => {
    if (!confirm('Delete this destination?')) return
    try { await axios.delete(`${API_BASE}/api/flights?id=${id}`, { headers: authHdr() }); fetchAll() }
    catch { alert('Error deleting') }
  }

  const handleAddGallery = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API_BASE}/api/gallery`, galleryForm, { headers: authHdr() })
      setGalleryForm({ src: '', label: '', category: 'Kaaba' })
      fetchAll()
      alert('Gallery image added!')
    } catch (err) { alert('Error: ' + (err.response?.data?.message || err.message)) }
  }

  const handleDeleteGallery = async (id) => {
    if (!confirm('Delete this image?')) return
    try { await axios.delete(`${API_BASE}/api/gallery?id=${id}`, { headers: authHdr() }); fetchAll() }
    catch { alert('Error deleting') }
  }

  const handleAddBlog = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API_BASE}/api/blog`, blogForm, { headers: authHdr() })
      setBlogForm({ title: '', excerpt: '', content: '', category: 'Guides', image_url: '', read_time: '' })
      fetchAll()
      alert('Blog post published!')
    } catch (err) { alert('Error: ' + (err.response?.data?.message || err.message)) }
  }

  const handleDeleteBlog = async (id) => {
    if (!confirm('Delete this post?')) return
    try { await axios.delete(`${API_BASE}/api/blog?id=${id}`, { headers: authHdr() }); fetchAll() }
    catch { alert('Error deleting') }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Admin Header */}
      <header className="bg-[#001c1d] text-white px-4 md:px-8 py-6 flex justify-between items-center shadow-lg">
        <div>
          <h1 className="font-notoSerif text-3xl font-black text-secondary tracking-tighter uppercase">Admin Console</h1>
          <p className="text-white/40 text-[10px] font-black tracking-[0.3em] uppercase">Habib Ul Hujjaj Legacy</p>
        </div>
        <div className="flex items-center gap-6">
          <a href="/" className="text-white/60 hover:text-secondary text-xs font-bold uppercase tracking-widest transition-all">Live Site</a>
          <button onClick={handleLogout} className="bg-secondary text-primary px-8 py-2 rounded text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">Logout</button>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar Tabs */}
        <aside className="w-full lg:w-72 bg-[#001c1d] lg:min-h-[calc(100vh-100px)] p-6 border-t border-white/5">
          <nav className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 text-left px-6 py-4 rounded-xl flex items-center gap-4 transition-all lg:w-full group ${activeTab === tab.id ? 'bg-secondary text-primary shadow-xl scale-105' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
              >
                <span className={`material-symbols-outlined ${activeTab === tab.id ? 'font-bold' : 'text-white/30 group-hover:text-secondary'}`}>{tab.icon}</span>
                <span className="font-black text-xs uppercase tracking-widest">{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* Supabase Status */}
          <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/5">
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-4">Infrastructure</p>
            {supabase ? (
              <p className="text-xs text-secondary font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">cloud_done</span>
                Cloud Active
              </p>
            ) : (
              <p className="text-xs text-orange-400 font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">warning</span>
                Local Mode
              </p>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Packages Tab */}
          {activeTab === 'packages' && (
            <div>
              <h2 className="font-notoSerif text-3xl font-bold text-primary mb-8">Manage Umrah Packages</h2>
              
              {/* Add Package Form */}
              <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow mb-8">
                <h3 className="font-notoSerif text-xl font-bold mb-6">Add New Package</h3>
                <form onSubmit={handleAddPackage} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 text-sm" placeholder="Package Title" value={packageForm.title} onChange={e => setPackageForm({...packageForm, title: e.target.value})} required />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 text-sm" placeholder="Price (PKR)" type="number" value={packageForm.price} onChange={e => setPackageForm({...packageForm, price: e.target.value})} required />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 text-sm" placeholder="Location" value={packageForm.location} onChange={e => setPackageForm({...packageForm, location: e.target.value})} />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 text-sm" placeholder="Duration (e.g., 10 Days)" value={packageForm.duration} onChange={e => setPackageForm({...packageForm, duration: e.target.value})} required />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 text-sm" placeholder="Hotel Name" value={packageForm.hotel_name} onChange={e => setPackageForm({...packageForm, hotel_name: e.target.value})} />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 text-sm" placeholder="Distance from Haram" value={packageForm.distance_from_haram} onChange={e => setPackageForm({...packageForm, distance_from_haram: e.target.value})} />
                  <select className="bg-surface border-0 border-b border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 text-sm" value={packageForm.category} onChange={e => setPackageForm({...packageForm, category: e.target.value})}>
                    <option>Economy</option>
                    <option>3 Star</option>
                    <option>4 Star</option>
                    <option>5 Star</option>
                    <option>Ramadan</option>
                    <option>December</option>
                  </select>
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 text-sm" placeholder="Airline" value={packageForm.airline} onChange={e => setPackageForm({...packageForm, airline: e.target.value})} />
                  
                  {/* Image Upload */}
                  <div className="md:col-span-2">
                    <ImageUpload 
                      value={packageForm.image_url} 
                      onChange={(val) => setPackageForm({...packageForm, image_url: val})}
                      label="Package Image"
                    />
                  </div>

                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 text-sm" placeholder="Badge (e.g., Best Seller)" value={packageForm.badge} onChange={e => setPackageForm({...packageForm, badge: e.target.value})} />
                  <textarea className="bg-surface border-0 border-b border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 text-sm md:col-span-2" placeholder="Description" rows={3} value={packageForm.description} onChange={e => setPackageForm({...packageForm, description: e.target.value})} required />
                  <button type="submit" className="bg-[#001c1d] text-white py-3 rounded font-bold text-sm md:col-span-2 hover:brightness-110 transition-all">Add Package</button>
                </form>
              </div>

              {/* Package List */}
              <div className="space-y-4">
                <h3 className="font-notoSerif text-xl font-bold">Existing Packages ({packages.length})</h3>
                {loading ? (
                  <p className="text-on-surface-variant">Loading...</p>
                ) : packages.length === 0 ? (
                  <div className="bg-surface-container-lowest p-8 rounded-xl text-center">
                    <span className="material-symbols-outlined text-6xl text-outline-variant mb-4 block">inventory_2</span>
                    <p className="text-on-surface-variant">No packages found. Add your first package above.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {packages.map(pkg => (
                      <div key={pkg.id} className="bg-surface-container-lowest p-4 rounded-lg editorial-shadow flex gap-4">
                        <img src={(pkg.image_url || pkg.image) || 'https://via.placeholder.com/96'} alt={pkg.title} className="w-24 h-24 object-cover rounded-lg" />
                        <div className="flex-1">
                          <h4 className="font-bold text-primary">{pkg.title}</h4>
                          <p className="text-sm text-on-surface-variant font-medium">{pkg.category} • {pkg.duration}</p>
                          <p className="text-[#001c1d] font-bold">PKR {(pkg.price || 0).toLocaleString()}</p>
                          <p className="text-[10px] text-outline mt-1 font-mono uppercase truncate max-w-[150px]">{pkg.id}</p>
                        </div>
                        <button onClick={() => handleDeletePackage(pkg.id)} className="self-start text-red-500 hover:text-red-700 transition-colors">
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tours Tab */}
          {activeTab === 'tours' && (
            <div>
              <h2 className="font-notoSerif text-3xl font-bold text-primary mb-8">Manage International Tours</h2>
              <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow mb-8">
                <h3 className="font-notoSerif text-xl font-bold mb-6">Add New Tour</h3>
                <form onSubmit={handleAddTour} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input required className="bg-surface border-0 border-b border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 text-sm" placeholder="Tour Title (e.g., Turkey Tour)" value={tourForm.title} onChange={e => setTourForm({...tourForm, title: e.target.value})} />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 text-sm" placeholder="Subtitle (e.g., Istanbul, Cappadocia)" value={tourForm.subtitle} onChange={e => setTourForm({...tourForm, subtitle: e.target.value})} />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 text-sm" placeholder="Duration (e.g., 10 Days)" value={tourForm.duration} onChange={e => setTourForm({...tourForm, duration: e.target.value})} />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 text-sm" placeholder="Price (PKR)" value={tourForm.price} onChange={e => setTourForm({...tourForm, price: e.target.value})} />
                  <div className="md:col-span-2">
                    <ImageUpload value={tourForm.image_url} onChange={(val) => setTourForm({...tourForm, image_url: val})} label="Tour Image" />
                  </div>
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 text-sm md:col-span-2" placeholder="Highlights (comma separated)" value={tourForm.highlights} onChange={e => setTourForm({...tourForm, highlights: e.target.value})} />
                  <textarea className="bg-surface border-0 border-b border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 text-sm md:col-span-2" placeholder="Description" rows={3} value={tourForm.description} onChange={e => setTourForm({...tourForm, description: e.target.value})} />
                  <button type="submit" className="bg-[#001c1d] text-white py-3 rounded font-bold text-sm md:col-span-2 hover:brightness-110 transition-all">Add Tour</button>
                </form>
              </div>
              <div className="space-y-3">
                <h3 className="font-notoSerif text-xl font-bold">Existing Tours ({tours.length})</h3>
                {tours.map(t => (
                  <div key={t.id} className="bg-surface-container-lowest p-4 rounded-lg flex items-center gap-4 editorial-shadow">
                    {t.image_url && <img src={t.image_url} alt={t.title} className="w-16 h-16 object-cover rounded flex-shrink-0"/>}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-primary truncate">{t.title}</p>
                      <p className="text-sm text-outline">{t.subtitle} • {t.duration}</p>
                      <p className="text-[#001c1d] font-bold text-sm">PKR {(t.price||0).toLocaleString()}</p>
                    </div>
                    <button onClick={()=>handleDeleteTour(t.id)} className="text-red-500 hover:text-red-700 flex-shrink-0"><span className="material-symbols-outlined">delete</span></button>
                  </div>
                ))}
                {!tours.length && <p className="text-center text-on-surface-variant py-4 bg-surface-container-lowest rounded-xl">No tours yet. Add one above.</p>}
              </div>
            </div>
          )}

          {/* Visa Tab */}
          {activeTab === 'visa' && (
            <div>
              <h2 className="font-notoSerif text-3xl font-bold text-primary mb-8">Manage Visa Services</h2>
              <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow mb-8">
                <h3 className="font-notoSerif text-xl font-bold mb-6">Add New Visa Service</h3>
                <form onSubmit={handleAddVisa} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input required className="bg-surface border-0 border-b border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 text-sm" placeholder="Visa Title (e.g., Umrah Visa)" value={visaForm.title} onChange={e => setVisaForm({...visaForm, title: e.target.value})} />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 text-sm" placeholder="Processing Time" value={visaForm.processing_time} onChange={e => setVisaForm({...visaForm, processing_time: e.target.value})} />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 text-sm" placeholder="Fee (PKR)" value={visaForm.fee} onChange={e => setVisaForm({...visaForm, fee: e.target.value})} />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 text-sm" placeholder="Required Documents (comma separated)" value={visaForm.documents} onChange={e => setVisaForm({...visaForm, documents: e.target.value})} />
                  <textarea className="bg-surface border-0 border-b border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 text-sm md:col-span-2" placeholder="Description" rows={3} value={visaForm.description} onChange={e => setVisaForm({...visaForm, description: e.target.value})} />
                  <button type="submit" className="bg-[#001c1d] text-white py-3 rounded font-bold text-sm md:col-span-2 hover:brightness-110 transition-all">Add Visa Service</button>
                </form>
              </div>
              <div className="space-y-3">
                <h3 className="font-notoSerif text-xl font-bold">Existing Visa Services ({visaServices.length})</h3>
                {visaServices.map(v => (
                  <div key={v.id} className="bg-surface-container-lowest p-4 rounded-lg flex items-center gap-4 editorial-shadow">
                    <span className="material-symbols-outlined text-3xl text-[#001c1d] flex-shrink-0">description</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-primary">{v.title}</p>
                      <p className="text-sm text-outline">{v.processing_time} • {v.fee}</p>
                    </div>
                    <button onClick={()=>handleDeleteVisa(v.id)} className="text-red-500 hover:text-red-700 flex-shrink-0"><span className="material-symbols-outlined">delete</span></button>
                  </div>
                ))}
                {!visaServices.length && <p className="text-center text-on-surface-variant py-4 bg-surface-container-lowest rounded-xl">No visa services yet.</p>}
              </div>
            </div>
          )}

          {/* Flights Tab */}
          {activeTab === 'flights' && (
            <div>
              <h2 className="font-notoSerif text-3xl font-bold text-primary mb-8">Manage Flights</h2>
              <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow mb-8">
                <h3 className="font-notoSerif text-xl font-bold mb-6">Add New Destination</h3>
                <form onSubmit={handleAddFlight} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input required className="bg-surface border-0 border-b border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 text-sm" placeholder="Destination Name (e.g., London)" value={flightForm.name} onChange={e => setFlightForm({...flightForm, name: e.target.value})} />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 text-sm" placeholder="Price Starts From (PKR)" type="number" value={flightForm.price_start} onChange={e => setFlightForm({...flightForm, price_start: e.target.value})} />
                  <div className="md:col-span-2">
                    <ImageUpload value={flightForm.image_url} onChange={(val) => setFlightForm({...flightForm, image_url: val})} label="Destination Image" />
                  </div>
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 text-sm" placeholder="Category (e.g., Most Popular)" value={flightForm.category} onChange={e => setFlightForm({...flightForm, category: e.target.value})} />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 text-sm" placeholder="Booking URL (Optional)" value={flightForm.booking_url} onChange={e => setFlightForm({...flightForm, booking_url: e.target.value})} />
                  <textarea className="bg-surface border-0 border-b border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 text-sm md:col-span-2" placeholder="Short Description" rows={2} value={flightForm.description} onChange={e => setFlightForm({...flightForm, description: e.target.value})} />
                  <button type="submit" className="bg-[#001c1d] text-white py-3 rounded font-bold text-sm md:col-span-2 hover:brightness-110 transition-all">Add Destination</button>
                </form>
              </div>
              <div className="space-y-3">
                <h3 className="font-notoSerif text-xl font-bold">Existing Destinations ({flights.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {flights.map(f => (
                    <div key={f.id} className="bg-surface-container-lowest p-4 rounded-lg editorial-shadow">
                      <img src={f.image_url || 'https://via.placeholder.com/150'} alt={f.name} className="w-full h-32 object-cover rounded-lg mb-3" />
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-primary">{f.name}</p>
                          <p className="text-xs text-[#001c1d] font-bold">From PKR {(f.price_start || 0).toLocaleString()}</p>
                        </div>
                        <button onClick={()=>handleDeleteFlight(f.id)} className="text-red-500 hover:text-red-700"><span className="material-symbols-outlined">delete</span></button>
                      </div>
                    </div>
                  ))}
                </div>
                {!flights.length && <p className="text-center text-on-surface-variant py-4 bg-surface-container-lowest rounded-xl">No destinations yet.</p>}
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div>
              <h2 className="font-notoSerif text-3xl font-bold text-primary mb-8">Manage Gallery</h2>
              <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow mb-8">
                <h3 className="font-notoSerif text-xl font-bold mb-6">Add New Gallery Image</h3>
                <form onSubmit={handleAddGallery} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Image Upload */}
                  <div className="md:col-span-2">
                    <ImageUpload value={galleryForm.src} onChange={(val) => setGalleryForm({...galleryForm, src: val})} label="Gallery Image" />
                  </div>
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 text-sm" placeholder="Label / Title" value={galleryForm.label} onChange={e => setGalleryForm({...galleryForm, label: e.target.value})} />
                  <select className="bg-surface border-0 border-b border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 text-sm" value={galleryForm.category} onChange={e => setGalleryForm({...galleryForm, category: e.target.value})}>
                    <option>Kaaba</option>
                    <option>Masjid Nabawi</option>
                    <option>Ziyarat</option>
                    <option>Umrah Groups</option>
                    <option>International Tours</option>
                  </select>
                  <button type="submit" className="bg-[#001c1d] text-white py-3 rounded font-bold text-sm hover:brightness-110 transition-all">Add Image</button>
                </form>
              </div>
              <div className="space-y-3">
                <h3 className="font-notoSerif text-xl font-bold">Gallery Images ({galleryItems.length})</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {galleryItems.map(g => (
                    <div key={g.id} className="relative group">
                      <img src={g.src} alt={g.label} className="w-full h-32 object-cover rounded-lg"/>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <button onClick={()=>handleDeleteGallery(g.id)} className="text-white bg-red-500 rounded-full p-1"><span className="material-symbols-outlined text-sm">delete</span></button>
                      </div>
                      <p className="text-xs text-center mt-1 text-outline truncate">{g.label||g.category}</p>
                    </div>
                  ))}
                </div>
                {!galleryItems.length && <p className="text-center text-on-surface-variant py-4 bg-surface-container-lowest rounded-xl">No gallery images yet.</p>}
              </div>
            </div>
          )}

          {/* Blog Tab */}
          {activeTab === 'blog' && (
            <div>
              <h2 className="font-notoSerif text-3xl font-bold text-primary mb-8">Manage Blog Posts</h2>
              <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow mb-8">
                <h3 className="font-notoSerif text-xl font-bold mb-6">Add New Blog Post</h3>
                <form onSubmit={handleAddBlog} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input required className="bg-surface border-0 border-b border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 text-sm" placeholder="Post Title" value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} />
                  <select className="bg-surface border-0 border-b border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 text-sm" value={blogForm.category} onChange={e => setBlogForm({...blogForm, category: e.target.value})}>
                    <option>Guides</option>
                    <option>Planning</option>
                    <option>Destinations</option>
                    <option>Packages</option>
                    <option>History</option>
                  </select>
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 text-sm" placeholder="Read Time (e.g., 5 min read)" value={blogForm.read_time} onChange={e => setBlogForm({...blogForm, read_time: e.target.value})} />
                  <div className="md:col-span-2">
                    <ImageUpload value={blogForm.image_url} onChange={(val) => setBlogForm({...blogForm, image_url: val})} label="Featured Image" />
                  </div>
                  <textarea className="bg-surface border-0 border-b border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 text-sm md:col-span-2" placeholder="Excerpt" rows={2} value={blogForm.excerpt} onChange={e => setBlogForm({...blogForm, excerpt: e.target.value})} />
                  <textarea className="bg-surface border-0 border-b border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 text-sm md:col-span-2" placeholder="Full Content" rows={4} value={blogForm.content} onChange={e => setBlogForm({...blogForm, content: e.target.value})} />
                  <button type="submit" className="bg-[#001c1d] text-white py-3 rounded font-bold text-sm md:col-span-2 hover:brightness-110 transition-all">Publish Post</button>
                </form>
              </div>
              <div className="space-y-3">
                <h3 className="font-notoSerif text-xl font-bold">Blog Posts ({blogPosts.length})</h3>
                {blogPosts.map(b => (
                  <div key={b.id} className="bg-surface-container-lowest p-4 rounded-lg flex items-center gap-4 editorial-shadow">
                    {b.image_url && <img src={b.image_url} alt={b.title} className="w-16 h-16 object-cover rounded flex-shrink-0"/>}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-primary truncate">{b.title}</p>
                      <p className="text-sm text-outline">{b.category} • {b.read_time}</p>
                    </div>
                    <button onClick={()=>handleDeleteBlog(b.id)} className="text-red-500 hover:text-red-700 flex-shrink-0"><span className="material-symbols-outlined">delete</span></button>
                  </div>
                ))}
                {!blogPosts.length && <p className="text-center text-on-surface-variant py-4 bg-surface-container-lowest rounded-xl">No posts yet.</p>}
              </div>
            </div>
          )}

          {/* Page Media Tab */}
          {activeTab === 'page-media' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-notoSerif text-3xl font-bold text-primary">Page Media Manager</h2>
                <button 
                  onClick={savePageMedia}
                  disabled={mediaSaving}
                  className="bg-[#001c1d] text-white px-8 py-3 rounded font-bold hover:brightness-110 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined">{mediaSaving ? 'hourglass_empty' : 'save'}</span>
                  {mediaSaving ? 'Saving...' : 'Save All Changes'}
                </button>
              </div>
              
              <p className="text-on-surface-variant mb-8">Upload images and videos for different pages and sections of your website. Select Photo or Video option for each media item.</p>

              {/* Media Sections by Page */}
              {pageMediaConfig.map((section) => (
                <div key={section.page + section.section} className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow mb-8">
                  <div className="mb-6">
                    <span className="inline-block bg-[#001c1d] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">{section.page}</span>
                    <h3 className="font-notoSerif text-xl font-bold text-primary">{section.section}</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {section.items.map((item) => (
                      <div key={item.key} className="bg-surface p-6 rounded-xl border border-outline-variant">
                        <div className="mb-3">
                          <h4 className="font-bold text-sm">{item.label}</h4>
                          <p className="text-xs text-on-surface-variant">{item.description}</p>
                        </div>
                        <MediaUpload
                          value={pageMedia[item.key] || ''}
                          onChange={(val) => setPageMedia({...pageMedia, [item.key]: val})}
                          label={item.label}
                          type={item.type}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Info Box */}
              <div className="bg-[#001c1d]/10 border border-[#001c1d]/30 p-6 rounded-xl">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#001c1d]">info</span>
                  <div>
                    <h4 className="font-bold text-sm mb-1">How Page Media Works</h4>
                    <p className="text-xs text-on-surface-variant">
                      Upload images and videos for specific sections of your website. 
                      Media is saved locally in your browser and will persist across sessions. 
                      For production use with Supabase, media URLs can be configured to point to your storage bucket.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content CMS Tab */}
          {activeTab === 'cms' && <ContentCMS />}

          {/* Settings Tab */}
          {activeTab === 'settings' && <SiteSettings />}
        </main>
      </div>
    </div>
  )
}

// Content CMS Component
const ContentCMS = () => {
  const [activeContentTab, setActiveContentTab] = useState('home')
  const [saving, setSaving] = useState(false)
  const authHdr = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` })
  
  // Content state with defaults
  const [homeContent, setHomeContent] = useState({
    heroTitle: 'Proudly serving the guest of Allah',
    heroSubtitle: 'We provide reliable, comfortable, and affordable Umrah services with complete guidance—so you can focus on your عبادت while we take care of the rest.',
    heroCta: 'View Umrah Packages', heroWhatsApp: 'Contact on WhatsApp',
    featuredTitle: 'Curated Umrah Packages', featuredSubtitle: 'Spiritual Journeys',
    toursTitle: 'Discover the World', toursSubtitle: 'Beyond Borders',
    ctaTitle: 'Book Your Umrah Journey Today', ctaSubtitle: 'Contact our travel consultants today to get a personalized quote for your spiritual or leisure travel needs.',
    ctaPrimary: 'Get a Quote', ctaSecondary: 'Contact Us'
  })

  const [aboutContent, setAboutContent] = useState({
    heroTitle: 'About Us', heroSubtitle: 'A legacy of service, built on the foundation of faith and the honor of serving Allah\'s guests.',
    storyTitle: 'Crafting Pathways to the Holy Lands',
    storyText1: 'Habib Ul Hujjaj began as a humble aspiration: to transform the daunting logistics of pilgrimage into a seamless, contemplative experience.',
    storyText2: 'Over two decades, we have evolved from a small local agency into a premier travel concierge in Pakistan.',
    missionTitle: 'To provide affordable and comfortable Umrah journeys.', visionTitle: 'To become a trusted Umrah travel agency in Pakistan.',
    statsYears: '25+', statsPilgrims: '50K+', statsDestinations: '100+', statsRating: '4.9',
  })

  const [contactContent, setContactContent] = useState({
    heroTitle: 'Get in Touch', heroSubtitle: 'Have questions about our Umrah packages or international tours? Our travel consultants are ready to assist you.',
    phone1: '+92 300 123 4567', phone2: '+92 42 123 4567', email: 'info@habibulhujaj.com', whatsapp: '+92 300 123 4567',
    addressLahore: 'Main Boulevard, Gulberg III, Lahore, Pakistan', addressKarachi: 'DHA Phase II, Karachi, Pakistan',
  })

  const [flightsContent, setFlightsContent] = useState({
    heroTitle: 'BOOK YOUR DREAM JOURNEY WITH REHMAN UMRAH & TRAVELS',
    heroSubtitle: 'DISCOVER THE BEST DEALS ON FLIGHTS AND TRAVEL PACKAGES WORLDWIDE',
    adventureTitle: 'YOUR NEXT ADVENTURE BEGINS HERE!',
    adventureSubtitle: 'Discover the best flight deals and travel packages tailored to your needs.',
    trustTitle: 'TIRED OF OVERPRICED FLIGHTS, VISA HASSLES, AND GENERIC TRAVEL PLANS?',
    trustSubtitle: 'We provide transparent pricing and expert guidance for all your travel needs.',
    destinationsTitle: 'YOUR DESTINATION AWAITS — WHERE WILL YOU GO?',
    destinationsSubtitle: 'Pick your destination and let us handle the rest.',
    popularTitle: 'Most Popular Places',
    feature1: 'Lowest Flight Booking with Best Services',
    feature2: 'Max Success Guarantee with Expert Guidance',
    feature3: '24/7 Customer Care — From Letters to Landing',
    feature4: 'Customized Packages — Umrah, HM, Management, Business',
    feature5: 'Price Match Promise: Find it cheaper? We\'ll beat it!'
  })

  const [faqContent, setFaqContent] = useState([
    { id: 1, question: 'What documents do I need for Umrah?', answer: 'For Umrah, you need a valid passport with at least 6 months validity, passport-sized photos, and a completed visa application. We handle the visa process for you.', category: 'Visa' },
    { id: 2, question: 'How far in advance should I book?', answer: 'We recommend booking at least 2-3 months in advance, especially during Ramadan and Hajj season, to ensure availability and better rates.', category: 'Booking' },
    { id: 3, question: 'Is travel insurance included?', answer: 'Travel insurance is not included in our packages but can be added at an additional cost.', category: 'Services' },
  ])

  const [footerContent, setFooterContent] = useState({
    description: 'Habib Ul Hujjaj specializes in crafting meaningful spiritual journeys and world-class international tours.',
    quickLinks: ['About Us', 'Visa Services', 'Packages', 'Terms & Conditions', 'Privacy Policy'],
    copyright: '© 2024 Habib Ul Hujjaj. All Rights Reserved.',
    socialLinks: { facebook: '', instagram: '', twitter: '', youtube: '' }
  })

  useEffect(() => {
    // Attempt local load first for snappiness
    try {
      if (localStorage.getItem('cms_home')) setHomeContent(JSON.parse(localStorage.getItem('cms_home')))
      if (localStorage.getItem('cms_about')) setAboutContent(JSON.parse(localStorage.getItem('cms_about')))
      if (localStorage.getItem('cms_flights')) setFlightsContent(JSON.parse(localStorage.getItem('cms_flights')))
      if (localStorage.getItem('cms_contact')) setContactContent(JSON.parse(localStorage.getItem('cms_contact')))
      if (localStorage.getItem('cms_faq')) setFaqContent(JSON.parse(localStorage.getItem('cms_faq')))
      if (localStorage.getItem('cms_footer')) setFooterContent(JSON.parse(localStorage.getItem('cms_footer')))
    } catch (e) {}

    // Fetch from API
    axios.get(`${API_BASE}/api/cms`).then(res => {
      const data = res.data;
      if (data.cms_home && Object.keys(data.cms_home).length > 0) setHomeContent(prev => ({...prev, ...data.cms_home}));
      if (data.cms_about && Object.keys(data.cms_about).length > 0) setAboutContent(prev => ({...prev, ...data.cms_about}));
      if (data.cms_flights && Object.keys(data.cms_flights).length > 0) setFlightsContent(prev => ({...prev, ...data.cms_flights}));
      if (data.cms_contact && Object.keys(data.cms_contact).length > 0) setContactContent(prev => ({...prev, ...data.cms_contact}));
      if (data.cms_faq && Array.isArray(data.cms_faq)) setFaqContent(data.cms_faq);
      if (data.cms_footer && Object.keys(data.cms_footer).length > 0) setFooterContent(prev => ({...prev, ...data.cms_footer}));
    }).catch(err => console.error("CMS load error:", err));
  }, [])

  const saveContent = async (key, content) => {
    setSaving(true)
    try {
      // Local cache
      localStorage.setItem(`cms_${key}`, JSON.stringify(content))
      // API call
      await axios.post(`${API_BASE}/api/cms?id=cms_${key}`, content, { headers: authHdr() })
      alert('Content saved successfully!')
    } catch (err) {
      alert('Failed to save to database: ' + (err.response?.data?.error || err.message))
    }
    setSaving(false)
  }

  const addFaq = () => {
    const newFaq = {
      id: Date.now(),
      question: 'New Question',
      answer: 'Your answer here...',
      category: 'General'
    }
    setFaqContent([...faqContent, newFaq])
  }

  const updateFaq = (id, field, value) => {
    setFaqContent(faqContent.map(faq => 
      faq.id === id ? { ...faq, [field]: value } : faq
    ))
  }

  const deleteFaq = (id) => {
    if (confirm('Delete this FAQ?')) {
      setFaqContent(faqContent.filter(faq => faq.id !== id))
    }
  }

  const contentTabs = [
    { id: 'home', label: 'Home Page' },
    { id: 'about', label: 'About Page' },
    { id: 'flights', label: 'Flights Page' },
    { id: 'contact', label: 'Contact Page' },
    { id: 'faq', label: 'FAQ' },
    { id: 'footer', label: 'Footer' },
    { id: 'media', label: 'Images & Videos' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-notoSerif text-3xl font-bold text-primary">Content Management</h2>
      </div>
      
      <p className="text-on-surface-variant mb-8">Manage all website content including text, FAQs, and footer information.</p>

      {/* Content Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {contentTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveContentTab(tab.id)}
            className={`px-6 py-3 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${
              activeContentTab === tab.id 
                ? 'bg-[#001c1d] text-white' 
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Home Page Content */}
      {activeContentTab === 'home' && (
        <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow">
          <h3 className="font-notoSerif text-xl font-bold mb-6">Home Page Content</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Hero Section Title</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                value={homeContent.heroTitle}
                onChange={(e) => setHomeContent({...homeContent, heroTitle: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Hero Section Subtitle</label>
              <textarea 
                className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                rows={3}
                value={homeContent.heroSubtitle}
                onChange={(e) => setHomeContent({...homeContent, heroSubtitle: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Featured Section Title</label>
                <input 
                  className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                  value={homeContent.featuredTitle}
                  onChange={(e) => setHomeContent({...homeContent, featuredTitle: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Tours Section Title</label>
                <input 
                  className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                  value={homeContent.toursTitle}
                  onChange={(e) => setHomeContent({...homeContent, toursTitle: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">CTA Section Title</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                value={homeContent.ctaTitle}
                onChange={(e) => setHomeContent({...homeContent, ctaTitle: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">CTA Section Subtitle</label>
              <textarea 
                className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                rows={2}
                value={homeContent.ctaSubtitle}
                onChange={(e) => setHomeContent({...homeContent, ctaSubtitle: e.target.value})}
              />
            </div>
            <button 
              onClick={() => saveContent('home', homeContent)}
              className="bg-[#001c1d] text-white px-8 py-3 rounded-lg font-bold text-sm hover:brightness-110 transition-all"
            >
              {saving ? 'Saving...' : 'Save Home Page Content'}
            </button>
          </div>
        </div>
      )}

      {/* About Page Content */}
      {activeContentTab === 'about' && (
        <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow">
          <h3 className="font-notoSerif text-xl font-bold mb-6">About Page Content</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Hero Title</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                value={aboutContent.heroTitle}
                onChange={(e) => setAboutContent({...aboutContent, heroTitle: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Hero Subtitle</label>
              <textarea 
                className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                rows={2}
                value={aboutContent.heroSubtitle}
                onChange={(e) => setAboutContent({...aboutContent, heroSubtitle: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Story Title</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                value={aboutContent.storyTitle}
                onChange={(e) => setAboutContent({...aboutContent, storyTitle: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Story Paragraph 1</label>
              <textarea 
                className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                rows={3}
                value={aboutContent.storyText1}
                onChange={(e) => setAboutContent({...aboutContent, storyText1: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Story Paragraph 2</label>
              <textarea 
                className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                rows={3}
                value={aboutContent.storyText2}
                onChange={(e) => setAboutContent({...aboutContent, storyText2: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Mission Statement</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                value={aboutContent.missionTitle}
                onChange={(e) => setAboutContent({...aboutContent, missionTitle: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Vision Statement</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                value={aboutContent.visionTitle}
                onChange={(e) => setAboutContent({...aboutContent, visionTitle: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Years (e.g. 25+)</label>
                <input 
                  className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                  value={aboutContent.statsYears}
                  onChange={(e) => setAboutContent({...aboutContent, statsYears: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Pilgrims (e.g. 50K+)</label>
                <input 
                  className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                  value={aboutContent.statsPilgrims}
                  onChange={(e) => setAboutContent({...aboutContent, statsPilgrims: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Destinations</label>
                <input 
                  className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                  value={aboutContent.statsDestinations}
                  onChange={(e) => setAboutContent({...aboutContent, statsDestinations: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Rating</label>
                <input 
                  className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                  value={aboutContent.statsRating}
                  onChange={(e) => setAboutContent({...aboutContent, statsRating: e.target.value})}
                />
              </div>
            </div>
            <button 
              onClick={() => saveContent('about', aboutContent)}
              className="bg-[#001c1d] text-white px-8 py-3 rounded-lg font-bold text-sm hover:brightness-110 transition-all"
            >
              {saving ? 'Saving...' : 'Save About Page Content'}
            </button>
          </div>
        </div>
      )}

      {/* Flights Page Content */}
      {activeContentTab === 'flights' && (
        <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow">
          <h3 className="font-notoSerif text-xl font-bold mb-6">Flights Page Content</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Hero Title</label>
                <input className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm" value={flightsContent.heroTitle} onChange={(e) => setFlightsContent({...flightsContent, heroTitle: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Hero Subtitle</label>
                <input className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm" value={flightsContent.heroSubtitle} onChange={(e) => setFlightsContent({...flightsContent, heroSubtitle: e.target.value})} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Adventure Title</label>
                <input className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm" value={flightsContent.adventureTitle} onChange={(e) => setFlightsContent({...flightsContent, adventureTitle: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Adventure Subtitle</label>
                <textarea className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm" rows={2} value={flightsContent.adventureSubtitle} onChange={(e) => setFlightsContent({...flightsContent, adventureSubtitle: e.target.value})} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Trust Title</label>
                <input className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm" value={flightsContent.trustTitle} onChange={(e) => setFlightsContent({...flightsContent, trustTitle: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Trust Subtitle</label>
                <textarea className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm" rows={2} value={flightsContent.trustSubtitle} onChange={(e) => setFlightsContent({...flightsContent, trustSubtitle: e.target.value})} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Destinations Title</label>
                <input className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm" value={flightsContent.destinationsTitle} onChange={(e) => setFlightsContent({...flightsContent, destinationsTitle: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Destinations Subtitle</label>
                <input className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm" value={flightsContent.destinationsSubtitle} onChange={(e) => setFlightsContent({...flightsContent, destinationsSubtitle: e.target.value})} />
              </div>
            </div>
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-widest text-outline">Service Features (Why Choose Us)</label>
              {[1, 2, 3, 4, 5].map(i => (
                <input key={i} className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 px-4 rounded-lg text-sm" value={flightsContent[`feature${i}`]} onChange={(e) => setFlightsContent({...flightsContent, [`feature${i}`]: e.target.value})} placeholder={`Feature ${i}`} />
              ))}
            </div>
            <button 
              onClick={() => saveContent('flights', flightsContent)}
              className="bg-[#001c1d] text-white px-8 py-3 rounded-lg font-bold text-sm hover:brightness-110 transition-all"
            >
              {saving ? 'Saving...' : 'Save Flights Page Content'}
            </button>
          </div>
        </div>
      )}

      {/* Contact Page Content */}
      {activeContentTab === 'contact' && (
        <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow">
          <h3 className="font-notoSerif text-xl font-bold mb-6">Contact Page Content</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Phone Number 1</label>
                <input 
                  className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                  value={contactContent.phone1}
                  onChange={(e) => setContactContent({...contactContent, phone1: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Phone Number 2</label>
                <input 
                  className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                  value={contactContent.phone2}
                  onChange={(e) => setContactContent({...contactContent, phone2: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Email Address</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                value={contactContent.email}
                onChange={(e) => setContactContent({...contactContent, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">WhatsApp Number</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                value={contactContent.whatsapp}
                onChange={(e) => setContactContent({...contactContent, whatsapp: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Lahore Address</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                value={contactContent.addressLahore}
                onChange={(e) => setContactContent({...contactContent, addressLahore: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Karachi Address</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                value={contactContent.addressKarachi}
                onChange={(e) => setContactContent({...contactContent, addressKarachi: e.target.value})}
              />
            </div>
            <button 
              onClick={() => saveContent('contact', contactContent)}
              className="bg-[#001c1d] text-white px-8 py-3 rounded-lg font-bold text-sm hover:brightness-110 transition-all"
            >
              {saving ? 'Saving...' : 'Save Contact Content'}
            </button>
          </div>
        </div>
      )}

      {/* FAQ Management */}
      {activeContentTab === 'faq' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-notoSerif text-xl font-bold">Frequently Asked Questions</h3>
            <button 
              onClick={addFaq}
              className="bg-[#001c1d] text-white px-6 py-2 rounded-lg font-bold text-sm hover:brightness-110 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Add FAQ
            </button>
          </div>
          <div className="space-y-4">
            {faqContent.map((faq, index) => (
              <div key={faq.id} className="bg-surface-container-lowest p-6 rounded-xl editorial-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-[#001c1d] uppercase">FAQ #{index + 1}</span>
                  <div className="flex items-center gap-2">
                    <select 
                      value={faq.category}
                      onChange={(e) => updateFaq(faq.id, 'category', e.target.value)}
                      className="text-xs bg-surface border border-outline-variant px-3 py-1 rounded"
                    >
                      <option>General</option>
                      <option>Visa</option>
                      <option>Booking</option>
                      <option>Packages</option>
                      <option>Customization</option>
                      <option>Services</option>
                    </select>
                    <button 
                      onClick={() => deleteFaq(faq.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Question</label>
                    <input 
                      className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 px-3 rounded-lg text-sm"
                      value={faq.question}
                      onChange={(e) => updateFaq(faq.id, 'question', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Answer</label>
                    <textarea 
                      className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-2 px-3 rounded-lg text-sm"
                      rows={3}
                      value={faq.answer}
                      onChange={(e) => updateFaq(faq.id, 'answer', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => saveContent('faq', faqContent)}
            className="bg-[#001c1d] text-white px-8 py-3 rounded-lg font-bold text-sm hover:brightness-110 transition-all mt-6"
          >
            {saving ? 'Saving...' : 'Save All FAQs'}
          </button>
        </div>
      )}

      {/* Footer Content */}
      {activeContentTab === 'footer' && (
        <div className="space-y-6">
          {/* Footer Media */}
          <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow">
            <h3 className="font-notoSerif text-xl font-bold mb-6">Footer Media</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Footer Logo</label>
                <MediaUpload
                  value={footerContent.logo || ''}
                  onChange={(val) => setFooterContent({...footerContent, logo: val})}
                  label="Logo"
                  type="image"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Background Image</label>
                <MediaUpload
                  value={footerContent.bgImage || ''}
                  onChange={(val) => setFooterContent({...footerContent, bgImage: val})}
                  label="Background"
                  type="image"
                />
              </div>
            </div>
          </div>

          {/* Footer Text Content */}
          <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow">
            <h3 className="font-notoSerif text-xl font-bold mb-6">Footer Text Content</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Company Description</label>
                <textarea 
                  className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                  rows={3}
                  value={footerContent.description}
                  onChange={(e) => setFooterContent({...footerContent, description: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Copyright Text</label>
                <input 
                  className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                  value={footerContent.copyright}
                  onChange={(e) => setFooterContent({...footerContent, copyright: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Quick Links (comma separated)</label>
                <input 
                  className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                  value={footerContent.quickLinks.join(', ')}
                  onChange={(e) => setFooterContent({...footerContent, quickLinks: e.target.value.split(',').map(s => s.trim())})}
                />
              </div>
              <h4 className="font-bold text-sm mt-6">Social Media Links</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Facebook URL</label>
                  <input 
                    className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                    value={footerContent.socialLinks.facebook}
                    onChange={(e) => setFooterContent({...footerContent, socialLinks: {...footerContent.socialLinks, facebook: e.target.value}})}
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Instagram URL</label>
                  <input 
                    className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                    value={footerContent.socialLinks.instagram}
                    onChange={(e) => setFooterContent({...footerContent, socialLinks: {...footerContent.socialLinks, instagram: e.target.value}})}
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Twitter/X URL</label>
                  <input 
                    className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                    value={footerContent.socialLinks.twitter}
                    onChange={(e) => setFooterContent({...footerContent, socialLinks: {...footerContent.socialLinks, twitter: e.target.value}})}
                    placeholder="https://twitter.com/..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">YouTube URL</label>
                  <input 
                    className="w-full bg-surface border border-outline-variant focus:border-[#001c1d] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                    value={footerContent.socialLinks.youtube}
                    onChange={(e) => setFooterContent({...footerContent, socialLinks: {...footerContent.socialLinks, youtube: e.target.value}})}
                    placeholder="https://youtube.com/..."
                  />
                </div>
              </div>
              <button 
                onClick={() => saveContent('footer', footerContent)}
                className="bg-[#001c1d] text-white px-8 py-3 rounded-lg font-bold text-sm hover:brightness-110 transition-all"
              >
                {saving ? 'Saving...' : 'Save Footer Content'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Images & Videos Media Manager */}
      {activeContentTab === 'media' && (
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-notoSerif text-3xl font-bold text-primary">Images & Videos Manager</h2>
            <button 
              onClick={() => saveContent('media', mediaContent)}
              disabled={saving}
              className="bg-[#001c1d] text-white px-8 py-3 rounded-lg font-bold text-sm hover:brightness-110 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined">{saving ? 'hourglass_empty' : 'save'}</span>
              {saving ? 'Saving...' : 'Save All Media'}
            </button>
          </div>
          
          <p className="text-on-surface-variant mb-8">Upload and manage images and videos for all pages. Choose between Photo or Video for each item.</p>

          {/* Homepage Media */}
          <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow mb-8">
            <h3 className="font-notoSerif text-xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#001c1d]">home</span>
              Homepage Media
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Hero Background Image</label>
                <MediaUpload
                  value={mediaContent.homeHeroImage || ''}
                  onChange={(val) => setMediaContent({...mediaContent, homeHeroImage: val})}
                  label="Hero Image"
                  type="image"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Hero Background Video (Optional)</label>
                <MediaUpload
                  value={mediaContent.homeHeroVideo || ''}
                  onChange={(val) => setMediaContent({...mediaContent, homeHeroVideo: val})}
                  label="Hero Video"
                  type="video"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Why Choose Us Background</label>
                <MediaUpload
                  value={mediaContent.homeWhyChooseBg || ''}
                  onChange={(val) => setMediaContent({...mediaContent, homeWhyChooseBg: val})}
                  label="Background"
                  type="image"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Featured Section Background</label>
                <MediaUpload
                  value={mediaContent.homeFeaturedBg || ''}
                  onChange={(val) => setMediaContent({...mediaContent, homeFeaturedBg: val})}
                  label="Background"
                  type="image"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Testimonials Background</label>
                <MediaUpload
                  value={mediaContent.homeTestimonialsBg || ''}
                  onChange={(val) => setMediaContent({...mediaContent, homeTestimonialsBg: val})}
                  label="Background"
                  type="image"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">CTA Section Background</label>
                <MediaUpload
                  value={mediaContent.homeCtaBg || ''}
                  onChange={(val) => setMediaContent({...mediaContent, homeCtaBg: val})}
                  label="Background"
                  type="image"
                />
              </div>
            </div>
          </div>

          {/* About Page Media */}
          <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow mb-8">
            <h3 className="font-notoSerif text-xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#013334]">info</span>
              About Page Media
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Hero Image</label>
                <MediaUpload
                  value={mediaContent.aboutHeroImage || ''}
                  onChange={(val) => setMediaContent({...mediaContent, aboutHeroImage: val})}
                  label="Hero Image"
                  type="image"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Story Section Image</label>
                <MediaUpload
                  value={mediaContent.aboutStoryImage || ''}
                  onChange={(val) => setMediaContent({...mediaContent, aboutStoryImage: val})}
                  label="Story Image"
                  type="image"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Promotional Video</label>
                <MediaUpload
                  value={mediaContent.aboutVideo || ''}
                  onChange={(val) => setMediaContent({...mediaContent, aboutVideo: val})}
                  label="Video"
                  type="video"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Stats Section Background</label>
                <MediaUpload
                  value={mediaContent.aboutStatsBg || ''}
                  onChange={(val) => setMediaContent({...mediaContent, aboutStatsBg: val})}
                  label="Background"
                  type="image"
                />
              </div>
            </div>
          </div>

          {/* Contact Page Media */}
          <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow mb-8">
            <h3 className="font-notoSerif text-xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#013334]">contact_phone</span>
              Contact Page Media
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Hero Image</label>
                <MediaUpload
                  value={mediaContent.contactHeroImage || ''}
                  onChange={(val) => setMediaContent({...mediaContent, contactHeroImage: val})}
                  label="Hero Image"
                  type="image"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Map/Location Image</label>
                <MediaUpload
                  value={mediaContent.contactMapImage || ''}
                  onChange={(val) => setMediaContent({...mediaContent, contactMapImage: val})}
                  label="Map Image"
                  type="image"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">CTA Background</label>
                <MediaUpload
                  value={mediaContent.contactCtaBg || ''}
                  onChange={(val) => setMediaContent({...mediaContent, contactCtaBg: val})}
                  label="Background"
                  type="image"
                />
              </div>
            </div>
          </div>

          {/* Umrah Packages Page Media */}
          <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow mb-8">
            <h3 className="font-notoSerif text-xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#013334]">mosque</span>
              Umrah Packages Page Media
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Hero Image</label>
                <MediaUpload
                  value={mediaContent.packagesHeroImage || ''}
                  onChange={(val) => setMediaContent({...mediaContent, packagesHeroImage: val})}
                  label="Hero Image"
                  type="image"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Umrah Promotional Video</label>
                <MediaUpload
                  value={mediaContent.packagesVideo || ''}
                  onChange={(val) => setMediaContent({...mediaContent, packagesVideo: val})}
                  label="Video"
                  type="video"
                />
              </div>
            </div>
          </div>

          {/* International Tours Page Media */}
          <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow mb-8">
            <h3 className="font-notoSerif text-xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#013334]">flight</span>
              International Tours Page Media
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Hero Image</label>
                <MediaUpload
                  value={mediaContent.toursHeroImage || ''}
                  onChange={(val) => setMediaContent({...mediaContent, toursHeroImage: val})}
                  label="Hero Image"
                  type="image"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Promotional Video</label>
                <MediaUpload
                  value={mediaContent.toursVideo || ''}
                  onChange={(val) => setMediaContent({...mediaContent, toursVideo: val})}
                  label="Video"
                  type="video"
                />
              </div>
            </div>
          </div>

          {/* Visa Services Page Media */}
          <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow mb-8">
            <h3 className="font-notoSerif text-xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#013334]">description</span>
              Visa Services Page Media
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Hero Image</label>
                <MediaUpload
                  value={mediaContent.visaHeroImage || ''}
                  onChange={(val) => setMediaContent({...mediaContent, visaHeroImage: val})}
                  label="Hero Image"
                  type="image"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Background Image</label>
                <MediaUpload
                  value={mediaContent.visaBgImage || ''}
                  onChange={(val) => setMediaContent({...mediaContent, visaBgImage: val})}
                  label="Background"
                  type="image"
                />
              </div>
            </div>
          </div>

          {/* Gallery Page Media */}
          <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow mb-8">
            <h3 className="font-notoSerif text-xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#013334]">photo_library</span>
              Gallery Page Media
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Hero Image</label>
                <MediaUpload
                  value={mediaContent.galleryHeroImage || ''}
                  onChange={(val) => setMediaContent({...mediaContent, galleryHeroImage: val})}
                  label="Hero Image"
                  type="image"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Banner Image</label>
                <MediaUpload
                  value={mediaContent.galleryBanner || ''}
                  onChange={(val) => setMediaContent({...mediaContent, galleryBanner: val})}
                  label="Banner"
                  type="image"
                />
              </div>
            </div>
          </div>

          {/* FAQ Page Media */}
          <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow mb-8">
            <h3 className="font-notoSerif text-xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#013334]">quiz</span>
              FAQ Page Media
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Hero Image</label>
                <MediaUpload
                  value={mediaContent.faqHeroImage || ''}
                  onChange={(val) => setMediaContent({...mediaContent, faqHeroImage: val})}
                  label="Hero Image"
                  type="image"
                />
              </div>
            </div>
          </div>

          {/* Blog Page Media */}
          <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow mb-8">
            <h3 className="font-notoSerif text-xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#013334]">article</span>
              Blog Page Media
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Hero Image</label>
                <MediaUpload
                  value={mediaContent.blogHeroImage || ''}
                  onChange={(val) => setMediaContent({...mediaContent, blogHeroImage: val})}
                  label="Hero Image"
                  type="image"
                />
              </div>
            </div>
          </div>

          {/* Navbar & Misc Media */}
          <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow">
            <h3 className="font-notoSerif text-xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#013334]">settings</span>
              Navigation & Misc Media
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Navbar Logo</label>
                <MediaUpload
                  value={mediaContent.navbarLogo || ''}
                  onChange={(val) => setMediaContent({...mediaContent, navbarLogo: val})}
                  label="Logo"
                  type="image"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Favicon/Icon</label>
                <MediaUpload
                  value={mediaContent.favicon || ''}
                  onChange={(val) => setMediaContent({...mediaContent, favicon: val})}
                  label="Favicon"
                  type="image"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">WhatsApp FAB Icon</label>
                <MediaUpload
                  value={mediaContent.whatsappIcon || ''}
                  onChange={(val) => setMediaContent({...mediaContent, whatsappIcon: val})}
                  label="Icon"
                  type="image"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Site Settings Component
const SiteSettings = () => {
  const [saving, setSaving] = useState(false)
  const authHdr = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` })
  
  const [settings, setSettings] = useState({
    siteName: 'Habib Ul Hujjaj',
    tagline: 'Your Trusted Partner for Umrah & International Tours',
    email: 'info@habibulhujaj.com',
    phone: '+92 300 123 4567',
    whatsapp: '+92 300 123 4567',
    address: 'Main Boulevard, Gulberg III, Lahore, Pakistan',
    workingHours: 'Mon - Sat: 9:00 AM - 8:00 PM',
    metaTitle: 'Habib Ul Hujjaj - Your Trusted Partner for Umrah & International Tours',
    metaDescription: 'Experience premium Umrah packages and international tours with Habib Ul Hujjaj. Approved by Ministry of Hajj & Umrah.',
    metaKeywords: 'umrah, packages, makkah, madinah, hajj, travel, tours, pakistan',
  })

  useEffect(() => {
    try {
      if (localStorage.getItem('site_settings')) setSettings(JSON.parse(localStorage.getItem('site_settings')))
    } catch (e) {}
    axios.get(`${API_BASE}/api/cms?id=site_settings`)
      .then(res => {
        if (res.data && Object.keys(res.data).length > 0) {
          setSettings(prev => ({...prev, ...res.data}));
          localStorage.setItem('site_settings', JSON.stringify(res.data));
        }
      }).catch(err => console.error("Settings load error:", err));
  }, [])

  const saveSettings = async () => {
    setSaving(true)
    try {
      localStorage.setItem('site_settings', JSON.stringify(settings))
      await axios.post(`${API_BASE}/api/cms?id=site_settings`, settings, { headers: authHdr() })
      alert('Settings saved successfully!')
    } catch (err) {
      alert('Failed to save settings: ' + (err.response?.data?.error || err.message))
    }
    setSaving(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-notoSerif text-3xl font-bold text-primary">Site Settings</h2>
        <button 
          onClick={saveSettings}
          disabled={saving}
          className="bg-[#013334] text-white px-8 py-3 rounded-lg font-bold text-sm hover:brightness-110 transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined">{saving ? 'hourglass_empty' : 'save'}</span>
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
      
      <div className="space-y-8">
        {/* General Settings */}
        <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow">
          <h3 className="font-notoSerif text-xl font-bold mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-[#013334]">settings</span>
            General Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Site Name</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#013334] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                value={settings.siteName}
                onChange={(e) => setSettings({...settings, siteName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Tagline</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#013334] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                value={settings.tagline}
                onChange={(e) => setSettings({...settings, tagline: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow">
          <h3 className="font-notoSerif text-xl font-bold mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-[#013334]">contact_phone</span>
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Primary Email</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#013334] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({...settings, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Phone Number</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#013334] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                value={settings.phone}
                onChange={(e) => setSettings({...settings, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">WhatsApp Number</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#013334] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                value={settings.whatsapp}
                onChange={(e) => setSettings({...settings, whatsapp: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Working Hours</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#013334] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                value={settings.workingHours}
                onChange={(e) => setSettings({...settings, workingHours: e.target.value})}
              />
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Address</label>
            <input 
              className="w-full bg-surface border border-outline-variant focus:border-[#013334] focus:ring-0 py-3 px-4 rounded-lg text-sm"
              value={settings.address}
              onChange={(e) => setSettings({...settings, address: e.target.value})}
            />
          </div>
        </div>

        {/* SEO Settings */}
        <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow">
          <h3 className="font-notoSerif text-xl font-bold mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-[#013334]">search</span>
            SEO Settings
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Meta Title</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#013334] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                value={settings.metaTitle}
                onChange={(e) => setSettings({...settings, metaTitle: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Meta Description</label>
              <textarea 
                className="w-full bg-surface border border-outline-variant focus:border-[#013334] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                rows={3}
                value={settings.metaDescription}
                onChange={(e) => setSettings({...settings, metaDescription: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Meta Keywords</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#013334] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                value={settings.metaKeywords}
                onChange={(e) => setSettings({...settings, metaKeywords: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-[#013334]/10 border border-[#013334]/30 p-6 rounded-xl">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[#013334]">info</span>
            <div>
              <h4 className="font-bold text-sm mb-1">About Settings</h4>
              <p className="text-xs text-on-surface-variant">
                Settings are saved locally in your browser. For production use with a database, 
                these values can be connected to Supabase or another backend service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard