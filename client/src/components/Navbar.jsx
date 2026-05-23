import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'

const Navbar = ({ isVersion2 = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const links = [
    { to: '/', label: 'Home' },
    { to: '/flights', label: 'Flights' },
    { to: '/packages', label: 'Umrah Packages' },
    { to: '/international-tours', label: 'International Tours' },
    { to: '/visa-services', label: 'Visa Services' },
    { to: '/taxi-services', label: 'Taxi Services' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/blog', label: 'Blog' },
    { to: '/about', label: 'About Us' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contact', label: 'Contact' },
  ]

  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-md">
      <div className="flex justify-between items-center w-full px-4 sm:px-6 md:px-8 py-4 max-w-screen-2xl mx-auto text-primary">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Habib Ul Hujjaj Logo" className="h-10 md:h-14 lg:h-16 w-auto object-contain" />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `font-manrope text-[13px] font-bold uppercase tracking-widest transition-all ${isActive ? 'text-secondary border-b-2 border-secondary pb-1' : 'text-primary hover:text-secondary'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <Link to="/packages" className="hidden sm:inline-block bg-primary text-secondary px-6 py-2.5 rounded-md font-manrope text-xs font-black tracking-widest uppercase hover:scale-105 transition-all shadow-xl hover:bg-secondary hover:text-primary cursor-pointer">Book Now</Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-primary p-2 cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-3xl">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-6 space-y-2 max-h-[80vh] overflow-y-auto shadow-2xl">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `block font-manrope text-sm font-bold uppercase tracking-widest py-4 px-6 rounded-lg ${isActive ? 'text-secondary bg-primary' : 'text-primary hover:text-secondary hover:bg-gray-50'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/packages"
            onClick={handleLinkClick}
            className="block bg-primary text-secondary text-center py-4 px-6 rounded-md font-manrope text-sm font-black tracking-widest uppercase mt-6 cursor-pointer hover:bg-secondary hover:text-primary transition-colors"
          >
            Book Now
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
