import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { ArrowDownRight, FileText, Copy, Check } from 'lucide-react'

/* ── Animated number counter ── */
function Counter({ target, decimals = 0, suffix = '' }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    const dur = 1800, t0 = performance.now()
    const tick = now => {
      const p = Math.min((now - t0) / dur, 1)
      setVal((1 - Math.pow(1 - p, 3)) * target)
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target])
  return <>{decimals ? val.toFixed(decimals) : Math.round(val)}{suffix}</>
}

export default function Hero() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('rishabhdutt792@gmail.com')
    setCopied(true)
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#8b5cf6', '#f43f5e', '#38bdf8', '#10b981'],
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="shell hero hero-clean" id="hero">
      <div className="hero-content">
        {/* Status Pill */}
        <motion.div
          className="hero-status-pill"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="status-dot" aria-hidden="true" />
          <span>Available for SDE / Product Internships</span>
          <span style={{ color: 'var(--faint)' }}>·</span>
          <span style={{ color: 'var(--cyan)' }}>Thapar Institute CSE '28</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="hero-title-line">I build reliable</span>
          <span className="hero-title-line hero-title-gradient">full-stack systems.</span>
        </motion.h1>

        {/* Hero Narrative */}
        <motion.p
          className="hero-lede"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Computer Science undergrad at <strong>Thapar Institute</strong> with production-facing
          work across MERN applications, distributed event queues, AI financial intelligence tools,
          and real-time computer vision systems.
        </motion.p>

        {/* Clean Metrics Strip */}
        <motion.div
          className="hero-metrics-strip"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          {[
            { val: 9.06, dec: 2, label: 'CGPA Benchmark', sub: "Thapar CSE '28" },
            { val: 290, suf: '+', label: 'LeetCode Problems', sub: 'DP · Graphs · Trees' },
            { val: 3, label: 'Shipped Internships', sub: 'Full-Stack & Systems' },
            { val: 6, suf: '+', label: 'Core Projects', sub: 'Production & AI' },
          ].map(m => (
            <div key={m.label} className="hero-metric">
              <span className="hero-metric-val">
                <Counter target={m.val} decimals={m.dec || 0} suffix={m.suf || ''} />
              </span>
              <span className="hero-metric-label">{m.label}</span>
              <span className="hero-metric-sub">{m.sub}</span>
            </div>
          ))}
        </motion.div>

        {/* Action Cluster */}
        <motion.div
          className="hero-cta-cluster"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.a
            href="#projects"
            className="btn btn-primary"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Explore Projects <ArrowDownRight size={14} />
          </motion.a>
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <FileText size={14} /> View Resume
          </motion.a>
          <motion.button
            type="button"
            className="btn"
            onClick={handleCopyEmail}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            {copied ? <Check size={14} style={{ color: 'var(--green)' }} /> : <Copy size={14} />}
            {copied ? 'Copied Email!' : 'Copy Email'}
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
