import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const JOBS = [
  {
    period: 'May–Jul 2026', type: 'Internship',
    role: 'MERN Stack Developer Intern',
    org: 'Frisky Trails — Remote, India',
    bullets: [
      'Built a full-stack CRM platform from scratch with React, Node.js, and Express to streamline lead tracking.',
      'Engineered MongoDB-backed APIs with JWT authentication, Cloudinary file storage, and Nodemailer email flows.',
      'Worked through Git/GitHub feature branches, reviews, and multiple merged pull requests.',
    ],
  },
  {
    period: 'Feb–Sep 2025', type: 'Internship',
    role: 'Web Developer Intern',
    org: 'First Contact — Remote, India',
    bullets: [
      'Designed Firebase Firestore queries for real-time data retrieval in chat features.',
      'Built real-time chat using Socket.io and Wix Velo backend services.',
      'Set up GitHub Actions CI/CD to reduce manual deployment effort.',
    ],
  },
  {
    period: 'Jun–Jul 2025', type: 'Research',
    role: 'Research Intern',
    org: 'Thapar Institute of Engineering and Technology — Patiala, India',
    bullets: [
      'Helped build a YOLOv8 vehicle detection and tracking pipeline for real-time traffic monitoring.',
      'Implemented lane-wise vehicle counting and speed estimation through centroid tracking.',
      'Built analytics overlays for congestion, flow efficiency, waiting time, and vehicle counts.',
    ],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] })
  const railH = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const [expanded, setExpanded] = useState({})

  return (
    <section className="content-section" id="experience">
      <div className="shell">
        <div className="section-head">
          <div>
            <span className="mono dim">02 / Experience</span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 24 }}
            >
              Recent work.
            </motion.h2>
          </div>
        </div>

        <div className="timeline-wrapper" ref={ref}>
          {/* Laser rail */}
          <div className="timeline-rail" aria-hidden="true">
            <motion.div className="timeline-rail-fill" style={{ height: railH }} />
          </div>

          {JOBS.map((job, i) => {
            const isExpanded = expanded[i]
            const bullets = isExpanded ? job.bullets : job.bullets.slice(0, 2)

            return (
              <motion.article
                key={i}
                className="timeline-item"
                initial={{ opacity: 0, x: -48 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ type: 'spring', stiffness: 200, damping: 24, delay: i * .1 }}
                whileHover={{
                  y: -4,
                  borderColor: 'rgba(111,255,233,.3)',
                  boxShadow: '0 0 32px rgba(111,255,233,.06)',
                  background: 'rgba(19,36,50,.8)',
                }}
              >
                {/* Pulse dot */}
                <div className="timeline-dot" aria-hidden="true" />

                <div className="timeline-date mono">
                  {job.period}
                  <span>{job.type}</span>
                </div>

                <div className="timeline-body">
                  <h3>{job.role}</h3>
                  <span className="org">{job.org}</span>
                  <ul className="timeline-bullets">
                    {job.bullets.slice(0, 2).map((b, bi) => (
                      <li key={bi}>{b}</li>
                    ))}
                    <AnimatePresence>
                      {isExpanded && job.bullets.slice(2).map((b, bi) => (
                        <motion.li
                          key={bi + 2}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                        >
                          {b}
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>

                  {job.bullets.length > 2 && (
                    <button
                      type="button"
                      className="expand-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setExpanded(prev => ({ ...prev, [i]: !prev[i] }));
                      }}
                      aria-expanded={isExpanded}
                    >
                      {isExpanded ? '↑ Show less' : `↓ Show ${job.bullets.length - 2} more`}
                    </button>
                  )}
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
