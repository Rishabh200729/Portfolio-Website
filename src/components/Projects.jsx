import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const PROJECTS = [
  {
    id: 'project-climax',
    categories: ['AI & CV', 'Systems & Queues', 'Full-Stack'],
    featured: true,
    eyebrow: 'ML Model Security / Steganography Defense',
    title: 'PROJECT-CLIMAX',
    subtitle: 'ML Model Security & Steganography Scanner',
    desc: 'Enterprise-grade 4-layer defense-in-depth scanner for detecting serialized malware, supply-chain exploits, and weight steganography in deep learning checkpoints.',
    bullets: [
      {
        label: '4-Layer Defense-in-Depth Architecture',
        text: 'Built a multi-stage security pipeline combining AST opcode parsing, an XGBoost bytecode classifier (90.91% template-grouped accuracy, 0.90 ROC-AUC), and an IEEE-754 mantissa-plane Siamese network for weight steganography (84.44% F1 score).',
      },
      {
        label: 'Format-Aware Fusion Engine',
        text: 'Dynamically weights threat signals across PyTorch (.pt), SafeTensors (.safetensors), and Keras (.h5) checkpoints, classifying models into Clean, Suspicious, and Malicious risk bands.',
      },
      {
        label: 'Async FastAPI Backend & Disarmament',
        text: 'Engineered an async backend with Server-Sent Events (SSE) for live scan telemetry, paired with an automated payload disarmament pipeline that sanitizes malicious binaries while verifying tensor integrity.',
      },
      {
        label: 'AI-Powered Forensic Triage',
        text: 'Integrated Google Gemini LLM to automatically synthesize low-level opcode anomalies, weight kurtosis shifts, and CVE signatures into actionable incident reports.',
      },
    ],
    chips: [
      'React',
      'FastAPI',
      'Python',
      'PyTorch',
      'XGBoost',
      'Google Gemini AI',
      'SafeTensors',
      'Tailwind CSS',
      'Server-Sent Events (SSE)',
    ],
    aside: [
      { label: 'Bytecode ML', val: '90.91% Acc / 0.90 AUC' },
      { label: 'Stego Defense', val: '84.44% F1 Siamese Net' },
      { label: 'Streaming', val: 'FastAPI + SSE Stream' },
      { label: 'Forensic AI', val: 'Google Gemini Triage' },
    ],
    src: 'https://github.com/Rishabh200729',
  },
  {
    id: 'eventsnearme',
    categories: ['Full-Stack', 'Systems & Queues'],
    featured: true,
    eyebrow: 'Microservices / Maps / Queues',
    title: 'EventsNearMe',
    desc: 'Location-based event discovery platform with interactive maps, SWR-powered refreshes, Redis caching, and a RabbitMQ/Bull worker queue for background processing.',
    chips: ['Next.js', 'Node.js', 'MongoDB', 'Docker', 'Redis', 'RabbitMQ'],
    live: 'https://events-near-me-six.vercel.app/',
    src: 'https://github.com/Rishabh200729/EventsNearMe',
    aside: [
      { label: 'Frontend', val: 'React-Leaflet + SWR' },
      { label: 'Backend', val: 'Node services' },
      { label: 'Performance', val: 'Redis cache' },
      { label: 'Async work', val: 'RabbitMQ / Bull' },
    ],
    hasArch: true,
  },
  {
    id: 'finance',
    categories: ['Full-Stack', 'AI & CV'],
    eyebrow: 'AI / Full-stack',
    title: 'Finance Tracker',
    desc: 'AI-driven finance tracker using Gemini to categorize transactions and surface spending insights through a conversational assistant and analytics dashboard.',
    chips: ['Next.js 15', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'Gemini AI'],
    live: 'https://finance-tracker-sage-beta.vercel.app/',
    src: 'https://github.com/Rishabh200729/Finance-Tracker',
  },
  {
    id: 'finscribe',
    categories: ['AI & CV'],
    eyebrow: 'Semantic NLP',
    title: 'FinScribe',
    desc: 'Semantic embedding pipeline with a two-stage Dynamic Exemplar Engine: zero-shot cosine similarity, few-shot matching, and explainability output.',
    chips: ['Sentence Transformers', 'MiniLM-L6-v2', 'Python'],
    src: 'https://github.com/Rishabh200729/FinScribe',
  },
  {
    id: 'uptime',
    categories: ['Full-Stack', 'Systems & Queues'],
    eyebrow: 'Monitoring',
    title: 'UptimePing',
    desc: 'Real-time uptime monitoring dashboard for website availability, latency, and response timing so service health stays visible.',
    chips: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Drizzle ORM'],
    live: 'https://uptime-ping-omega.vercel.app/',
    src: 'https://github.com/Rishabh200729/UptimePing',
  },
  {
    id: 'traffic',
    categories: ['AI & CV'],
    eyebrow: 'Computer Vision',
    title: 'Traffic Analytics Pipeline',
    desc: 'YOLOv8-based vehicle detection and tracking workflow with lane counting, speed estimation, and live congestion metrics for traffic monitoring.',
    chips: ['YOLOv8', 'OpenCV', 'Python', 'Tracking'],
  },
]

const FILTERS = ['All', 'Full-Stack', 'AI & CV', 'Systems & Queues']

/* Architecture flow graph */
const ARCH_NODES = [
  { id: 'client', label: 'Client', x: 60, y: 100, color: 'var(--cyan)' },
  { id: 'next', label: 'Next.js', x: 200, y: 100, color: 'var(--violet)' },
  { id: 'node', label: 'Node Services', x: 370, y: 60, color: 'var(--amber)' },
  { id: 'redis', label: 'Redis', x: 370, y: 150, color: 'var(--green)' },
  { id: 'rabbit', label: 'RabbitMQ', x: 540, y: 60, color: 'var(--amber)' },
  { id: 'mongo', label: 'MongoDB', x: 540, y: 150, color: 'var(--green)' },
]
const ARCH_EDGES = [
  ['client', 'next'], ['next', 'node'], ['next', 'redis'],
  ['node', 'rabbit'], ['node', 'mongo'],
]

function ArchModal({ onClose }) {
  const nodeMap = Object.fromEntries(ARCH_NODES.map(n => [n.id, n]))

  return (
    <motion.div
      className="arch-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="arch-modal"
        initial={{ scale: .85, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: .85, y: 40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 360, damping: 28 }}
      >
        <button className="arch-close" onClick={onClose} aria-label="Close"><X size={18} /></button>
        <h3 className="mono">⬡ EventsNearMe Architecture</h3>

        <svg width="100%" height="220" viewBox="0 0 620 220" style={{ overflow: 'visible' }}>
          {/* Animated edges */}
          {ARCH_EDGES.map(([a, b], i) => {
            const na = nodeMap[a], nb = nodeMap[b]
            return (
              <g key={`${a}-${b}`}>
                <line
                  x1={na.x + 48} y1={na.y + 14}
                  x2={nb.x} y2={nb.y + 14}
                  stroke="rgba(255,42,133,.3)" strokeWidth="1.5" strokeDasharray="5,4"
                />
                <motion.circle
                  r="4" fill="#ff2a85"
                  initial={{ offsetDistance: '0%', opacity: 0 }}
                >
                  <animateMotion dur={`${1.2 + i * .4}s`} repeatCount="indefinite"
                    path={`M${na.x + 48},${na.y + 14} L${nb.x},${nb.y + 14}`} />
                </motion.circle>
              </g>
            )
          })}

          {/* Nodes */}
          {ARCH_NODES.map((n, i) => (
            <motion.g
              key={n.id}
              initial={{ opacity: 0, scale: .5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * .1, type: 'spring', stiffness: 400, damping: 25 }}
            >
              <rect x={n.x} y={n.y} width={Math.max(60, n.label.length * 7.5 + 16)} height={28}
                rx="6" fill="rgba(20,19,51,.95)"
                stroke={n.color} strokeWidth="1.5" />
              <text x={n.x + Math.max(60, n.label.length * 7.5 + 16) / 2} y={n.y + 17}
                textAnchor="middle" fill={n.color}
                fontFamily="Monaco, monospace" fontSize="10" fontWeight="600">
                {n.label}
              </text>
            </motion.g>
          ))}
        </svg>

        <div style={{ marginTop: 16, color: 'var(--muted)', fontSize: 13 }}>
          Animated data packets flow between services in real time. Click anywhere outside to close.
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [archOpen, setArchOpen] = useState(false)

  const filtered = PROJECTS.filter(p =>
    activeFilter === 'All' || p.categories.includes(activeFilter)
  )

  return (
    <section className="content-section" id="projects">
      <div className="shell">
        <div className="section-head">
          <div>
            <span className="mono dim">03 / Projects</span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 24 }}
            >
              Selected builds.
            </motion.h2>
          </div>
        </div>

        {/* Filter bar */}
        <div className="filter-bar" role="group" aria-label="Project filters">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
              style={{ position: 'relative' }}
            >
              {activeFilter === f && (
                <motion.span className="filter-pill" layoutId="filter-pill"
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }} />
              )}
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div className="project-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <ProjectCard key={p.id} p={p} onArchClick={() => setArchOpen(true)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {archOpen && <ArchModal onClose={() => setArchOpen(false)} />}
      </AnimatePresence>
    </section>
  )
}

function ProjectCard({ p, onArchClick }) {
  const ref = useRef(null)
  const handleMouseMove = e => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = (e.clientX - rect.left) / rect.width * 2 - 1
    const cy = (e.clientY - rect.top) / rect.height * 2 - 1
    ref.current.style.setProperty('--rx', `${cy * -5}deg`)
    ref.current.style.setProperty('--ry', `${cx * 8}deg`)
  }
  const handleLeave = () => {
    if (!ref.current) return
    ref.current.style.setProperty('--rx', '0deg')
    ref.current.style.setProperty('--ry', '0deg')
  }

  return (
    <motion.article
      ref={ref}
      className={`project-card${p.featured ? ' featured' : ''}`}
      layout
      initial={{ opacity: 0, scale: .9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: .85 }}
      whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(0,0,0,.4)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      style={{ transform: 'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))' }}
    >
      <div className="project-main">
        <span className="mono eyebrow">{p.eyebrow}</span>
        <h3>
          {p.title}
          {p.subtitle && <span className="project-subtitle"> — {p.subtitle}</span>}
        </h3>
        <p>{p.desc}</p>
        {p.bullets && (
          <ul className="project-bullets">
            {p.bullets.map((b, i) => (
              <li key={i}>
                <strong>{b.label}:</strong> {b.text}
              </li>
            ))}
          </ul>
        )}
        <div className="project-stack">
          {p.chips.map(c => <span key={c} className="chip">{c}</span>)}
        </div>
        <div className="project-links">
          {p.live && <motion.a href={p.live} target="_blank" rel="noopener" whileHover={{ x: 3 }}>Live site ↗</motion.a>}
          {p.src && <motion.a href={p.src} target="_blank" rel="noopener" whileHover={{ x: 3 }}>Source ↗</motion.a>}
          {p.hasArch && (
            <motion.button className="arch-btn" onClick={onArchClick} whileHover={{ scale: 1.04 }} whileTap={{ scale: .97 }}>
              ⬡ Inspect Architecture
            </motion.button>
          )}
        </div>
      </div>

      {p.aside && (
        <div className="project-aside">
          {p.aside.map(row => (
            <div className="system-line" key={row.label}>
              <span>{row.label}</span>
              <span>{row.val}</span>
            </div>
          ))}
        </div>
      )}
    </motion.article>
  )
}
