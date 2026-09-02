import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MatrixRain({ onDone }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    canvas.style.width = window.innerWidth + 'px'
    canvas.style.height = window.innerHeight + 'px'
    ctx.scale(dpr, dpr)

    const W = window.innerWidth
    const H = window.innerHeight
    const fontSize = 14
    const cols = Math.floor(W / fontSize)
    const drops = Array(cols).fill(1)
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()'

    let animId
    const draw = () => {
      ctx.fillStyle = 'rgba(8,8,26,.08)'
      ctx.fillRect(0, 0, W, H)
      ctx.font = `${fontSize}px Monaco, monospace`
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillStyle = drops[i] * fontSize < 30 
          ? '#ffffff' 
          : i % 2 === 0 
            ? `rgba(255,42,133,${Math.random() * .6 + .4})` 
            : `rgba(0,240,255,${Math.random() * .6 + .4})`
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)
        if (drops[i] * fontSize > H && Math.random() > .975) drops[i] = 0
        drops[i]++
      }
      animId = requestAnimationFrame(draw)
    }
    animId = requestAnimationFrame(draw)

    const timeout = setTimeout(() => { cancelAnimationFrame(animId); onDone?.() }, 5000)
    const keyDone = () => { cancelAnimationFrame(animId); onDone?.() }
    window.addEventListener('keydown', keyDone)
    window.addEventListener('click', keyDone)

    return () => {
      cancelAnimationFrame(animId)
      clearTimeout(timeout)
      window.removeEventListener('keydown', keyDone)
      window.removeEventListener('click', keyDone)
    }
  }, [])

  return (
    <motion.div
      className="matrix-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: .4 }}
    >
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0 }} />
      <div style={{ position: 'absolute', bottom: 32, right: 32, color: 'var(--cyan)', fontFamily: 'var(--font-mono)', fontSize: 12, opacity: .6 }}>
        Press any key to exit
      </div>
    </motion.div>
  )
}
