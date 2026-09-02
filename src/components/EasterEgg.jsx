import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']

export default function EasterEgg({ active, onClose, onMatrix }) {
  useEffect(() => {
    if (!active) return
    // Big confetti burst
    const burst = () => confetti({
      particleCount: 250, spread: 140, startVelocity: 40,
      origin: { y: .5 },
      colors: ['#ff2a85', '#ff7a00', '#ffe600', '#00f0ff', '#9d4edd', '#fff'],
    })
    burst()
    const t = setTimeout(burst, 600)
    return () => clearTimeout(t)
  }, [active])

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="easter-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="easter-content">
            <motion.h2
              className="gradient-text"
              initial={{ scale: .4, opacity: 0, rotateZ: -10 }}
              animate={{ scale: 1, opacity: 1, rotateZ: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              🎉 SECRET UNLOCKED!
            </motion.h2>
            <motion.p
              style={{ color: 'var(--muted)', fontSize: 18, marginTop: 12 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .3 }}
            >
              You found the YOLO mode. Rishabh is impressed.
            </motion.p>
            <motion.p
              style={{ color: 'var(--faint)', fontFamily: 'var(--font-mono)', fontSize: 12, marginTop: 24 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: .6 }}
            >
              Fun fact: Rishabh has solved 290+ LeetCode problems and still thinks
              "O(1) space" is the most beautiful phrase in engineering.
            </motion.p>
            <motion.div
              style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 28 }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .8 }}
            >
              <motion.button
                className="btn btn-primary"
                onClick={e => { e.stopPropagation(); onMatrix?.() }}
                whileHover={{ scale: 1.06 }} whileTap={{ scale: .97 }}
              >
                Launch Matrix Rain
              </motion.button>
              <motion.button
                className="btn"
                onClick={onClose}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: .97 }}
              >
                Close
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* Hook to listen for Konami code */
export function useKonami(onTrigger) {
  useEffect(() => {
    let seq = []
    const handler = e => {
      seq = [...seq, e.key].slice(-KONAMI.length)
      if (seq.join(',') === KONAMI.join(',')) onTrigger()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onTrigger])
}
