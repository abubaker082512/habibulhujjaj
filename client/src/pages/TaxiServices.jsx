import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import { createClient } from '@supabase/supabase-js'

const API_BASE = import.meta.env.VITE_API_URL || ''

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null

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
  const [fleet, setFleet] = useState([])
  const [routes, setRoutes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTaxiData = async () => {
      try {
        let dbServices = []
        if (supabase) {
          // Direct client-to-database connection: sub-100ms load time without Vercel serverless overhead
          const { data, error } = await supabase.from('taxi_services').select('*').order('created_at', { ascending: false })
          if (!error && data) {
            dbServices = data
          } else {
            console.warn('Supabase direct query failed, calling API fallback...', error)
            const res = await axios.get(`${API_BASE}/api/taxi`)
            dbServices = res.data
          }
        } else {
          const res = await axios.get(`${API_BASE}/api/taxi`)
          dbServices = res.data
        }

        if (Array.isArray(dbServices) && dbServices.length > 0) {
          // 1. Dynamic fleet builder
          const fleetMap = new Map()
          
          // Add custom vehicle specifications & images from database first (name === '__VEHICLE_META__')
          dbServices.filter(s => s.name === '__VEHICLE_META__').forEach(s => {
            const vKey = s.vehicle_type ? s.vehicle_type.toLowerCase() : ''
            if (vKey) {
              let lug = 'Standard Luggage'
              let ac = s.description || 'AC Chilled Vehicle'
              if (s.description && s.description.includes(',')) {
                const parts = s.description.split(',')
                lug = parts[0].trim()
                ac = parts[1].trim()
              }
              fleetMap.set(vKey, {
                id: vKey.replace(/[^a-z0-9]/g, '-'),
                name: s.vehicle_type.toUpperCase(),
                seats: s.capacity || '4 Person Seat Vehicle',
                luggage: lug,
                ac: ac,
                image_url: s.image_url || 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80',
                whatsapp: '+996596812961'
              })
            }
          })
          
          // Also check for any vehicle type mentioned in pricing rows that has no meta row yet,
          // and auto-fill it with standard defaults if known, or placeholders if custom.
          dbServices.filter(s => s.name !== '__VEHICLE_META__' && s.vehicle_type !== '__ROUTE_BANNER__').forEach(s => {
            const vKey = s.vehicle_type ? s.vehicle_type.toLowerCase() : ''
            if (vKey && !fleetMap.has(vKey)) {
              // Try to find a standard default vehicle with this name
              const standardDef = fleetData.find(f => f.name.toLowerCase() === vKey)
              if (standardDef) {
                fleetMap.set(vKey, { ...standardDef })
              } else {
                fleetMap.set(vKey, {
                  id: vKey.replace(/[^a-z0-9]/g, '-'),
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
          
          const computedFleet = Array.from(fleetMap.values())
          setFleet(computedFleet)
          
          // 2. Dynamic routes builder
          const routesMap = new Map()
          
          // Add custom route banner definitions from database first (s.vehicle_type === '__ROUTE_BANNER__')
          dbServices.filter(s => s.vehicle_type === '__ROUTE_BANNER__').forEach(s => {
            const rKey = s.name ? s.name.toLowerCase() : ''
            if (rKey) {
              routesMap.set(rKey, {
                id: rKey.replace(/[^a-z0-9]/g, '-'),
                name: s.name,
                image: s.image_url || 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80',
                category: s.category || 'One Way',
                prices: {}
              })
            }
          })
          
          // Also check for any routes mentioned in pricing rows that have no meta row yet,
          // and auto-fill with defaults if known or placeholders.
          dbServices.filter(s => s.name !== '__VEHICLE_META__' && s.vehicle_type !== '__ROUTE_BANNER__').forEach(s => {
            const rKey = s.name ? s.name.toLowerCase() : ''
            if (rKey && !routesMap.has(rKey)) {
              const standardRoute = routesData.find(r => r.name.toLowerCase() === rKey)
              if (standardRoute) {
                // Create a clone of standard route with an empty pricing map so we only fill it from DB!
                routesMap.set(rKey, {
                  ...standardRoute,
                  prices: {}
                })
              } else {
                routesMap.set(rKey, {
                  id: rKey.replace(/[^a-z0-9]/g, '-'),
                  name: s.name,
                  image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80',
                  category: s.category || 'One Way',
                  prices: {}
                })
              }
            }
          })
          
          // 3. Map all specific prices
          dbServices.filter(s => s.name !== '__VEHICLE_META__' && s.vehicle_type !== '__ROUTE_BANNER__').forEach(s => {
            const rKey = s.name ? s.name.toLowerCase() : ''
            if (rKey && routesMap.has(rKey)) {
              const vKey = s.vehicle_type ? s.vehicle_type.toLowerCase() : ''
              const vId = vKey.replace(/[^a-z0-9]/g, '-')
              const priceVal = parseFloat(s.price) || 0
              
              const routeObj = routesMap.get(rKey)
              routeObj.prices[vId] = {
                sar: priceVal,
                usd: Math.round(priceVal / 3.75)
              }
            }
          })
          
          const computedRoutes = Array.from(routesMap.values())
          setRoutes(computedRoutes)
        } else {
          // If the database has absolutely zero taxi records (e.g. fresh environment), load premium defaults
          setFleet(fleetData)
          setRoutes(routesData)
        }
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch dynamic taxi services:', err)
        setFleet(fleetData)
        setRoutes(routesData)
        setLoading(false)
      }
    }

    fetchTaxiData()
  }, [])
  
  // Modal booking states
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [bookingCar, setBookingCar] = useState(null)
  const [bookingRoute, setBookingRoute] = useState(null)
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+92',
    date: '',
    time: '',
    travelers: '1',
    message: ''
  })
  const [formErrors, setFormErrors] = useState({})
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

    // Validations
    const errors = {};
    if (!bookingForm.name || bookingForm.name.trim().length < 3) {
      errors.name = "Name must be at least 3 characters.";
    } else if (!/^[a-zA-Z\s]+$/.test(bookingForm.name)) {
      errors.name = "Name can only contain letters.";
    }

    const cleanPhone = bookingForm.phone.replace(/[\s-()]/g, "");
    if (!cleanPhone || !/^\d{7,15}$/.test(cleanPhone)) {
      errors.phone = "Enter a valid phone number (7-15 digits).";
    }

    const pickDate = new Date(bookingForm.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (pickDate < today) {
      errors.date = "Pickup date cannot be in the past.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    
    setSubmitting(true)
    
    const fullPhone = `${bookingForm.countryCode} ${cleanPhone}`;
    const subject = `Booking: Taxi Service (${bookingCar.name})`
    const desc = `Route: ${bookingRoute.name}\nVehicle: ${bookingCar.name} (${bookingCar.seats})\nTravelers: ${bookingForm.travelers} Persons\nDate: ${bookingForm.date} at ${bookingForm.time}\nNotes: ${bookingForm.message}`
    
    try {
      // 1. Submit lead details to dashboard
      await axios.post(`${API_BASE}/api/submissions`, {
        name: bookingForm.name,
        email: bookingForm.email || 'N/A',
        phone: fullPhone,
        subject: subject,
        message: desc
      })
      
      setSuccess(true)
      
      // 2. Open Whatsapp directly
      const waMsg = `*NEW TAXI BOOKING REQUEST*\n\n` +
                    `*Customer:* ${bookingForm.name}\n` +
                    `*Phone:* ${fullPhone}\n` +
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
        setBookingForm({ name: '', email: '', phone: '', countryCode: '+92', date: '', time: '', travelers: '1', message: '' })
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
    <div className="bg-[#0B1B3D] font-manrope text-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center pt-32 overflow-hidden bg-[#0B1B3D] text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1600&q=80" alt="Taxi Services" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D] via-[#0B1B3D]/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-24 w-full text-center">
          <span className="text-[#FFC55B] text-xs font-black tracking-[0.4em] uppercase block mb-4">Premium Ground Transport</span>
          <h1 className="font-notoSerif text-4xl sm:text-5xl lg:text-7xl font-black mb-6 leading-tight">
            VIP Taxi & <span className="text-[#FFC55B]">Luxury Fleet</span>
          </h1>
          <p className="text-white/80 text-base sm:text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
            Travel in complete peace of mind. We offer private, custom transfers between Jeddah Airports, Makkah Hotels, Madinah Holy Sites, and train stations. Book your ideal vehicle now.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => scrollToId('our-vehicles')}
              className="bg-[#FFC55B] text-[#0B1B3D] px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all hover:scale-105 shadow-xl"
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

      {loading ? (
        <div className="py-32 bg-[#0B1B3D] flex flex-col items-center justify-center text-center min-h-[50vh]">
          <div className="relative w-20 h-20 mb-8">
            <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-[#FFC55B] border-r-[#FFC55B]/30 animate-spin"></div>
          </div>
          <p className="text-white/60 font-notoSerif text-lg tracking-wider animate-pulse">Loading Sacred Ground Transfers...</p>
        </div>
      ) : (
        <>
          {/* STEP 1: OUR VEHICLES FLEET SECTION */}
          <section id="our-vehicles" className="py-24 bg-background text-[#0B1B3D]">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#0B1B3D] text-xs font-black tracking-[0.3em] uppercase block mb-3">VIP Fleet Catalog</span>
            <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1B3D]">Our Vehicles</h2>
            <div className="w-16 h-1 bg-[#FFC55B] mx-auto mt-4"></div>
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
                        <span className="material-symbols-outlined text-sm text-[#FFC55B]">group</span>
                        {vehicle.seats}
                      </li>
                      <li className="flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-sm text-[#FFC55B]">backpack</span>
                        {vehicle.luggage}
                      </li>
                      <li className="flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-sm text-[#FFC55B]">ac_unit</span>
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
                      className="border border-[#FFC55B] text-[#FFC55B] py-3 rounded-lg font-black text-[10px] sm:text-xs uppercase tracking-widest hover:bg-[#FFC55B] hover:text-[#0B1B3D] transition-all duration-300"
                    >
                      WhatsApp
                    </a>
                    <button 
                      onClick={() => {
                        setSelectedVehicle(vehicle)
                        scrollToId('select-route')
                      }}
                      className="bg-[#FFC55B] text-[#0B1B3D] py-3 rounded-lg font-black text-[10px] sm:text-xs uppercase tracking-widest hover:brightness-110 transition-all duration-300"
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
      <section id="select-route" className="py-24 bg-[#0B1B3D] text-white">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#FFC55B] text-xs font-black tracking-[0.3em] uppercase block mb-3">Sacred Routes Catalog</span>
            <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-black text-white">Select Your Destination</h2>
            <p className="text-white/60 text-sm mt-3">Select a route below to view available vehicles and route-specific pricing.</p>
            <div className="w-16 h-1 bg-[#FFC55B] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {routes.map((route) => (
              <div 
                key={route.id} 
                className={`bg-[#182d56] rounded-xl overflow-hidden border transition-all duration-500 flex flex-col justify-between group ${
                  selectedRoute?.id === route.id ? 'border-[#FFC55B] ring-2 ring-[#FFC55B]/45 scale-[1.03]' : 'border-white/5 hover:border-white/20'
                }`}
              >
                {/* Route Header Image */}
                <div className="h-36 overflow-hidden relative">
                  <img 
                    src={route.image} 
                    alt={route.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#182d56] to-transparent"></div>
                </div>

                {/* Route Content */}
                <div className="p-5 flex-1 flex flex-col justify-between text-center">
                  <h3 className="font-notoSerif text-base sm:text-lg font-bold mb-6 text-white group-hover:text-[#FFC55B] transition-colors">{route.name}</h3>
                  
                  <button 
                    onClick={() => {
                      setSelectedRoute(route)
                      setTimeout(() => scrollToId('route-pricing'), 100)
                    }}
                    className={`w-full py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${
                      selectedRoute?.id === route.id 
                        ? 'bg-[#FFC55B] text-[#0B1B3D]' 
                        : 'bg-white text-[#0B1B3D] hover:bg-gray-100'
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
        <section id="route-pricing" className="py-24 bg-[#12244a] border-t border-white/5 scroll-mt-6">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-24">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#FFC55B] text-xs font-black tracking-[0.3em] uppercase block mb-3">Vehicle Prices for Selected Route</span>
              <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-black text-white">{selectedRoute.name}</h2>
              <p className="text-white/60 text-sm mt-3">Showing live rates for all vehicle classes. Prices are fully inclusive of tolls, driver, fuel, and meet & greet assistance.</p>
              <div className="w-16 h-1 bg-[#FFC55B] mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {fleet.map((vehicle) => {
                const price = selectedRoute.prices[vehicle.id] || { sar: 250, usd: 67 }
                return (
                  <div key={vehicle.id} className="bg-[#003334] rounded-2xl overflow-hidden border border-white/10 p-5 flex flex-col justify-between text-center group hover:border-[#FFC55B]/40 transition-all duration-300">
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
                        <p className="text-xl font-black text-[#FFC55B]">{price.sar} SAR <span className="text-xs text-white/50 font-medium">(≈ {price.usd} $)</span></p>
                      </div>
                    </div>

                    {/* Book Now Button */}
                    <button 
                      onClick={() => {
                        setBookingCar(vehicle)
                        setBookingRoute(selectedRoute)
                        setBookingModalOpen(true)
                      }}
                      className="w-full bg-[#FFC55B] text-[#0B1B3D] py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all"
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
      <section className="bg-background py-24 text-[#0B1B3D]">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-24">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[#0B1B3D] text-xs font-black tracking-[0.3em] uppercase block mb-3">Why Travel With Us</span>
            <h2 className="font-notoSerif text-3xl sm:text-4xl font-bold text-[#0B1B3D]">Safe & Luxury Transport</h2>
            <div className="w-16 h-1 bg-[#FFC55B] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
              <span className="material-symbols-outlined text-5xl text-[#FFC55B] mb-6">workspace_premium</span>
              <h4 className="font-notoSerif text-xl font-bold mb-3 text-[#0B1B3D]">Chilled Luxury Fleet</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                Enjoy fully air-conditioned, new-model sedans, SUVs, minivans, and coaches. Deeply cleaned after every transfer.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
              <span className="material-symbols-outlined text-5xl text-[#FFC55B] mb-6">face</span>
              <h4 className="font-notoSerif text-xl font-bold mb-3 text-[#0B1B3D]">Licensed Holy-Site Drivers</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                Our highly polite, reliable drivers possess deep, specialized knowledge of sacred landmarks, mosques, and terminals.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
              <span className="material-symbols-outlined text-5xl text-[#FFC55B] mb-6">schedule</span>
              <h4 className="font-notoSerif text-xl font-bold mb-3 text-[#0B1B3D]">24/7 Meet & Greet Service</h4>
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
          <div className="bg-[#182d56] border border-white/10 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative animate-fadeIn text-left">
            <button 
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="p-6 md:p-8">
              <h3 className="font-notoSerif text-2xl font-bold text-white mb-2">Book Your Vehicle</h3>
              <p className="text-[#FFC55B] text-xs font-semibold mb-6">
                {bookingCar.name} • {bookingRoute.name}
              </p>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1.5">Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    className="w-full bg-[#0B1B3D] border border-white/15 rounded-lg py-2 px-3 text-sm focus:border-[#FFC55B] focus:ring-0 text-white"
                    placeholder="Enter your name" 
                    value={bookingForm.name} 
                    onChange={e => setBookingForm({...bookingForm, name: e.target.value})}
                  />
                  {formErrors.name && <p className="text-[#FFC55B] text-[10px] mt-1 font-bold">{formErrors.name}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1.5">Email (Optional)</label>
                    <input 
                      type="email" 
                      className="w-full bg-[#0B1B3D] border border-white/15 rounded-lg py-2 px-3 text-sm focus:border-[#FFC55B] focus:ring-0 text-white"
                      placeholder="Email address" 
                      value={bookingForm.email} 
                      onChange={e => setBookingForm({...bookingForm, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1.5">Phone / WhatsApp *</label>
                    <div className="flex gap-2">
                      <select
                        name="countryCode"
                        value={bookingForm.countryCode}
                        onChange={e => setBookingForm({...bookingForm, countryCode: e.target.value})}
                        className="bg-[#0B1B3D] border border-white/15 rounded-lg py-2 px-2 text-xs text-white cursor-pointer w-20 shrink-0 focus:border-[#FFC55B] outline-none"
                      >
                        <option value="+92" className="bg-[#0B1B3D]">PK (+92)</option>
                        <option value="+966" className="bg-[#0B1B3D]">SA (+966)</option>
                        <option value="+971" className="bg-[#0B1B3D]">AE (+971)</option>
                        <option value="+44" className="bg-[#0B1B3D]">UK (+44)</option>
                        <option value="+1" className="bg-[#0B1B3D]">US (+1)</option>
                        <option value="+90" className="bg-[#0B1B3D]">TR (+90)</option>
                        <option value="+965" className="bg-[#0B1B3D]">KW (+965)</option>
                        <option value="+974" className="bg-[#0B1B3D]">QA (+974)</option>
                        <option value="+973" className="bg-[#0B1B3D]">BH (+973)</option>
                        <option value="+968" className="bg-[#0B1B3D]">OM (+968)</option>
                        <option value="+91" className="bg-[#0B1B3D]">IN (+91)</option>
                        <option value="+880" className="bg-[#0B1B3D]">BD (+880)</option>
                      </select>
                      <input 
                        type="tel" 
                        required 
                        className="w-full bg-[#0B1B3D] border border-white/15 rounded-lg py-2 px-3 text-sm focus:border-[#FFC55B] focus:ring-0 text-white flex-grow"
                        placeholder="e.g. 300 1234567" 
                        value={bookingForm.phone} 
                        onChange={e => setBookingForm({...bookingForm, phone: e.target.value})}
                      />
                    </div>
                    {formErrors.phone && <p className="text-[#FFC55B] text-[10px] mt-1 font-bold">{formErrors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1.5">Pickup Date *</label>
                    <input 
                      type="date" 
                      required
                      className="w-full bg-[#0B1B3D] border border-white/15 rounded-lg py-2 px-3 text-sm focus:border-[#FFC55B] focus:ring-0 text-white"
                      value={bookingForm.date} 
                      onChange={e => setBookingForm({...bookingForm, date: e.target.value})}
                    />
                    {formErrors.date && <p className="text-[#FFC55B] text-[10px] mt-1 font-bold">{formErrors.date}</p>}
                  </div>
                  <div>
                    <label className="block text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1.5">Pickup Time *</label>
                    <input 
                      type="time" 
                      required
                      className="w-full bg-[#0B1B3D] border border-white/15 rounded-lg py-2 px-3 text-sm focus:border-[#FFC55B] focus:ring-0 text-white"
                      value={bookingForm.time} 
                      onChange={e => setBookingForm({...bookingForm, time: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1.5">Travelers</label>
                    <select 
                      className="w-full bg-[#0B1B3D] border border-white/15 rounded-lg py-2 px-3 text-sm focus:border-[#FFC55B] focus:ring-0 text-white"
                      value={bookingForm.travelers} 
                      onChange={e => setBookingForm({...bookingForm, travelers: e.target.value})}
                    >
                      {[...Array(50).keys()].map(n => (
                        <option key={n + 1} value={n + 1} className="bg-[#0B1B3D]">{n + 1} Person{n > 0 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1.5">Fare</label>
                    <div className="w-full bg-[#0B1B3D]/60 border border-white/5 rounded-lg py-2 px-3 text-sm font-bold text-[#FFC55B]">
                      {bookingRoute.prices[bookingCar.id]?.sar} SAR (≈ ${bookingRoute.prices[bookingCar.id]?.usd})
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1.5">Special Instructions</label>
                  <textarea 
                    className="w-full bg-[#0B1B3D] border border-white/15 rounded-lg py-2 px-3 text-sm focus:border-[#FFC55B] focus:ring-0 text-white"
                    placeholder="Flight Number, hotel name, extra baggage notes..." 
                    rows={2} 
                    value={bookingForm.message} 
                    onChange={e => setBookingForm({...bookingForm, message: e.target.value})}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full bg-[#FFC55B] text-[#0B1B3D] py-3.5 rounded-lg font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2 mt-4"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#0B1B3D] border-t-transparent rounded-full animate-spin"></div>
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

        </>
      )}

      <Footer />
    </div>
  )
}

export default TaxiServices
