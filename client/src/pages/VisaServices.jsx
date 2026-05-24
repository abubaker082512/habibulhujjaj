import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import { buildServiceInquiryMessage, buildWhatsAppUrl } from '../utils/whatsapp'

const API_BASE = import.meta.env.VITE_API_URL || ''

const staticVisaServices = [
  {
    id: 1,
    title: 'Umrah Visa',
    description: 'Dedicated electronic visa processing for pilgrims traveling to Saudi Arabia for Umrah rituals. Includes system authorization and mandatory tourist health insurance.',
    icon: 'mosque',
    processing: '3-5 Business Days',
    documents: ['Original Passport', 'CNIC Scanned Copy', 'Photos (White Background)', 'Vaccination Certificate'],
    fee: 'PKR 45,000'
  },
  {
    id: 2,
    title: 'Saudi Tourist Visa',
    description: 'Explore the Kingdom of Saudi Arabia. Ideal for tourism, family visits, and performing Umrah. Includes 1-year multiple entry eVisa and standard medical insurance.',
    icon: 'flight',
    processing: '5-7 Business Days',
    documents: ['Valid Passport (6m)', 'CNIC Copy', 'Photos (White Background)', 'Bank Statement (3m)'],
    fee: 'PKR 75,000'
  },
  {
    id: 3,
    title: 'Dubai Visa',
    description: 'Visit Dubai and the UAE with streamlined eVisa processing. Ideal for holidays, quick transit, or business. Standard 30-day or 60-day tourist entry options.',
    icon: 'apartment',
    processing: '3-5 Business Days',
    documents: ['Valid Passport', 'CNIC Scanned Copy', 'Passport Photos', 'FRC (If with family)'],
    fee: 'PKR 30,400'
  },
  {
    id: 4,
    title: 'Turkey Visa',
    description: 'Discover the rich history and beautiful landscapes of Turkey. Vetting of financial status, Gerry\'s/VFS appointment booking, and flight/hotel reservation drafting.',
    icon: 'travel_explore',
    processing: '7-10 Business Days',
    documents: ['Passport (6 Months)', '2 Photos (Biometric)', '6-Month Bank Statement', 'FBR Tax Returns & NTN'],
    fee: 'PKR 52,000'
  },
  {
    id: 5,
    title: 'Schengen Visa',
    description: 'Travel across 27 European countries under a single tourist permit. Complete document evaluation, cover letter drafting, flight itinerary, and travel insurance.',
    icon: 'globe',
    processing: '15-20 Business Days',
    documents: ['Passport (6 Months)', '6-Month Bank Statement', 'Tax Returns & NTN', 'Schengen Approved Insurance'],
    fee: 'PKR 72,000'
  },
  {
    id: 6,
    title: 'UK Standard Visitor Visa',
    description: 'Travel to the United Kingdom for leisure or family visits. Complete application drafting, document audit, upload coordination, and VFS slot booking.',
    icon: 'home',
    processing: '15-21 Business Days',
    documents: ['Current & Past Passports', '6-Month Bank Statement', 'FRC & Property Docs', 'Job Letter & Salary Slips'],
    fee: 'PKR 127,000'
  },
  {
    id: 7,
    title: 'Malaysia Tourist eVisa',
    description: 'Quick electronic tourist visa for Malaysia. Complete paperless application process with rapid online submission and high success rate.',
    icon: 'layers',
    processing: '2-3 Business Days',
    documents: ['Valid Passport Copy', 'Passport Photo', 'Return Flight Itinerary', 'Hotel Reservation Vouchers'],
    fee: 'PKR 16,000'
  },
  {
    id: 8,
    title: 'Singapore Tourist eVisa',
    description: 'Streamlined tourist e-Visa for Singapore. Includes authorized local sponsor coordination, document verification, and official portal submission.',
    icon: 'local_airport',
    processing: '4-5 Business Days',
    documents: ['Passport Color Scans', 'CNIC Scanned Copy', 'Photos (White Background)', 'Bank Statement (3m)'],
    fee: 'PKR 25,000'
  }
]

const VisaServices = () => {
  const [pageMedia, setPageMedia] = useState({})
  const [visaServices, setVisaServices] = useState(staticVisaServices)

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
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setVisaServices(res.data)
        } else {
          setVisaServices(staticVisaServices)
        }
      })
      .catch(err => {
        console.error('Failed to fetch visa services:', err)
        setVisaServices(staticVisaServices)
      })
  }, [])

  return (
    <div className="bg-background font-manrope text-black min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center pt-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" src={pageMedia.visa_hero_image || "/assets/visa services hero.jpg"} alt="Visa Services" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/40 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-24 w-full">
          <div className="max-w-3xl">
            <div className="w-12 h-1 bg-white mb-6 md:mb-8"></div>
            <h1 className="font-notoSerif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Visa <span className="text-white">Services</span>
            </h1>
            <p className="font-manrope text-base md:text-lg text-white/80 max-w-xl">
              Simplifying your travel documentation with expert visa processing services. From Umrah visas to international travel permits, we handle it all with precision and care.
            </p>
          </div>
        </div>
      </section>

      {/* Visa Cards */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 max-w-screen-2xl mx-auto bg-background">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16">
          <div className="max-w-2xl">
            <h6 className="font-manrope text-primary font-bold text-sm tracking-[0.2em] uppercase mb-4">Our Services</h6>
            <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-tight">Visa Solutions for Every Journey</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {visaServices.map((visa) => (
            <div key={visa.id} className="bg-white border border-gray-100 shadow-sm group cursor-pointer overflow-hidden transition-transform hover:-translate-y-1 p-4 md:p-6 lg:p-8">
              <div className="text-primary bg-primary/5 w-16 h-16 flex items-center justify-center rounded-lg mb-6">
                <span className="material-symbols-outlined text-3xl">{visa.icon}</span>
              </div>
              <h3 className="font-notoSerif text-2xl font-bold text-black mb-3">{visa.title}</h3>
              <p className="text-black/60 text-sm leading-relaxed mb-6">{visa.description}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <span className="material-symbols-outlined text-primary text-lg">schedule</span>
                  <span className="text-black/70">{visa.processing || visa.processing_time}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="material-symbols-outlined text-primary text-lg">payments</span>
                  <span className="text-black/70">{visa.fee}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <p className="text-xs font-bold uppercase tracking-widest text-black/40 mb-3">Required Documents</p>
                <ul className="space-y-2">
                  {(Array.isArray(visa.documents) ? visa.documents : typeof visa.documents === 'string' ? visa.documents.split(',') : []).slice(0, 4).map((doc, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-black/60">
                      <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      {typeof doc === 'string' ? doc.trim() : doc}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 space-y-3">
                <Link to={`/visa-services/${visa.id}`} className="w-full inline-flex border-2 border-primary text-primary py-3 rounded-md font-bold text-sm hover:bg-primary/5 transition-all items-center justify-center gap-2 text-center">
                  View Requirements
                  <span className="material-symbols-outlined text-sm">visibility</span>
                </Link>
                <a href={buildWhatsAppUrl(buildServiceInquiryMessage({ serviceTitle: visa.title, serviceType: visa.description, serviceFee: visa.fee }))} target="_blank" rel="noreferrer" className="w-full inline-flex bg-primary text-white py-3 rounded-md font-bold text-sm hover:opacity-90 transition-all items-center justify-center gap-2 text-center">
                  Apply Now
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-primary-container relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
          <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1564507004663-b6dfb3c8924d?w=1200&q=80" alt="Pattern" />
        </div>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h6 className="font-manrope text-primary font-bold text-sm tracking-[0.2em] uppercase mb-4">Simple Process</h6>
            <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-bold text-black">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { step: '01', title: 'Submit Documents', desc: 'Send us your passport copies, photos, and required paperwork.', icon: 'upload_file' },
              { step: '02', title: 'Pay Fees', desc: 'Complete the visa fee payment through our secure channels.', icon: 'payments' },
              { step: '03', title: 'Processing', desc: 'Our experts handle the application with relevant authorities.', icon: 'hourglass_empty' },
              { step: '04', title: 'Receive Visa', desc: 'Get your approved visa delivered to your doorstep or email.', icon: 'mark_email_read' }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-primary bg-primary/5 w-20 h-20 flex items-center justify-center rounded-full mx-auto mb-6 relative">
                  <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold w-8 h-8 flex items-center justify-center rounded-full">{item.step}</span>
                </div>
                <h4 className="font-bold text-black font-manrope text-lg mb-2">{item.title}</h4>
                <p className="text-black/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto bg-white border-2 border-primary text-center p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-xl rounded-3xl">
          <div className="relative z-10">
            <h2 className="font-notoSerif text-3xl md:text-4xl text-black mb-6">Need Visa Assistance?</h2>
            <p className="text-black/60 font-manrope mb-10 max-w-xl mx-auto">Our visa specialists are ready to help you with any visa requirements. Contact us today for a free consultation.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('Assalamu Alaikum Habib Ul Hujjaj, I would like to apply for a visa service.')} target="_blank" rel="noreferrer" className="bg-primary text-white px-10 py-4 font-manrope font-bold tracking-widest uppercase text-sm hover:opacity-90 transition-all">Apply for Visa</a>
              <a href="tel:+923004634548" className="border-2 border-primary text-primary px-10 py-4 font-manrope font-bold tracking-widest uppercase text-sm hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
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
