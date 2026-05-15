import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || ''

const galleryItems = [
  { id: 1, type: 'wide', src: 'https://images.unsplash.com/photo-1591604129909-2b4ce4e6e6d2?w=800&q=80', label: 'The Circle of Faith', category: 'Kaaba' },
  { id: 2, type: 'tall', src: 'https://images.unsplash.com/photo-1564507004663-b6dfb3c8924d?w=800&q=80', label: 'Celestial Spires', category: 'Masjid Nabawi' },
  { id: 3, type: 'standard', src: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80', label: 'Sacred Architecture', category: 'Ziyarat' },
  { id: 4, type: 'standard', src: 'https://images.unsplash.com/photo-1572949645079-6416a599c6ae?w=800&q=80', label: 'Pilgrims Path', category: 'Umrah Groups' },
  { id: 5, type: 'tall', src: 'https://images.unsplash.com/photo-1564769662533-3f5aae93cec2?w=800&q=80', label: 'Light & Geometry', category: 'Kaaba' },
  { id: 6, type: 'wide', src: 'https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=800&q=80', label: 'The Path of History', category: 'Ziyarat' },
  { id: 7, type: 'standard', src: 'https://images.unsplash.com/photo-1580338834642-8a3acf79b1b8?w=800&q=80', label: 'Lanterns of Devotion', category: 'Umrah Groups' },
]

const filters = ['All', 'Kaaba', 'Masjid Nabawi', 'Ziyarat', 'Umrah Groups', 'International Tours']

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('All')
  const [pageMedia, setPageMedia] = useState({})
  const [items, setItems] = useState(galleryItems)
  const filtered = activeFilter === 'All' ? items : items.filter(i => i.category === activeFilter)

  useEffect(() => {
    const savedMedia = localStorage.getItem('pageMedia')
    if (savedMedia) {
      try {
        const parsed = JSON.parse(savedMedia)
        if (parsed && Object.keys(parsed).length > 0) {
          setPageMedia(parsed)
        }
      } catch (e) {}
    }
    axios.get(`${API_BASE}/api/cms?id=page_media`)
      .then(res => {
        if (res.data && Object.keys(res.data).length > 0) {
          setPageMedia(res.data)
          localStorage.setItem('pageMedia', JSON.stringify(res.data))
        }
      })
      .catch(err => console.error('Failed to fetch page media:', err))

    // Fetch gallery images from API
    axios.get(`${API_BASE}/api/gallery`)
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setItems(res.data)
        }
      })
      .catch(err => console.error('Failed to fetch gallery:', err))
  }, [])

  return (
    <div className="bg-surface font-manrope text-on-surface min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" src={pageMedia.gallery_hero_image || "https://images.unsplash.com/photo-1572949645079-6416a599c6ae?w=1600&q=80"} alt="Gallery Hero" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-24 w-full">
          <div className="max-w-3xl">
            <div className="w-12 h-1 bg-[#CD9933] mb-6 md:mb-8"></div>
            <h1 className="font-notoSerif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Photo <span className="text-[#CD9933]">Gallery</span>
            </h1>
            <p className="font-manrope text-lg text-white/80 max-w-xl">
              A visual chronicle of spiritual journeys, sacred architecture, and the profound serenity of the Holy Cities.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Filter */}
      <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12">
          <div className="max-w-2xl">
            <h6 className="font-manrope text-[#CD9933] font-bold text-sm tracking-[0.2em] uppercase mb-4">Visual Chronicles</h6>
            <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight">Glimpses of the Divine</h2>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-8 md:mb-12">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 md:px-6 py-2 rounded-full text-sm font-bold transition-all ${activeFilter === f ? 'bg-[#013334] text-white' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Gallery Grid (Bento Style) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100vw - 2rem), 1fr))', gridAutoRows: '200px', gridAutoFlow: 'dense', gap: '1rem' }}>
          {filtered.map(item => (
            <div
              key={item.id}
              className="group relative overflow-hidden cursor-pointer editorial-shadow"
              style={{
                gridRow: item.type === 'tall' ? 'span 2' : 'span 1',
                gridColumn: item.type === 'wide' ? 'span 2' : 'span 1',
              }}
            >
              <img
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                style={{ filter: 'grayscale(20%)' }}
                onMouseEnter={e => e.currentTarget.style.filter = 'grayscale(0%)'}
                onMouseLeave={e => e.currentTarget.style.filter = 'grayscale(20%)'}
                src={item.src}
                alt={item.label}
              />
              <div className="absolute inset-0 bg-primary-container/0 group-hover:bg-primary-container/30 transition-all duration-500"></div>
              {item.label && (
                <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <span className="font-manrope text-[10px] tracking-widest uppercase text-[#CD9933] mb-1 block">{item.category}</span>
                  <h3 className="font-notoSerif text-white text-xl italic">{item.label}</h3>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary-container relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1564507004663-b6dfb3c8924d?w=1200&q=80" alt="Pattern" />
        </div>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 text-center">
          <h6 className="font-manrope text-[#CD9933] font-bold text-sm tracking-[0.2em] uppercase mb-4">Capture Memories</h6>
          <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Experience It Yourself</h2>
          <p className="text-white/60 mb-10 max-w-xl mx-auto">These moments could be yours. Book your Umrah journey or international tour and create your own spiritual memories.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/packages" className="bg-[#CD9933] text-white px-10 py-4 font-manrope font-bold tracking-widest uppercase text-sm hover:brightness-110 transition-all">View Packages</a>
            <a href="/contact" className="border border-white/30 text-white px-10 py-4 font-manrope font-bold tracking-widest uppercase text-sm hover:bg-white/10 transition-all">Contact Us</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Gallery
