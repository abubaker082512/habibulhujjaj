import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || ''

const staticPackages = [
  {
    id: 1,
    title: 'Economy Saver',
    location: 'Saraya Iman (Makkah)',
    price: 185000,
    days: '15 Days',
    badge: 'Economy',
    badgeColor: 'bg-[#013334]',
    image: 'https://images.unsplash.com/photo-1591604129909-2b4ce4e6e6d2?w=800&q=80'
  },
  {
    id: 2,
    title: '3 Star Comfort',
    location: 'Dar Al Eiman Grand',
    price: 245000,
    days: '15 Days',
    badge: '3 Star',
    badgeColor: 'bg-[#013334]',
    image: 'https://images.unsplash.com/photo-1564769662533-3f5aae93cec2?w=800&q=80'
  },
  {
    id: 3,
    title: '4 Star Premium',
    location: 'Swissotel Makkah',
    price: 320000,
    days: '10 Days',
    badge: '4 Star',
    badgeColor: 'bg-primary',
    image: 'https://images.unsplash.com/photo-1580338834642-8a3acf79b1b8?w=800&q=80'
  },
  {
    id: 4,
    title: '5 Star Executive',
    location: 'Fairmont Clock Tower',
    price: 450000,
    days: '7 Days',
    badge: 'Luxury',
    badgeColor: 'bg-[#013334]',
    image: 'https://images.unsplash.com/photo-1596435688717-2d2f3b0fc47a?w=800&q=80'
  }
]

const Home = () => {
  const [packages, setPackages] = useState([])
  const [cmsContent, setCmsContent] = useState({
    heroTitle: 'Proudly serving the guest of Allah',
    heroSubtitle: 'We provide reliable, comfortable, and affordable Umrah services with complete guidance—so you can focus on your عبادت while we take care of the rest.',
    heroCta: 'View Umrah Packages',
    heroWhatsApp: 'Contact on WhatsApp'
  })
  const [pageMedia, setPageMedia] = useState({})

  useEffect(() => {
    // Fetch packages from backend
    axios.get(`${API_BASE}/api/packages`)
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setPackages(res.data)
        } else {
          setPackages(staticPackages)
        }
      })
      .catch((err) => {
        console.error('Failed to fetch packages:', err)
        setPackages(staticPackages)
      })

    // Fetch CMS content from API with localStorage fallback
    const savedCms = localStorage.getItem('cms_home')
    if (savedCms) {
      try {
        const parsed = JSON.parse(savedCms)
        if (parsed && Object.keys(parsed).length > 0) {
          setCmsContent(prev => ({ ...prev, ...parsed }))
        }
      } catch (e) {}
    }

    axios.get(`${API_BASE}/api/cms?id=cms_home`)
      .then(res => {
        if (res.data && Object.keys(res.data).length > 0) {
          setCmsContent(prev => ({ ...prev, ...res.data }))
          localStorage.setItem('cms_home', JSON.stringify(res.data))
        }
      })
      .catch(err => console.error('Failed to fetch CMS content:', err))

    // Fetch page_media from API with localStorage fallback
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
      
      {/* SideNavBar (WhatsApp FAB) */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[9999] group">
        <div className="flex flex-col items-center gap-2">
          <span className="bg-white/80 backdrop-blur-md text-[#013334] font-manrope font-bold text-[10px] uppercase px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">WhatsApp Support</span>
          <div className="bg-white/80 dark:bg-black/80 backdrop-blur-md text-[#013334] rounded-full p-3 md:p-4 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shadow-2xl shadow-[#013334]/20 border border-[#013334]/15 animate-bounce duration-[2000ms] cursor-pointer hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-2xl md:text-3xl">chat</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-screen flex items-center pt-20 pb-24 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" src={pageMedia.home_hero_image || "https://images.unsplash.com/photo-1572949645079-6416a599c6ae?w=1600&q=80"} alt="Makkah" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-24 w-full">
          <div className="max-w-3xl">
            <div className="w-12 h-1 bg-[#013334] mb-6 md:mb-8"></div>
            <h1 className="font-notoSerif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-tight mb-6 md:mb-8">
              {cmsContent.heroTitle.includes('Umrah') ? (
                <>
                  {cmsContent.heroTitle.split('Umrah')[0]}
                  <span className="text-primary">Umrah</span>
                  {cmsContent.heroTitle.split('Umrah')[1]}
                </>
              ) : cmsContent.heroTitle}
            </h1>
            <p className="font-manrope text-base md:text-lg text-black/70 mb-8 md:mb-12 max-w-xl">
              {cmsContent.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-3 md:gap-6">
              <Link to="/packages" className="bg-primary hover:opacity-90 text-white px-6 py-3 md:px-8 md:py-4 rounded-md font-bold transition-all shadow-lg flex items-center gap-2">
                {cmsContent.heroCta}
              </Link>
              <button className="bg-transparent border border-primary/40 hover:bg-primary/5 text-black px-6 py-3 md:px-8 md:py-4 rounded-md font-bold transition-all flex items-center gap-2 backdrop-blur-sm">
                <span className="material-symbols-outlined">chat</span>
                {cmsContent.heroWhatsApp}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Package Search */}
      <div className="relative z-20 max-w-6xl mx-auto -mt-12 sm:-mt-16 lg:-mt-24 px-4">
        <div className="bg-surface-container-lowest editorial-shadow p-4 sm:p-6 md:p-8 rounded-xl flex flex-col lg:flex-row gap-4 md:gap-6 items-stretch lg:items-end">
          <div className="flex-1 min-w-0">
            <label className="block font-manrope text-xs font-bold uppercase text-outline mb-2">Departure City</label>
            <select className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-[#013334] font-manrope text-sm py-2 px-0">
              <option>Karachi</option>
              <option>Lahore</option>
              <option>Islamabad</option>
            </select>
          </div>
          <div className="flex-1 min-w-0">
            <label className="block font-manrope text-xs font-bold uppercase text-outline mb-2">Month</label>
            <select className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-[#013334] font-manrope text-sm py-2 px-0">
              <option>September 2024</option>
              <option>October 2024</option>
              <option>Ramadan 2025</option>
            </select>
          </div>
          <div className="flex-1 min-w-0">
            <label className="block font-manrope text-xs font-bold uppercase text-outline mb-2">Package Type</label>
            <select className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-[#013334] font-manrope text-sm py-2 px-0">
              <option>Economy</option>
              <option>3 Star Comfort</option>
              <option>4 Star Premium</option>
              <option>5 Star Luxury</option>
            </select>
          </div>
          <button className="bg-primary text-white w-full lg:w-auto px-10 py-3 rounded-md font-bold flex items-center justify-center gap-2 hover:bg-[#002c2e] transition-all">
            <span className="material-symbols-outlined">search</span>
            Search
          </button>
        </div>
      </div>

      {/* Featured Umrah Packages */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16">
          <div className="max-w-2xl">
            <h6 className="font-manrope text-[#013334] font-bold text-sm tracking-[0.2em] uppercase mb-4">Spiritual Journeys</h6>
            <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight">Curated Umrah Packages</h2>
          </div>
          <Link className="text-primary font-bold border-b-2 border-[#013334] pb-1 mt-6 md:mt-0 transition-all hover:pr-4" to="/packages">View All Packages</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {packages.slice(0, 4).map((pkg, i) => {
            const staticPkg = staticPackages[i % staticPackages.length]
            const image = pkg.image_url || pkg.image || staticPkg.image
            const badge = pkg.category || pkg.badge || staticPkg.badge
            const badgeColor = pkg.badgeColor || staticPkg.badgeColor
            const duration = pkg.duration || pkg.days || staticPkg.days
            const location = pkg.hotel_name || pkg.location || staticPkg.location
            const price = typeof pkg.price === 'number' ? pkg.price : (parseFloat(String(pkg.price).replace(/[^0-9.]/g, '')) || staticPkg.price)
            
            return (
              <Link to={`/package/${pkg.id || pkg._id || staticPkg.id}`} key={pkg.id || i} className="bg-surface-container-low group cursor-pointer overflow-hidden editorial-shadow transition-transform hover:-translate-y-1 block">
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={image} alt={pkg.title} />
                  <div className={`absolute top-4 left-4 ${badgeColor} text-white text-[10px] font-bold px-3 py-1 tracking-widest uppercase`}>{badge}</div>
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="font-notoSerif text-xl font-bold text-primary mb-2 line-clamp-1">{pkg.title}</h3>
                  <p className="text-outline text-sm mb-4 line-clamp-1">{location} • {duration}</p>
                  <div className="flex items-center justify-between mt-6">
                    <div>
                      <span className="block text-xs text-outline">Starting from</span>
                      <span className="text-xl font-extrabold text-[#013334]">PKR {price.toLocaleString()}</span>
                    </div>
                    <span className="material-symbols-outlined text-[#013334] group-hover:translate-x-2 transition-transform">arrow_forward</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-primary-container relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1564507004663-b6dfb3c8924d?w=1200&q=80" alt="Pattern" />
        </div>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-12">Setting a Sacred Standard for Travel</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="text-[#013334] bg-white/5 w-14 h-14 flex items-center justify-center rounded-lg">
                    <span className="material-symbols-outlined text-3xl">verified_user</span>
                  </div>
                  <h4 className="font-bold text-white font-manrope">Approved Agency</h4>
                  <p className="text-white/60 text-sm leading-relaxed">Fully certified by Ministry of Hajj & Umrah for your peace of mind.</p>
                </div>
                <div className="space-y-4">
                  <div className="text-[#013334] bg-white/5 w-14 h-14 flex items-center justify-center rounded-lg">
                    <span className="material-symbols-outlined text-3xl">location_on</span>
                  </div>
                  <h4 className="font-bold text-white font-manrope">Haram Proximity</h4>
                  <p className="text-white/60 text-sm leading-relaxed">Specially selected hotels within walking distance of the holy sites.</p>
                </div>
                <div className="space-y-4">
                  <div className="text-[#013334] bg-white/5 w-14 h-14 flex items-center justify-center rounded-lg">
                    <span className="material-symbols-outlined text-3xl">support_agent</span>
                  </div>
                  <h4 className="font-bold text-white font-manrope">24/7 Support</h4>
                  <p className="text-white/60 text-sm leading-relaxed">Our dedicated ground staff in Makkah and Medina are always available.</p>
                </div>
                <div className="space-y-4">
                  <div className="text-[#013334] bg-white/5 w-14 h-14 flex items-center justify-center rounded-lg">
                    <span className="material-symbols-outlined text-3xl">groups</span>
                  </div>
                  <h4 className="font-bold text-white font-manrope">Experienced Guides</h4>
                  <p className="text-white/60 text-sm leading-relaxed">Scholarly guides to assist you with religious rituals and Ziarat.</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img className="rounded-xl editorial-shadow w-full h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] object-cover" src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80" alt="Architecture" />
              <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-[#013334] p-6 md:p-10 rounded-xl hidden lg:block">
                <span className="block text-3xl md:text-5xl font-bold text-white mb-2">25+</span>
                <span className="text-white/80 font-bold tracking-widest uppercase text-xs">Years of Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* International Tours */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 max-w-screen-2xl mx-auto overflow-hidden">
        <div className="mb-12 md:mb-16 text-center max-w-2xl mx-auto">
          <h6 className="font-manrope text-[#013334] font-bold text-sm tracking-[0.2em] uppercase mb-4">Beyond Borders</h6>
          <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">Discover the World</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Turkey */}
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[400px] xl:h-[500px] group cursor-pointer overflow-hidden rounded-lg">
            <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80" alt="Turkey" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent"></div>
            <Link to="/international-tours" className="absolute bottom-8 left-8 right-8 text-white group cursor-pointer overflow-hidden rounded-lg block">
              <h3 className="font-notoSerif text-2xl font-bold mb-2">Turkey</h3>
              <p className="text-sm text-white/70 mb-4">Istanbul, Cappadocia, Antalya</p>
              <span className="inline-block border border-white/30 px-4 py-2 text-xs font-bold uppercase tracking-widest group-hover:bg-[#013334] group-hover:border-[#013334] transition-all">Explore Tour</span>
            </Link>
          </div>
          {/* Dubai */}
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[400px] xl:h-[500px] group cursor-pointer overflow-hidden rounded-lg">
            <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80" alt="Dubai" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent"></div>
            <Link to="/international-tours" className="absolute bottom-8 left-8 right-8 text-white">
              <h3 className="font-notoSerif text-2xl font-bold mb-2">Dubai</h3>
              <p className="text-sm text-white/70 mb-4">City Sights & Desert Safari</p>
              <span className="inline-block border border-white/30 px-4 py-2 text-xs font-bold uppercase tracking-widest">Explore Tour</span>
            </Link>
          </div>
          {/* Malaysia */}
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[400px] xl:h-[500px] group cursor-pointer overflow-hidden rounded-lg">
            <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" src="https://images.unsplash.com/photo-1596422748573-cbb5bf090104?w=800&q=80" alt="Malaysia" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent"></div>
            <Link to="/international-tours" className="absolute bottom-8 left-8 right-8 text-white">
              <h3 className="font-notoSerif text-2xl font-bold mb-2">Malaysia</h3>
              <p className="text-sm text-white/70 mb-4">Kuala Lumpur & Genting</p>
              <span className="inline-block border border-white/30 px-4 py-2 text-xs font-bold uppercase tracking-widest">Explore Tour</span>
            </Link>
          </div>
          {/* Europe */}
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[400px] xl:h-[500px] group cursor-pointer overflow-hidden rounded-lg">
            <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" src="https://images.unsplash.com/photo-1502602892935-72c3ac7c352?w=800&q=80" alt="Europe" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent"></div>
            <Link to="/international-tours" className="absolute bottom-8 left-8 right-8 text-white">
              <h3 className="font-notoSerif text-2xl font-bold mb-2">Europe</h3>
              <p className="text-sm text-white/70 mb-4">Paris, Swiss, Rome</p>
              <span className="inline-block border border-white/30 px-4 py-2 text-xs font-bold uppercase tracking-widest">Explore Tour</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-surface-container-high px-4 sm:px-6 md:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h6 className="font-manrope text-[#013334] font-bold text-sm tracking-[0.2em] uppercase mb-4">Client Feedback</h6>
            <h2 className="font-notoSerif text-3xl sm:text-4xl font-bold text-primary">Voices of Gratitude</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-surface-container-lowest p-4 md:p-8 rounded-xl editorial-shadow">
              <div className="flex gap-1 text-[#013334] mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="italic text-primary mb-8 leading-relaxed font-manrope">"Our Umrah journey with Habib Ul Hujjaj was flawless. From the visa process to the hotels being so close to the Haram, everything was perfectly managed. May Allah reward them."</p>
              <div className="flex items-center gap-4">
                <img className="w-12 h-12 rounded-full object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="Customer" />
                <div>
                  <span className="block font-bold text-primary">Ahmed Raza</span>
                  <span className="text-xs text-outline uppercase">Karachi</span>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-4 md:p-8 rounded-xl editorial-shadow">
              <div className="flex gap-1 text-[#013334] mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="italic text-primary mb-8 leading-relaxed font-manrope">"I booked the Turkey tour for my family. The guide was incredibly knowledgeable and the itinerary wasn't rushed. A truly premium experience from start to finish."</p>
              <div className="flex items-center gap-4">
                <img className="w-12 h-12 rounded-full object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" alt="Customer" />
                <div>
                  <span className="block font-bold text-primary">Saba Khan</span>
                  <span className="text-xs text-outline uppercase">Lahore</span>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-4 md:p-8 rounded-xl editorial-shadow">
              <div className="flex gap-1 text-[#013334] mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="italic text-primary mb-8 leading-relaxed font-manrope">"The ground staff in Makkah were like family. They helped us with our elderly parents during Tawaaf. I highly recommend Habib Ul Hujjaj for their compassion."</p>
              <div className="flex items-center gap-4">
                <img className="w-12 h-12 rounded-full object-cover" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" alt="Customer" />
                <div>
                  <span className="block font-bold text-primary">Dr. Mohammad Ali</span>
                  <span className="text-xs text-outline uppercase">Islamabad</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto bg-white border-2 border-primary rounded-3xl p-8 md:p-12 lg:p-24 relative overflow-hidden text-center shadow-xl">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1555992457-b8fefdd09069?w=1200&q=80" alt="Silk Pattern" />
          </div>
          <div className="relative z-10">
            <h2 className="font-notoSerif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 md:mb-8">Book Your Umrah Journey Today</h2>
            <p className="text-black/70 text-base md:text-lg mb-8 md:mb-12 max-w-2xl mx-auto">Contact our travel consultants today to get a personalized quote for your spiritual or leisure travel needs.</p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/contact" className="bg-primary text-white px-10 py-4 rounded-md font-bold text-lg hover:scale-105 transition-all">Get a Quote</Link>
              <Link to="/contact" className="bg-transparent text-primary border-2 border-primary px-10 py-4 rounded-md font-bold text-lg hover:bg-primary/5 transition-all">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
