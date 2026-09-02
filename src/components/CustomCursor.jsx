import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState('default') // default | hover-link | hover-card | hover-btn
  const [visible, setVisible] = useState(false)

  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  const rx = useMotionValue(-100)
  const ry = useMotionValue(-100)

  const sx = useSpring(mx, { damping: 30, stiffness: 800, mass: .1 })
  const sy = useSpring(my, { damping: 30, stiffness: 800, mass: .1 })
  const rx2 = useSpring(rx, { damping: 18, stiffness: 200, mass: .4 })
  const ry2 = useSpring(ry, { damping: 18, stiffness: 200, mass: .4 })

  const rippleRef = useRef(null)

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    const move = e => {
      mx.set(e.clientX)
      my.set(e.clientY)
      rx.set(e.clientX)
      ry.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const click = e => {
      if (!rippleRef.current) return
      const r = rippleRef.current
      r.style.left = e.clientX + 'px'
      r.style.top = e.clientY + 'px'
      r.classList.remove('ripple-active')
      void r.offsetWidth
      r.classList.add('ripple-active')
    }

    const updateCursorState = e => {
      const el = e.target
      if (el.closest('.project-card, .timeline-item, .achievement, .hero-panel')) {
        setCursorState('hover-card')
      } else if (el.closest('.btn, .filter-btn, .arch-btn, .nav-terminal-btn')) {
        setCursorState('hover-btn')
      } else if (el.closest('a, button')) {
        setCursorState('hover-link')
      } else {
        setCursorState('default')
      }
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', updateCursorState)
    window.addEventListener('click', click)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', updateCursorState)
      window.removeEventListener('click', click)
    }
  }, [visible])

  const ringSize = cursorState === 'hover-link' ? 60
    : cursorState === 'hover-card' ? 72
    : cursorState === 'hover-btn' ? 52
    : 40

  const ringBg = cursorState === 'hover-link' ? 'rgba(255, 42, 133, .18)'
    : cursorState === 'hover-card' ? 'rgba(255, 122, 0, .14)'
    : 'transparent'

  const label = cursorState === 'hover-card' ? 'drag'
    : cursorState === 'hover-link' ? 'click'
    : ''

  return (
    <>
      {/* Click ripple */}
      <div ref={rippleRef} className="click-ripple" aria-hidden="true" />

      {/* Dot */}
      <motion.div
        className="cursor-dot"
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%', opacity: visible ? 1 : 0 }}
        animate={{ scale: cursorState !== 'default' ? 0 : 1 }}
        transition={{ duration: .15 }}
        aria-hidden="true"
      />

      {/* Ring */}
      <motion.div
        className="cursor-ring"
        style={{ x: rx2, y: ry2, opacity: visible ? 1 : 0 }}
        animate={{
          width: ringSize,
          height: ringSize,
          background: ringBg,
          borderColor: cursorState === 'hover-card'
            ? 'rgba(255, 122, 0, .75)'
            : 'rgba(255, 42, 133, .75)',
        }}
        transition={{ duration: .2, ease: 'easeOut' }}
        aria-hidden="true"
      >
        {label && (
          <motion.span
            className="cursor-label"
            initial={{ opacity: 0, scale: .8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            {label}
          </motion.span>
        )}
      </motion.div>

      <style>{`
        .click-ripple {
          position: fixed; pointer-events: none; z-index: 9997;
          width: 0; height: 0; border-radius: 50%;
          transform: translate(-50%, -50%);
          border: 2px solid rgba(255, 42, 133, .85);
          box-shadow: 0 0 15px rgba(255, 42, 133, .5);
        }
        .click-ripple.ripple-active {
          animation: cursor-ripple .5s ease-out forwards;
        }
        @keyframes cursor-ripple {
          from { width: 0; height: 0; opacity: 1; }
          to { width: 80px; height: 80px; opacity: 0; }
        }
      `}</style>
    </>
  )
}
