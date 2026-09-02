import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Terminal } from 'lucide-react'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

const SECTIONS = ['about', 'experience', 'projects', 'skills', 'achievements', 'contact']

export const THEMES = [
  { id: 'violet', label: 'Obsidian', icon: '🟣' },
  { id: 'cyberpunk', label: 'Tokyo', icon: '🌆' },
  { id: 'emerald', label: 'Emerald', icon: '💚' },
  { id: 'ocean', label: 'Ocean', icon: '🌊' },
]

export default function Navbar({ onTerminalToggle, terminalOpen, currentTheme = 'violet', onThemeChange }) {
  const [activeSection, setActiveSection] = useState('')
  const [hoveredLink, setHoveredLink] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [brandFlipped, setBrandFlipped] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', v => setScrolled(v > 40))

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveSection(e.target.id)
        }
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    SECTIONS.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const activeThemeMeta = THEMES.find(t => t.id === currentTheme) || THEMES[0]

  const handleCycleTheme = () => {
    const idx = THEMES.findIndex(t => t.id === currentTheme)
    const nextIdx = (idx + 1) % THEMES.length
    onThemeChange?.(THEMES[nextIdx].id)
  }

  return (
    <motion.header
      className="site-header"
      animate={{ borderBottomColor: scrolled ? 'var(--cyan)' : 'var(--line)' }}
      transition={{ duration: .3 }}
    >
      <div className="shell nav">
        {/* Brand */}
        <motion.a
          className="brand"
          href="#main"
          aria-label="Rishabh Dutt home"
          onMouseEnter={() => setBrandFlipped(true)}
          onMouseLeave={() => setBrandFlipped(false)}
        >
          <motion.span
            className="brand-mark"
            animate={{ rotateY: brandFlipped ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            style={{ transformStyle: 'preserve-3d', perspective: '400px' }}
          >
            <span style={{ backfaceVisibility: 'hidden' }}>
              {brandFlipped ? '</>' : 'RD'}
            </span>
          </motion.span>
          <span className="brand-text">Rishabh Dutt</span>
        </motion.a>

        {/* Nav links */}
        <nav className="nav-links" aria-label="Primary navigation">
          {LINKS.map(link => {
            const sectionId = link.href.slice(1)
            const isActive = activeSection === sectionId

            return (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
                onMouseEnter={() => setHoveredLink(link.href)}
                onMouseLeave={() => setHoveredLink(null)}
                style={{ position: 'relative' }}
              >
                {(hoveredLink === link.href || isActive) && (
                  <motion.span
                    className="nav-pill"
                    layoutId="nav-pill"
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
                {link.label}
              </a>
            )
          })}
        </nav>

        {/* Actions */}
        <div className="nav-actions">
          <AnimatePresence>
            {!scrolled && (
              <motion.div
                className="hire-badge"
                initial={{ opacity: 0, scale: .8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: .8, x: 20 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              >
                <span className="hire-badge-dot" />
                Open to work
              </motion.div>
            )}
          </AnimatePresence>

          {/* Theme switcher */}
          <motion.button
            type="button"
            className="nav-theme-btn"
            onClick={handleCycleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: .95 }}
            title={`Active Theme: ${activeThemeMeta.label}. Click to switch theme.`}
            aria-label="Switch visual theme"
          >
            <span>{activeThemeMeta.icon}</span>
            <span>{activeThemeMeta.label}</span>
          </motion.button>

          {/* Terminal button */}
          <motion.button
            type="button"
            className="nav-terminal-btn"
            onClick={onTerminalToggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: .95 }}
            aria-label="Toggle terminal"
          >
            <Terminal size={12} />
            {terminalOpen ? 'Close' : '[>_]'}
          </motion.button>
        </div>
      </div>
    </motion.header>
  )
}
