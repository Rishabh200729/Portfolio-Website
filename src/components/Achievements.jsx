import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

const ACHIEVEMENTS = [
  {
    year: '2025',
    title: 'Innovation Award — Hackathon Winner',
    desc: 'Recognized by Ulster University and ASME USA for an AI-driven sustainability project.',
    back: { stat: '🏆', detail: 'Top placement out of 200+ teams across international competition' },
    color: 'var(--amber)',
    shimmer: true,
  },
  {
    year: 'Ongoing',
    title: '290+ DSA Problems Solved',
    desc: 'Practice across arrays, dynamic programming, heaps, and graphs on LeetCode.',
    back: { stat: '290+', detail: 'Topics: DP · Heaps · Graphs · Arrays · Trees' },
    color: 'var(--cyan)',
    ring: { target: 290, max: 350 },
  },
]

function ProgressRing({ target, max, color }) {
  const r = 44, stroke = 5
  const circ = 2 * Math.PI * r
  return (
    <div style={{ position: 'relative', width: 100, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={100} height={100} style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
        <circle cx={50} cy={50} r={r} fill="none" stroke="var(--line)" strokeWidth={stroke} />
        <motion.circle
          cx={50} cy={50} r={r} fill="none"
          stroke={color} strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          whileInView={{ strokeDashoffset: circ * (1 - target / max) }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
        />
      </svg>
      <span style={{
        position: 'relative',
        zIndex: 2,
        color,
        fontFamily: 'var(--font-mono)',
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: '.02em',
        userSelect: 'none',
      }}>
        {target}+
      </span>
    </div>
  )
}

export default function Achievements() {
  const [flipped, setFlipped] = useState({})

  const handleHoverHackathon = (id) => {
    confetti({
      particleCount: 60, spread: 50, startVelocity: 25,
      origin: { y: .7 },
      colors: ['#ff2a85', '#ff7a00', '#ffe600', '#00f0ff'],
    })
  }

  return (
    <section className="content-section" id="achievements">
      <div className="shell">
        <div className="section-head">
          <div>
            <span className="mono dim">05 / Signals</span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 24 }}
            >
              Achievements.
            </motion.h2>
          </div>
        </div>

        <div className="achievement-grid">
          {ACHIEVEMENTS.map((a, i) => {
            const isFlipped = flipped[i]
            return (
              <motion.article
                key={a.title}
                className="achievement"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => setFlipped(f => ({ ...f, [i]: !f[i] }))}
                onHoverStart={() => a.shimmer && handleHoverHackathon(i)}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: 600,
                  cursor: 'none',
                  position: 'relative',
                  minHeight: 160,
                  rotateY: isFlipped ? 180 : 0,
                }}
                transition={{ type: 'spring', stiffness: 220, damping: 25, delay: i * .12 }}
              >
                {/* Front */}
                <div style={{ backfaceVisibility: 'hidden', position: isFlipped ? 'absolute' : 'relative', inset: 0, padding: isFlipped ? 26 : 0 }}>
                  {a.shimmer && (
                    <div className="shimmer" style={{
                      position: 'absolute', inset: 0, borderRadius: 'var(--radius)', pointerEvents: 'none', zIndex: 1,
                    }} />
                  )}
                  <span className="mono eyebrow" style={{ position: 'relative', zIndex: 2 }}>{a.year}</span>
                  <h3 style={{ position: 'relative', zIndex: 2 }}>{a.title}</h3>
                  <p style={{ position: 'relative', zIndex: 2 }}>{a.desc}</p>
                  <span style={{ position: 'absolute', bottom: 12, right: 14, fontSize: 10, color: 'var(--faint)', fontFamily: 'var(--font-mono)', zIndex: 2 }}>
                    click to flip →
                  </span>
                </div>

                {/* Back */}
                <div style={{
                  backfaceVisibility: 'hidden', transform: 'rotateY(180deg)',
                  position: 'absolute', inset: 0, padding: 26,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  background: 'linear-gradient(145deg, rgba(111,255,233,.08), rgba(185,167,255,.06))',
                  borderRadius: 'var(--radius)', gap: 12,
                }}>
                  {a.ring ? (
                    <ProgressRing target={a.ring.target} max={a.ring.max} color={a.color} />
                  ) : (
                    <span style={{ fontSize: 48 }}>{a.back.stat}</span>
                  )}
                  <p style={{ color: 'var(--muted)', fontSize: 14, textAlign: 'center' }}>{a.back.detail}</p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
