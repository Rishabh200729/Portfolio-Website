import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

const DETAILS = [
  { label: 'Education', value: 'B.Tech CSE' },
  { label: 'Institute', value: 'Thapar Institute' },
  { label: 'Location', value: 'Patiala, India' },
  { label: 'Focus', value: 'Full-stack, CV, NLP' },
  { label: 'Email', value: 'rishabhdutt792@gmail.com', copyable: true },
]

const PARA_VARIANTS = {
  hidden: { opacity: 0, x: -40 },
  visible: (i) => ({
    opacity: 1, x: 0,
    transition: { type: 'spring', stiffness: 200, damping: 24, delay: i * .12 }
  })
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [copied, setCopied] = useState(null)

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const cardRef = useRef(null)
  const onCardMouseMove = e => {
    if (!cardRef.current) return
    const r = cardRef.current.getBoundingClientRect()
    cardRef.current.style.setProperty('--cx', `${((e.clientX - r.left) / r.width) * 100}%`)
    cardRef.current.style.setProperty('--cy', `${((e.clientY - r.top) / r.height) * 100}%`)
  }

  return (
    <section className="content-section" id="about">
      <div className="shell">
        <div className="section-head">
          <div>
            <span className="mono dim">01 / Profile</span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 24 }}
            >
              Engineer with product sense.
            </motion.h2>
          </div>
        </div>

        <div className="about-grid" ref={ref}>
          {/* Text */}
          <div className="copy-stack">
            {[
              <>I work closest to the boundary between backend reliability and user-facing product quality. My day-to-day toolkit is <strong>React, Next.js, Node.js, Express, PostgreSQL, MongoDB, Redis, and Docker</strong>.</>,
              <>Outside coursework, I have pushed into computer vision and semantic NLP: a <strong>YOLOv8 traffic-monitoring pipeline</strong> at Thapar's research lab and <strong>FinScribe</strong>, a semantic embedding system with explainability output.</>,
              <>I care about systems that are easy to operate after they ship: clear data models, sensible auth, observable flows, and interfaces that make the important state obvious.</>
            ].map((para, i) => (
              <motion.p
                key={i}
                custom={i}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={PARA_VARIANTS}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Info panel with spotlight */}
          <motion.div
            ref={cardRef}
            className="info-list spotlight-card"
            onMouseMove={onCardMouseMove}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 180, damping: 22, delay: .2 }}
          >
            {DETAILS.map((row, i) => (
              <motion.div
                key={row.label}
                className="info-row"
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * .08 + .3, type: 'spring', stiffness: 300, damping: 28 }}
              >
                <span>{row.label}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {row.value}
                  {row.copyable && (
                    <motion.button
                      className="copy-btn"
                      onClick={() => handleCopy(row.value, row.label)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: .9 }}
                      aria-label={`Copy ${row.label}`}
                    >
                      <motion.span
                        key={copied === row.label ? 'check' : 'copy'}
                        initial={{ scale: .5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      >
                        {copied === row.label ? <Check size={12} color="var(--green)" /> : <Copy size={12} />}
                      </motion.span>
                    </motion.button>
                  )}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
