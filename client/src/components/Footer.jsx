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
    address: 'Main Boulevard, Gulberg III, Lahore, Pakistan',
    address2: 'DHA Phase II, Karachi, Pakistan' // using this as a placeholder since cms_contact had 2 addresses
  })

  useEffect(() => {
    try {
      const savedFooter = localStorage.getItem('cms_footer')
      if (savedFooter) setFooterContent(prev => ({...prev, ...JSON.parse(savedFooter)}))
      const savedSettings = localStorage.getItem('site_settings')
      if (savedSettings) setSettings(prev => ({...prev, ...JSON.parse(savedSettings)}))
      const savedContact = localStorage.getItem('cms_contact')
      if (savedContact) setSettings(prev => ({...prev, address2: JSON.parse(savedContact).addressKarachi}))
    } catch(e) {}

    axios.get(`${API_BASE}/api/cms`)
      .then(res => {
        const data = res.data;
        if (data.cms_footer && Object.keys(data.cms_footer).length > 0) {
          setFooterContent(prev => ({...prev, ...data.cms_footer}))
          localStorage.setItem('cms_footer', JSON.stringify(data.cms_footer))
        }
        if (data.site_settings && Object.keys(data.site_settings).length > 0) {
          setSettings(prev => ({...prev, ...data.site_settings}))
          localStorage.setItem('site_settings', JSON.stringify(data.site_settings))
        }
        if (data.cms_contact && Object.keys(data.cms_contact).length > 0) {
          setSettings(prev => ({...prev, address2: data.cms_contact.addressKarachi}))
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
    <footer className="bg-white border-t border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 px-4 sm:px-8 md:px-12 py-10 md:py-16 w-full max-w-screen-2xl mx-auto">
        <div className="space-y-6">
          <div className="font-notoSerif text-xl text-primary font-bold uppercase">{settings.siteName}</div>
          <p className="text-black/60 text-sm leading-relaxed font-manrope">{footerContent.description}</p>
        </div>
        <div>
          <h5 className="font-notoSerif text-lg text-primary font-bold mb-6">Quick Links</h5>
          <ul className="space-y-4">
            {footerContent.quickLinks.map((link, idx) => (
              <li key={idx}><Link to={linkMap[link] || '/'} className="text-black/60 hover:text-primary transition-all text-sm font-manrope">{link}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="font-notoSerif text-lg text-primary font-bold mb-6">Offices</h5>
          <ul className="space-y-4 text-black/60 text-sm font-manrope">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-sm mt-1">location_on</span>
              <span>{settings.address}</span>
            </li>
            {settings.address2 && (
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-sm mt-1">location_on</span>
                <span>{settings.address2}</span>
              </li>
            )}
          </ul>
        </div>
        <div>
          <h5 className="font-notoSerif text-lg text-primary font-bold mb-6">Newsletter</h5>
          <p className="text-black/60 text-xs mb-4">Stay updated with the latest deals.</p>
          <div className="flex gap-2">
            <input className="bg-gray-50 border-0 border-b border-gray-200 text-black text-sm w-full focus:ring-0 focus:border-primary" placeholder="Email Address" type="email" />
            <button className="text-primary"><span className="material-symbols-outlined">send</span></button>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-100 px-4 md:px-12 py-6 md:py-8 text-center">
        <p className="text-black/40 text-xs font-manrope">{footerContent.copyright}</p>
      </div>
    </footer>
  )
}

export default Footer