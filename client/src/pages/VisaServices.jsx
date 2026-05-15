import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || ''

const visaServices = [
  {
    id: 1,
    title: 'Umrah Visa',
    description: 'Specialized visa processing for pilgrims traveling to Saudi Arabia for Umrah rituals. We handle all documentation and government approvals.',
    icon: 'mosque',
    processing: '3-5 Business Days',
    documents: ['Valid Passport', 'Passport Photos', 'Vaccination Certificate', 'Travel Itinerary'],
    fee: 'PKR 15,000'
  },
  {
    id: 2,
    title: 'Saudi Tourist Visa',
    description: 'Explore the Kingdom of Saudi Arabia with our tourist visa services. Discover historical sites, modern cities, and cultural heritage.',
    icon: 'flight',
    processing: '5-7 Business Days',
    documents: ['Valid Passport', 'Passport Photos', 'Hotel Booking', 'Return Ticket'],
    fee: 'PKR 12,000'
  },
  {
    id: 3,
    title: 'Dubai Visa',
    description: 'Visit the dazzling city of Dubai with our streamlined visa processing. Perfect for tourism, business, or transit.',
    icon: 'apartment',
    processing: '3-5 Business Days',
    documents: ['Valid Passport', 'Passport Photos', 'Bank Statement', 'Hotel Booking'],
    fee: 'PKR 8,000'
  },
  {
    id: 4,
    title: 'Turkey Visa',
    description: 'Discover the rich history and stunning landscapes of Turkey. Our team ensures a hassle-free visa application process.',
    icon: 'travel_explore',
    processing: '7-10 Business Days',
    documents: ['Valid Passport', 'Passport Photos', 'Travel Insurance', 'Proof of Accommodation'],
    fee: 'PKR 18,000'
  },
  {
    id: 5,
    title: 'Schengen Visa',
    description: 'Travel across 27 European countries with a single Schengen visa. We guide you through the complex application process.',
    icon: 'globe',
    processing: '10-15 Business Days',
    documents: ['Valid Passport', 'Passport Photos', 'Travel Insurance', 'Bank Statements', 'Cover Letter'],
    fee: 'PKR 25,000'
  }
]

const VisaServices = () => {
  const [pageMedia, setPageMedia] = useState({})
  const [visaServices, setVisaServices] = useState([])

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

    axios.get(`${API_BASE}/api/visa`)
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setVisaServices(res.data)
        }
      })
      .catch(err => console.error('Failed to fetch visa services:', err))
  }, [])

  return (
    <div className="bg-surface font-manrope text-on-surface min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" src={pageMedia.visa_hero_image || "https://images.unsplash.com/photo-1555992457-b8fefdd09069?w=1600&q=80"} alt="Visa Services" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-24 w-full">
          <div className="max-w-3xl">
            <div className="w-12 h-1 bg-[#CD9933] mb-6 md:mb-8"></div>
            <h1 className="font-notoSerif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Visa <span className="text-[#CD9933]">Services</span>
            </h1>
            <p className="font-manrope text-base md:text-lg text-white/80 max-w-xl">
              Simplifying your travel documentation with expert visa processing services. From Umrah visas to international travel permits, we handle it all with precision and care.
            </p>
          </div>
        </div>
      </section>

      {/* Visa Cards */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16">
          <div className="max-w-2xl">
            <h6 className="font-manrope text-[#CD9933] font-bold text-sm tracking-[0.2em] uppercase mb-4">Our Services</h6>
            <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight">Visa Solutions for Every Journey</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {visaServices.map((visa) => (
            <div key={visa.id} className="bg-surface-container-lowest group cursor-pointer overflow-hidden editorial-shadow transition-transform hover:-translate-y-1 p-4 md:p-6 lg:p-8">
              <div className="text-[#CD9933] bg-[#013334]/5 w-16 h-16 flex items-center justify-center rounded-lg mb-6">
                <span className="material-symbols-outlined text-3xl">{visa.icon}</span>
              </div>
              <h3 className="font-notoSerif text-2xl font-bold text-primary mb-3">{visa.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">{visa.description}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <span className="material-symbols-outlined text-[#CD9933] text-lg">schedule</span>
                  <span className="text-outline">{visa.processing}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="material-symbols-outlined text-[#CD9933] text-lg">payments</span>
                  <span className="text-outline">{visa.fee}</span>
                </div>
              </div>

              <div className="border-t border-outline-variant/20 pt-6">
                <p className="text-xs font-bold uppercase tracking-widest text-outline mb-3">Required Documents</p>
                <ul className="space-y-2">
                  {(Array.isArray(visa.documents) ? visa.documents : typeof visa.documents === 'string' ? visa.documents.split(',') : []).map((doc, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      {typeof doc === 'string' ? doc.trim() : doc}
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full mt-6 bg-[#013334] text-white py-3 rounded-md font-bold text-sm hover:bg-[#002c2e] transition-all flex items-center justify-center gap-2">
                Apply Now
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-primary-container relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1564507004663-b6dfb3c8924d?w=1200&q=80" alt="Pattern" />
        </div>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h6 className="font-manrope text-[#CD9933] font-bold text-sm tracking-[0.2em] uppercase mb-4">Simple Process</h6>
            <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { step: '01', title: 'Submit Documents', desc: 'Send us your passport copies, photos, and required paperwork.', icon: 'upload_file' },
              { step: '02', title: 'Pay Fees', desc: 'Complete the visa fee payment through our secure channels.', icon: 'payments' },
              { step: '03', title: 'Processing', desc: 'Our experts handle the application with relevant authorities.', icon: 'hourglass_empty' },
              { step: '04', title: 'Receive Visa', desc: 'Get your approved visa delivered to your doorstep or email.', icon: 'mark_email_read' }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-[#CD9933] bg-white/5 w-20 h-20 flex items-center justify-center rounded-full mx-auto mb-6 relative">
                  <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                  <span className="absolute -top-2 -right-2 bg-[#CD9933] text-white text-xs font-bold w-8 h-8 flex items-center justify-center rounded-full">{item.step}</span>
                </div>
                <h4 className="font-bold text-white font-manrope text-lg mb-2">{item.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto bg-surface-container-lowest text-center p-8 md:p-12 lg:p-16 relative overflow-hidden editorial-shadow">
          <div className="relative z-10">
            <h2 className="font-notoSerif text-3xl md:text-4xl text-primary mb-6">Need Visa Assistance?</h2>
            <p className="text-on-surface-variant font-manrope mb-10 max-w-xl mx-auto">Our visa specialists are ready to help you with any visa requirements. Contact us today for a free consultation.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="bg-[#CD9933] text-white px-10 py-4 font-manrope font-bold tracking-widest uppercase text-sm hover:brightness-110 transition-all">Apply for Visa</Link>
              <a href="tel:+923001234567" className="border-2 border-outline-variant text-primary px-10 py-4 font-manrope font-bold tracking-widest uppercase text-sm hover:bg-surface-container transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">call</span>
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default VisaServices
