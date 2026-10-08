import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import Generator from './pages/Generator'
import Preview from './pages/Preview'
import Settings from './pages/Settings'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark-900">
        {/* Background Pattern */}
        <div className="fixed inset-0 opacity-5 pointer-events-none" 
             style={{
               backgroundImage: 'radial-gradient(circle at 2px 2px, #ffd700 1px, transparent 0)',
               backgroundSize: '40px 40px'
             }}>
        </div>
        
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-md border-b border-gold-400/20">
          <div className="container-custom py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                <span className="text-3xl" style={{ color: '#ffd700' }}>Ω</span>
                <h1 className="text-xl md:text-2xl font-display font-bold bg-gradient-to-r from-gold-400 to-yellow-500 
                            bg-clip-text text-transparent">
                  性奴认主协议生成器
                </h1>
              </Link>
              
              <div className="hidden md:flex items-center gap-6">
                <Link to="/" className="text-gray-300 hover:text-gold-400 transition-colors">首页</Link>
                <Link to="/generator" className="text-gray-300 hover:text-gold-400 transition-colors">生成器</Link>
                <Link to="/preview" className="text-gray-300 hover:text-gold-400 transition-colors">预览</Link>
                <Link to="/settings" className="text-gray-300 hover:text-gold-400 transition-colors">设置</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-20 min-h-screen">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/generator" element={<Generator />} />
              <Route path="/preview" element={<Preview />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="fixed bottom-0 left-0 right-0 py-4 border-t border-gold-400/20 bg-dark-900/80 backdrop-blur-md">
          <div className="container-custom text-center text-sm text-gray-500">
            <p>© 2026 BDSM Contract Generator | All Rights Reserved</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
