import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.jpeg'

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
    <nav className={`fixed top-0 left-0 right-0 z-50 ${isVersion2 ? 'bg-[#013334]/80 backdrop-blur-md' : 'bg-[#013334] dark:bg-[#001c1d]'} shadow-[0_8px_40px_rgba(1,51,52,0.06)]`}>
      <div className="flex justify-between items-center w-full px-4 sm:px-6 md:px-8 py-3 md:py-4 max-w-screen-2xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Habibulhujaj Travel Logo" className="h-8 sm:h-10 w-auto" />
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `font-manrope text-sm tracking-wide ${isActive ? 'text-[#CD9933] border-b-2 border-[#CD9933] pb-1' : 'text-white/80 hover:text-white'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <Link to="/packages" className="hidden sm:inline-block bg-[#CD9933] text-white px-4 md:px-6 py-2 rounded-md font-manrope text-sm font-bold tracking-wide hover:opacity-90 transition-all">Book Now</Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#013334] border-t border-white/10 px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `block font-manrope text-sm tracking-wide py-3 px-4 rounded-lg ${isActive ? 'text-[#CD9933] bg-white/5' : 'text-white/80 hover:text-white hover:bg-white/5'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/packages"
            onClick={handleLinkClick}
            className="block bg-[#CD9933] text-white text-center py-3 px-4 rounded-md font-manrope text-sm font-bold tracking-wide mt-4"
          >
            Book Now
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
