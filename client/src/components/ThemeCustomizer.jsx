import React, { useEffect, useState } from 'react'

const palettes = [
  {
    id: 'navy',
    name: 'Legacy Navy',
    description: 'Original theme of Habib Ul Hujjaj',
    colors: {
      '--color-primary': '#0B1B3D',
      '--color-on-primary': '#ffffff',
      '--color-primary-container': '#eef2ff',
      '--color-on-primary-container': '#0B1B3D',
      '--color-secondary': '#ffc55b',
      '--color-on-secondary': '#0B1B3D',
      '--color-background': '#FCFAF6',
      '--color-on-background': '#0B1B3D',
      '--color-surface': '#FCFAF6',
      '--color-on-surface': '#0B1B3D'
    },
    preview: { primary: '#0B1B3D', secondary: '#ffc55b', bg: '#FCFAF6' }
  },
  {
    id: 'emerald',
    name: 'Sacred Emerald',
    description: 'Calming and highly spiritual emerald green',
    colors: {
      '--color-primary': '#0A3C2B',
      '--color-on-primary': '#ffffff',
      '--color-primary-container': '#e6f4ea',
      '--color-on-primary-container': '#0A3C2B',
      '--color-secondary': '#ffc55b',
      '--color-on-secondary': '#0A3C2B',
      '--color-background': '#F7FAF7',
      '--color-on-background': '#0A3C2B',
      '--color-surface': '#F7FAF7',
      '--color-on-surface': '#0A3C2B'
    },
    preview: { primary: '#0A3C2B', secondary: '#ffc55b', bg: '#F7FAF7' }
  },
  {
    id: 'olive',
    name: 'Oasis Olive',
    description: 'Serene olive shade representing peace',
    colors: {
      '--color-primary': '#2D3A28',
      '--color-on-primary': '#ffffff',
      '--color-primary-container': '#f1f5f0',
      '--color-on-primary-container': '#2D3A28',
      '--color-secondary': '#E2B155',
      '--color-on-secondary': '#2D3A28',
      '--color-background': '#FAF9F5',
      '--color-on-background': '#2D3A28',
      '--color-surface': '#FAF9F5',
      '--color-on-surface': '#2D3A28'
    },
    preview: { primary: '#2D3A28', secondary: '#E2B155', bg: '#FAF9F5' }
  },
  {
    id: 'sand',
    name: 'Desert Sand',
    description: 'Warm cocoa-espresso tones of desert dunes',
    colors: {
      '--color-primary': '#3E2723',
      '--color-on-primary': '#ffffff',
      '--color-primary-container': '#efebe9',
      '--color-on-primary-container': '#3E2723',
      '--color-secondary': '#E5A93C',
      '--color-on-secondary': '#3E2723',
      '--color-background': '#FAF6F0',
      '--color-on-background': '#3E2723',
      '--color-surface': '#FAF6F0',
      '--color-on-surface': '#3E2723'
    },
    preview: { primary: '#3E2723', secondary: '#E5A93C', bg: '#FAF6F0' }
  },
  {
    id: 'slate',
    name: 'Modern Slate',
    description: 'Sleek, minimalist and contemporary charcoal gray',
    colors: {
      '--color-primary': '#1F2937',
      '--color-on-primary': '#ffffff',
      '--color-primary-container': '#f3f4f6',
      '--color-on-primary-container': '#1F2937',
      '--color-secondary': '#ffc55b',
      '--color-on-secondary': '#1F2937',
      '--color-background': '#F4F6F8',
      '--color-on-background': '#1F2937',
      '--color-surface': '#F4F6F8',
      '--color-on-surface': '#1F2937'
    },
    preview: { primary: '#1F2937', secondary: '#ffc55b', bg: '#F4F6F8' }
  }
]

const ThemeCustomizer = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentTheme, setCurrentTheme] = useState('navy')

  // Apply theme settings globally
  const applyTheme = (themeId) => {
    const palette = palettes.find(p => p.id === themeId)
    if (!palette) return

    Object.entries(palette.colors).forEach(([cssVar, hexValue]) => {
      document.documentElement.style.setProperty(cssVar, hexValue)
    })

    setCurrentTheme(themeId)
    localStorage.setItem('user_theme_preference', themeId)
  }

  // Load saved theme choice on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('user_theme_preference')
    if (savedTheme) {
      applyTheme(savedTheme)
    }
  }, [])

  return (
    <>
      {/* Floating Gear Button */}
      <div className="fixed bottom-24 right-4 md:bottom-28 md:right-8 z-[9998] group">
        <div className="flex flex-col items-center gap-2">
          <span className="bg-primary/90 backdrop-blur-md text-secondary font-manrope font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity">
            Customizer
          </span>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="bg-primary text-secondary rounded-full p-3.5 w-14 h-14 flex items-center justify-center shadow-2xl shadow-primary/40 cursor-pointer hover:rotate-90 hover:scale-110 transition-all duration-500"
          >
            <span className="material-symbols-outlined text-2xl font-bold animate-spin-slow">palette</span>
          </button>
        </div>
      </div>

      {/* Side Slide-Out Customizer Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 bg-background/95 backdrop-blur-xl border-l border-primary/10 shadow-[0_0_50px_rgba(0,0,0,0.15)] z-[99999] transition-transform duration-500 ease-in-out flex flex-col justify-between ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          {/* Header */}
          <div className="bg-primary p-6 text-white flex justify-between items-center shadow-lg">
            <div>
              <h3 className="font-notoSerif text-lg font-black tracking-tight text-secondary uppercase">Theme Studio</h3>
              <p className="text-[9px] font-black text-white/40 tracking-[0.2em] uppercase">Style Configurator</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-secondary hover:scale-110 transition-transform p-1.5"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Theme List */}
          <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(100vh-180px)]">
            <p className="text-[10px] font-black text-primary/40 uppercase tracking-widest mb-4">Choose Color Theme</p>
            
            {palettes.map(p => (
              <button
                key={p.id}
                onClick={() => applyTheme(p.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                  currentTheme === p.id 
                    ? 'border-secondary bg-primary/5 shadow-md scale-[1.02]' 
                    : 'border-primary/5 bg-white hover:bg-primary/5 hover:border-primary/20'
                }`}
              >
                {/* 3-Color Preview Block */}
                <div className="flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden border border-primary/10 flex flex-col shadow-inner">
                  <div className="h-5" style={{ backgroundColor: p.preview.primary }}></div>
                  <div className="h-4" style={{ backgroundColor: p.preview.secondary }}></div>
                  <div className="h-3" style={{ backgroundColor: p.preview.bg }}></div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-primary flex items-center justify-between">
                    {p.name}
                    {currentTheme === p.id && (
                      <span className="material-symbols-outlined text-[14px] text-secondary font-bold">check_circle</span>
                    )}
                  </h4>
                  <p className="text-[10px] text-primary/60 leading-normal font-medium mt-1 pr-2 line-clamp-2">{p.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="p-6 bg-primary/5 border-t border-primary/5 text-center">
          <p className="text-[9px] font-black text-primary/30 uppercase tracking-[0.25em]">Habib Ul Hujjaj VIP Suite</p>
        </div>
      </div>
    </>
  )
}

export default ThemeCustomizer
