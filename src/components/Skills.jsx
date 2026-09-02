import { useRef } from 'react'
import { motion } from 'framer-motion'

const SKILL_GROUPS = [
  {
    title: 'Languages',
    color: 'var(--amber)',
    chips: ['JavaScript', 'TypeScript', 'Python', 'C++'],
    proficiency: [
      { label: 'JS/TS', val: 90 },
      { label: 'Python', val: 80 },
      { label: 'C++', val: 70 },
    ],
  },
  {
    title: 'Frontend',
    color: 'var(--cyan)',
    chips: ['React.js', 'Next.js', 'Tailwind CSS', 'Recharts'],
    proficiency: [
      { label: 'React', val: 88 },
      { label: 'Next.js', val: 82 },
      { label: 'CSS', val: 85 },
    ],
  },
  {
    title: 'Backend',
    color: 'var(--violet)',
    chips: ['Node.js', 'Express.js', 'Flask', 'FastAPI', 'JWT auth'],
    proficiency: [
      { label: 'Node/Express', val: 85 },
      { label: 'APIs/Auth', val: 82 },
      { label: 'Python BE', val: 70 },
    ],
  },
  {
    title: 'Data & Infra',
    color: 'var(--electric-cyan)',
    chips: ['PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'RabbitMQ', 'Docker', 'GitHub Actions'],
    proficiency: [
      { label: 'Databases', val: 80 },
      { label: 'Redis/MQ', val: 72 },
      { label: 'Docker/CI', val: 68 },
    ],
  },
]

function DraggableChip({ label, color }) {
  const constraintsRef = useRef(null)
  return (
    <motion.span
      className="chip drag-chip"
      drag
      dragMomentum
      dragElastic={0.5}
      whileDrag={{ scale: 1.18, zIndex: 10, boxShadow: `0 8px 30px rgba(0,0,0,.4)`, borderColor: color, color }}
      whileHover={{ scale: 1.08, borderColor: color, color }}
      onDoubleClick={e => {
        const target = e.currentTarget
        target.style.transform = ''
        target.style.x = ''
        target.style.y = ''
        motion.animate(target, { x: 0, y: 0 }, { type: 'spring', stiffness: 400, damping: 25 })
      }}
      dragConstraints={{ left: -100, right: 100, top: -60, bottom: 60 }}
      title="Drag me! Double-click to snap back."
    >
      {label}
    </motion.span>
  )
}

export default function Skills() {
  return (
    <section className="content-section" id="skills">
      <div className="shell">
        <div className="section-head">
          <div>
            <span className="mono dim">04 / Toolkit</span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 24 }}
            >
              Skills by layer.
            </motion.h2>
          </div>
        </div>

        <motion.p
          style={{ color: 'var(--faint)', fontFamily: 'var(--font-mono)', fontSize: 11, marginBottom: 24, letterSpacing: '.05em', textTransform: 'uppercase' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: .2 }}
        >
          ↕ Drag the badges — double-click to snap back
        </motion.p>

        <div className="skills-grid">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.article
              key={group.title}
              className="skill-block"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ type: 'spring', stiffness: 220, damping: 24, delay: gi * .1 }}
              whileHover={{ borderColor: group.color, boxShadow: `0 0 20px ${group.color}18` }}
            >
              <h3 style={{ color: group.color }}>{group.title}</h3>

              {/* Draggable chips zone */}
              <div className="draggable-zone">
                {group.chips.map((chip) => (
                  <DraggableChip key={chip} label={chip} color={group.color} />
                ))}
              </div>

              {/* Proficiency bars */}
              <div className="proficiency-bar">
                {group.proficiency.map((p, i) => (
                  <div className="prof-row" key={p.label}>
                    <span style={{ minWidth: 80 }}>{p.label}</span>
                    <div className="prof-track">
                      <motion.div
                        className="prof-fill"
                        style={{ background: `linear-gradient(90deg, ${group.color}, var(--violet))` }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${p.val}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: gi * .1 + i * .1 + .3, ease: 'easeOut' }}
                      />
                    </div>
                    <span style={{ minWidth: 30, textAlign: 'right' }}>{p.val}%</span>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
