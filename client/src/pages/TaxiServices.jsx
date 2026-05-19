import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || ''

// 1. Sleek fleet definitions matching Screenshot 1
const fleetData = [
  {
    id: 'camry',
    name: 'CAMRY',
    seats: '4 Person Seat Vehicle',
    luggage: '3 Luggage',
    ac: 'AC Chilled Vehicle',
    image_url: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80',
    whatsapp: '+996596812961'
  },
  {
    id: 'gmc',
    name: 'GMC',
    seats: '6 Person Seat Vehicle',
    luggage: '7 Luggage',
    ac: 'AC Chilled Vehicle',
    image_url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80',
    whatsapp: '+996596812961'
  },
  {
    id: 'staria',
    name: 'STARIA',
    seats: '7 Person Seat Vehicle',
    luggage: '7 Luggage',
    ac: 'AC Chilled Vehicle',
    image_url: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=600&q=80',
    whatsapp: '+996596812961'
  },
  {
    id: 'hiace-10',
    name: 'HIACE (10 seat)',
    seats: '10 Person Seat Vehicle',
    luggage: '12 Luggage',
    ac: 'AC Chilled Vehicle',
    image_url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80',
    whatsapp: '+996596812961'
  },
  {
    id: 'hiace-12',
    name: 'HIACE (12 seat)',
    seats: '12 Person Seat Vehicle',
    luggage: '12 Luggage',
    ac: 'AC Chilled Vehicle',
    image_url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80',
    whatsapp: '+996596812961'
  },
  {
    id: 'hyundai-h1',
    name: 'HYUNDAI H1',
    seats: '7 Person Seat Vehicle',
    luggage: '7 Luggage',
    ac: 'AC Chilled Vehicle',
    image_url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80',
    whatsapp: '+996596812961'
  },
  {
    id: 'coaster-22',
    name: 'COASTER (22 seat)',
    seats: '22 Person Seat Vehicle',
    luggage: '22 Luggage',
    ac: 'AC Chilled Vehicle',
    image_url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80',
    whatsapp: '+996596812961'
  },
  {
    id: 'coaster-30',
    name: 'COASTER (30 seat)',
    seats: '30 Person Seat Vehicle',
    luggage: '30 Luggage',
    ac: 'AC Chilled Vehicle',
    image_url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80',
    whatsapp: '+996596812961'
  },
  {
    id: 'bus',
    name: 'BUS',
    seats: '49 Person Seat Vehicle',
    luggage: '50 Luggage',
    ac: 'AC Chilled Vehicle',
    image_url: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&q=80',
    whatsapp: '+996596812961'
  }
]

// 2. Route definitions matching Screenshot 2
const routesData = [
  {
    id: 'jed-mak',
    name: 'Jeddah Airport To Makkah Hotel',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80',
    prices: {
      'camry': { sar: 250, usd: 67 },
      'gmc': { sar: 500, usd: 133 },
      'staria': { sar: 350, usd: 93 },
      'hiace-10': { sar: 2063, usd: 550 },
      'hiace-12': { sar: 450, usd: 120 },
      'hyundai-h1': { sar: 1313, usd: 350 },
      'coaster-22': { sar: 649, usd: 173 },
      'coaster-30': { sar: 649, usd: 173 },
      'bus': { sar: 949, usd: 253 }
    }
  },
  {
    id: 'med-ap-hotel',
    name: 'Madinah Airport to Madina hotel',
    image: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=600&q=80',
    prices: {
      'camry': { sar: 150, usd: 40 },
      'gmc': { sar: 300, usd: 80 },
      'staria': { sar: 200, usd: 53 },
      'hiace-10': { sar: 350, usd: 93 },
      'hiace-12': { sar: 300, usd: 80 },
      'hyundai-h1': { sar: 250, usd: 67 },
      'coaster-22': { sar: 450, usd: 120 },
      'coaster-30': { sar: 450, usd: 120 },
      'bus': { sar: 700, usd: 187 }
    }
  },
  {
    id: 'med-hotel-ap',
    name: 'Madinah hotel to Madinah Airport',
    image: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=600&q=80',
    prices: {
      'camry': { sar: 150, usd: 40 },
      'gmc': { sar: 300, usd: 80 },
      'staria': { sar: 200, usd: 53 },
      'hiace-10': { sar: 350, usd: 93 },
      'hiace-12': { sar: 300, usd: 80 },
      'hyundai-h1': { sar: 250, usd: 67 },
      'coaster-22': { sar: 450, usd: 120 },
      'coaster-30': { sar: 450, usd: 120 },
      'bus': { sar: 700, usd: 187 }
    }
  },
  {
    id: 'med-mak-hotel',
    name: 'Madinah hotel to Makkah hotel',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80',
    prices: {
      'camry': { sar: 450, usd: 120 },
      'gmc': { sar: 900, usd: 240 },
      'staria': { sar: 600, usd: 160 },
      'hiace-10': { sar: 1000, usd: 267 },
      'hiace-12': { sar: 950, usd: 253 },
      'hyundai-h1': { sar: 800, usd: 213 },
      'coaster-22': { sar: 1200, usd: 320 },
      'coaster-30': { sar: 1200, usd: 320 },
      'bus': { sar: 1800, usd: 480 }
    }
  },
  {
    id: 'mak-taif',
    name: 'Makkah to Taif Ziyarat & Return',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
    prices: {
      'camry': { sar: 400, usd: 107 },
      'gmc': { sar: 800, usd: 213 },
      'staria': { sar: 550, usd: 147 },
      'hiace-10': { sar: 900, usd: 240 },
      'hiace-12': { sar: 800, usd: 213 },
      'hyundai-h1': { sar: 700, usd: 187 },
      'coaster-22': { sar: 1100, usd: 293 },
      'coaster-30': { sar: 1100, usd: 293 },
      'bus': { sar: 1600, usd: 427 }
    }
  },
  {
    id: 'med-train',
    name: 'Madinah hotel to train station',
    image: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=600&q=80',
    prices: {
      'camry': { sar: 100, usd: 27 },
      'gmc': { sar: 200, usd: 53 },
      'staria': { sar: 150, usd: 40 },
      'hiace-10': { sar: 250, usd: 67 },
      'hiace-12': { sar: 250, usd: 67 },
      'hyundai-h1': { sar: 200, usd: 53 },
      'coaster-22': { sar: 350, usd: 93 },
      'coaster-30': { sar: 350, usd: 93 },
      'bus': { sar: 500, usd: 133 }
    }
  },
  {
    id: 'mak-jed',
    name: 'Makkah hotel to Jeddah Airport',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80',
    prices: {
      'camry': { sar: 250, usd: 67 },
      'gmc': { sar: 500, usd: 133 },
      'staria': { sar: 350, usd: 93 },
      'hiace-10': { sar: 450, usd: 120 },
      'hiace-12': { sar: 450, usd: 120 },
      'hyundai-h1': { sar: 400, usd: 107 },
      'coaster-22': { sar: 650, usd: 173 },
      'coaster-30': { sar: 650, usd: 173 },
      'bus': { sar: 950, usd: 253 }
    }
  },
  {
    id: 'mak-med',
    name: 'Makkah hotel to Madinah hotel',
    image: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=600&q=80',
    prices: {
      'camry': { sar: 450, usd: 120 },
      'gmc': { sar: 900, usd: 240 },
      'staria': { sar: 600, usd: 160 },
      'hiace-10': { sar: 1000, usd: 267 },
      'hiace-12': { sar: 950, usd: 253 },
      'hyundai-h1': { sar: 800, usd: 213 },
      'coaster-22': { sar: 1200, usd: 320 },
      'coaster-30': { sar: 1200, usd: 320 },
      'bus': { sar: 1800, usd: 480 }
    }
  },
  {
    id: 'mak-med-badar',
    name: 'Makkah to Madinah + Badar ziyaraat',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5edd0cd9?w=600&q=80',
    prices: {
      'camry': { sar: 600, usd: 160 },
      'gmc': { sar: 1200, usd: 320 },
      'staria': { sar: 850, usd: 227 },
      'hiace-10': { sar: 1400, usd: 373 },
      'hiace-12': { sar: 1200, usd: 320 },
      'hyundai-h1': { sar: 1100, usd: 293 },
      'coaster-22': { sar: 1600, usd: 427 },
      'coaster-30': { sar: 1600, usd: 427 },
      'bus': { sar: 2400, usd: 640 }
    }
  },
  {
    id: 'mak-train',
    name: 'Makkah hotel to train station',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80',
    prices: {
      'camry': { sar: 100, usd: 27 },
      'gmc': { sar: 200, usd: 53 },
      'staria': { sar: 150, usd: 40 },
      'hiace-10': { sar: 250, usd: 67 },
      'hiace-12': { sar: 250, usd: 67 },
      'hyundai-h1': { sar: 200, usd: 53 },
      'coaster-22': { sar: 350, usd: 93 },
      'coaster-30': { sar: 350, usd: 93 },
      'bus': { sar: 500, usd: 133 }
    }
  },
  {
    id: 'mak-ziyarat',
    name: 'Makkah Ziyarat',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80',
    prices: {
      'camry': { sar: 150, usd: 40 },
      'gmc': { sar: 300, usd: 80 },
      'staria': { sar: 200, usd: 53 },
      'hiace-10': { sar: 350, usd: 93 },
      'hiace-12': { sar: 300, usd: 80 },
      'hyundai-h1': { sar: 250, usd: 67 },
      'coaster-22': { sar: 450, usd: 120 },
      'coaster-30': { sar: 450, usd: 120 },
      'bus': { sar: 700, usd: 187 }
    }
  },
  {
    id: 'med-ziyarat',
    name: 'Madinah Ziyarat',
    image: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=600&q=80',
    prices: {
      'camry': { sar: 150, usd: 40 },
      'gmc': { sar: 300, usd: 80 },
      'staria': { sar: 200, usd: 53 },
      'hiace-10': { sar: 350, usd: 93 },
      'hiace-12': { sar: 300, usd: 80 },
      'hyundai-h1': { sar: 250, usd: 67 },
      'coaster-22': { sar: 450, usd: 120 },
      'coaster-30': { sar: 450, usd: 120 },
      'bus': { sar: 700, usd: 187 }
    }
  }
]

const TaxiServices = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [selectedRoute, setSelectedRoute] = useState(null)
  const [fleet, setFleet] = useState(fleetData)
  const [routes, setRoutes] = useState(routesData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${API_BASE}/api/taxi`)
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          const dbServices = res.data
          
          // 1. Dynamic fleet merger (Processes only s.name === '__VEHICLE_META__')
          const newFleetMap = new Map()
          fleetData.forEach(f => {
            newFleetMap.set(f.name.toLowerCase(), { ...f })
          })
          
          dbServices.filter(s => s.name === '__VEHICLE_META__').forEach(s => {
            const vKey = s.vehicle_type ? s.vehicle_type.toLowerCase() : ''
            if (vKey) {
              if (newFleetMap.has(vKey)) {
                const existing = newFleetMap.get(vKey)
                if (s.capacity) existing.seats = s.capacity
                if (s.image_url) existing.image_url = s.image_url
                if (s.description) {
                  // Separate features into luggage and ac if possible, or override ac
                  if (s.description.includes(',')) {
                    const parts = s.description.split(',')
                    existing.luggage = parts[0].trim()
                    existing.ac = parts[1].trim()
                  } else {
                    existing.ac = s.description
                  }
                }
              } else {
                newFleetMap.set(vKey, {
                  id: s.vehicle_type.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                  name: s.vehicle_type.toUpperCase(),
                  seats: s.capacity || '4 Person Seat Vehicle',
                  luggage: 'Standard Luggage',
                  ac: s.description || 'AC Chilled Vehicle',
                  image_url: s.image_url || 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80',
                  whatsapp: '+996596812961'
                })
              }
            }
          })
          setFleet(Array.from(newFleetMap.values()))
          
          // 2. Dynamic routes & pricing merger
          const newRoutesMap = new Map()
          routesData.forEach(r => {
            newRoutesMap.set(r.name.toLowerCase(), { ...r })
          })
          
          // Apply Route Banner overrides (s.vehicle_type === '__ROUTE_BANNER__')
          dbServices.filter(s => s.vehicle_type === '__ROUTE_BANNER__').forEach(s => {
            const rKey = s.name ? s.name.toLowerCase() : ''
            if (rKey) {
              if (newRoutesMap.has(rKey)) {
                const existing = newRoutesMap.get(rKey)
                if (s.image_url) existing.image = s.image_url
                if (s.category) existing.category = s.category
              } else {
                newRoutesMap.set(rKey, {
                  id: s.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                  name: s.name,
                  image: s.image_url || 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80',
                  prices: {}
                })
              }
            }
          })

          // Apply specific route-vehicle prices (normal pricing rows)
          dbServices.filter(s => s.name !== '__VEHICLE_META__' && s.vehicle_type !== '__ROUTE_BANNER__').forEach(s => {
            const rKey = s.name ? s.name.toLowerCase() : ''
            if (rKey) {
              const vId = s.vehicle_type ? s.vehicle_type.toLowerCase().replace(/[^a-z0-9]/g, '-') : 'camry'
              const priceVal = parseFloat(s.price) || 0
              
              if (newRoutesMap.has(rKey)) {
                const existing = newRoutesMap.get(rKey)
                existing.prices[vId] = {
                  sar: priceVal,
                  usd: Math.round(priceVal / 3.75)
                }
              } else {
                newRoutesMap.set(rKey, {
                  id: s.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                  name: s.name,
                  image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80',
                  prices: {
                    [vId]: {
                      sar: priceVal,
                      usd: Math.round(priceVal / 3.75)
                    }
                  }
                })
              }
            }
          })
          setRoutes(Array.from(newRoutesMap.values()))
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch dynamic taxi services:', err)
        setLoading(false)
      })
  }, [])
  
  // Modal booking states
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [bookingCar, setBookingCar] = useState(null)
  const [bookingRoute, setBookingRoute] = useState(null)
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    travelers: '1',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  // Scroll to section helper
  const scrollToId = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Prepares the WhatsApp prefilled message and submits to submissions API
  const handleBookingSubmit = async (e) => {
    e.preventDefault()
    if (!bookingForm.name || !bookingForm.phone) {
      alert('Please fill out your Name and Contact Number')
      return
    }
    
    setSubmitting(true)
    
    const subject = `Booking: Taxi Service (${bookingCar.name})`
    const desc = `Route: ${bookingRoute.name}\nVehicle: ${bookingCar.name} (${bookingCar.seats})\nTravelers: ${bookingForm.travelers} Persons\nDate: ${bookingForm.date} at ${bookingForm.time}\nNotes: ${bookingForm.message}`
    
    try {
      // 1. Submit lead details to dashboard
      await axios.post(`${API_BASE}/api/submissions`, {
        name: bookingForm.name,
        email: bookingForm.email || 'N/A',
        phone: bookingForm.phone,
        subject: subject,
        message: desc
      })
      
      setSuccess(true)
      
      // 2. Open Whatsapp directly
      const waMsg = `*NEW TAXI BOOKING REQUEST*\n\n` +
                    `*Customer:* ${bookingForm.name}\n` +
                    `*Phone:* ${bookingForm.phone}\n` +
                    `*Route:* ${bookingRoute.name}\n` +
                    `*Vehicle:* ${bookingCar.name}\n` +
                    `*Travelers:* ${bookingForm.travelers} Persons\n` +
                    `*Pickup Date:* ${bookingForm.date}\n` +
                    `*Pickup Time:* ${bookingForm.time}\n` +
                    `*Price:* ${bookingRoute.prices[bookingCar.id]?.sar} SAR (≈ $${bookingRoute.prices[bookingCar.id]?.usd})\n` +
                    `*Special Request:* ${bookingForm.message || 'None'}\n\n` +
                    `Please confirm this booking. Thank you!`
                    
      const encoded = encodeURIComponent(waMsg)
      setTimeout(() => {
        window.open(`https://wa.me/923004634548?text=${encoded}`, '_blank')
        // Reset state
        setBookingModalOpen(false)
        setSuccess(false)
        setBookingForm({ name: '', email: '', phone: '', date: '', time: '', travelers: '1', message: '' })
      }, 1500)

    } catch (err) {
      console.error(err)
      alert('Something went wrong, opening WhatsApp booking directly.')
      // Fallback direct WhatsApp open
      const waMsg = `Hi, I want to book a ${bookingCar.name} from ${bookingRoute.name}.`
      window.open(`https://wa.me/923004634548?text=${encodeURIComponent(waMsg)}`, '_blank')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-[#001b1c] font-manrope text-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center pt-32 overflow-hidden bg-[#001b1c] text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1600&q=80" alt="Taxi Services" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001b1c] via-[#001b1c]/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-24 w-full text-center">
          <span className="text-[#ffc65c] text-xs font-black tracking-[0.4em] uppercase block mb-4">Premium Ground Transport</span>
          <h1 className="font-notoSerif text-4xl sm:text-5xl lg:text-7xl font-black mb-6 leading-tight">
            VIP Taxi & <span className="text-[#ffc65c]">Luxury Fleet</span>
          </h1>
          <p className="text-white/80 text-base sm:text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
            Travel in complete peace of mind. We offer private, custom transfers between Jeddah Airports, Makkah Hotels, Madinah Holy Sites, and train stations. Book your ideal vehicle now.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => scrollToId('our-vehicles')}
              className="bg-[#ffc65c] text-[#001b1c] px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all hover:scale-105 shadow-xl"
            >
              Browse Fleet
            </button>
            <button 
              onClick={() => scrollToId('select-route')}
              className="bg-transparent border border-white/30 text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all hover:bg-white/5"
            >
              View Route Prices
            </button>
          </div>
        </div>
      </section>

      {/* STEP 1: OUR VEHICLES FLEET SECTION */}
      <section id="our-vehicles" className="py-24 bg-white text-[#001b1c]">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#013334] text-xs font-black tracking-[0.3em] uppercase block mb-3">VIP Fleet Catalog</span>
            <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-black text-[#013334]">Our Vehicles</h2>
            <div className="w-16 h-1 bg-[#ffc65c] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fleet.map((vehicle) => (
              <div key={vehicle.id} className="bg-white rounded-2xl overflow-hidden border border-gray-150 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col group">
                {/* Vehicle Image Container */}
                <div className="h-56 bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
                  <img 
                    src={vehicle.image_url} 
                    alt={vehicle.name} 
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Vehicle Specs & Details */}
                <div className="bg-[#003334] p-6 text-white text-center flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-notoSerif text-2xl font-black mb-4 tracking-wider uppercase">{vehicle.name}</h3>
                    <div className="w-12 h-[1px] bg-white/20 mx-auto mb-4"></div>
                    
                    <ul className="space-y-3 mb-8 text-xs text-white/80 font-medium">
                      <li className="flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-sm text-[#ffc65c]">group</span>
                        {vehicle.seats}
                      </li>
                      <li className="flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-sm text-[#ffc65c]">backpack</span>
                        {vehicle.luggage}
                      </li>
                      <li className="flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-sm text-[#ffc65c]">ac_unit</span>
                        {vehicle.ac}
                      </li>
                    </ul>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <a 
                      href={`https://wa.me/923004634548?text=Hello%20Habib%20Ul%20Hujjaj%2C%20I%20am%20inquiring%20about%20the%20${vehicle.name}%20vehicle%20service.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-[#ffc65c] text-[#ffc65c] py-3 rounded-lg font-black text-[10px] sm:text-xs uppercase tracking-widest hover:bg-[#ffc65c] hover:text-[#001c1d] transition-all duration-300"
                    >
                      WhatsApp
                    </a>
                    <button 
                      onClick={() => {
                        setSelectedVehicle(vehicle)
                        scrollToId('select-route')
                      }}
                      className="bg-[#ffc65c] text-[#001c1d] py-3 rounded-lg font-black text-[10px] sm:text-xs uppercase tracking-widest hover:brightness-110 transition-all duration-300"
                    >
                      BOOK NOW
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEP 2: CHOOSE ROUTE SECTION */}
      <section id="select-route" className="py-24 bg-[#001c1d] text-white">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#ffc65c] text-xs font-black tracking-[0.3em] uppercase block mb-3">Sacred Routes Catalog</span>
            <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-black text-white">Select Your Destination</h2>
            <p className="text-white/60 text-sm mt-3">Select a route below to view available vehicles and route-specific pricing.</p>
            <div className="w-16 h-1 bg-[#ffc65c] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {routes.map((route) => (
              <div 
                key={route.id} 
                className={`bg-[#002f30] rounded-xl overflow-hidden border transition-all duration-500 flex flex-col justify-between group ${
                  selectedRoute?.id === route.id ? 'border-[#ffc65c] ring-2 ring-[#ffc65c]/45 scale-[1.03]' : 'border-white/5 hover:border-white/20'
                }`}
              >
                {/* Route Header Image */}
                <div className="h-36 overflow-hidden relative">
                  <img 
                    src={route.image} 
                    alt={route.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002f30] to-transparent"></div>
                </div>

                {/* Route Content */}
                <div className="p-5 flex-1 flex flex-col justify-between text-center">
                  <h3 className="font-notoSerif text-base sm:text-lg font-bold mb-6 text-white group-hover:text-[#ffc65c] transition-colors">{route.name}</h3>
                  
                  <button 
                    onClick={() => {
                      setSelectedRoute(route)
                      setTimeout(() => scrollToId('route-pricing'), 100)
                    }}
                    className={`w-full py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${
                      selectedRoute?.id === route.id 
                        ? 'bg-[#ffc65c] text-[#001c1d]' 
                        : 'bg-white text-[#001c1d] hover:bg-gray-100'
                    }`}
                  >
                    {selectedRoute?.id === route.id ? 'Selected' : 'Book Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEP 3: ROUTE PRICING & OPTIONS SECTION */}
      {selectedRoute && (
        <section id="route-pricing" className="py-24 bg-[#002526] border-t border-white/5 scroll-mt-6">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-24">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#ffc65c] text-xs font-black tracking-[0.3em] uppercase block mb-3">Vehicle Prices for Selected Route</span>
              <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-black text-white">{selectedRoute.name}</h2>
              <p className="text-white/60 text-sm mt-3">Showing live rates for all vehicle classes. Prices are fully inclusive of tolls, driver, fuel, and meet & greet assistance.</p>
              <div className="w-16 h-1 bg-[#ffc65c] mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {fleet.map((vehicle) => {
                const price = selectedRoute.prices[vehicle.id] || { sar: 250, usd: 67 }
                return (
                  <div key={vehicle.id} className="bg-[#003334] rounded-2xl overflow-hidden border border-white/10 p-5 flex flex-col justify-between text-center group hover:border-[#ffc65c]/40 transition-all duration-300">
                    <div>
                      {/* Vehicle Image */}
                      <div className="h-32 flex items-center justify-center p-2 mb-4 bg-white/5 rounded-xl">
                        <img 
                          src={vehicle.image_url} 
                          alt={vehicle.name} 
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      {/* Title & Info */}
                      <h4 className="font-notoSerif text-base font-bold text-white mb-2">{vehicle.name} – {selectedRoute.name}</h4>
                      
                      {/* Price Display */}
                      <div className="my-6">
                        <p className="text-xl font-black text-[#ffc65c]">{price.sar} SAR <span className="text-xs text-white/50 font-medium">(≈ {price.usd} $)</span></p>
                      </div>
                    </div>

                    {/* Book Now Button */}
                    <button 
                      onClick={() => {
                        setBookingCar(vehicle)
                        setBookingRoute(selectedRoute)
                        setBookingModalOpen(true)
                      }}
                      className="w-full bg-[#ffc65c] text-[#001c1d] py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all"
                    >
                      Book Now
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* WHY CHOOSE US / STATS SECTION */}
      <section className="bg-white py-24 text-[#001b1c]">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-24">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[#013334] text-xs font-black tracking-[0.3em] uppercase block mb-3">Why Travel With Us</span>
            <h2 className="font-notoSerif text-3xl sm:text-4xl font-bold text-[#013334]">Safe & Luxury Transport</h2>
            <div className="w-16 h-1 bg-[#ffc65c] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
              <span className="material-symbols-outlined text-5xl text-[#ffc65c] mb-6">workspace_premium</span>
              <h4 className="font-notoSerif text-xl font-bold mb-3 text-[#013334]">Chilled Luxury Fleet</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                Enjoy fully air-conditioned, new-model sedans, SUVs, minivans, and coaches. Deeply cleaned after every transfer.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
              <span className="material-symbols-outlined text-5xl text-[#ffc65c] mb-6">face</span>
              <h4 className="font-notoSerif text-xl font-bold mb-3 text-[#013334]">Licensed Holy-Site Drivers</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                Our highly polite, reliable drivers possess deep, specialized knowledge of sacred landmarks, mosques, and terminals.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
              <span className="material-symbols-outlined text-5xl text-[#ffc65c] mb-6">schedule</span>
              <h4 className="font-notoSerif text-xl font-bold mb-3 text-[#013334]">24/7 Meet & Greet Service</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                Always prompt. We track all incoming flight numbers real-time and coordinate immediate passenger pickup directly from terminals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING MODAL */}
      {bookingModalOpen && bookingCar && bookingRoute && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#002f30] border border-white/10 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative animate-fadeIn text-left">
            <button 
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="p-6 md:p-8">
              <h3 className="font-notoSerif text-2xl font-bold text-white mb-2">Book Your Vehicle</h3>
              <p className="text-[#ffc65c] text-xs font-semibold mb-6">
                {bookingCar.name} • {bookingRoute.name}
              </p>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1.5">Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    className="w-full bg-[#001c1d] border border-white/15 rounded-lg py-2 px-3 text-sm focus:border-[#ffc65c] focus:ring-0 text-white"
                    placeholder="Enter your name" 
                    value={bookingForm.name} 
                    onChange={e => setBookingForm({...bookingForm, name: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1.5">Email (Optional)</label>
                    <input 
                      type="email" 
                      className="w-full bg-[#001c1d] border border-white/15 rounded-lg py-2 px-3 text-sm focus:border-[#ffc65c] focus:ring-0 text-white"
                      placeholder="Email address" 
                      value={bookingForm.email} 
                      onChange={e => setBookingForm({...bookingForm, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1.5">Phone / WhatsApp *</label>
                    <input 
                      type="tel" 
                      required 
                      className="w-full bg-[#001c1d] border border-white/15 rounded-lg py-2 px-3 text-sm focus:border-[#ffc65c] focus:ring-0 text-white"
                      placeholder="e.g. +92 300 1234567" 
                      value={bookingForm.phone} 
                      onChange={e => setBookingForm({...bookingForm, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1.5">Pickup Date *</label>
                    <input 
                      type="date" 
                      required
                      className="w-full bg-[#001c1d] border border-white/15 rounded-lg py-2 px-3 text-sm focus:border-[#ffc65c] focus:ring-0 text-white"
                      value={bookingForm.date} 
                      onChange={e => setBookingForm({...bookingForm, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1.5">Pickup Time *</label>
                    <input 
                      type="time" 
                      required
                      className="w-full bg-[#001c1d] border border-white/15 rounded-lg py-2 px-3 text-sm focus:border-[#ffc65c] focus:ring-0 text-white"
                      value={bookingForm.time} 
                      onChange={e => setBookingForm({...bookingForm, time: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1.5">Travelers</label>
                    <select 
                      className="w-full bg-[#001c1d] border border-white/15 rounded-lg py-2 px-3 text-sm focus:border-[#ffc65c] focus:ring-0 text-white"
                      value={bookingForm.travelers} 
                      onChange={e => setBookingForm({...bookingForm, travelers: e.target.value})}
                    >
                      {[...Array(50).keys()].map(n => (
                        <option key={n + 1} value={n + 1} className="bg-[#001c1d]">{n + 1} Person{n > 0 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1.5">Fare</label>
                    <div className="w-full bg-[#001c1d]/60 border border-white/5 rounded-lg py-2 px-3 text-sm font-bold text-[#ffc65c]">
                      {bookingRoute.prices[bookingCar.id]?.sar} SAR (≈ ${bookingRoute.prices[bookingCar.id]?.usd})
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1.5">Special Instructions</label>
                  <textarea 
                    className="w-full bg-[#001c1d] border border-white/15 rounded-lg py-2 px-3 text-sm focus:border-[#ffc65c] focus:ring-0 text-white"
                    placeholder="Flight Number, hotel name, extra baggage notes..." 
                    rows={2} 
                    value={bookingForm.message} 
                    onChange={e => setBookingForm({...bookingForm, message: e.target.value})}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full bg-[#ffc65c] text-[#001c1d] py-3.5 rounded-lg font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2 mt-4"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#001c1d] border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : success ? (
                    'Success! Redirecting...'
                  ) : (
                    'Confirm Booking via WhatsApp'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default TaxiServices
