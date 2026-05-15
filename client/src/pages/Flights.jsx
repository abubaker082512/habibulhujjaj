import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || ''

const staticDestinations = [
  { id: 1, name: 'London', description: 'Experience the magic of the UK capital.', image_url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80', price_start: 125000 },
  { id: 2, name: 'Paris', description: 'The city of lights and romance.', image_url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80', price_start: 145000 },
  { id: 3, name: 'Dubai', description: 'Luxury and modern architecture in the desert.', image_url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80', price_start: 85000 },
  { id: 4, name: 'Istanbul', description: 'Where East meets West in style.', image_url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80', price_start: 95000 }
]

const Flights = () => {
  const [destinations, setDestinations] = useState([])
  const [cmsContent, setCmsContent] = useState({
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
  const [pageMedia, setPageMedia] = useState({})

  useEffect(() => {
    // Fetch destinations
    axios.get(`${API_BASE}/api/flights`)
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setDestinations(res.data)
        } else {
          setDestinations(staticDestinations)
        }
      })
      .catch(() => setDestinations(staticDestinations))

    // Fetch CMS content
    const savedCms = localStorage.getItem('cms_flights')
    if (savedCms) setCmsContent(prev => ({ ...prev, ...JSON.parse(savedCms) }))

    axios.get(`${API_BASE}/api/cms?id=cms_flights`)
      .then(res => {
        if (res.data && Object.keys(res.data).length > 0) {
          setCmsContent(prev => ({ ...prev, ...res.data }))
          localStorage.setItem('cms_flights', JSON.stringify(res.data))
        }
      })

    // Fetch media
    axios.get(`${API_BASE}/api/cms?id=page_media`)
      .then(res => setPageMedia(res.data || {}))
  }, [])

  return (
    <div className="min-h-screen bg-surface font-inter">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[700px] pt-32 pb-20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={pageMedia.flightsHero || "https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?w=1600&q=80"} 
            className="w-full h-full object-cover brightness-[0.4]" 
            alt="Hero Background"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="font-notoSerif text-4xl md:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl mx-auto drop-shadow-lg">
            {cmsContent.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-light drop-shadow-md">
            {cmsContent.heroSubtitle}
          </p>

          {/* Search Widget */}
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-5xl mx-auto border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="text-left">
                <label className="text-xs font-bold text-[#013334] uppercase mb-2 block">Origin</label>
                <input type="text" placeholder="From where?" className="w-full p-3 bg-surface rounded-lg border border-outline focus:border-[#CD9933] outline-none text-sm" />
              </div>
              <div className="text-left">
                <label className="text-xs font-bold text-[#013334] uppercase mb-2 block">Destination</label>
                <input type="text" placeholder="To where?" className="w-full p-3 bg-surface rounded-lg border border-outline focus:border-[#CD9933] outline-none text-sm" />
              </div>
              <div className="text-left">
                <label className="text-xs font-bold text-[#013334] uppercase mb-2 block">Departure</label>
                <input type="date" className="w-full p-3 bg-surface rounded-lg border border-outline focus:border-[#CD9933] outline-none text-sm" />
              </div>
              <div className="text-left">
                <label className="text-xs font-bold text-[#013334] uppercase mb-2 block">Return</label>
                <input type="date" className="w-full p-3 bg-surface rounded-lg border border-outline focus:border-[#CD9933] outline-none text-sm" />
              </div>
              <div className="flex items-end">
                <button className="w-full bg-[#CD9933] text-white p-3 rounded-lg font-bold hover:brightness-110 transition-all shadow-lg flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">search</span> Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section 1 */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="font-notoSerif text-3xl md:text-4xl font-bold text-[#013334] mb-6">
            YOUR NEXT ADVENTURE <span className="text-[#CD9933]">BEGINS HERE!</span>
          </h2>
          <p className="text-lg text-on-surface-variant leading-relaxed">
            {cmsContent.adventureSubtitle}
          </p>
          <div className="mt-12 h-1 w-24 bg-[#CD9933] mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Narrative Section 2 (Trust) */}
      <section className="py-24 bg-[#013334] text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="font-notoSerif text-3xl md:text-4xl font-bold text-[#CD9933] mb-6">
            TIRED OF OVERPRICED FLIGHTS?
          </h2>
          <p className="text-lg text-white/80 leading-relaxed mb-12">
            {cmsContent.trustSubtitle}
          </p>
          <button className="bg-[#CD9933] text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-xl">
            Book Your Free Consultation
          </button>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-24 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-notoSerif text-4xl font-bold text-[#013334] mb-4">
              {cmsContent.destinationsTitle}
            </h2>
            <p className="text-on-surface-variant">{cmsContent.destinationsSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {destinations.map(dest => (
              <div key={dest.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group">
                <div className="h-64 relative overflow-hidden">
                  <img src={dest.image_url} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" />
                  <div className="absolute top-4 left-4 bg-[#CD9933] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    From Rs {dest.price_start.toLocaleString()}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-notoSerif text-2xl font-bold text-[#013334] mb-2">{dest.name}</h3>
                  <p className="text-on-surface-variant text-sm mb-6 line-clamp-2">{dest.description}</p>
                  <div className="flex gap-3">
                    <button className="flex-1 bg-[#013334] text-white py-2 rounded font-bold text-sm hover:brightness-125 transition-all">Book Now</button>
                    <button className="flex-1 border border-[#013334] text-[#013334] py-2 rounded font-bold text-sm hover:bg-[#013334]/5 transition-all">View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-24 bg-white border-y border-outline-variant">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex items-start gap-6 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#013334] text-[#CD9933] flex items-center justify-center font-notoSerif text-2xl font-bold group-hover:scale-110 transition-all">
                    {i}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#013334] mb-1">{cmsContent[`feature${i}`]}</h4>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80" className="rounded-3xl shadow-2xl" alt="Travel" />
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#CD9933] rounded-3xl -z-10 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Most Popular Places */}
      <section className="py-24 bg-surface overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="font-notoSerif text-4xl font-bold text-center text-[#013334] mb-16">{cmsContent.popularTitle}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2 relative h-[500px] rounded-3xl overflow-hidden group shadow-xl">
              <img src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt="Dubai" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="font-notoSerif text-4xl font-bold mb-2">Dubai</h3>
                <p className="text-white/70">Luxury redefined</p>
              </div>
            </div>
            <div className="relative h-[242px] rounded-3xl overflow-hidden group shadow-lg">
              <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" alt="Paris" />
              <div className="absolute bottom-4 left-4 text-white"><h4 className="font-bold">Paris</h4></div>
            </div>
            <div className="relative h-[242px] rounded-3xl overflow-hidden group shadow-lg">
              <img src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" alt="Istanbul" />
              <div className="absolute bottom-4 left-4 text-white"><h4 className="font-bold">Istanbul</h4></div>
            </div>
            <div className="col-span-2 relative h-[242px] rounded-3xl overflow-hidden group shadow-lg">
              <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" alt="Tokyo" />
              <div className="absolute bottom-4 left-4 text-white"><h4 className="font-bold">Tokyo</h4></div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Flights
