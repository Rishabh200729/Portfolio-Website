import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'

import ParticleNeuralNet from './components/ParticleNeuralNet'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import TerminalHUD from './components/TerminalHUD'
import MatrixRain from './components/MatrixRain'
import EasterEgg, { useKonami } from './components/EasterEgg'

export default function App() {
  const [theme, setTheme] = useState('violet')
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [matrixActive, setMatrixActive] = useState(false)
  const [easterActive, setEasterActive] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const handleTerminalCommand = useCallback((cmd) => {
    if (cmd === 'matrix') setMatrixActive(true)
    if (cmd === 'yolo') setEasterActive(true)
  }, [])

  useKonami(useCallback(() => setEasterActive(true), []))

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      {/* Global overlays */}
      <ParticleNeuralNet theme={theme} />
      <CustomCursor />
      <ScrollProgress />

      {/* Ambient orbs (fixed) */}
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />

      {/* App shell */}
      <Navbar
        onTerminalToggle={() => setTerminalOpen(o => !o)}
        terminalOpen={terminalOpen}
        currentTheme={theme}
        onThemeChange={setTheme}
      />

      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
      </main>

      <Contact />

      {/* Floating terminal */}
      <AnimatePresence>
        {terminalOpen && (
          <TerminalHUD
            onClose={() => setTerminalOpen(false)}
            onCommand={handleTerminalCommand}
          />
        )}
      </AnimatePresence>

      {/* Matrix rain */}
      <AnimatePresence>
        {matrixActive && (
          <MatrixRain onDone={() => setMatrixActive(false)} />
        )}
      </AnimatePresence>

      {/* Easter egg */}
      <EasterEgg
        active={easterActive}
        onClose={() => setEasterActive(false)}
        onMatrix={() => { setEasterActive(false); setMatrixActive(true) }}
      />
    </>
  )
}
