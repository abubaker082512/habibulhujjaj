import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || ''

const staticTours = [
  {
    id: 1,
    title: 'Turkey Tour',
    subtitle: 'Istanbul, Cappadocia, Antalya',
    duration: '10 Days / 9 Nights',
    price: 'PKR 285,000',
    image: '/assets/gallery images/Turkey tour.jpg',
    highlights: ['Blue Mosque', 'Cappadocia', 'Grand Bazaar', 'Pamukkale'],
    icon: 'place'
  },
  {
    id: 2,
    title: 'Dubai Tour',
    subtitle: 'Dubai, Abu Dhabi, Sharjah',
    duration: '7 Days / 6 Nights',
    price: 'PKR 195,000',
    image: '/assets/gallery images/Dubai tour.jpg',
    highlights: ['Burj Khalifa', 'Desert Safari', 'Dubai Frame', 'Sheikh Zayed Mosque'],
    icon: 'place'
  },
  {
    id: 3,
    title: 'Malaysia Tour',
    subtitle: 'Kuala Lumpur, Genting, Penang',
    duration: '8 Days / 7 Nights',
    price: 'PKR 175,000',
    image: '/assets/Malaysia.jpg',
    highlights: ['Petronas Towers', 'Genting Highlands', 'Batu Caves', 'Gurney Drive'],
    icon: 'place'
  },
  {
    id: 4,
    title: 'Europe Tour',
    subtitle: 'Paris, Swiss, Rome',
    duration: '12 Days / 11 Nights',
    price: 'PKR 550,000',
    image: '/assets/Europe.jpg',
    highlights: ['Eiffel Tower', 'Swiss Alps', 'Colosseum', 'Lucerne'],
    icon: 'place'
  },
  {
    id: 5,
    title: 'Singapore Tour',
    subtitle: 'Sentosa Island, Gardens by the Bay',
    duration: '6 Days / 5 Nights',
    price: 'PKR 210,000',
    image: '/assets/singapore_tour.png',
    highlights: ['Gardens by the Bay', 'Universal Studios', 'Sentosa Island', 'Marina Bay Sands'],
    icon: 'place'
  },
  {
    id: 6,
    title: 'Thailand Tour',
    subtitle: 'Bangkok, Pattaya, Phuket',
    duration: '8 Days / 7 Nights',
    price: 'PKR 165,000',
    image: '/assets/thailand_tour.png',
    highlights: ['Grand Palace', 'Phi Phi Islands', 'Pattaya Floating Market', 'Coral Island'],
    icon: 'place'
  },
  {
    id: 7,
    title: 'Baku Tour',
    subtitle: 'Baku City, Gabala, Quba',
    duration: '7 Days / 6 Nights',
    price: 'PKR 185,000',
    image: '/assets/baku_tour.png',
    highlights: ['Flame Towers', 'Old City (Icherisheher)', 'Nizami Street', 'Nohur Lake'],
    icon: 'place'
  },
  {
    id: 8,
    title: 'Maldives Tour',
    subtitle: 'Male Atoll Luxury Resorts',
    duration: '5 Days / 4 Nights',
    price: 'PKR 395,000',
    image: '/assets/maldives_tour.png',
    highlights: ['Overwater Bungalows', 'Snorkeling & Diving', 'Sandbank Picnic', 'Sunset Cruise'],
    icon: 'place'
  }
]

const whatsappNumber = '923004634548'

const buildTourWhatsAppUrl = (tour) => {
  const lines = [
    'Hello Habib Ul Hujjaj,',
    '',
    'I am interested in your international tour package:',
    `*${tour.title}*`,
    tour.subtitle || '',
    tour.duration ? `Duration: ${tour.duration}` : '',
    tour.price ? `Price: ${tour.price}` : '',
    tour.description || '',
    '',
    'Please send me the details and availability.'
  ].filter(Boolean)

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`
}

const InternationalTours = () => {
  const [pageMedia, setPageMedia] = useState({})
  const [tours, setTours] = useState(staticTours)

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
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setTours(res.data)
        } else {
          setTours(staticTours)
        }
      })
      .catch(err => {
        console.error('Failed to fetch tours:', err)
        setTours(staticTours)
      })
  }, [])

  return (
    <div className="bg-white font-manrope text-black min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center pt-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" src={pageMedia.tours_hero_image || "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1600"} alt="Istanbul" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/40 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-24 w-full">
          <div className="max-w-3xl">
            <div className="w-12 h-1 bg-white mb-6 md:mb-8"></div>
            <h1 className="font-notoSerif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              International <span className="text-white">Tours</span>
            </h1>
            <p className="font-manrope text-base md:text-lg text-white/80 max-w-xl mb-8">
              Explore the world with our curated international tour packages. From the historic streets of Istanbul to the modern skylines of Dubai.
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4">
              <Link to="/contact" className="bg-white text-primary px-6 py-3 md:px-10 md:py-4 font-manrope font-bold tracking-widest text-sm hover:bg-gray-100 transition-all">
                Get a Quote
              </Link>
              <Link to="/contact" className="bg-transparent text-white border-2 border-white px-6 py-3 md:px-10 md:py-4 font-manrope font-bold tracking-widest text-sm hover:bg-white/10 transition-all">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 max-w-screen-2xl mx-auto bg-white">
        <div className="mb-12 md:mb-16">
          <span className="font-manrope text-primary font-bold text-sm tracking-[0.2em] uppercase mb-4 block">Beyond Borders</span>
          <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-bold text-black">Discover Our Tours</h2>
          <div className="w-24 h-1 bg-primary mt-4 opacity-50"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {tours.map((tour) => (
            <div key={tour.id} className="bg-white border border-gray-100 shadow-sm overflow-hidden group cursor-pointer transition-transform hover:-translate-y-1">
              <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={tour.image_url || tour.image} alt={tour.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="font-notoSerif text-2xl font-bold mb-2">{tour.title}</h3>
                  <p className="text-sm opacity-90">{tour.subtitle}</p>
                </div>
              </div>
              <div className="p-4 md:p-6 lg:p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-black/60 text-sm mb-2">
                      <span className="material-symbols-outlined text-sm">calendar_today</span>
                      {tour.duration}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-black/40 uppercase font-bold tracking-tighter">Starting from</div>
                    <div className="text-2xl font-notoSerif font-bold text-primary">{tour.price}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {(Array.isArray(tour.highlights) ? tour.highlights : typeof tour.highlights === 'string' ? tour.highlights.split(',') : []).slice(0, 3).map((hl, i) => (
                    <span key={i} className="bg-gray-50 text-black/70 px-3 py-1 rounded text-xs border border-gray-100">{typeof hl === 'string' ? hl.trim() : hl}</span>
                  ))}
                </div>
                <a href={buildTourWhatsAppUrl(tour)} target="_blank" rel="noreferrer" className="block w-full py-3 bg-primary text-white font-bold rounded-md hover:opacity-90 transition-all text-sm text-center">
                  Book Now on WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary-container relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
          <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1530783324-1a1b1b5a51?w=800" alt="Pattern" />
        </div>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 text-center">
          <h6 className="font-manrope text-primary font-bold text-sm tracking-[0.2em] uppercase mb-4">Ready to Explore?</h6>
          <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">Book Your Dream Destination</h2>
          <p className="text-black/60 mb-10 max-w-xl mx-auto">
            Whether it's a spiritual Umrah journey or an international adventure, our experts are here to make it happen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/packages" className="bg-primary text-white px-10 py-4 font-manrope font-bold tracking-widest text-sm hover:opacity-90 transition-all">
              View Umrah Packages
            </Link>
            <a href="tel:+923004634548" className="border-2 border-primary text-primary px-10 py-4 font-manrope font-bold tracking-widest text-sm hover:bg-primary/5 transition-all flex items-center gap-2">
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