import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || ''

const staticPackages = [
  {
    id: 1,
    title: 'Premium 5-Star Executive',
    location: 'Pullman ZamZam (150m from Haram)',
    hotel_name: 'Pullman ZamZam Makkah',
    distance_from_haram: '150m from Haram',
    price: 485000,
    days: '15 Days',
    duration: '15 Days',
    airline: 'Qatar Airways',
    category: '5 Star',
    stars: 5,
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1572949645079-6416a599c6ae?w=800',
    image_url: 'https://images.unsplash.com/photo-1572949645079-6416a599c6ae?w=800',
    description: 'Experience the ultimate spiritual journey with our premium 5-star package. Stay at the iconic Pullman ZamZam hotel, just 150 meters from the Masjid Al-Haram.',
    includes: ['E-Visa Processing', 'Return Flights (Qatar Airways)', 'VIP Ground Transfer', 'Guided Ziyarat', 'Daily Buffet Breakfast & Dinner', '24/7 Tour Manager Support'],
    itinerary: [
      { day: 'Day 01', title: 'Arrival & Makkah Check-in', description: 'Arrival at Jeddah Airport, VIP GMC transfer to Makkah. Perform Umrah under scholar guidance.' },
      { day: 'Day 02 - 07', title: 'Makkah Devotion', description: 'Daily prayers in Masjid Al-Haram. Guided Ziyarat to Mina, Arafat & Muzdalifah on Day 3.' },
      { day: 'Day 08 - 13', title: 'Madinah Munawwarah', description: 'Transfer to Madinah. Stay at Anwar Al Madinah Movenpick. Daily Fajr at Masjid Nabawi.' },
      { day: 'Day 14 - 15', title: 'Departure', description: 'Final prayers at Masjid Nabawi. Farewell Tawaf in Makkah then transfer to airport.' }
    ]
  },
  {
    id: 2,
    title: 'Silver 4-Star Comfort',
    location: 'Al-Shohada Hotel (300m from Haram)',
    hotel_name: 'Al-Shohada Hotel',
    distance_from_haram: '300m from Haram',
    price: 325000,
    days: '10 Days',
    duration: '10 Days',
    airline: 'Saudi Airlines',
    category: '4 Star',
    stars: 4,
    badge: 'Popular Choice',
    image: 'https://images.unsplash.com/photo-1564769662533-3f5aae93cec2?w=800',
    image_url: 'https://images.unsplash.com/photo-1564769662533-3f5aae93cec2?w=800',
    description: 'Our most popular family package offering the perfect balance of comfort and value. Stay at Al-Shohada Hotel, just 300 meters from the Haram.',
    includes: ['E-Visa Processing', 'Return Flights (Saudi Airlines)', 'Shared Ground Transfer', 'Guided Ziyarat Makkah', 'Breakfast Included', '24/7 Support Line'],
    itinerary: [
      { day: 'Day 01', title: 'Arrival & Umrah', description: 'Arrival at Jeddah, transfer to Makkah hotel. Perform Umrah with group guide.' },
      { day: 'Day 02 - 05', title: 'Makkah Prayers', description: 'All five prayers in Haram. Full-day Ziyarat of historical Makkah sites on Day 3.' },
      { day: 'Day 06 - 09', title: 'Madinah Stay', description: 'Transfer to Madinah. Prayers at Masjid Nabawi, Ziyarat of Uhud, Quba mosque & more.' },
      { day: 'Day 10', title: 'Departure', description: 'Check-out and transfer to airport. Farewell dua with group.' }
    ]
  },
  {
    id: 3,
    title: 'Spiritual Ramadan 2024',
    location: 'Full Ramadan in Makkah & Madinah',
    hotel_name: 'Dar Al Eiman Grand',
    distance_from_haram: '200m from Haram',
    price: 750000,
    days: '30 Days',
    duration: '30 Days',
    airline: 'Full Iftar/Suhur',
    category: 'Ramadan',
    stars: 4,
    badge: 'Limited',
    image: 'https://images.unsplash.com/photo-1580338834642-8a3acf79b1b8?w=800',
    image_url: 'https://images.unsplash.com/photo-1580338834642-8a3acf79b1b8?w=800',
    description: 'Experience the blessed month of Ramadan in the holy cities. Full iftar and suhoor provided, with special Taraweeh prayers at Masjid Al-Haram.',
    includes: ['E-Visa Processing', 'Return Flights', 'Hotel Accommodation', 'Full Iftar & Suhur', 'Guided Ziyarat', '24/7 Support'],
    itinerary: [
      { day: 'Day 01', title: 'Arrival & Umrah', description: 'Arrival at Jeddah, transfer to Makkah. Perform Umrah upon arrival.' },
      { day: 'Day 02 - 15', title: 'Ramadan in Makkah', description: 'Fast in the holy month. Taraweeh at Haram. Ziyarat of historical sites.' },
      { day: 'Day 16 - 28', title: 'Madinah Stay', description: 'Transfer to Madinah for remaining Ramadan. Iftar at Masjid Nabawi.' },
      { day: 'Day 29 - 30', title: 'Eid & Departure', description: 'Celebrate Eid Al-Fitr in Madinah. Departure after Eid prayers.' }
    ]
  },
  {
    id: 4,
    title: 'Habib Ul Hujjaj Suites Collection',
    location: 'Raffles Makkah (Inside Clock Tower)',
    hotel_name: 'Raffles Makkah',
    distance_from_haram: 'Inside Clock Tower',
    price: 980000,
    days: '07 Days',
    duration: '07 Days',
    airline: 'Private GMC Transfer',
    category: '5 Star',
    stars: 5,
    badge: 'Gold Standard',
    image: 'https://images.unsplash.com/photo-1596435688717-2d2f3b0fc47a?w=800',
    image_url: 'https://images.unsplash.com/photo-1596435688717-2d2f3b0fc47a?w=800',
    description: 'The ultimate luxury experience. Raffles Makkah offers world-class suites with panoramic views of the Holy Kaaba. Private transfers and butler service included.',
    includes: ['E-Visa Processing', 'Business Class Flights', 'Raffles Suite Accommodation', 'Private GMC Transfer', 'Personal Butler Service', 'All Meals Included', 'VIP Ziyarat'],
    itinerary: [
      { day: 'Day 01', title: 'VIP Arrival', description: 'Business class arrival, private transfer to Raffles. Suite check-in with welcome amenities.' },
      { day: 'Day 02 - 04', title: 'Makkah in Luxury', description: 'Prayers with Kaaba view. Private Ziyarat with expert guide. Butler assists with all arrangements.' },
      { day: 'Day 05 - 06', title: 'Madinah Habib Ul Hujjaj Treatment', description: 'Helicopter or private car transfer. Stay at The Oberoi Madinah. Prayers at Masjid Nabawi.' },
      { day: 'Day 07', title: 'Farewell Departure', description: 'Final Tawaf, private transfer to airport. Business class departure.' }
    ]
  }
]

const PackageDetail = () => {
  const { id } = useParams()
  const [pkg, setPkg] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios.get(`${API_BASE}/api/packages/${id}`)
      .then(res => {
        // Ensure includes is always an array
        const data = res.data
        if (data.includes && typeof data.includes === 'string') {
          data.includes = data.includes.split(',').map(s => s.trim())
        }
        setPkg(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching package:', err)
        const staticPkg = staticPackages.find(p => p.id === parseInt(id))
        if (staticPkg) {
          setPkg(staticPkg)
        }
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div className="bg-surface font-manrope text-on-surface min-h-screen flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#013334] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-notoSerif text-xl text-primary">Loading Package Details...</p>
        </div>
      </div>
    )
  }

  if (!pkg) {
    return (
      <div className="bg-surface font-manrope text-on-surface min-h-screen flex flex-col items-center justify-center">
        <Navbar />
        <div className="text-center mt-24">
          <span className="material-symbols-outlined text-6xl text-error mb-4 block">error</span>
          <h2 className="font-notoSerif text-3xl text-primary mb-4">Package Not Found</h2>
          <Link to="/packages" className="bg-[#013334] text-white px-8 py-3 rounded font-bold uppercase tracking-widest text-sm inline-block mt-4">Browse All Packages</Link>
        </div>
      </div>
    )
  }

  const price = typeof pkg.price === 'number' ? pkg.price : (parseFloat(String(pkg.price).replace(/[^0-9.]/g, '')) || 0)
  const hotelName = pkg.hotel_name || pkg.hotelName || pkg.location || 'Premium Hotel'
  const distance = pkg.distance_from_haram || pkg.distanceFromHaram || 'Steps to Haram'

  return (
    <div className="bg-surface font-manrope text-on-surface">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" src={pkg.image_url || pkg.image || staticPackages[0].image} alt={pkg.title} />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-4">
                {pkg.badge && <span className="bg-[#013334] text-white font-bold text-xs tracking-widest uppercase px-3 py-1 rounded">{pkg.badge}</span>}
                <div className="flex text-[#013334]">
                  {Array.from({ length: pkg.stars || 5 }).map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  ))}
                </div>
              </div>
              <h1 className="font-notoSerif text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white leading-tight tracking-tight">{pkg.title || 'Umrah Journey'}</h1>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <p className="text-white/70 font-medium mb-2">Starting from</p>
              <div className="font-notoSerif text-2xl md:text-3xl lg:text-4xl text-[#013334]">PKR {price.toLocaleString()} <span className="text-sm md:text-lg font-manrope text-white/70 font-normal">/ person</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 md:py-16 px-4 sm:px-6 md:px-8 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left Column: Details */}
          <div className="lg:col-span-8 space-y-12 md:space-y-16">
            {/* Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-surface-container-lowest p-4 md:p-6 lg:p-8 rounded-xl editorial-shadow">
                <span className="material-symbols-outlined text-[#013334] text-3xl mb-4 block">calendar_today</span>
                <h3 className="font-notoSerif text-lg mb-1">Duration</h3>
                <p className="text-on-surface-variant text-sm">{pkg.duration || pkg.days || 'Custom'}</p>
              </div>
              <div className="bg-surface-container-lowest p-4 md:p-6 lg:p-8 rounded-xl editorial-shadow">
                <span className="material-symbols-outlined text-[#013334] text-3xl mb-4 block">hotel</span>
                <h3 className="font-notoSerif text-lg mb-1">Accommodation</h3>
                <p className="text-on-surface-variant text-sm">{hotelName}</p>
              </div>
              <div className="bg-surface-container-lowest p-4 md:p-6 lg:p-8 rounded-xl editorial-shadow">
                <span className="material-symbols-outlined text-[#013334] text-3xl mb-4 block">flight</span>
                <h3 className="font-notoSerif text-lg mb-1">Flight</h3>
                <p className="text-on-surface-variant text-sm">{pkg.airline || 'Included'}</p>
              </div>
            </div>

            {/* Hotel Info */}
            <div>
              <h2 className="font-notoSerif text-3xl mb-8 flex items-center gap-4">
                {pkg.category === '5 Star' || pkg.category === '4 Star' ? 'Premium Accommodations' : 'Comfortable Stays'}
                <span className="h-px flex-grow bg-outline-variant/30"></span>
              </h2>
              <div className="bg-surface-container-lowest p-6 rounded-xl editorial-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[#013334] text-xs font-bold uppercase tracking-widest mb-1">Makkah & Madinah</p>
                    <h4 className="font-notoSerif text-2xl">{hotelName}</h4>
                  </div>
                  <div className="bg-surface-container text-xs px-3 py-1 rounded font-bold">{distance}</div>
                </div>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-4">{pkg.description || 'Centrally located accommodations for your spiritual journey.'}</p>
                <div className="flex flex-wrap gap-3 md:gap-6">
                  <span className="flex items-center gap-2 text-sm font-bold"><span className="material-symbols-outlined">wifi</span> Free WiFi</span>
                  <span className="flex items-center gap-2 text-sm font-bold"><span className="material-symbols-outlined">restaurant</span> Breakfast Inc.</span>
                  <span className="flex items-center gap-2 text-sm font-bold"><span className="material-symbols-outlined">ac_unit</span> Central AC</span>
                </div>
              </div>
            </div>

            {/* Services Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
              <div>
                <h3 className="font-notoSerif text-xl mb-6">What's Included</h3>
                <ul className="space-y-4">
                  {(Array.isArray(pkg.includes) ? pkg.includes : String(pkg.includes || 'Visa Processing,Flights,Ground Transport,Guided Tours').split(',')).map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm">
                      <span className="material-symbols-outlined text-[#013334] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-notoSerif text-xl mb-6">Not Included</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-error/40 text-lg">cancel</span>
                    Personal shopping & extra meals
                  </li>
                  <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-error/40 text-lg">cancel</span>
                    Travel and health insurance
                  </li>
                  <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-error/40 text-lg">cancel</span>
                    Laundry and room service charges
                  </li>
                </ul>
              </div>
            </div>

            {/* Itinerary Timeline */}
            {pkg.itinerary && pkg.itinerary.length > 0 && (
              <div>
                <h2 className="font-notoSerif text-3xl mb-8">Journey Itinerary</h2>
                <div className="relative pl-6 md:pl-8 border-l-2 border-dashed border-[#013334]/30 ml-2 md:ml-4 space-y-8 md:space-y-10">
                  {pkg.itinerary.map((step, idx) => {
                    const isLast = idx === pkg.itinerary.length - 1
                    return (
                      <div key={idx} className="relative">
                        <div className={`absolute -left-[41px] top-0 w-4 h-4 rounded-full ring-4 ${isLast ? 'bg-[#013334] ring-[#013334]/20' : 'bg-[#7d5800] ring-[#7d5800]/20'}`}></div>
                        <p className="text-[#013334] font-bold text-xs uppercase mb-1">{step.day}</p>
                        <h4 className="font-notoSerif text-lg mb-2">{step.title}</h4>
                        <p className="text-on-surface-variant text-sm leading-relaxed">{step.description}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 bg-surface-container-lowest p-4 md:p-6 lg:p-8 rounded-xl editorial-shadow border border-outline-variant/10">
              <div className="text-center mb-8">
                <h3 className="font-notoSerif text-2xl mb-2">Plan Your Journey</h3>
                <p className="text-on-surface-variant text-xs">Fill the form below, and our consultant will contact you within 24 hours.</p>
              </div>
              <form className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-1">Full Name</label>
                  <input className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-[#013334] focus:ring-0 transition-colors py-2 text-sm" placeholder="Enter your name" type="text" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-1">Phone Number</label>
                  <input className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-[#013334] focus:ring-0 transition-colors py-2 text-sm" placeholder="+92 XXXXX XXXXX" type="tel" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-1">City</label>
                    <input className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-[#013334] focus:ring-0 transition-colors py-2 text-sm" placeholder="e.g. Lahore" type="text" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-1">Travelers</label>
                    <select className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-[#013334] focus:ring-0 transition-colors py-2 text-sm appearance-none">
                      <option>01 Person</option>
                      <option>02 Persons</option>
                      <option>04+ Persons</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-1">Estimated Date</label>
                  <input className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-[#013334] focus:ring-0 transition-colors py-2 text-sm" type="date" />
                </div>
                <button className="w-full bg-gradient-to-r from-[#7d5800] to-[#013334] text-white py-4 rounded-md font-bold text-sm tracking-widest uppercase shadow-lg shadow-[#7d5800]/20 hover:scale-[1.02] transition-transform" type="submit">Send Inquiry</button>
              </form>
              <div className="mt-8 pt-8 border-t border-outline-variant/20 text-center">
                <p className="text-xs text-on-surface-variant mb-4">Or connect instantly via</p>
                <a className="inline-flex items-center gap-2 text-[#013334] font-bold hover:text-[#013334] transition-colors" href="#">
                  <span className="material-symbols-outlined">chat</span>
                  WhatsApp Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Packages */}
      <section className="py-12 md:py-16 bg-surface-container-low px-4 sm:px-6 md:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <h2 className="font-notoSerif text-3xl mb-8">More Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {staticPackages.filter(p => p.id !== parseInt(id)).slice(0, 3).map(p => (
              <Link to={`/package/${p.id}`} key={p.id} className="bg-surface-container-lowest editorial-shadow overflow-hidden group cursor-pointer transition-transform hover:-translate-y-1 block">
                <div className="relative h-48 overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={p.image} alt={p.title} />
                  <div className="absolute top-4 left-4 bg-[#013334] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded">{p.badge}</div>
                </div>
                <div className="p-6">
                  <h3 className="font-notoSerif text-lg font-bold text-primary mb-1">{p.title}</h3>
                  <p className="text-on-surface-variant text-sm mb-3">{p.days}</p>
                  <span className="text-xl font-extrabold text-[#013334]">PKR {p.price.toLocaleString()}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default PackageDetail
