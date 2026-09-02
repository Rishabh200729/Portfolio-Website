import { useState } from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Github, FileText, Mail, Check } from 'lucide-react'
import confetti from 'canvas-confetti'

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rishabh-dutt-a05a66210/', Icon: Linkedin, hover: { rotate: 5 } },
  { label: 'GitHub', href: 'https://github.com/Rishabh200729?tab=repositories', Icon: Github, hover: { scale: 1.18 } },
  { label: 'Resume', href: '/resume.pdf', Icon: FileText, hover: { y: -4 }, target: '_blank' },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const handleEmail = () => {
    confetti({
      particleCount: 200, spread: 100,
      origin: { y: .75 },
      shapes: ['star'],
      colors: ['#ff2a85', '#ff7a00', '#ffe600', '#00f0ff', '#9d4edd', '#ffffff'],
    })
    navigator.clipboard.writeText('rishabhdutt792@gmail.com')
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
      window.location.href = 'mailto:rishabhdutt792@gmail.com'
    }, 1800)
  }

  const wordVariants = {
    hidden: { opacity: 0, rotateX: -90, y: 20 },
    visible: (i) => ({
      opacity: 1, rotateX: 0, y: 0,
      transition: { type: 'spring', stiffness: 240, damping: 22, delay: i * .08 }
    }),
  }

  return (
    <footer className="site-footer" id="contact">
      <div className="shell footer-grid">
        <div>
          <motion.span
            className="mono eyebrow"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          >
            Contact
          </motion.span>

          <h2 style={{ perspective: 400 }}>
            {"Let's build something useful.".split(' ').map((word, i) => (
              <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.3em' }}>
                <motion.span
                  style={{ display: 'inline-block' }}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={wordVariants}
                  className={i === 3 ? 'gradient-text' : ''}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.p
            className="footer-copy"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: .4 }}
          >
            Open to internships, product engineering projects, and full-stack work where
            reliability and interface quality both matter.
          </motion.p>

          <motion.div
            className="signal-badge"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: .5 }}
          >
            <span className="signal-dot" /> Signal active · Response within 24h
          </motion.div>
        </div>

        <motion.div
          className="footer-links"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 24, delay: .2 }}
        >
          {/* Magnetic email button */}
          <motion.button
            className="btn btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: 'none' }}
            onClick={handleEmail}
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: .95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <motion.span
              key={copied ? 'copied' : 'email'}
              initial={{ opacity: 0, scale: .7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            >
              {copied ? <Check size={13} /> : <Mail size={13} />}
            </motion.span>
            {copied ? 'Copied! 🎉' : 'Email me'}
          </motion.button>

          {/* Social links */}
          {SOCIALS.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target={s.target || undefined}
              rel={s.target ? 'noopener' : undefined}
              className="btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
              whileHover={{ ...s.hover, borderColor: 'rgba(111,255,233,.6)', color: 'var(--cyan)' }}
              whileTap={{ scale: .95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <s.Icon size={13} />
              {s.label}
            </motion.a>
          ))}
        </motion.div>
      </div>

      <div className="shell" style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--faint)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>
        <span>© 2026 Rishabh Dutt</span>
        <span style={{ letterSpacing: '.05em' }}>Built with React · Framer Motion · Vanilla CSS</span>
      </div>
    </footer>
  )
}
