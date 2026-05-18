import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || ''

const Footer = () => {
  const [footerContent, setFooterContent] = useState({
    description: 'Habib Ul Hujjaj specializes in crafting meaningful spiritual journeys and world-class international tours for the discerning traveler.',
    quickLinks: ['About Us', 'Visa Services', 'Packages', 'Contact', 'FAQ'],
    copyright: '© 2024 Habib Ul Hujjaj. All Rights Reserved.',
    socialLinks: { facebook: '', instagram: '', twitter: '', youtube: '' }
  })
  const [settings, setSettings] = useState({
    siteName: 'Habib Ul Hujjaj',
    address: 'Office #201-202, 2nd Floor, Ibrahim Trade Center, Garden Town Lahore',
    phone: '0300 4634548',
    timings: 'Mon - Sat 10.00 Am - 11.00 pm'
  })

  useEffect(() => {
    try {
      const savedFooter = localStorage.getItem('cms_footer')
      if (savedFooter) setFooterContent(prev => ({...prev, ...JSON.parse(savedFooter)}))
      
      const savedSettings = localStorage.getItem('site_settings')
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings)
        if (parsed.phone && parsed.phone.includes('123 4567')) {
          localStorage.removeItem('site_settings')
        } else {
          setSettings(prev => ({...prev, ...parsed}))
        }
      }
    } catch(e) {}

    axios.get(`${API_BASE}/api/cms`)
      .then(res => {
        const data = res.data;
        if (data.cms_footer && Object.keys(data.cms_footer).length > 0) {
          setFooterContent(prev => ({...prev, ...data.cms_footer}))
          localStorage.setItem('cms_footer', JSON.stringify(data.cms_footer))
        }
        if (data.site_settings && Object.keys(data.site_settings).length > 0) {
          const settingsVal = data.site_settings
          if (settingsVal.phone && settingsVal.phone.includes('123 4567')) {
            const corrected = {
              ...settingsVal,
              phone: '0300 4634548',
              whatsapp: '0300 4634548',
              address: 'Office #201-202, 2nd Floor, Ibrahim Trade Center, Garden Town Lahore'
            }
            setSettings(prev => ({...prev, ...corrected}))
            localStorage.setItem('site_settings', JSON.stringify(corrected))
          } else {
            setSettings(prev => ({...prev, ...settingsVal}))
            localStorage.setItem('site_settings', JSON.stringify(settingsVal))
          }
        }
      })
      .catch(err => console.error('Footer fetch error:', err))
  }, [])

  const linkMap = {
    'About Us': '/about',
    'Visa Services': '/visa-services',
    'Packages': '/packages',
    'Terms & Conditions': '/',
    'Privacy Policy': '/',
    'Contact': '/contact',
    'FAQ': '/faq'
  }

  return (
    <footer className="bg-primary text-white border-t border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 px-4 sm:px-8 md:px-12 py-12 md:py-20 w-full max-w-screen-2xl mx-auto">
        <div className="space-y-6">
          <div className="font-notoSerif text-2xl text-secondary font-bold uppercase tracking-tighter">{settings.siteName}</div>
          <p className="text-white/60 text-sm leading-relaxed font-manrope">{footerContent.description}</p>
          <div className="flex gap-4">
            <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all cursor-pointer"><i className="fab fa-facebook-f text-xs"></i></span>
            <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all cursor-pointer"><i className="fab fa-instagram text-xs"></i></span>
            <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all cursor-pointer"><i className="fab fa-whatsapp text-xs"></i></span>
          </div>
        </div>
        <div>
          <h5 className="font-notoSerif text-lg text-secondary font-bold mb-8">Quick Links</h5>
          <ul className="space-y-4">
            {footerContent.quickLinks.map((link, idx) => (
              <li key={idx}><Link to={linkMap[link] || '/'} className="text-white/60 hover:text-secondary transition-all text-sm font-manrope">{link}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="font-notoSerif text-lg text-secondary font-bold mb-8">Contact Us</h5>
          <ul className="space-y-6 text-white/60 text-sm font-manrope">
            <li className="flex items-start gap-4">
              <span className="material-symbols-outlined text-secondary text-xl mt-1">location_on</span>
              <span className="leading-relaxed">{settings.address}</span>
            </li>
            <li className="flex items-center gap-4">
              <span className="material-symbols-outlined text-secondary text-xl">phone_iphone</span>
              <span className="font-bold text-white">{settings.phone}</span>
            </li>
            <li className="flex items-center gap-4">
              <span className="material-symbols-outlined text-secondary text-xl">schedule</span>
              <span>{settings.timings}</span>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-notoSerif text-lg text-secondary font-bold mb-8">Newsletter</h5>
          <p className="text-white/60 text-xs mb-6 leading-relaxed">Join our mailing list for exclusive spiritual travel deals and updates.</p>
          <div className="flex gap-2">
            <input className="bg-white/5 border border-white/10 text-white text-sm w-full py-3 px-4 rounded-md focus:ring-1 focus:ring-secondary focus:border-secondary outline-none" placeholder="Email Address" type="email" />
            <button className="bg-secondary text-primary px-4 rounded-md hover:opacity-90 transition-all">
              <span className="material-symbols-outlined font-bold">send</span>
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 px-4 md:px-12 py-8 text-center bg-black/10">
        <p className="text-white/40 text-xs font-manrope uppercase tracking-widest">{footerContent.copyright}</p>
      </div>
    </footer>
  )
}

export default Footer