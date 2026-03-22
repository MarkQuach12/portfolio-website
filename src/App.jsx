import Navbar from './components/Navbar'
import About from './components/About'
import Skills from './components/Skills'
import Experience, { Extracurricular } from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-bg-primary relative">
      {/* Global grid overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.1]" style={{
        backgroundImage: 'linear-gradient(#ff8c00 1px, transparent 1px), linear-gradient(90deg, #ff8c00 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />
      {/* Global scanline overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.05]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,140,0,0.08) 2px, rgba(255,140,0,0.08) 4px)'
      }} />

      <div className="relative z-10">
        <Navbar />
        <About />
        <Experience />
        <Projects />
        <Extracurricular />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}

export default App
