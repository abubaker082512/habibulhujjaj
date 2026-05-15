import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || ''

const faqCategories = [
  {
    title: 'Umrah Packages',
    icon: 'mosque',
    faqs: [
      { q: 'How much does Umrah cost from Pakistan?', a: 'Umrah packages from Pakistan typically range from PKR 150,000 to PKR 500,000 depending on the package type (Economy, 3-Star, 4-Star, 5-Star), duration, and season. Ramadan and December packages may have different pricing.' },
      { q: 'How many days are required for Umrah?', a: 'A standard Umrah journey typically takes 7 to 15 days. This includes 3-5 days in Makkah for Umrah rituals and Ziyarat, and 3-5 days in Madinah for prayers and visiting historical sites.' },
      { q: 'What is included in your Umrah packages?', a: 'Our packages include Umrah visa processing, return air tickets, hotel accommodation, ground transportation, guided Ziyarat tours, and daily breakfast. Some premium packages also include lunch and dinner.' },
      { q: 'Can I customize my Umrah package?', a: 'Yes, we offer customized Umrah packages tailored to your preferences. You can choose your preferred hotel, duration, travel dates, and additional services. Contact our team for a personalized quote.' }
    ]
  },
  {
    title: 'Visa Services',
    icon: 'description',
    faqs: [
      { q: 'What documents are required for Umrah visa?', a: 'You will need a valid passport (minimum 6 months validity), passport-sized photos, vaccination certificates (Meningitis and COVID-19), return ticket, and hotel booking confirmation.' },
      { q: 'How long does visa processing take?', a: 'Umrah visa processing typically takes 3-5 business days. Tourist visas for Saudi Arabia take 5-7 days, while Schengen visas may take 10-15 business days.' },
      { q: 'Can you help with visa rejection cases?', a: 'Yes, our experienced team can assist with visa re-application and help address any issues that may have led to rejection. We provide guidance on improving your application.' }
    ]
  },
  {
    title: 'Travel & Hotels',
    icon: 'flight',
    faqs: [
      { q: 'Which hotels are near Haram in Makkah?', a: 'We offer hotels at various distances from Haram, ranging from 50m (within Abraj Al Bait) to 1km. Our premium packages include hotels like Pullman Zamzam, Fairmont Clock Tower, and Swissotel Makkah.' },
      { q: 'What airlines do you work with?', a: 'We work with major airlines including PIA, Saudi Airlines, Emirates, Turkish Airlines, and Flydubai. Flight options depend on your departure city and travel dates.' },
      { q: 'Is transportation included in the package?', a: 'Yes, all our packages include ground transportation including airport transfers, intercity travel between Makkah and Madinah, and transportation for Ziyarat tours.' }
    ]
  },
  {
    title: 'International Tours',
    icon: 'travel_explore',
    faqs: [
      { q: 'What international tours do you offer?', a: 'We offer curated tours to Turkey, Dubai, Malaysia, Europe, and other destinations. Each tour includes accommodation, transportation, guided tours, and select meals.' },
      { q: 'Can I combine Umrah with an international tour?', a: 'Yes, we offer combined packages that include Umrah followed by an international tour. Popular combinations include Umrah + Turkey and Umrah + Dubai.' },
      { q: 'Are international tour packages customizable?', a: 'Absolutely! We can customize international tour packages based on your preferences, including duration, destinations, hotels, and activities.' }
    ]
  }
]

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState(0)
  const [openIndex, setOpenIndex] = useState(null)
  const [pageMedia, setPageMedia] = useState({})
  const [faqCategories, setFaqCategories] = useState([
    { title: 'Umrah Packages', icon: 'mosque', faqs: [{ q: 'Loading...', a: 'FAQs loading...' }] }
  ])

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

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

    axios.get(`${API_BASE}/api/cms?id=cms_faq`)
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          const categories = {}
          res.data.forEach(faq => {
            const cat = faq.category || 'General'
            if (!categories[cat]) categories[cat] = { title: cat, icon: 'help', faqs: [] }
            categories[cat].faqs.push({ q: faq.question, a: faq.answer })
          })
          setFaqCategories(Object.values(categories))
        }
      })
      .catch(err => console.error('Failed to fetch FAQs:', err))
  }, [])

  return (
    <div className="bg-surface font-manrope text-on-surface min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" src={pageMedia.faq_hero_image || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80"} alt="FAQ" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-24 w-full">
          <div className="max-w-3xl">
            <div className="w-12 h-1 bg-[#CD9933] mb-6 md:mb-8"></div>
            <h1 className="font-notoSerif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Frequently Asked <span className="text-[#CD9933]">Questions</span>
            </h1>
            <p className="font-manrope text-base md:text-lg text-white/80 max-w-xl">
              Find answers to common questions about our Umrah packages, visa services, travel arrangements, and more.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Category Tabs */}
          <div className="lg:col-span-1">
            <h3 className="font-notoSerif text-xl font-bold text-primary mb-6">Categories</h3>
            <div className="space-y-2">
              {faqCategories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveCategory(i); setOpenIndex(null); }}
                  className={`w-full text-left p-4 rounded-lg flex items-center gap-3 transition-all ${activeCategory === i ? 'bg-[#013334] text-white' : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container'}`}
                >
                  <span className="material-symbols-outlined">{cat.icon}</span>
                  <span className="font-bold text-sm">{cat.title}</span>
                </button>
              ))}
            </div>

            {/* Contact Card */}
            <div className="mt-8 bg-[#CD9933] p-6 rounded-xl editorial-shadow">
              <h4 className="font-notoSerif text-xl text-white mb-3">Still have questions?</h4>
              <p className="text-white/80 text-sm mb-4">Our team is here to help you with any inquiries.</p>
              <Link to="/contact" className="bg-white text-[#CD9933] px-6 py-3 rounded-md font-bold text-sm flex items-center justify-center gap-2 hover:bg-surface-container-lowest transition-all">
                Contact Us
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="lg:col-span-3">
            <h2 className="font-notoSerif text-3xl font-bold text-primary mb-8">{faqCategories[activeCategory].title}</h2>
            <div className="space-y-4">
              {faqCategories[activeCategory].faqs.map((faq, i) => (
                <div key={i} className="bg-surface-container-lowest editorial-shadow overflow-hidden">
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-surface-container-low transition-colors"
                  >
                    <span className="font-notoSerif text-lg font-bold text-primary">{faq.q}</span>
                    <span className={`material-symbols-outlined text-[#CD9933] transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}>expand_more</span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="px-6 pb-6 text-on-surface-variant leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Questions Quick Links */}
      <section className="py-16 md:py-24 bg-primary-container relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h6 className="font-manrope text-[#CD9933] font-bold text-sm tracking-[0.2em] uppercase mb-4">Quick Answers</h6>
            <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Most Searched Questions</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { q: 'How much does Umrah cost?', icon: 'payments' },
              { q: 'How many days for Umrah?', icon: 'calendar_today' },
              { q: 'Best hotels near Haram?', icon: 'hotel' },
              { q: 'Documents for Umrah visa?', icon: 'description' }
            ].map((item, i) => (
              <button key={i} className="bg-white/5 border border-white/10 p-4 md:p-6 rounded-xl text-left hover:bg-white/10 transition-all group">
                <span className="material-symbols-outlined text-[#CD9933] text-3xl mb-4 block">{item.icon}</span>
                <span className="text-white font-bold group-hover:text-[#CD9933] transition-colors">{item.q}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default FAQ
