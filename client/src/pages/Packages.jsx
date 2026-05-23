import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import { buildPackageShortMessage, buildWhatsAppUrl } from '../utils/whatsapp'

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
    badgeColor: 'bg-[#0B1B3D]',
    image: '/assets/gallery images/2.jpg',
  },
  {
    id: 2,
    title: 'Silver 4-Star Comfort',
    location: 'Al-Shohada Hotel (300m from Haram)',
    price: 325000,
    days: '10 Days',
    airline: 'Saudi Airlines',
    badge: 'Popular Choice',
    badgeColor: 'bg-[#0B1B3D]',
    image: '/assets/gallery images/3.jpg',
  },
  {
    id: 3,
    title: 'Spiritual Ramadan 2024',
    location: 'Full Ramadan in Makkah & Madinah',
    price: 750000,
    days: '30 Days',
    airline: 'Full Iftar/Suhur',
    badge: 'Limited',
    badgeColor: 'bg-[#0B1B3D]',
    image: '/assets/gallery images/6.jpg',
  },
  {
    id: 4,
    title: 'Habib Ul Hujjaj Suites Collection',
    location: 'Raffles Makkah (Inside Clock Tower)',
    price: 980000,
    days: '07 Days',
    airline: 'Private GMC Transfer',
    badge: 'Gold Standard',
    badgeColor: 'bg-[#0B1B3D]',
    image: '/assets/gallery images/10.jpg',
  }
]

const Packages = () => {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [pageMedia, setPageMedia] = useState({})

  useEffect(() => {
    setLoading(true)
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
      .finally(() => {
        setLoading(false)
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
    <div className="bg-background font-manrope text-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center pt-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" src={pageMedia.packages_hero_image || "/assets/umrah_packages_hero.png"} alt="Makkah" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/40 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-24 w-full">
          <div className="max-w-3xl">
            <div className="w-12 h-1 bg-white mb-6 md:mb-8"></div>
            <h1 className="font-notoSerif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Curated <span className="text-white">Umrah Packages</span>
            </h1>
            <p className="font-manrope text-base md:text-lg text-white/80 max-w-xl mb-8">
              Embark on a spiritual journey of a lifetime with our meticulously curated pilgrimage experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16 bg-background">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
          {/* Filter Sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white p-4 md:p-6 lg:p-8 border border-gray-100 shadow-sm lg:sticky lg:top-32">
              <h2 className="font-notoSerif text-xl text-primary font-bold mb-8 border-b border-gray-100 pb-4">Categories</h2>
              <nav className="space-y-6">
                {[
                  { label: 'Economy', checked: false },
                  { label: '3 Star Packages', checked: false },
                  { label: '4 Star Luxury', checked: false },
                  { label: '5 Star Premium', checked: true },
                  { label: 'Ramadan 2025', checked: false },
                  { label: 'December Specials', checked: false },
                ].map((cat, i) => (
                  <label key={i} className="flex items-center group cursor-pointer">
                    <input defaultChecked={cat.checked} className="rounded border-gray-300 text-primary focus:ring-primary w-5 h-5" type="checkbox" />
                    <span className={`ml-4 font-manrope transition-colors ${cat.checked ? 'text-primary font-bold' : 'text-black/60 group-hover:text-primary'}`}>{cat.label}</span>
                  </label>
                ))}
              </nav>
              <div className="mt-12">
                <div className="p-6 bg-primary rounded-lg text-white">
                  <p className="font-notoSerif text-lg mb-2">Need Guidance?</p>
                  <p className="text-sm opacity-70 mb-4">Our travel experts are available 24/7 for consultation.</p>
                  <Link to="/contact" className="block w-full py-3 bg-white text-primary font-bold rounded hover:bg-gray-50 transition-colors text-sm text-center">Enquire Now</Link>
                </div>
              </div>
            </div>
          </aside>

          {/* Package Grid */}
          <section className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-white border border-gray-100 shadow-sm overflow-hidden flex flex-col rounded-xl animate-pulse">
                    <div className="h-56 sm:h-64 md:h-72 bg-gray-200"></div>
                    <div className="p-4 md:p-6 lg:p-8 flex-grow flex flex-col space-y-4">
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-10 bg-gray-200 rounded-md mt-auto"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                {packages.map((pkg, i) => {
                  const staticPkg = staticPackages[i % staticPackages.length]
                  const image = pkg.image_url || pkg.image || staticPkg?.image
                  const badge = pkg.badge || staticPkg?.badge || ''
                  const badgeColor = pkg.badgeColor || 'bg-primary'
                  const days = pkg.days || pkg.duration || staticPkg?.days || '15 Days'
                  const airline = pkg.airline || pkg.airline || staticPkg?.airline || 'Qatar Airways'
                  const price = typeof pkg.price === 'number' ? pkg.price : (parseFloat(String(pkg.price).replace(/[^0-9.]/g, '')) || 0)

                  return (
                    <div key={pkg.id || i} className="bg-white border border-gray-100 shadow-sm overflow-hidden flex flex-col group cursor-pointer transition-transform hover:-translate-y-1 rounded-xl">
                      <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden">
                        <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={image} alt={pkg.title || pkg.name} />
                        {badge && (
                          <div className={`absolute top-4 left-4 ${badgeColor} text-white px-4 py-1 text-xs font-bold uppercase tracking-widest rounded`}>{badge}</div>
                        )}
                      </div>
                      <div className="p-4 md:p-6 lg:p-8 flex-grow flex flex-col">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-4">
                          <div>
                            <h3 className="font-notoSerif text-2xl text-primary font-bold">{pkg.title || pkg.name}</h3>
                            <div className="flex items-center mt-1 text-black/60 text-sm">
                              <span className="material-symbols-outlined text-sm mr-2">location_on</span>
                              <span>{pkg.location || pkg.hotel || 'Makkah & Madinah'}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-black/40 uppercase font-bold tracking-tighter">Starting from</div>
                            <div className="text-2xl font-notoSerif font-bold text-primary">PKR {price > 0 ? price.toLocaleString() : 'N/A'}</div>
                          </div>
                        </div>
                        <div className="flex gap-4 mb-8 flex-wrap">
                          <div className="bg-gray-50 flex items-center px-3 py-1 rounded text-xs font-medium border border-gray-100">
                            <span className="material-symbols-outlined text-sm mr-2 text-primary">calendar_today</span>{days}
                          </div>
                          <div className="bg-gray-50 flex items-center px-3 py-1 rounded text-xs font-medium border border-gray-100">
                            <span className="material-symbols-outlined text-sm mr-2 text-primary">flight</span>{airline}
                          </div>
                        </div>
                        <div className="mt-auto grid grid-cols-2 gap-4">
                          <Link to={`/package/${pkg.id || pkg._id || i + 1}`} className="py-3 bg-primary/5 text-primary font-bold rounded-md hover:bg-primary/10 transition-colors border border-primary/20 text-sm text-center">View Details</Link>
                          <a href={buildWhatsAppUrl(buildPackageShortMessage(pkg))} target="_blank" rel="noreferrer" className="py-3 bg-primary text-white font-bold rounded-md hover:opacity-90 transition-colors text-sm text-center">Book Now on WhatsApp</a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <img className="w-full h-full object-cover" src="/assets/gallery images/11.jpeg" alt="Pattern" />
        </div>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 text-center">
          <h6 className="font-manrope text-white/70 font-bold text-sm tracking-[0.2em] uppercase mb-4">Ready to Begin?</h6>
          <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Book Your Umrah Journey Today</h2>
          <p className="text-white/60 mb-10 max-w-xl mx-auto">Contact our travel experts to get a personalized quote and start your spiritual journey.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={buildWhatsAppUrl('Assalamu Alaikum Habib Ul Hujjaj, I would like a quote for Umrah packages.')} target="_blank" rel="noreferrer" className="bg-white text-primary px-10 py-4 font-manrope font-bold tracking-widest uppercase text-sm hover:bg-gray-100 transition-all">Get a Quote</a>
            <Link to="/international-tours" className="border-2 border-white text-white px-10 py-4 font-manrope font-bold tracking-widest uppercase text-sm hover:bg-white/10 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined">flight</span>
              Explore Tours
            </Link>
          </div>
        </div>
      </section>

      {/* WhatsApp FAB */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[9999] group">
        <div className="flex flex-col items-center gap-2">
          <span className="bg-primary/90 backdrop-blur-md text-secondary font-manrope font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity">WhatsApp Support</span>
          <a href="https://wa.me/923004634548" target="_blank" rel="noreferrer" className="bg-secondary text-primary rounded-full p-3 md:p-4 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shadow-2xl shadow-secondary/40 animate-bounce duration-[2000ms] cursor-pointer hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-2xl md:text-3xl font-bold">chat</span>
          </a>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Packages