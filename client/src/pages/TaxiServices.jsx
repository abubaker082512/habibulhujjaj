import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || ''

const defaultTaxiServices = [
  {
    id: 1,
    name: 'Jeddah Airport to Makkah Hotel',
    vehicle_type: 'Toyota Camry / Hyundai Elantra',
    capacity: '4 Passengers, 3 Bags',
    price: 15000,
    image_url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80',
    description: 'Comfortable family sedan with professional driver. Meet & Greet service at Airport terminal included.',
    category: 'One Way'
  },
  {
    id: 2,
    name: 'Makkah to Madinah transfer',
    vehicle_type: 'Hyundai H1 / Toyota Hiace',
    capacity: '7 Passengers, 7 Bags',
    price: 35000,
    image_url: 'https://images.unsplash.com/photo-1532581291347-9c39cf10a73c?w=800&q=80',
    description: 'Spacious minivan transfer, ideal for medium families with substantial luggage.',
    category: 'One Way'
  },
  {
    id: 3,
    name: 'Madinah Ziyarat Tour',
    vehicle_type: 'GMC Yukon / Ford Expedition',
    capacity: '7 Passengers, 6 Bags',
    price: 25000,
    image_url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    description: 'Full-day private tour of holy sites in Madinah (Quba, Uhud, Qiblatain) in a premium SUV.',
    category: 'Ziyarat'
  }
]

const TaxiServices = () => {
  const [taxiServices, setTaxiServices] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${API_BASE}/api/taxi`)
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setTaxiServices(res.data)
        } else {
          setTaxiServices(defaultTaxiServices)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch taxi services:', err)
        setTaxiServices(defaultTaxiServices)
        setLoading(false)
      })
  }, [])

  const categories = ['All', 'One Way', 'Round Trip', 'Ziyarat']

  const filteredServices = activeCategory === 'All' 
    ? taxiServices 
    : taxiServices.filter(s => s.category?.toLowerCase() === activeCategory.toLowerCase())

  const handleBookNow = (service) => {
    const message = `Hello Habib Ul Hujjaj, I would like to book the Taxi Service:\n*${service.name}*\n- Vehicle: ${service.vehicle_type}\n- Capacity: ${service.capacity}\n- Category: ${service.category}\n- Price: PKR ${service.price ? service.price.toLocaleString() : 'N/A'}\n\nPlease confirm availability and details.`
    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/923004634548?text=${encoded}`, '_blank')
  }

  return (
    <div className="bg-white font-manrope text-[#001b1c] min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center pt-32 overflow-hidden bg-[#001b1c] text-white">
        <div className="absolute inset-0 z-0 opacity-40">
          <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1600&q=80" alt="Taxi Services" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001b1c] to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-24 w-full">
          <div className="max-w-3xl">
            <span className="text-[#ffc65c] text-xs font-black tracking-[0.3em] uppercase block mb-4">Premium Ground Transport</span>
            <h1 className="font-notoSerif text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Reliable & Comfortable <br />
              <span className="text-[#ffc65c]">Taxi Services</span>
            </h1>
            <p className="text-white/80 text-base sm:text-lg mb-8 max-w-2xl leading-relaxed">
              Experience seamless VIP transfers and private Ziyarat tours in Makkah, Madinah, and Jeddah. Our fleet of modern sedans, family SUVs, and spacious buses ensures safe travel for every group size.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Content Section */}
      <section className="py-16 max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-24">
        {/* Categories / Filter Bar */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all ${
                activeCategory === cat 
                  ? 'bg-[#001b1c] text-[#ffc65c] shadow-lg scale-105' 
                  : 'bg-gray-100 text-[#001b1c] hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-[#ffc65c] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-sm font-bold tracking-wider text-gray-500 uppercase">Loading Services...</p>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map(service => (
                <div key={service.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group">
                  <div className="h-56 overflow-hidden relative">
                    <img 
                      src={service.image_url || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80'} 
                      alt={service.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-[#001b1c] text-[#ffc65c] px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider">
                      {service.category}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-notoSerif text-xl font-bold mb-2 group-hover:text-[#ffc65c] transition-colors">{service.name}</h3>
                      <p className="text-gray-500 text-xs font-semibold mb-4 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm text-[#ffc65c]">directions_car</span>
                        {service.vehicle_type}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed mb-6">{service.description}</p>
                    </div>

                    <div>
                      <div className="flex justify-between items-center border-t border-gray-100 pt-4 mb-6">
                        <div>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">Capacity</span>
                          <span className="text-xs font-bold text-gray-700">{service.capacity || 'Flexible'}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">Price</span>
                          <span className="text-base font-black text-[#001b1c]">
                            {service.price ? `PKR ${service.price.toLocaleString()}` : 'Contact Us'}
                          </span>
                        </div>
                      </div>

                      <button 
                        onClick={() => handleBookNow(service)}
                        className="w-full bg-[#001b1c] text-[#ffc65c] py-3 rounded-lg font-bold text-xs uppercase tracking-widest transition-all hover:brightness-110 flex items-center justify-center gap-2"
                      >
                        <i className="fab fa-whatsapp text-sm"></i>
                        Book via WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-20 bg-gray-50 rounded-2xl">
                <span className="material-symbols-outlined text-5xl text-gray-300 mb-4">directions_car</span>
                <h3 className="font-notoSerif text-lg font-bold mb-2">No Taxi Services Found</h3>
                <p className="text-gray-500 text-sm">No services match the selected category at this moment.</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#ffc65c] text-xs font-black tracking-[0.3em] uppercase block mb-4">Why Choose Us</span>
            <h2 className="font-notoSerif text-3xl sm:text-4xl font-bold">Safe & Luxury Journeys</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
              <span className="material-symbols-outlined text-4xl text-[#ffc65c] mb-6">workspace_premium</span>
              <h4 className="font-notoSerif text-lg font-bold mb-3">Premium Fleets</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Modern, clean, and air-conditioned sedans, SUVs, and luxury buses to fit your travel needs.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
              <span className="material-symbols-outlined text-4xl text-[#ffc65c] mb-6">face</span>
              <h4 className="font-notoSerif text-lg font-bold mb-3">Professional Drivers</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Experienced, licensed, and courteous drivers with deep local knowledge of sacred sites.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
              <span className="material-symbols-outlined text-4xl text-[#ffc65c] mb-6">schedule</span>
              <h4 className="font-notoSerif text-lg font-bold mb-3">24/7 Availability</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Always on time. We track flight statuses and coordinate prompt pickups, day or night.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default TaxiServices
