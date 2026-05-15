import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || ''

const staticPackages = [
  {
    id: 1,
    title: 'Premium 5-Star Executive',
    location: 'Pullman ZamZam (150m from Haram)',
    price: 485000,
    days: '15 Days',
    airline: 'Qatar Airways',
    badge: 'Best Seller',
    badgeColor: 'bg-[#CD9933]',
    image: 'https://images.unsplash.com/photo-1572949645079-6416a599c6ae?w=800',
  },
  {
    id: 2,
    title: 'Silver 4-Star Comfort',
    location: 'Al-Shohada Hotel (300m from Haram)',
    price: 325000,
    days: '10 Days',
    airline: 'Saudi Airlines',
    badge: 'Popular Choice',
    badgeColor: 'bg-[#013334]',
    image: 'https://images.unsplash.com/photo-1564769662533-3f5aae93cec2?w=800',
  },
  {
    id: 3,
    title: 'Spiritual Ramadan 2024',
    location: 'Full Ramadan in Makkah & Madinah',
    price: 750000,
    days: '30 Days',
    airline: 'Full Iftar/Suhur',
    badge: 'Limited',
    badgeColor: 'bg-[#CD9933]',
    image: 'https://images.unslash.com/photo-1580338834642-8a3acf79b1b8?w=800',
  },
  {
    id: 4,
    title: 'Habibulhujaj Suites Collection',
    location: 'Raffles Makkah (Inside Clock Tower)',
    price: 980000,
    days: '07 Days',
    airline: 'Private GMC Transfer',
    badge: 'Gold Standard',
    badgeColor: 'bg-[#CD9933]',
    image: 'https://images.unsplash.com/photo-1596435688717-2d2f3b0fc47a?w=800',
  }
]

const Packages = () => {
  const [packages, setPackages] = useState(staticPackages)
  const [pageMedia, setPageMedia] = useState({})

  useEffect(() => {
    axios.get(`${API_BASE}/api/packages`)
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setPackages(res.data)
        }
      })
      .catch((err) => {
        console.error('Failed to fetch packages:', err)
      })

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
  }, [])

  return (
    <div className="bg-surface font-manrope text-on-surface">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" src={pageMedia.packages_hero_image || "https://images.unsplash.com/photo-1572949645079-6416a599c6ae?w=1600"} alt="Makkah" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-24 w-full">
          <div className="max-w-3xl">
            <div className="w-12 h-1 bg-[#CD9933] mb-6 md:mb-8"></div>
            <h1 className="font-notoSerif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Curated <span className="text-[#CD9933]">Umrah Packages</span>
            </h1>
            <p className="font-manrope text-base md:text-lg text-white/80 max-w-xl mb-8">
              Embark on a spiritual journey of a lifetime with our meticulously curated pilgrimage experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
          {/* Filter Sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-surface-container-lowest p-4 md:p-6 lg:p-8 editorial-shadow lg:sticky lg:top-24">
              <h2 className="font-notoSerif text-xl text-primary mb-8 border-b border-outline-variant/30 pb-4">Categories</h2>
              <nav className="space-y-6">
                {[
                  { label: 'Economy', checked: false },
                  { label: '3 Star Packages', checked: false },
                  { label: '4 Star Luxury', checked: false },
                  { label: '5 Star Premium', checked: true },
                  { label: 'Ramadan 2024', checked: false },
                  { label: 'December Specials', checked: false },
                ].map((cat, i) => (
                  <label key={i} className="flex items-center group cursor-pointer">
                    <input defaultChecked={cat.checked} className="rounded border-outline-variant text-[#CD9933] focus:ring-[#CD9933] w-5 h-5" type="checkbox" />
                    <span className={`ml-4 font-manrope transition-colors ${cat.checked ? 'text-[#CD9933] font-bold' : 'text-on-surface group-hover:text-[#CD9933]'}`}>{cat.label}</span>
                  </label>
                ))}
              </nav>
              <div className="mt-12">
                <div className="p-6 bg-[#013334] rounded-lg text-white">
                  <p className="font-notoSerif text-lg mb-2">Need Guidance?</p>
                  <p className="text-sm opacity-70 mb-4">Our travel experts are available 24/7 for consultation.</p>
                  <Link to="/contact" className="block w-full py-3 bg-[#CD9933] text-white font-bold rounded hover:brightness-110 transition-colors text-sm text-center">Enquire Now</Link>
                </div>
              </div>
            </div>
          </aside>

          {/* Package Grid */}
          <section className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              {(packages.length > 0 ? packages : staticPackages).map((pkg, i) => {
                const staticPkg = staticPackages[i % staticPackages.length]
                const image = pkg.image_url || pkg.image || staticPkg?.image
                const badge = pkg.badge || staticPkg?.badge || ''
                const badgeColor = pkg.badgeColor || staticPkg?.badgeColor || 'bg-[#CD9933]'
                const days = pkg.days || pkg.duration || staticPkg?.days || '15 Days'
                const airline = pkg.airline || pkg.airline || staticPkg?.airline || 'Qatar Airways'
                const price = typeof pkg.price === 'number' ? pkg.price : (parseFloat(String(pkg.price).replace(/[^0-9.]/g, '')) || 0)

                return (
                  <div key={pkg.id || i} className="bg-surface-container-lowest editorial-shadow overflow-hidden flex flex-col group cursor-pointer transition-transform hover:-translate-y-1">
                    <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden">
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 asymmetric-clip" src={image} alt={pkg.title || pkg.name} />
                      {badge && (
                        <div className={`absolute top-4 left-4 ${badgeColor} text-white px-4 py-1 text-xs font-bold uppercase tracking-widest rounded`}>{badge}</div>
                      )}
                    </div>
                    <div className="p-4 md:p-6 lg:p-8 flex-1 flex flex-col">
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-4">
                        <div>
                          <h3 className="font-notoSerif text-2xl text-primary font-bold">{pkg.title || pkg.name}</h3>
                          <div className="flex items-center mt-1 text-on-surface-variant text-sm">
                            <span className="material-symbols-outlined text-sm mr-2">location_on</span>
                            <span>{pkg.location || pkg.hotel || 'Makkah & Madinah'}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-on-surface-variant uppercase font-bold tracking-tighter">Starting from</div>
                          <div className="text-2xl font-notoSerif font-bold text-[#CD9933]">PKR {price > 0 ? price.toLocaleString() : 'N/A'}</div>
                        </div>
                      </div>
                      <div className="flex gap-4 mb-8 flex-wrap">
                        <div className="bg-surface-container flex items-center px-3 py-1 rounded text-xs font-medium">
                          <span className="material-symbols-outlined text-sm mr-2">calendar_today</span>{days}
                        </div>
                        <div className="bg-surface-container flex items-center px-3 py-1 rounded text-xs font-medium">
                          <span className="material-symbols-outlined text-sm mr-2">flight</span>{airline}
                        </div>
                      </div>
                      <div className="mt-auto grid grid-cols-2 gap-4">
                        <Link to={`/package/${pkg.id || pkg._id || i + 1}`} className="py-3 bg-[#CD9933]/10 text-[#CD9933] font-bold rounded-md hover:bg-[#CD9933]/20 transition-colors border border-[#CD9933]/20 text-sm text-center">View Details</Link>
                        <Link to="/contact" className="py-3 bg-[#013334] text-white font-bold rounded-md hover:bg-[#002c2e] transition-colors text-sm text-center">Book Now</Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      </main>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary-container relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1465378977933-3f5aae93cec2?w=800" alt="Pattern" />
        </div>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 text-center">
          <h6 className="font-manrope text-[#CD9933] font-bold text-sm tracking-[0.2em] uppercase mb-4">Ready to Begin?</h6>
          <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Book Your Umrah Journey Today</h2>
          <p className="text-white/60 mb-10 max-w-xl mx-auto">Contact our travel experts to get a personalized quote and start your spiritual journey.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-[#CD9933] text-white px-10 py-4 font-manrope font-bold tracking-widest uppercase text-sm hover:brightness-110 transition-all">Get a Quote</Link>
            <Link to="/international-tours" className="border border-white/30 text-white px-10 py-4 font-manrope font-bold tracking-widest uppercase text-sm hover:bg-white/10 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined">flight</span>
              Explore Tours
            </Link>
          </div>
        </div>
      </section>

      {/* WhatsApp FAB */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[9999] group">
        <div className="flex flex-col items-center gap-2">
          <span className="bg-white/80 backdrop-blur-md text-[#CD9933] font-manrope font-bold text-[10px] uppercase px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">WhatsApp Support</span>
          <div className="bg-white/80 backdrop-blur-md text-[#CD9933] rounded-full p-3 md:p-4 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shadow-2xl shadow-[#013334]/20 border border-[#CD9933]/15 animate-bounce cursor-pointer hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-2xl md:text-3xl">chat</span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Packages