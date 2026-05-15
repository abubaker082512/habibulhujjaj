import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || ''

const About = () => {
  const [pageMedia, setPageMedia] = useState({})
  const [cmsContent, setCmsContent] = useState({
    heroTitle: 'About Us', heroSubtitle: 'A legacy of service, built on the foundation of faith and the honor of serving Allah\'s guests.',
    storyTitle: 'Crafting Pathways to the Holy Lands',
    storyText1: 'Habib Ul Hujjaj began as a humble aspiration: to transform the daunting logistics of pilgrimage into a seamless, contemplative experience.',
    storyText2: 'Over two decades, we have evolved from a small local agency into a premier travel concierge in Pakistan.',
    missionTitle: 'To provide affordable and comfortable Umrah journeys.', visionTitle: 'To become a trusted Umrah travel agency in Pakistan.',
    statsYears: '25+', statsPilgrims: '50K+', statsDestinations: '100+', statsRating: '4.9',
  })

  useEffect(() => {
    // Fetch from localStorage first
    try {
      const savedMedia = localStorage.getItem('pageMedia')
      if (savedMedia) setPageMedia(JSON.parse(savedMedia))
      const savedAbout = localStorage.getItem('cms_about')
      if (savedAbout) setCmsContent(prev => ({...prev, ...JSON.parse(savedAbout)}))
    } catch (e) {}

    // Then fetch from API
    axios.get(`${API_BASE}/api/cms`)
      .then(res => {
        const data = res.data;
        if (data.page_media && Object.keys(data.page_media).length > 0) {
          setPageMedia(data.page_media)
          localStorage.setItem('pageMedia', JSON.stringify(data.page_media))
        }
        if (data.cms_about && Object.keys(data.cms_about).length > 0) {
          setCmsContent(prev => ({...prev, ...data.cms_about}))
          localStorage.setItem('cms_about', JSON.stringify(data.cms_about))
        }
      })
      .catch(err => console.error('Failed to fetch CMS content:', err))
  }, [])

  return (
    <div className="bg-white text-black antialiased font-manrope">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center pt-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover" src={pageMedia.about_hero_image || "https://images.unsplash.com/photo-1572949645079-6416a599c6ae?w=1600&q=80"} alt="Grand Mosque" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/40 to-transparent"></div>
          </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-24 w-full text-white">
          <div className="max-w-3xl">
            <div className="w-12 h-1 bg-white mb-6 md:mb-8"></div>
            <h1 className="font-notoSerif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              {cmsContent.heroTitle.includes('Us') ? (
                <>
                  {cmsContent.heroTitle.split('Us')[0]}
                  <span className="text-white">Us</span>
                  {cmsContent.heroTitle.split('Us')[1]}
                </>
              ) : cmsContent.heroTitle}
            </h1>
              <p className="font-manrope text-lg text-white/80 max-w-xl">
                {cmsContent.heroSubtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-24 bg-gray-50">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-6 -left-6 md:-top-10 md:-left-10 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 border-l-2 border-t-2 border-primary/30"></div>
              <img className="shadow-2xl relative z-10 w-full object-cover asymmetric-clip" src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80" alt="Architecture" />
              <div className="absolute -bottom-6 -right-6 bg-primary p-8 hidden md:block z-20">
                <span className="font-notoSerif text-white text-3xl italic">Est. 1998</span>
              </div>
            </div>
            <div className="space-y-8">
              <span className="font-manrope tracking-[0.3em] uppercase text-xs text-primary font-bold">Company Story</span>
              <h2 className="font-notoSerif text-4xl md:text-5xl text-primary leading-tight">{cmsContent.storyTitle}</h2>
              <div className="space-y-6 text-black/70 font-manrope leading-loose text-lg">
                <p>{cmsContent.storyText1}</p>
                <p>{cmsContent.storyText2}</p>
                <p>Every detail, from the proximity of the hotels to the expertise of our guides, is curated to ensure that your focus remains entirely on the spiritual essence of your visit.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-24 bg-white">
          <div className="max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Mission */}
              <div className="md:col-span-7 bg-primary-container p-6 md:p-10 lg:p-12 flex flex-col justify-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110"></div>
                <span className="font-manrope tracking-widest uppercase text-xs text-primary mb-4">Our Mission</span>
                <h3 className="font-notoSerif text-3xl md:text-4xl text-black mb-6 leading-snug">{cmsContent.missionTitle}</h3>
                <p className="text-black/70 text-lg font-manrope leading-relaxed">We dismantle the barriers of complexity and cost, ensuring every believer can answer the call to the Haramain with dignity and ease.</p>
              </div>
              {/* Vision */}
              <div className="md:col-span-5 bg-gray-50 p-6 md:p-10 lg:p-12 flex flex-col justify-center border-b-4 border-primary">
                <span className="font-manrope tracking-widest uppercase text-xs text-primary mb-4">Our Vision</span>
                <h3 className="font-notoSerif text-3xl text-primary mb-6">{cmsContent.visionTitle}</h3>
                <p className="text-black/70 font-manrope">We aspire to set the gold standard in pilgrimage services, blending traditional values with modern logistical excellence.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-24 bg-gray-50 relative">
          <div className="text-center mb-12 md:mb-16">
            <h6 className="font-manrope text-primary font-bold text-sm tracking-[0.2em] uppercase mb-4">What We Stand For</h6>
            <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl text-black mb-4">Core Principles</h2>
            <div className="w-24 h-1 bg-primary mx-auto opacity-50"></div>
          </div>
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white p-6 md:p-8 lg:p-10 border border-gray-100 shadow-sm hover:-translate-y-2 transition-transform duration-300">
              <div className="text-primary bg-primary/5 w-16 h-16 flex items-center justify-center rounded-lg mb-6">
                <span className="material-symbols-outlined text-3xl">verified_user</span>
              </div>
              <h4 className="font-notoSerif text-2xl text-primary mb-4">Honesty</h4>
              <p className="text-black/70 font-manrope leading-relaxed">Transparency in every transaction. No hidden costs, no unkept promises—just pure, honest service for your journey.</p>
            </div>
            <div className="bg-white p-6 md:p-8 lg:p-10 border border-gray-100 shadow-sm hover:-translate-y-2 transition-transform duration-300">
              <div className="text-primary bg-primary/5 w-16 h-16 flex items-center justify-center rounded-lg mb-6">
                <span className="material-symbols-outlined text-3xl">concierge</span>
              </div>
              <h4 className="font-notoSerif text-2xl text-primary mb-4">Professional Service</h4>
              <p className="text-black/70 font-manrope leading-relaxed">Our team brings decades of logistical expertise, ensuring that every leg of your travel is managed with precision.</p>
            </div>
            <div className="bg-white p-6 md:p-8 lg:p-10 border border-gray-100 shadow-sm hover:-translate-y-2 transition-transform duration-300">
              <div className="text-primary bg-primary/5 w-16 h-16 flex items-center justify-center rounded-lg mb-6">
                <span className="material-symbols-outlined text-3xl">sentiment_very_satisfied</span>
              </div>
              <h4 className="font-notoSerif text-2xl text-primary mb-4">Customer Satisfaction</h4>
              <p className="text-black/70 font-manrope leading-relaxed">The pilgrim's smile is our greatest reward. We go beyond service to provide a heartfelt hospitality experience.</p>
            </div>
          </div>
        </section>

        {/* Team Stats */}
        <section className="py-16 md:py-24 bg-primary-container relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
            <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1564507004663-b6dfb3c8924d?w=1200&q=80" alt="Pattern" />
          </div>
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
            <div className="text-center mb-12 md:mb-16">
              <h6 className="font-manrope text-primary font-bold text-sm tracking-[0.2em] uppercase mb-4">Our Journey</h6>
              <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-bold text-black">Two Decades of Excellence</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { number: cmsContent.statsYears, label: 'Years of Service' },
                { number: cmsContent.statsPilgrims, label: 'Pilgrims Served' },
                { number: cmsContent.statsDestinations, label: 'Tour Destinations' },
                { number: cmsContent.statsRating, label: 'Average Rating' }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-notoSerif text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-black/70 font-manrope text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-5xl mx-auto bg-white border-2 border-primary text-center p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-xl rounded-3xl">
            <div className="relative z-10">
              <h6 className="font-manrope text-primary font-bold text-sm tracking-[0.2em] uppercase mb-4">Ready to Begin?</h6>
              <h2 className="font-notoSerif text-3xl md:text-4xl text-black mb-6">Ready to begin your pilgrimage?</h2>
              <p className="text-black/70 font-manrope mb-10 max-w-xl mx-auto">Consult with our specialists today and let us tailor a journey that honors your devotion.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/packages" className="bg-primary text-white px-10 py-4 font-manrope font-bold tracking-widest uppercase text-sm hover:opacity-90 transition-all">View Packages</Link>
                <Link to="/contact" className="border-2 border-primary text-primary px-10 py-4 font-manrope font-bold tracking-widest uppercase text-sm hover:bg-primary/5 transition-all">Speak to an Agent</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default About
