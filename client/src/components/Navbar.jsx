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
    <nav className={`fixed top-0 left-0 right-0 z-50 ${isVersion2 ? 'bg-white/80 backdrop-blur-md' : 'bg-white'} border-b border-gray-100 shadow-sm`}>
      <div className="flex justify-between items-center w-full px-4 sm:px-6 md:px-8 py-3 md:py-4 max-w-screen-2xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Habib Ul Hujjaj Logo" className="h-12 md:h-16 lg:h-20 w-auto object-contain" />
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `font-manrope text-sm tracking-wide ${isActive ? 'text-primary border-b-2 border-primary pb-1' : 'text-black/80 hover:text-primary'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <Link to="/packages" className="hidden sm:inline-block bg-primary text-white px-4 md:px-6 py-2 rounded-md font-manrope text-sm font-bold tracking-wide hover:opacity-90 transition-all">Book Now</Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-black p-2"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto shadow-xl">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `block font-manrope text-sm tracking-wide py-3 px-4 rounded-lg ${isActive ? 'text-primary bg-primary/5' : 'text-black/80 hover:text-primary hover:bg-gray-50'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/packages"
            onClick={handleLinkClick}
            className="block bg-primary text-white text-center py-3 px-4 rounded-md font-manrope text-sm font-bold tracking-wide mt-4"
          >
            Book Now
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
