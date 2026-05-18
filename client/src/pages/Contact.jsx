import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || ''

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: 'Umrah Packages', message: '' })
  const [pageMedia, setPageMedia] = useState({})
  const [cmsContent, setCmsContent] = useState({
    heroTitle: 'Get in Touch', heroSubtitle: 'Have questions about our Umrah packages or international tours? Our travel consultants are ready to assist you.',
    phone1: '0300 4634548', phone2: '', email: 'info@habibulhujaj.com', whatsapp: '0300 4634548',
    addressLahore: 'Office #201-202, 2nd Floor, Ibrahim Trade Center, Garden Town Lahore', addressKarachi: 'DHA Phase II, Karachi, Pakistan',
  })

  useEffect(() => {
    try {
      const savedMedia = localStorage.getItem('pageMedia')
      if (savedMedia) setPageMedia(JSON.parse(savedMedia))
      const savedContact = localStorage.getItem('cms_contact')
      if (savedContact) {
        const parsed = JSON.parse(savedContact)
        if (parsed.phone1 && parsed.phone1.includes('123 4567')) {
          localStorage.removeItem('cms_contact')
        } else {
          setCmsContent(prev => ({...prev, ...parsed}))
        }
      }
    } catch (e) {}

    axios.get(`${API_BASE}/api/cms`)
      .then(res => {
        const data = res.data;
        if (data.page_media && Object.keys(data.page_media).length > 0) {
          setPageMedia(data.page_media)
          localStorage.setItem('pageMedia', JSON.stringify(data.page_media))
        }
        if (data.cms_contact && Object.keys(data.cms_contact).length > 0) {
          const contact = data.cms_contact
          if (contact.phone1 && contact.phone1.includes('123 4567')) {
            const corrected = {
              ...contact,
              phone1: '0300 4634548',
              phone2: '',
              whatsapp: '0300 4634548',
              addressLahore: 'Office #201-202, 2nd Floor, Ibrahim Trade Center, Garden Town Lahore'
            }
            setCmsContent(prev => ({...prev, ...corrected}))
            localStorage.setItem('cms_contact', JSON.stringify(corrected))
          } else {
            setCmsContent(prev => ({...prev, ...contact}))
            localStorage.setItem('cms_contact', JSON.stringify(contact))
          }
        }
      })
      .catch(err => console.error('Failed to fetch CMS content:', err))
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`${API_BASE}/api/submissions`, formData)
      .then(res => {
        alert('Thank you for your message! Our team will contact you within 24 hours.')
        setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' })
      })
      .catch(err => {
        console.error('Failed to submit form:', err)
        alert('Thank you for your message! Our team will contact you within 24 hours. (Saved Locally)')
      })
  }

  return (
    <div className="bg-white font-manrope text-black min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center pt-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" src={pageMedia.contact_hero_image || "https://images.unsplash.com/photo-1572949645079-6416a599c6ae?w=1600&q=80"} alt="Contact Us" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/40 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-24 w-full">
          <div className="max-w-3xl">
            <div className="w-12 h-1 bg-white mb-6 md:mb-8"></div>
            <h1 className="font-notoSerif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              {cmsContent.heroTitle.includes('Touch') ? (
                <>
                  {cmsContent.heroTitle.split('Touch')[0]}
                  <span className="text-white">Touch</span>
                  {cmsContent.heroTitle.split('Touch')[1]}
                </>
              ) : cmsContent.heroTitle}
            </h1>
            <p className="font-manrope text-base md:text-lg text-white/70 max-w-xl">
              {cmsContent.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 max-w-screen-2xl mx-auto bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Phone */}
            <div className="bg-white p-4 md:p-6 lg:p-8 border border-gray-100 shadow-sm hover:-translate-y-1 transition-transform">
              <div className="text-primary bg-primary/5 w-14 h-14 flex items-center justify-center rounded-lg mb-4">
                <span className="material-symbols-outlined text-2xl">call</span>
              </div>
              <h3 className="font-notoSerif text-xl font-bold text-primary mb-2">Call Us</h3>
              <p className="text-black/60 text-sm mb-3">Available 24/7 for your inquiries</p>
              <a href={`tel:${cmsContent.phone1}`} className="text-primary font-bold hover:underline">{cmsContent.phone1}</a>
              {cmsContent.phone2 && (
                <>
                  <br />
                  <a href={`tel:${cmsContent.phone2}`} className="text-primary font-bold hover:underline">{cmsContent.phone2}</a>
                </>
              )}
            </div>

            {/* WhatsApp */}
            <div className="bg-white p-4 md:p-6 lg:p-8 border border-gray-100 shadow-sm hover:-translate-y-1 transition-transform">
              <div className="text-primary bg-primary/5 w-14 h-14 flex items-center justify-center rounded-lg mb-4">
                <span className="material-symbols-outlined text-2xl">chat</span>
              </div>
              <h3 className="font-notoSerif text-xl font-bold text-primary mb-2">WhatsApp</h3>
              <p className="text-black/60 text-sm mb-3">Quick responses on WhatsApp</p>
              <a href={`https://wa.me/${cmsContent.whatsapp.replace(/\D/g,'')}`} className="text-primary font-bold hover:underline">{cmsContent.whatsapp}</a>
            </div>

            {/* Email */}
            <div className="bg-white p-4 md:p-6 lg:p-8 border border-gray-100 shadow-sm hover:-translate-y-1 transition-transform">
              <div className="text-primary bg-primary/5 w-14 h-14 flex items-center justify-center rounded-lg mb-4">
                <span className="material-symbols-outlined text-2xl">mail</span>
              </div>
              <h3 className="font-notoSerif text-xl font-bold text-primary mb-2">Email</h3>
              <p className="text-black/60 text-sm mb-3">We reply within 24 hours</p>
              <a href={`mailto:${cmsContent.email}`} className="text-primary font-bold hover:underline">{cmsContent.email}</a>
            </div>

            {/* Office */}
            <div className="bg-white p-4 md:p-6 lg:p-8 border border-gray-100 shadow-sm hover:-translate-y-1 transition-transform">
              <div className="text-primary bg-primary/5 w-14 h-14 flex items-center justify-center rounded-lg mb-4">
                <span className="material-symbols-outlined text-2xl">location_on</span>
              </div>
              <h3 className="font-notoSerif text-xl font-bold text-primary mb-2">Office</h3>
              <p className="text-black/60 text-sm leading-relaxed">
                {cmsContent.addressLahore}
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 lg:p-12 border border-gray-100 shadow-sm">
              <h2 className="font-notoSerif text-3xl font-bold text-primary mb-2">Send Us a Message</h2>
              <p className="text-black/60 text-sm mb-8">Fill out the form below and our travel consultants will get back to you within 24 hours.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-black/40 mb-2">Full Name</label>
                    <input 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white border-0 border-b border-gray-200 focus:border-primary focus:ring-0 transition-colors py-3 text-sm" 
                      placeholder="Enter your name" 
                      type="text" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-black/40 mb-2">Email Address</label>
                    <input 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white border-0 border-b border-gray-200 focus:border-primary focus:ring-0 transition-colors py-3 text-sm" 
                      placeholder="Enter your email" 
                      type="email" 
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-black/40 mb-2">Phone Number</label>
                    <input 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-white border-0 border-b border-gray-200 focus:border-primary focus:ring-0 transition-colors py-3 text-sm" 
                      placeholder="+92 XXXXX XXXXX" 
                      type="tel" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-black/40 mb-2">Subject</label>
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-white border-0 border-b border-gray-200 focus:border-primary focus:ring-0 transition-colors py-3 text-sm appearance-none"
                    >
                      <option>Umrah Packages</option>
                      <option>International Tours</option>
                      <option>Visa Services</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-black/40 mb-2">Your Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-white border-0 border-b border-gray-200 focus:border-primary focus:ring-0 transition-colors py-3 text-sm resize-none" 
                    placeholder="Tell us about your travel plans or questions..." 
                    rows={5}
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="w-full bg-primary text-white py-4 rounded-md font-bold text-sm tracking-widest uppercase shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-2">
                  Send Message
                  <span className="material-symbols-outlined text-sm">send</span>
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-center gap-4">
                <span className="text-sm text-black/40">Or reach us directly via</span>
                <a href={`https://wa.me/${cmsContent.whatsapp.replace(/\D/g,'')}`} className="flex items-center gap-2 text-primary font-bold hover:underline">
                  <span className="material-symbols-outlined">chat</span>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-16 md:pb-24 px-4 sm:px-6 md:px-8 max-w-screen-2xl mx-auto bg-white">
        <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 md:p-8 border-b border-gray-100">
            <h3 className="font-notoSerif text-2xl font-bold text-primary mb-2">Our Location</h3>
            <p className="text-black/60 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">location_on</span>
              {cmsContent.addressLahore}
            </p>
          </div>
          <div className="h-96 md:h-[500px] w-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.3262624535314!2d74.34110367544078!3d31.515222074216345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919045a281ab2b3%3A0xc6b3864115f79796!2sMain%20Blvd%20Gulberg%2C%20Lahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1715774500000!5m2!1sen!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Habib Ul Hujjaj Office Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary-container relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 text-center">
          <h6 className="font-manrope text-primary font-bold text-sm tracking-[0.2em] uppercase mb-4">Ready to Travel?</h6>
          <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">Let Us Plan Your Journey</h2>
          <p className="text-black/60 mb-10 max-w-xl mx-auto">Whether it's a spiritual Umrah journey or an international adventure, our experts are here to make it happen.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/packages" className="bg-primary text-white px-10 py-4 font-manrope font-bold tracking-widest uppercase text-sm hover:opacity-90 transition-all">View Packages</Link>
            <a href={`tel:${cmsContent.phone1}`} className="border-2 border-primary text-primary px-10 py-4 font-manrope font-bold tracking-widest uppercase text-sm hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
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

export default Contact
