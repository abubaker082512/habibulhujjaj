import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import heroBackground from '../assets/hajj-umrah-hero.jpg'
import heroBackground2 from '../assets/background2.jpg'
import heroBackground3 from '../assets/taxi-services.jpg'

const API_BASE = import.meta.env.VITE_API_URL || ''

const staticPackages = [
  {
    id: 1,
    title: 'Economy Saver',
    location: 'Saraya Iman (Makkah)',
    price: 185000,
    days: '15 Days',
    badge: 'Economy',
    badgeColor: 'bg-primary',
    image: 'https://images.unsplash.com/photo-1591604129909-2b4ce4e6e6d2?w=800&q=80'
  },
  {
    id: 2,
    title: '3 Star Comfort',
    location: 'Dar Al Eiman Grand',
    price: 245000,
    days: '15 Days',
    badge: '3 Star',
    badgeColor: 'bg-primary',
    image: 'https://images.unsplash.com/photo-1564507004663-b6dfb3c8924d?w=800&q=80'
  },
  {
    id: 3,
    title: '4 Star Premium',
    location: 'Swissotel Makkah',
    price: 320000,
    days: '10 Days',
    badge: '4 Star',
    badgeColor: 'bg-primary',
    image: 'https://images.unsplash.com/photo-1572949645079-6416a599c6ae?w=800&q=80'
  },
  {
    id: 4,
    title: '5 Star Executive',
    location: 'Fairmont Clock Tower',
    price: 450000,
    days: '7 Days',
    badge: 'Luxury',
    badgeColor: 'bg-primary',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80'
  }
]

const Home = () => {
  const [packages, setPackages] = useState([])
  const [activeSlide, setActiveSlide] = useState(0)
  const [formErrors, setFormErrors] = useState({})

  const slides = [
    {
      title: "Spiritual Umrah Journeys",
      highlight: "Umrah",
      subtitle: "Experience a journey of a lifetime with premium 5-star packages, dedicated scholarly guidance, and unparalleled comfort. We handle the details so you can focus on your devotion.",
      image: heroBackground,
      ctaText: "Explore Umrah",
      ctaLink: "/packages"
    },
    {
      title: "Sacred Hajj Pilgrimage",
      highlight: "Hajj",
      subtitle: "Fulfill your sacred obligation with complete peace of mind. Exceptional VIP accommodations, dedicated ground support, and scholar-led guidance every step of the way.",
      image: heroBackground2,
      ctaText: "Explore Hajj",
      ctaLink: "/contact"
    },
    {
      title: "Premium Taxi Services",
      highlight: "Taxis & Airport Transfers",
      subtitle: "Explore Saudia Arabia with our Taxi and Transfer services. Whether you need a ride from the airport, a day tour around the city, or transportation between Makkah and Medina, we’ve got you covered with comfort and reliability.",
      image: heroBackground3,
      ctaText: "Explore Taxis & Transfers",
      ctaLink: "/taxi-services"
    },
    {
      title: "Premium International Tours",
      highlight: "Tours",
      subtitle: "Explore the world with curated, premium itineraries. Discover historic sites in Istanbul, experience luxury in Dubai, or relax in exotic destinations with absolute comfort.",
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1600&q=80",
      ctaText: "Explore Tours",
      ctaLink: "/international-tours"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length])

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
    <div className="bg-background font-manrope text-black">
      <Navbar />
      
      {/* SideNavBar (WhatsApp FAB) */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[9999] group">
        <div className="flex flex-col items-center gap-2">
          <span className="bg-primary/90 backdrop-blur-md text-secondary font-manrope font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity">WhatsApp Support</span>
          <a href="https://wa.me/923004634548" target="_blank" rel="noreferrer" className="bg-secondary text-primary rounded-full p-3 md:p-4 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shadow-2xl shadow-secondary/40 animate-bounce duration-[2000ms] cursor-pointer hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-2xl md:text-3xl font-bold">chat</span>
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] lg:min-h-screen flex items-center pt-32 pb-24 lg:pb-32 overflow-hidden">
        {/* Background Images Cross-Fade */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeSlide ? 'opacity-100 z-0' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img className="w-full h-full object-cover scale-105" src={slide.image} alt={slide.title} />
            {/* Soft premium dark gradient overlay for text readability without washing out the image */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent"></div>
          </div>
        ))}

        <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-24 w-full text-white">
          <div className="max-w-3xl">
            <div className="w-20 h-1.5 bg-secondary mb-8 md:mb-10 rounded-full"></div>
            
            {/* Slide content with smooth transition state */}
            <div className="transition-all duration-700 ease-out">
              <span className="text-secondary font-bold text-xs tracking-[0.2em] uppercase mb-4 block">
                Habib Ul Hujjaj present
              </span>
              <h1 className="font-notoSerif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] mb-8 md:mb-10 tracking-tighter uppercase">
                {slides[activeSlide].title.includes(slides[activeSlide].highlight) ? (
                  <>
                    {slides[activeSlide].title.split(slides[activeSlide].highlight)[0]}
                    <span className="text-secondary italic">{slides[activeSlide].highlight}</span>
                    {slides[activeSlide].title.split(slides[activeSlide].highlight)[1]}
                  </>
                ) : slides[activeSlide].title}
              </h1>
              <p className="font-manrope text-base md:text-xl text-white/80 mb-10 md:mb-16 max-w-xl leading-relaxed">
                {slides[activeSlide].subtitle}
              </p>
              <div className="flex flex-wrap gap-4 md:gap-8">
                <Link to={slides[activeSlide].ctaLink} className="bg-secondary text-primary hover:bg-white hover:scale-105 px-8 py-4 md:px-10 md:py-5 rounded-md font-black text-sm uppercase tracking-widest transition-all shadow-2xl shadow-secondary/20 flex items-center gap-3">
                  {slides[activeSlide].ctaText}
                  <span className="material-symbols-outlined font-bold">arrow_right_alt</span>
                </Link>
                <Link to="/contact" className="bg-white/5 border border-white/20 hover:bg-white/10 text-white px-8 py-4 md:px-10 md:py-5 rounded-md font-bold text-sm uppercase tracking-widest transition-all flex items-center gap-3 backdrop-blur-md">
                  <span className="material-symbols-outlined">call</span>
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Navigation Arrows */}
        <button
          onClick={() => setActiveSlide(prev => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all backdrop-blur-sm active:scale-95"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button
          onClick={() => setActiveSlide(prev => (prev + 1) % slides.length)}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all backdrop-blur-sm active:scale-95"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>

        {/* Bullet/Dot Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === activeSlide ? 'w-8 bg-secondary' : 'w-2.5 bg-white/40 hover:bg-white/60'
              }`}
            ></button>
          ))}
        </div>
      </section>

      {/* Quick Inquiry Form */}
      <div className="relative z-20 max-w-6xl mx-auto -mt-12 sm:-mt-16 lg:-mt-24 px-4">
        <div className="bg-primary border border-white/10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] p-6 sm:p-8 md:p-10 rounded-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <span className="w-8 h-[2px] bg-secondary"></span>
            <p className="font-manrope text-[10px] font-black uppercase text-secondary tracking-[0.25em]">Quick Inquiry</p>
          </div>
          <h3 className="font-notoSerif text-white text-xl sm:text-2xl font-bold mb-6 md:mb-8">Tell us what you're looking for — we'll get back instantly on WhatsApp&nbsp;
            <span className="inline-flex items-center gap-1 text-secondary text-base font-manrope font-black">
              <svg className="w-5 h-5 fill-secondary" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.553 4.122 1.523 5.857L0 24l6.334-1.51A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.791 9.791 0 01-5.003-1.371l-.359-.214-3.759.896.944-3.668-.235-.378A9.78 9.78 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182c5.421 0 9.818 4.397 9.818 9.818 0 5.421-4.397 9.818-9.818 9.818z"/></svg>
              WhatsApp
            </span>
          </h3>

          {/* Form Grid */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const f = e.target;
              const name = f.name.value;
              const phone = f.phone.value;
              const countryCode = f.countryCode.value;
              const city = f.city.value;
              const month = f.month.value;
              const service = f.service.value;
              const travelers = f.travelers.value;

              // Validations
              const errors = {};
              if (!name || name.trim().length < 3) {
                errors.name = "Name must be at least 3 characters.";
              } else if (!/^[a-zA-Z\s]+$/.test(name)) {
                errors.name = "Name can only contain letters.";
              }

              const cleanPhone = phone.replace(/[\s-()]/g, "");
              if (!cleanPhone || !/^\d{7,15}$/.test(cleanPhone)) {
                errors.phone = "Enter a valid phone number (7-15 digits).";
              }

              if (Object.keys(errors).length > 0) {
                setFormErrors(errors);
                return;
              }
              setFormErrors({});

              const fullPhone = `${countryCode} ${cleanPhone}`;

              const message = encodeURIComponent(
                `Assalamu Alaikum HabibUlHujjaj! 🌙\n\n` +
                `I would like to inquire about your services.\n\n` +
                `👤 Name: ${name}\n` +
                `📞 Contact: ${fullPhone}\n` +
                `🏙️ Departure City: ${city}\n` +
                `📅 Travel Month: ${month}\n` +
                `🕌 Service Interested In: ${service}\n` +
                `👥 No. of Travelers: ${travelers}\n\n` +
                `Please share more details. JazakAllah Khair! 🤲`
              );
              window.open(`https://wa.me/923004634548?text=${message}`, '_blank');
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 mb-8">
              {/* Full Name */}
              <div>
                <label className="block font-manrope text-[10px] font-black uppercase text-secondary mb-3 tracking-[0.2em]">Full Name</label>
                <input
                  name="name"
                  required
                  placeholder="e.g. Muhammad Ali"
                  className="w-full bg-transparent border-0 border-b border-white/20 focus:border-secondary focus:ring-0 focus:outline-none font-manrope text-sm py-3 px-0 text-white placeholder-white/30 transition-colors"
                />
                {formErrors.name && <p className="text-secondary text-[10px] mt-1 font-bold">{formErrors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block font-manrope text-[10px] font-black uppercase text-secondary mb-3 tracking-[0.2em]">Phone / WhatsApp</label>
                <div className="flex gap-2 items-end">
                  <select
                    name="countryCode"
                    className="bg-transparent border-0 border-b border-white/20 focus:border-secondary focus:ring-0 focus:outline-none font-manrope text-sm py-3 px-0 text-white cursor-pointer w-24 shrink-0"
                    defaultValue="+92"
                  >
                    <option value="+92" className="bg-[#0B1B3D] text-white">PK (+92)</option>
                    <option value="+966" className="bg-[#0B1B3D] text-white">SA (+966)</option>
                    <option value="+971" className="bg-[#0B1B3D] text-white">AE (+971)</option>
                    <option value="+44" className="bg-[#0B1B3D] text-white">UK (+44)</option>
                    <option value="+1" className="bg-[#0B1B3D] text-white">US (+1)</option>
                    <option value="+90" className="bg-[#0B1B3D] text-white">TR (+90)</option>
                    <option value="+965" className="bg-[#0B1B3D] text-white">KW (+965)</option>
                    <option value="+974" className="bg-[#0B1B3D] text-white">QA (+974)</option>
                    <option value="+973" className="bg-[#0B1B3D] text-white">BH (+973)</option>
                    <option value="+968" className="bg-[#0B1B3D] text-white">OM (+968)</option>
                    <option value="+91" className="bg-[#0B1B3D] text-white">IN (+91)</option>
                    <option value="+880" className="bg-[#0B1B3D] text-white">BD (+880)</option>
                  </select>
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="e.g. 300 0000000"
                    className="w-full bg-transparent border-0 border-b border-white/20 focus:border-secondary focus:ring-0 focus:outline-none font-manrope text-sm py-3 px-0 text-white placeholder-white/30 transition-colors"
                  />
                </div>
                {formErrors.phone && <p className="text-secondary text-[10px] mt-1 font-bold">{formErrors.phone}</p>}
              </div>

              {/* Departure City */}
              <div>
                <label className="block font-manrope text-[10px] font-black uppercase text-secondary mb-3 tracking-[0.2em]">Departure City</label>
                <select name="city" className="w-full bg-transparent border-0 border-b border-white/20 focus:border-secondary focus:ring-0 focus:outline-none font-manrope text-sm py-3 px-0 text-white cursor-pointer">
                  <option className="bg-primary text-white">Karachi</option>
                  <option className="bg-primary text-white">Lahore</option>
                  <option className="bg-primary text-white">Islamabad</option>
                  <option className="bg-primary text-white">Peshawar</option>
                  <option className="bg-primary text-white">Quetta</option>
                  <option className="bg-primary text-white">Other</option>
                </select>
              </div>

              {/* Travel Month */}
              <div>
                <label className="block font-manrope text-[10px] font-black uppercase text-secondary mb-3 tracking-[0.2em]">Travel Month</label>
                <select name="month" className="w-full bg-transparent border-0 border-b border-white/20 focus:border-secondary focus:ring-0 focus:outline-none font-manrope text-sm py-3 px-0 text-white cursor-pointer">
                  <option className="bg-primary text-white">June 2025</option>
                  <option className="bg-primary text-white">July 2025</option>
                  <option className="bg-primary text-white">August 2025</option>
                  <option className="bg-primary text-white">September 2025</option>
                  <option className="bg-primary text-white">October 2025</option>
                  <option className="bg-primary text-white">November 2025</option>
                  <option className="bg-primary text-white">December 2025</option>
                  <option className="bg-primary text-white">Ramadan 2026</option>
                  <option className="bg-primary text-white">Flexible / Open</option>
                </select>
              </div>

              {/* Service */}
              <div>
                <label className="block font-manrope text-[10px] font-black uppercase text-secondary mb-3 tracking-[0.2em]">Service Interested In</label>
                <select name="service" className="w-full bg-transparent border-0 border-b border-white/20 focus:border-secondary focus:ring-0 focus:outline-none font-manrope text-sm py-3 px-0 text-white cursor-pointer">
                  <option className="bg-primary text-white">Umrah Package</option>
                  <option className="bg-primary text-white">Hajj Package</option>
                  <option className="bg-primary text-white">International Tour</option>
                  <option className="bg-primary text-white">Visa Services</option>
                  <option className="bg-primary text-white">Taxi / Transfer</option>
                  <option className="bg-primary text-white">Flight Booking</option>
                  <option className="bg-primary text-white">Other</option>
                </select>
              </div>

              {/* Number of Travelers */}
              <div>
                <label className="block font-manrope text-[10px] font-black uppercase text-secondary mb-3 tracking-[0.2em]">No. of Travelers</label>
                <select name="travelers" className="w-full bg-transparent border-0 border-b border-white/20 focus:border-secondary focus:ring-0 focus:outline-none font-manrope text-sm py-3 px-0 text-white cursor-pointer">
                  <option className="bg-primary text-white">1 Person</option>
                  <option className="bg-primary text-white">2 Persons</option>
                  <option className="bg-primary text-white">3-5 Persons</option>
                  <option className="bg-primary text-white">6-10 Persons</option>
                  <option className="bg-primary text-white">11-20 Persons</option>
                  <option className="bg-primary text-white">Group (20+)</option>
                </select>
              </div>
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <button
                type="submit"
                className="w-full sm:w-auto bg-secondary text-primary px-10 py-4 rounded-md font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-xl shadow-secondary/20"
              >
                <svg className="w-5 h-5 fill-primary flex-shrink-0" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.553 4.122 1.523 5.857L0 24l6.334-1.51A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.791 9.791 0 01-5.003-1.371l-.359-.214-3.759.896.944-3.668-.235-.378A9.78 9.78 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182c5.421 0 9.818 4.397 9.818 9.818 0 5.421-4.397 9.818-9.818 9.818z"/></svg>
                Send Inquiry on WhatsApp
              </button>
              <p className="text-white/30 text-xs font-manrope text-center sm:text-left">We typically respond within a few minutes during business hours.</p>
            </div>
          </form>
        </div>
      </div>


      {/* Featured Umrah Packages */}
      <section className="py-24 md:py-32 px-4 sm:px-6 md:px-8 max-w-screen-2xl mx-auto bg-white">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20">
          <div className="max-w-2xl">
            <h6 className="font-manrope text-primary font-black text-xs tracking-[0.3em] uppercase mb-6 flex items-center gap-4">
              <span className="w-10 h-[1px] bg-primary"></span>
              Sacred Journeys
            </h6>
            <h2 className="font-notoSerif text-4xl sm:text-5xl lg:text-6xl font-black text-primary leading-[1.1]">Curated Umrah <br />Collections</h2>
          </div>
          <Link className="text-primary font-black text-sm uppercase tracking-widest border-b-4 border-secondary pb-2 mt-8 md:mt-0 transition-all hover:pr-6" to="/packages">View All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {packages.slice(0, 4).map((pkg, i) => {
            const staticPkg = staticPackages[i % staticPackages.length]
            const image = pkg.image_url || pkg.image || staticPkg.image
            const badge = pkg.category || pkg.badge || staticPkg.badge
            const duration = pkg.duration || pkg.days || staticPkg.days
            const location = pkg.hotel_name || pkg.location || staticPkg.location
            const price = typeof pkg.price === 'number' ? pkg.price : (parseFloat(String(pkg.price).replace(/[^0-9.]/g, '')) || staticPkg.price)
            
            return (
              <Link to={`/package/${pkg.id || pkg._id || staticPkg.id}`} key={pkg.id || i} className="bg-white group cursor-pointer overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,28,29,0.1)] hover:shadow-[0_20px_50px_-15px_rgba(0,28,29,0.2)] transition-all hover:-translate-y-2 block rounded-xl border border-gray-50">
                <div className="relative h-64 overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" src={image} alt={pkg.title} />
                  <div className="absolute top-5 left-5 bg-secondary text-primary text-[10px] font-black px-4 py-2 tracking-widest uppercase rounded shadow-xl">{badge}</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="font-notoSerif text-2xl font-bold text-primary mb-3 line-clamp-1 group-hover:text-secondary transition-colors">{pkg.title}</h3>
                  <div className="flex items-center gap-2 text-primary/40 text-[11px] font-bold uppercase tracking-widest mb-6">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    <span className="line-clamp-1">{location}</span>
                    <span className="mx-1">/</span>
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    <span>{duration}</span>
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div>
                      <span className="block text-[10px] font-black text-primary/30 uppercase tracking-[0.2em] mb-1">Starting At</span>
                      <span className="text-2xl font-black text-primary tracking-tighter">PKR {price.toLocaleString()}</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-primary transition-all">
                      <span className="material-symbols-outlined font-bold">arrow_forward</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 md:py-32 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay">
          <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1564507004663-b6dfb3c8924d?w=1200&q=80" alt="Pattern" />
        </div>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <h2 className="font-notoSerif text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-10 md:mb-16 tracking-tight leading-[1.1]">The Gold Standard <br /><span className="text-secondary">of Sacred Travel</span></h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-14">
                <div className="space-y-5 group">
                  <div className="text-primary bg-secondary w-16 h-16 flex items-center justify-center rounded-2xl shadow-2xl group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl font-bold">verified_user</span>
                  </div>
                  <h4 className="font-black text-white font-manrope text-sm uppercase tracking-widest">Certified Excellence</h4>
                  <p className="text-white/50 text-sm leading-relaxed">Fully certified by Ministry of Hajj & Umrah for complete security.</p>
                </div>
                <div className="space-y-5 group">
                  <div className="text-primary bg-secondary w-16 h-16 flex items-center justify-center rounded-2xl shadow-2xl group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl font-bold">distance</span>
                  </div>
                  <h4 className="font-black text-white font-manrope text-sm uppercase tracking-widest">Premium Proximity</h4>
                  <p className="text-white/50 text-sm leading-relaxed">Select hotels within steps of the Haram for maximum devotion time.</p>
                </div>
                <div className="space-y-5 group">
                  <div className="text-primary bg-secondary w-16 h-16 flex items-center justify-center rounded-2xl shadow-2xl group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl font-bold">support_agent</span>
                  </div>
                  <h4 className="font-black text-white font-manrope text-sm uppercase tracking-widest">Elite Support</h4>
                  <p className="text-white/50 text-sm leading-relaxed">Dedicated concierge staff in Makkah and Medina available 24/7.</p>
                </div>
                <div className="space-y-5 group">
                  <div className="text-primary bg-secondary w-16 h-16 flex items-center justify-center rounded-2xl shadow-2xl group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl font-bold">mosque</span>
                  </div>
                  <h4 className="font-black text-white font-manrope text-sm uppercase tracking-widest">Guided Devotion</h4>
                  <p className="text-white/50 text-sm leading-relaxed">Renowned scholarly guides to assist you with every ritual.</p>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-secondary/20 rounded-2xl blur-2xl group-hover:bg-secondary/30 transition-all"></div>
              <img className="relative rounded-2xl shadow-2xl w-full h-[400px] md:h-[600px] object-cover border border-white/10" src="/assets/gallery images/1.png" alt="Architecture" />
              <div className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 bg-secondary p-8 md:p-14 rounded-2xl hidden lg:block shadow-[0_20px_50px_rgba(255,197,91,0.3)]">
                <span className="block text-4xl md:text-7xl font-black text-primary tracking-tighter mb-2">25+</span>
                <span className="text-primary font-black tracking-[0.2em] uppercase text-[10px]">Years of Legacy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* International Tours */}
      <section className="py-24 md:py-32 px-4 sm:px-6 md:px-8 max-w-screen-2xl mx-auto overflow-hidden bg-white">
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <h6 className="font-manrope text-primary font-black text-xs tracking-[0.4em] uppercase mb-6">World Horizons</h6>
          <h2 className="font-notoSerif text-4xl sm:text-5xl lg:text-7xl font-black text-primary leading-tight">Beyond the <span className="text-primary/30 italic font-medium">Sacred</span></h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Turkey */}
          <div className="relative h-[400px] md:h-[600px] group cursor-pointer overflow-hidden rounded-2xl">
            <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80" alt="Turkey" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent"></div>
            <Link to="/international-tours" className="absolute inset-0 p-8 flex flex-col justify-end text-white">
              <h3 className="font-notoSerif text-3xl font-bold mb-2">Turkey</h3>
              <p className="text-sm text-white/60 mb-6 font-manrope uppercase tracking-widest">Heritage & Splendor</p>
              <div className="flex items-center gap-3 text-secondary font-black text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                Explore Collection
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </Link>
          </div>
          {/* Dubai */}
          <div className="relative h-[400px] md:h-[600px] group cursor-pointer overflow-hidden rounded-2xl">
            <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80" alt="Dubai" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent"></div>
            <Link to="/international-tours" className="absolute inset-0 p-8 flex flex-col justify-end text-white">
              <h3 className="font-notoSerif text-3xl font-bold mb-2">Dubai</h3>
              <p className="text-sm text-white/60 mb-6 font-manrope uppercase tracking-widest">Modern Marvels</p>
              <div className="flex items-center gap-3 text-secondary font-black text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                Explore Collection
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </Link>
          </div>
          {/* Malaysia */}
          <div className="relative h-[400px] md:h-[600px] group cursor-pointer overflow-hidden rounded-2xl">
            <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" src="/assets/Malaysia.jpg" alt="Malaysia" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent"></div>
            <Link to="/international-tours" className="absolute inset-0 p-8 flex flex-col justify-end text-white">
              <h3 className="font-notoSerif text-3xl font-bold mb-2">Malaysia</h3>
              <p className="text-sm text-white/60 mb-6 font-manrope uppercase tracking-widest">Nature & Grace</p>
              <div className="flex items-center gap-3 text-secondary font-black text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                Explore Collection
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </Link>
          </div>
          {/* Europe */}
          <div className="relative h-[400px] md:h-[600px] group cursor-pointer overflow-hidden rounded-2xl">
            <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" src="/assets/Europe.jpg" alt="Europe" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent"></div>
            <Link to="/international-tours" className="absolute inset-0 p-8 flex flex-col justify-end text-white">
              <h3 className="font-notoSerif text-3xl font-bold mb-2">Europe</h3>
              <p className="text-sm text-white/60 mb-6 font-manrope uppercase tracking-widest">Timeless Classics</p>
              <div className="flex items-center gap-3 text-secondary font-black text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                Explore Collection
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 bg-gray-50 px-4 sm:px-6 md:px-8 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h6 className="font-manrope text-primary font-black text-xs tracking-[0.4em] uppercase mb-6">Testimonials</h6>
            <h2 className="font-notoSerif text-4xl sm:text-5xl font-black text-primary">Voices of Gratitude</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="bg-white p-10 md:p-12 rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.03)] border border-gray-100 relative group hover:-translate-y-2 transition-all">
              <div className="absolute -top-6 left-10 w-12 h-12 bg-secondary text-primary rounded-full flex items-center justify-center shadow-xl">
                <span className="material-symbols-outlined font-black">format_quote</span>
              </div>
              <div className="flex gap-1 text-secondary mb-8">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="italic text-primary/60 mb-10 leading-relaxed font-manrope text-lg">"Our Umrah journey with Habib Ul Hujjaj was flawless. From the visa process to the hotels being so close to the Haram, everything was perfectly managed."</p>
              <div className="flex items-center gap-5">
                <img className="w-14 h-14 rounded-full object-cover border-2 border-secondary" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="Customer" />
                <div>
                  <span className="block font-black text-primary uppercase text-xs tracking-widest">Ahmed Raza</span>
                  <span className="text-[10px] text-primary/30 font-bold uppercase">Karachi, PK</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-10 md:p-12 rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.03)] border border-gray-100 relative group hover:-translate-y-2 transition-all">
              <div className="absolute -top-6 left-10 w-12 h-12 bg-secondary text-primary rounded-full flex items-center justify-center shadow-xl">
                <span className="material-symbols-outlined font-black">format_quote</span>
              </div>
              <div className="flex gap-1 text-secondary mb-8">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="italic text-primary/60 mb-10 leading-relaxed font-manrope text-lg">"I booked the Turkey tour for my family. The guide was incredibly knowledgeable and the itinerary wasn't rushed. A truly premium experience."</p>
              <div className="flex items-center gap-5">
                <img className="w-14 h-14 rounded-full object-cover border-2 border-secondary" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" alt="Customer" />
                <div>
                  <span className="block font-black text-primary uppercase text-xs tracking-widest">Saba Khan</span>
                  <span className="text-[10px] text-primary/30 font-bold uppercase">Lahore, PK</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-10 md:p-12 rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.03)] border border-gray-100 relative group hover:-translate-y-2 transition-all">
              <div className="absolute -top-6 left-10 w-12 h-12 bg-secondary text-primary rounded-full flex items-center justify-center shadow-xl">
                <span className="material-symbols-outlined font-black">format_quote</span>
              </div>
              <div className="flex gap-1 text-secondary mb-8">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="italic text-primary/60 mb-10 leading-relaxed font-manrope text-lg">"The ground staff in Makkah were like family. They helped us with our elderly parents during Tawaaf. Compassion at its best."</p>
              <div className="flex items-center gap-5">
                <img className="w-14 h-14 rounded-full object-cover border-2 border-secondary" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" alt="Customer" />
                <div>
                  <span className="block font-black text-primary uppercase text-xs tracking-widest">Dr. Mohammad Ali</span>
                  <span className="text-[10px] text-primary/30 font-bold uppercase">Islamabad, PK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-4 bg-white">
        <div className="max-w-6xl mx-auto bg-primary rounded-[3rem] p-12 md:p-24 relative overflow-hidden text-center shadow-[0_40px_100px_rgba(0,28,29,0.4)] border border-white/5">
          <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
            <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1555992457-b8fefdd09069?w=1200&q=80" alt="Silk Pattern" />
          </div>
          <div className="relative z-10">
            <h2 className="font-notoSerif text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-10 tracking-tighter uppercase leading-[0.9]">Start Your <br /><span className="text-secondary italic">Legacy</span> Today</h2>
            <p className="text-white/60 text-lg md:text-xl mb-12 md:mb-16 max-w-2xl mx-auto leading-relaxed">Consult with our travel specialists for a bespoke journey that honors your spiritual and leisure aspirations.</p>
            <div className="flex flex-wrap justify-center gap-8">
              <Link to="/contact" className="bg-secondary text-primary px-12 py-5 rounded-md font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-secondary/20">Get Bespoke Quote</Link>
              <Link to="/contact" className="bg-white/5 text-white border border-white/20 px-12 py-5 rounded-md font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-md">Direct Contact</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
