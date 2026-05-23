import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import { createClient } from '@supabase/supabase-js'

const API_BASE = import.meta.env.VITE_API_URL || ''

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null

const staticDestinations = [
  { id: 1, name: 'London', description: 'Experience the grandeur of the British Capital with executive service.', image_url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80', price_start: 125000 },
  { id: 2, name: 'Paris', description: 'Journey to the ultimate city of art, culture, and premium lifestyle.', image_url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80', price_start: 145000 },
  { id: 3, name: 'Dubai', description: 'Witness architectural marvels and luxury shopping in the golden oasis.', image_url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80', price_start: 85000 },
  { id: 4, name: 'Istanbul', description: 'Walk through dynamic history where two continents merge elegantly.', image_url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80', price_start: 95000 }
]

const Flights = () => {
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(true)
  const [cmsContent, setCmsContent] = useState({
    heroTitle: 'BOOK YOUR DREAM JOURNEY WITH HABIB UL HUJJAJ',
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

  // Form Booking States
  const [formType, setFormType] = useState('roundTrip')
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    countryCode: '+92',
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    travelClass: 'Economy',
    passengers: '1 Passenger'
  })
  const [formErrors, setFormErrors] = useState({})
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    // Dynamic ultra-fast parallel fetch
    const fetchAllData = async () => {
      try {
        let dbDestinations = []
        if (supabase) {
          const { data, error } = await supabase.from('flights_destinations').select('*').order('created_at', { ascending: false })
          if (!error && data) {
            dbDestinations = data
          } else {
            const res = await axios.get(`${API_BASE}/api/flights`)
            dbDestinations = res.data
          }
        } else {
          const res = await axios.get(`${API_BASE}/api/flights`)
          dbDestinations = res.data
        }

        if (Array.isArray(dbDestinations) && dbDestinations.length > 0) {
          setDestinations(dbDestinations)
        } else {
          setDestinations(staticDestinations)
        }
      } catch (err) {
        console.error('Error fetching destinations:', err)
        setDestinations(staticDestinations)
      } finally {
        setLoading(false)
      }
    }

    fetchAllData()

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    // Validations
    const errors = {};
    if (!formData.fullName || formData.fullName.trim().length < 3) {
      errors.fullName = "Name must be at least 3 characters.";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
      errors.fullName = "Name can only contain letters.";
    }

    const cleanPhone = formData.phone.replace(/[\s-()]/g, "");
    if (!cleanPhone || !/^\d{7,15}$/.test(cleanPhone)) {
      errors.phone = "Enter a valid phone number (7-15 digits).";
    }

    const dep = new Date(formData.departureDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (dep < today) {
      errors.departureDate = "Departure date cannot be in the past.";
    }

    if (formType === 'roundTrip' && formData.returnDate) {
      const ret = new Date(formData.returnDate);
      if (ret < dep) {
        errors.returnDate = "Return date cannot be before departure date.";
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});

    const fullPhone = `${formData.countryCode} ${cleanPhone}`;
    
    // Construct rich text message for WhatsApp
    const typeLabel = formType === 'roundTrip' ? '🔄 Round Trip' : '🛫 One Way'
    const returnInfo = formType === 'roundTrip' ? `\n📅 *Return Date:* ${formData.returnDate}` : ''
    
    const message = `✈️ *NEW FLIGHT BOOKING ENQUIRY* ✈️\n\n` +
      `👤 *Name:* ${formData.fullName}\n` +
      `📱 *WhatsApp:* ${fullPhone}\n` +
      `🔄 *Trip Type:* ${typeLabel}\n` +
      `🛫 *From:* ${formData.origin}\n` +
      `🛬 *To:* ${formData.destination}\n` +
      `📅 *Departure Date:* ${formData.departureDate}` +
      `${returnInfo}\n` +
      `💺 *Class:* ${formData.travelClass}\n` +
      `👥 *Passengers:* ${formData.passengers}\n\n` +
      `_Submitted via Habib Ul Hujjaj Flights Portal._`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/923004634548?text=${encodedMessage}`
    
    setFormSubmitted(true)
    setTimeout(() => {
      window.open(whatsappUrl, '_blank')
      setFormSubmitted(false)
    }, 1200)
  }

  const handleDirectWhatsAppBook = (destinationName, priceStart) => {
    const message = `✈️ *FLIGHT BOOKING ENQUIRY* ✈️\n\n` +
      `Hello Habib Ul Hujjaj,\n` +
      `I want to inquire about flight bookings for:\n` +
      `📍 *Destination:* ${destinationName}\n` +
      `💵 *Starting From:* Rs ${priceStart.toLocaleString()}\n\n` +
      `Please guide me with the available flight options and packages.`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/923004634548?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-[#0B1B3D] font-manrope text-white overflow-x-hidden">
      <Navbar />

      {/* Redesigned Premium Hero Section */}
      <section className="relative min-h-[90vh] pt-32 pb-16 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/flights_hero_bg.png" 
            className="w-full h-full object-cover object-center filter brightness-[0.35]" 
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1B3D]/85 via-[#182d56]/60 to-[#0B1B3D]"></div>
          
          {/* Subtle animated light dots representing flight routes */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#FFC55B] rounded-full animate-ping opacity-60"></div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-[#FFC55B] rounded-full animate-ping delay-1000 opacity-40"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Premium Text Content */}
            <div className="lg:col-span-6 space-y-6 text-left animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <span className="material-symbols-outlined text-[#FFC55B] text-sm animate-pulse">flight_takeoff</span>
                <span className="text-[10px] font-black tracking-widest text-[#FFC55B] uppercase">Habib Ul Hujjaj VIP Ticketing</span>
              </div>
              <h1 className="font-notoSerif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] uppercase tracking-tight">
                {cmsContent.heroTitle.includes('REHMAN') ? 'BOOK YOUR DREAM JOURNEY WITH HABIB UL HUJJAJ' : cmsContent.heroTitle}
              </h1>
              <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-xl">
                {cmsContent.heroSubtitle}
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 bg-[#182d56]/40 border border-white/5 py-2 px-3.5 rounded-xl">
                  <span className="material-symbols-outlined text-[#FFC55B] text-lg">verified_user</span>
                  <span className="text-xs text-white/80 font-bold">100% Secure Bookings</span>
                </div>
                <div className="flex items-center gap-2 bg-[#182d56]/40 border border-white/5 py-2 px-3.5 rounded-xl">
                  <span className="material-symbols-outlined text-[#FFC55B] text-lg">support_agent</span>
                  <span className="text-xs text-white/80 font-bold">24/7 Dedicated Support</span>
                </div>
              </div>
            </div>

            {/* Right Column: Instant WhatsApp Flight Booking Form */}
            <div className="lg:col-span-6 animate-slideUp">
              <div className="relative">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#FFC55B] to-emerald-500 opacity-20 blur-xl"></div>
                
                <div className="relative bg-[#182d56]/85 border border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl backdrop-blur-xl">
                  <h3 className="font-notoSerif text-xl sm:text-2xl font-bold text-white text-left mb-1">Instant Flight Enquiry</h3>
                  <p className="text-xs text-white/60 text-left mb-6">Submit details and negotiate prices directly on WhatsApp!</p>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    {/* Toggle Trip Type */}
                    <div className="grid grid-cols-2 gap-2 p-1 bg-[#0B1B3D] rounded-lg border border-white/5">
                      <button 
                        type="button" 
                        onClick={() => setFormType('roundTrip')}
                        className={`py-2 px-3 rounded text-xs font-bold transition-all ${formType === 'roundTrip' ? 'bg-[#FFC55B] text-[#0B1B3D] shadow' : 'text-white/60 hover:text-white'}`}
                      >
                        🔄 Round Trip
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setFormType('oneWay')}
                        className={`py-2 px-3 rounded text-xs font-bold transition-all ${formType === 'oneWay' ? 'bg-[#FFC55B] text-[#0B1B3D] shadow' : 'text-white/60 hover:text-white'}`}
                      >
                        🛫 One Way
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="text-left">
                        <label className="text-[10px] font-black text-[#FFC55B] uppercase tracking-wider block mb-1.5">Full Name</label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3 top-3 text-white/40 text-sm">person</span>
                          <input 
                            type="text" 
                            name="fullName"
                            required
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Enter your name" 
                            className="w-full p-2.5 pl-9 bg-[#0B1B3D] rounded-lg border border-white/5 text-white placeholder-white/30 text-xs focus:border-[#FFC55B] outline-none transition-all"
                          />
                        </div>
                        {formErrors.fullName && <p className="text-red-500 text-[10px] mt-1 font-bold">{formErrors.fullName}</p>}
                      </div>

                      {/* Phone */}
                      <div className="text-left">
                        <label className="text-[10px] font-black text-[#FFC55B] uppercase tracking-wider block mb-1.5">WhatsApp Number</label>
                        <div className="flex gap-2">
                          <select
                            name="countryCode"
                            value={formData.countryCode}
                            onChange={handleInputChange}
                            className="bg-[#0B1B3D] border border-white/5 rounded-lg py-2.5 px-3 text-xs text-white cursor-pointer w-24 shrink-0 focus:border-[#FFC55B] outline-none"
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
                          <div className="relative flex-grow">
                            <span className="material-symbols-outlined absolute left-3 top-3 text-white/40 text-sm">phone_iphone</span>
                            <input 
                              type="tel" 
                              name="phone"
                              required
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="e.g. 3001234567" 
                              className="w-full p-2.5 pl-9 bg-[#0B1B3D] rounded-lg border border-white/5 text-white placeholder-white/30 text-xs focus:border-[#FFC55B] outline-none transition-all"
                            />
                          </div>
                        </div>
                        {formErrors.phone && <p className="text-red-500 text-[10px] mt-1 font-bold">{formErrors.phone}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Origin */}
                      <div className="text-left">
                        <label className="text-[10px] font-black text-[#FFC55B] uppercase tracking-wider block mb-1.5">Origin City</label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3 top-3 text-white/40 text-sm">flight_takeoff</span>
                          <input 
                            type="text" 
                            name="origin"
                            required
                            value={formData.origin}
                            onChange={handleInputChange}
                            placeholder="e.g. Lahore (LHE)" 
                            className="w-full p-2.5 pl-9 bg-[#0B1B3D] rounded-lg border border-white/5 text-white placeholder-white/30 text-xs focus:border-[#FFC55B] outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Destination */}
                      <div className="text-left">
                        <label className="text-[10px] font-black text-[#FFC55B] uppercase tracking-wider block mb-1.5">Destination City</label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3 top-3 text-white/40 text-sm">flight_land</span>
                          <input 
                            type="text" 
                            name="destination"
                            required
                            value={formData.destination}
                            onChange={handleInputChange}
                            placeholder="e.g. Jeddah (JED)" 
                            className="w-full p-2.5 pl-9 bg-[#0B1B3D] rounded-lg border border-white/5 text-white placeholder-white/30 text-xs focus:border-[#FFC55B] outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Departure Date */}
                      <div className="text-left">
                        <label className="text-[10px] font-black text-[#FFC55B] uppercase tracking-wider block mb-1.5">Departure Date</label>
                        <div className="relative">
                          <input 
                            type="date" 
                            name="departureDate"
                            required
                            value={formData.departureDate}
                            onChange={handleInputChange}
                            className="w-full p-2.5 bg-[#0B1B3D] rounded-lg border border-white/5 text-white text-xs focus:border-[#FFC55B] outline-none transition-all"
                          />
                        </div>
                        {formErrors.departureDate && <p className="text-red-500 text-[10px] mt-1 font-bold">{formErrors.departureDate}</p>}
                      </div>

                      {/* Return Date */}
                      <div className="text-left">
                        <label className={`text-[10px] font-black text-[#FFC55B] uppercase tracking-wider block mb-1.5 ${formType === 'oneWay' ? 'opacity-30' : ''}`}>Return Date</label>
                        <div className="relative">
                          <input 
                            type="date" 
                            name="returnDate"
                            disabled={formType === 'oneWay'}
                            required={formType === 'roundTrip'}
                            value={formType === 'oneWay' ? '' : formData.returnDate}
                            onChange={handleInputChange}
                            className={`w-full p-2.5 bg-[#0B1B3D] rounded-lg border border-white/5 text-white text-xs focus:border-[#FFC55B] outline-none transition-all ${formType === 'oneWay' ? 'opacity-30 cursor-not-allowed' : ''}`}
                          />
                        </div>
                        {formErrors.returnDate && <p className="text-red-500 text-[10px] mt-1 font-bold">{formErrors.returnDate}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Class */}
                      <div className="text-left">
                        <label className="text-[10px] font-black text-[#FFC55B] uppercase tracking-wider block mb-1.5">Class</label>
                        <select 
                          name="travelClass"
                          value={formData.travelClass}
                          onChange={handleInputChange}
                          className="w-full p-2.5 bg-[#0B1B3D] rounded-lg border border-white/5 text-white text-xs focus:border-[#FFC55B] outline-none transition-all"
                        >
                          <option value="Economy">Economy Class</option>
                          <option value="Premium Economy">Premium Econ</option>
                          <option value="Business">Business Class</option>
                          <option value="First Class">First Class</option>
                        </select>
                      </div>

                      {/* Passengers */}
                      <div className="text-left">
                        <label className="text-[10px] font-black text-[#FFC55B] uppercase tracking-wider block mb-1.5">Passengers</label>
                        <select 
                          name="passengers"
                          value={formData.passengers}
                          onChange={handleInputChange}
                          className="w-full p-2.5 bg-[#0B1B3D] rounded-lg border border-white/5 text-white text-xs focus:border-[#FFC55B] outline-none transition-all"
                        >
                          <option value="1 Passenger">1 Passenger</option>
                          <option value="2 Passengers">2 Passengers</option>
                          <option value="3 Passengers">3 Passengers</option>
                          <option value="4 Passengers">4 Passengers</option>
                          <option value="5+ Passengers">5+ Passengers</option>
                        </select>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full bg-[#FFC55B] text-[#0B1B3D] py-3.5 rounded-lg font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg mt-4"
                    >
                      {formSubmitted ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[#0B1B3D] border-t-transparent rounded-full animate-spin"></div>
                          Connecting to WhatsApp...
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-[16px] font-bold">send</span>
                          Check Ticket Price on WhatsApp
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Narrative Section 1 */}
      <section className="py-24 bg-[#182d56]/40 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <div className="inline-flex w-12 h-[2px] bg-[#FFC55B] mb-6"></div>
          <h2 className="font-notoSerif text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 uppercase tracking-tight">
            YOUR NEXT ADVENTURE <span className="text-[#FFC55B]">BEGINS HERE!</span>
          </h2>
          <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-2xl mx-auto">
            {cmsContent.adventureSubtitle}
          </p>
        </div>
      </section>

      {/* Narrative Section 2 (Trust) */}
      <section className="py-24 bg-[#0B1B3D] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <h2 className="font-notoSerif text-2xl sm:text-3xl md:text-4xl font-bold mb-6 tracking-tight">
            {cmsContent.trustTitle.includes('REHMAN') ? 'TIRED OF OVERPRICED FLIGHTS AND HASSLES?' : cmsContent.trustTitle}
          </h2>
          <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
            {cmsContent.trustSubtitle}
          </p>
          <a 
            href="https://wa.me/923004634548?text=Hello%20Habib%20Ul%20Hujjaj,%20I%20want%20to%20consult%20about%20booking%20flights."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#FFC55B] text-[#0B1B3D] px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
          >
            <span className="material-symbols-outlined text-[16px] font-bold">chat</span>
            Book Your Free Consultation
          </a>
        </div>
      </section>

      {/* Redesigned Destinations Grid */}
      <section className="py-24 bg-[#182d56]/20 relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          <div className="text-center mb-16">
            <h2 className="font-notoSerif text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
              {cmsContent.destinationsTitle}
            </h2>
            <p className="text-white/60 text-sm font-light max-w-xl mx-auto">{cmsContent.destinationsSubtitle}</p>
            <div className="w-12 h-1 bg-[#FFC55B] mx-auto mt-4 rounded-full"></div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-10 h-10 border-4 border-[#FFC55B] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs uppercase tracking-widest text-[#FFC55B]">Loading Premium Destinations...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {destinations.map((dest, idx) => {
                // Curated mock details for premium boarding pass design
                const transit = idx % 2 === 0 ? "Direct Flight" : "1 Stopover";
                const airline = idx % 4 === 0 ? "Qatar Airways" : idx % 4 === 1 ? "Saudi Airlines" : idx % 4 === 2 ? "Emirates" : "Turkish Airlines";
                const code = dest.name === 'London' ? 'LHR' : dest.name === 'Paris' ? 'CDG' : dest.name === 'Dubai' ? 'DXB' : 'IST';
                
                return (
                  <div 
                    key={dest.id} 
                    className="bg-[#182d56]/40 rounded-3xl overflow-hidden border border-white/5 shadow-xl hover:shadow-[0_20px_50px_rgba(255,197,91,0.15)] hover:border-[#FFC55B]/30 hover:-translate-y-1.5 transition-all duration-500 group flex flex-col h-full relative"
                  >
                    {/* Glowing effect inside card */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFC55B]/5 rounded-full blur-xl group-hover:bg-[#FFC55B]/10 transition-all"></div>

                    {/* Image block */}
                    <div className="h-52 relative overflow-hidden bg-[#0B1B3D]">
                      <img 
                        src={dest.image_url} 
                        alt={dest.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b3d] via-transparent to-transparent opacity-85"></div>
                      
                      {/* Price Badge */}
                      <div className="absolute top-4 left-4 bg-secondary text-primary px-3.5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl border border-white/10">
                        From PKR {dest.price_start.toLocaleString()}
                      </div>

                      {/* Transit Badge */}
                      <div className="absolute bottom-4 left-4 text-[9px] font-bold text-secondary uppercase tracking-[0.2em] bg-primary/80 backdrop-blur-sm px-3 py-1 rounded-md border border-white/5">
                        {transit}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex flex-col flex-grow text-left">
                      {/* Boarding Pass Header */}
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">{airline}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-black text-secondary uppercase">LHE</span>
                          <span className="material-symbols-outlined text-[10px] text-white/40">arrow_forward</span>
                          <span className="text-[11px] font-black text-secondary uppercase">{code}</span>
                        </div>
                      </div>

                      <h3 className="font-notoSerif text-2xl font-bold text-white mb-2 group-hover:text-secondary transition-colors">{dest.name}</h3>
                      <p className="text-white/60 text-xs font-light mb-6 leading-relaxed flex-grow line-clamp-3">{dest.description}</p>
                      
                      {/* Premium Amenities list */}
                      <div className="grid grid-cols-2 gap-y-2 mb-6 pt-4 border-t border-white/5 text-[10px] font-bold text-white/50 uppercase tracking-wider">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[12px] text-secondary">backpack</span>
                          46kg Bag
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[12px] text-secondary">restaurant</span>
                          Meal Incl.
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-2.5 mt-auto">
                        <button 
                          onClick={() => handleDirectWhatsAppBook(dest.name, dest.price_start)}
                          className="flex-grow bg-secondary text-primary py-3 rounded-lg font-black text-[10px] uppercase tracking-widest hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-secondary/10"
                        >
                          <svg className="w-3.5 h-3.5 fill-primary" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.553 4.122 1.523 5.857L0 24l6.334-1.51A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.791 9.791 0 01-5.003-1.371l-.359-.214-3.759.896.944-3.668-.235-.378A9.78 9.78 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182c5.421 0 9.818 4.397 9.818 9.818 0 5.421-4.397 9.818-9.818 9.818z"/></svg>
                          WhatsApp Book
                        </button>
                        <a 
                          href={`https://wa.me/923004634548?text=Hello%20Habib%20Ul%20Hujjaj,%20I'd%20like%20to%20view%20details%20and%20itinerary%20for%20flights%20to%20${encodeURIComponent(dest.name)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="border border-white/10 hover:border-white/20 hover:bg-white/5 text-white px-4 py-3 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all flex items-center justify-center"
                        >
                          Details
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Features List Section */}
      <section className="py-24 bg-[#0B1B3D] relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Features Columns */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="inline-flex w-8 h-[2px] bg-[#FFC55B] mb-2"></div>
              <h3 className="font-notoSerif text-3xl font-bold text-white tracking-tight uppercase mb-4">
                THE PREFERRED CHOICE FOR <span className="text-[#FFC55B]">HOLY TRAVEL</span>
              </h3>
              
              <div className="space-y-6">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="flex items-start gap-4 sm:gap-6 group">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#FFC55B]/10 border border-[#FFC55B]/20 text-[#FFC55B] flex items-center justify-center font-notoSerif text-lg font-bold group-hover:bg-[#FFC55B] group-hover:text-[#0B1B3D] transition-all duration-300">
                      {i}
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-[#FFC55B] transition-colors">{cmsContent[`feature${i}`]}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Right Column */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-2 rounded-3xl bg-[#FFC55B]/10 blur-xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80" 
                className="rounded-3xl shadow-2xl border border-white/5 w-full object-cover" 
                alt="Travel experiences" 
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#FFC55B]/10 rounded-full blur-xl"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Most Popular Places */}
      <section className="py-24 bg-[#182d56]/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="font-notoSerif text-3xl sm:text-4xl font-bold text-center text-white mb-16 tracking-tight uppercase">
            {cmsContent.popularTitle}
            <div className="w-12 h-1 bg-[#FFC55B] mx-auto mt-4 rounded-full"></div>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="relative h-96 rounded-2xl overflow-hidden group shadow-lg border border-white/5">
              <img src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" alt="Dubai" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-left">
                <h3 className="font-notoSerif text-2xl font-bold text-white mb-1">Dubai</h3>
                <p className="text-white/60 text-xs font-light">Luxury Redefined</p>
              </div>
            </div>
            
            <div className="relative h-96 rounded-2xl overflow-hidden group shadow-lg border border-white/5">
              <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" alt="Paris" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-left">
                <h3 className="font-notoSerif text-2xl font-bold text-white mb-1">Paris</h3>
                <p className="text-white/60 text-xs font-light">Cultural Elegance</p>
              </div>
            </div>

            <div className="relative h-96 rounded-2xl overflow-hidden group shadow-lg border border-white/5">
              <img src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" alt="Istanbul" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-left">
                <h3 className="font-notoSerif text-2xl font-bold text-white mb-1">Istanbul</h3>
                <p className="text-white/60 text-xs font-light">Historical Harmony</p>
              </div>
            </div>

            <div className="relative h-96 rounded-2xl overflow-hidden group shadow-lg border border-white/5">
              <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" alt="Tokyo" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-left">
                <h3 className="font-notoSerif text-2xl font-bold text-white mb-1">Tokyo</h3>
                <p className="text-white/60 text-xs font-light">Modern Contrast</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Flights
