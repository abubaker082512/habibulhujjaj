import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || ''

const tours = [
  {
    id: 1,
    title: 'Turkey Tour',
    subtitle: 'Istanbul, Cappadocia, Antalya',
    duration: '10 Days / 9 Nights',
    price: 'PKR 285,000',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800',
    highlights: ['Blue Mosque', 'Cappadocia', 'Grand Bazaar', 'Pamukkale'],
    icon: 'place'
  },
  {
    id: 2,
    title: 'Dubai Tour',
    subtitle: 'Dubai, Abu Dhabi, Sharjah',
    duration: '7 Days / 6 Nights',
    price: 'PKR 195,000',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    highlights: ['Burj Khalifa', 'Desert Safari', 'Dubai Frame', 'Sheikh Zayed Mosque'],
    icon: 'place'
  },
  {
    id: 3,
    title: 'Malaysia Tour',
    subtitle: 'Kuala Lumpur, Genting, Penang',
    duration: '8 Days / 7 Nights',
    price: 'PKR 175,000',
    image: 'https://images.unsplash.com/photo-1596422748573-cbb5bf090104?w=800',
    highlights: ['Petronas Towers', 'Genting Highlands', 'Batu Caves', 'Gurney Drive'],
    icon: 'place'
  },
  {
    id: 4,
    title: 'Europe Tour',
    subtitle: 'Paris, Swiss, Rome',
    duration: '12 Days / 11 Nights',
    price: 'PKR 550,000',
    image: 'https://images.unslash.com/photo-1502602892935-72c3ac7c352?w=800',
    highlights: ['Eiffel Tower', 'Swiss Alps', 'Colosseum', 'Lucerne'],
    icon: 'place'
  }
]

const InternationalTours = () => {
  const [pageMedia, setPageMedia] = useState({})
  const [tours, setTours] = useState([])

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

    axios.get(`${API_BASE}/api/tours`)
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setTours(res.data)
        }
      })
      .catch(err => console.error('Failed to fetch tours:', err))
  }, [])

  return (
    <div className="bg-surface font-manrope text-on-surface min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" src={pageMedia.tours_hero_image || "https://images.unsplash.com/photo-1530783324-1a1b1b5a51?w=1600"} alt="Tours" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-24 w-full">
          <div className="max-w-3xl">
            <div className="w-12 h-1 bg-[#CD9933] mb-6 md:mb-8"></div>
            <h1 className="font-notoSerif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Discover the <span className="text-[#CD9933]">World</span>
            </h1>
            <p className="font-manrope text-base md:text-lg text-white/80 max-w-xl mb-8">
              Explore the most beautiful destinations with our curated international tour packages.
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4">
              <Link to="/contact" className="bg-[#CD9933] text-white px-6 py-3 md:px-10 md:py-4 font-manrope font-bold tracking-widest text-sm hover:brightness-110 transition-all">
                Get a Quote
              </Link>
              <Link to="/contact" className="bg-white/10 text-white border border-white/20 px-6 py-3 md:px-10 md:py-4 font-manrope font-bold tracking-widest text-sm backdrop-blur-md hover:bg-white/20 transition-all">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 max-w-screen-2xl mx-auto">
        <div className="mb-12 md:mb-16">
          <span className="font-manrope text-[#CD9933] font-bold text-sm tracking-[0.2em] uppercase mb-4 block">Beyond Borders</span>
          <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">Discover Our Tours</h2>
          <div className="w-24 h-1 bg-[#CD9933] mt-4 opacity-50"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {tours.map((tour) => (
            <div key={tour.id} className="bg-surface-container-lowest editorial-shadow overflow-hidden group cursor-pointer transition-transform hover:-translate-y-1">
              <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={tour.image} alt={tour.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="font-notoSerif text-2xl font-bold mb-2">{tour.title}</h3>
                  <p className="text-sm opacity-90">{tour.subtitle}</p>
                </div>
              </div>
              <div className="p-4 md:p-6 lg:p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-on-surface-variant text-sm mb-2">
                      <span className="material-symbols-outlined text-sm">calendar_today</span>
                      {tour.duration}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-on-surface-variant uppercase font-bold tracking-tighter">Starting from</div>
                    <div className="text-2xl font-notoSerif font-bold text-[#CD9933]">{tour.price}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {(Array.isArray(tour.highlights) ? tour.highlights : typeof tour.highlights === 'string' ? tour.highlights.split(',') : []).slice(0, 3).map((hl, i) => (
                    <span key={i} className="bg-surface-container px-3 py-1 rounded text-xs">{typeof hl === 'string' ? hl.trim() : hl}</span>
                  ))}
                </div>
                <Link to="/contact" className="block w-full py-3 bg-[#CD9933] text-white font-bold rounded-md hover:brightness-110 transition-all text-sm text-center">
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary-container relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1530783324-1a1b1b5a51?w=800" alt="Pattern" />
        </div>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 text-center">
          <h6 className="font-manrope text-[#CD9933] font-bold text-sm tracking-[0.2em] uppercase mb-4">Ready to Explore?</h6>
          <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Book Your Dream Destination</h2>
          <p className="text-white/60 mb-10 max-w-xl mx-auto">
            Whether it's a spiritual Umrah journey or an international adventure, our experts are here to make it happen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/packages" className="bg-[#CD9933] text-white px-10 py-4 font-manrope font-bold tracking-widest text-sm hover:brightness-110 transition-all">
              View Umrah Packages
            </Link>
            <a href="tel:+923001234567" className="border border-white/30 text-white px-10 py-4 font-manrope font-bold tracking-widest text-sm hover:bg-white/10 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined">call</span>
              Call Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default InternationalTours