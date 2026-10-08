import { useState } from 'react'
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Home from './pages/Home'
import Generator from './pages/Generator'
import Preview from './pages/Preview'
import Settings from './pages/Settings'

function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { path: '/', label: '首页', icon: '🏠' },
    { path: '/generator', label: '契约生成器', icon: '✍️' },
    { path: '/preview', label: '契约预览', icon: '📜' },
    { path: '/settings', label: '个性设置', icon: '⚙️' }
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/90 backdrop-blur-md border-b border-gold-400/20 no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
            >
              <span className="text-2xl sm:text-3xl font-serif text-gold-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]">Ω</span>
              <div>
                <h1 className="text-lg sm:text-xl font-display font-bold bg-gradient-to-r from-gold-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  性奴认主协议生成器
                </h1>
                <p className="text-[10px] text-gray-400 hidden sm:block tracking-wider">BDSM CONTRACT GENERATOR</p>
              </div>
            </Link>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1 sm:gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isActive(link.path)
                      ? 'bg-gold-400/15 text-gold-400 border border-gold-400/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-300 hover:text-gold-400 hover:bg-white/5 focus:outline-none"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-dark-900/95 border-b border-gold-400/20 px-4 pt-2 pb-4 space-y-1 overflow-hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`w-full px-4 py-3 rounded-lg text-base font-medium flex items-center gap-3 transition-colors ${
                    isActive(link.path)
                      ? 'bg-gold-400/15 text-gold-400 font-semibold'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Bottom Navigation Bar (Thumb Friendly) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-dark-900/95 backdrop-blur-lg border-t border-gold-400/20 px-2 py-1.5 flex justify-around items-center no-print shadow-lg">
        {navLinks.map((link) => {
          const active = isActive(link.path)
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg text-xs transition-colors ${
                active ? 'text-gold-400 font-bold' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <span className={`text-xl transition-transform ${active ? 'scale-110' : ''}`}>
                {link.icon}
              </span>
              <span className="text-[11px] mt-0.5">{link.label}</span>
            </Link>
          )
        })}
      </div>
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark-900 text-gray-100 flex flex-col justify-between">
        {/* Subtle Background Pattern */}
        <div 
          className="fixed inset-0 opacity-5 pointer-events-none" 
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #ffd700 1px, transparent 0)',
            backgroundSize: '36px 36px'
          }}
        />
        
        {/* Top Navbar & Mobile Navigation */}
        <Navigation />

        {/* Main Content Area */}
        <main className="flex-1 pt-16 md:pt-20 pb-20 md:pb-12">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/generator" element={<Generator />} />
              <Route path="/preview" element={<Preview />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </AnimatePresence>
        </main>

        {/* Standard Flow Footer (Hidden on Print & Spaced for Mobile Bar) */}
        <footer className="py-6 border-t border-gold-400/20 bg-dark-900/90 text-center no-print mb-14 md:mb-0">
          <div className="max-w-6xl mx-auto px-4 text-xs sm:text-sm text-gray-500 space-y-1">
            <p className="font-serif">© 2026 BDSM Contract Generator · 守护理性与专属契约</p>
            <p className="text-[11px] text-gray-600">所有契约数据均加密保存在本地浏览器中，绝不上载任何云端</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
