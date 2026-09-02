import { useEffect, useRef } from 'react'

const THEME_PALETTES = {
  violet: {
    nodes: ['#8b5cf6', '#f43f5e', '#38bdf8', '#c084fc'],
    aurora: 'rgba(139, 92, 246, 0.12)',
    edge: '139, 92, 246',
    accent: '#8b5cf6',
  },
  cyberpunk: {
    nodes: ['#ff2a85', '#ff7a00', '#00f0ff', '#9d4edd'],
    aurora: 'rgba(255, 42, 133, 0.12)',
    edge: '255, 42, 133',
    accent: '#ff2a85',
  },
  emerald: {
    nodes: ['#10b981', '#06b6d4', '#f59e0b', '#22c55e'],
    aurora: 'rgba(16, 185, 129, 0.12)',
    edge: '16, 185, 129',
    accent: '#10b981',
  },
  ocean: {
    nodes: ['#38bdf8', '#818cf8', '#67e8f9', '#34d399'],
    aurora: 'rgba(56, 189, 248, 0.12)',
    edge: '56, 189, 248',
    accent: '#38bdf8',
  },
}

export default function ParticleNeuralNet({ theme = 'violet' }) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999, targetX: -9999, targetY: -9999 })
  const scrollRef = useRef(0)
  const nodesRef = useRef([])
  const themeRef = useRef(THEME_PALETTES[theme] || THEME_PALETTES.violet)

  useEffect(() => {
    const pal = THEME_PALETTES[theme] || THEME_PALETTES.violet
    themeRef.current = pal
    if (nodesRef.current.length > 0) {
      nodesRef.current.forEach((n, i) => {
        n.color = pal.nodes[i % pal.nodes.length]
      })
    }
  }, [theme])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    let animId

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    const COUNT = 140
    const W = () => window.innerWidth
    const H = () => window.innerHeight
    const pal = themeRef.current

    // Generate stars with depth layers
    const nodes = Array.from({ length: COUNT }, (_, i) => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      vx: (Math.random() - .5) * .22,
      vy: (Math.random() - .5) * .22,
      r: Math.random() * 1.4 + .4,
      depth: Math.random() * .8 + .2,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * .015 + .008,
      color: pal.nodes[i % pal.nodes.length],
    }))
    nodesRef.current = nodes

    let shockwaves = []

    const triggerShock = () => {
      if (nodes.length === 0) return
      const n = nodes[Math.floor(Math.random() * nodes.length)]
      const p = themeRef.current
      if (shockwaves.length < 3) {
        shockwaves.push({
          x: n.x, y: n.y, r: 0, maxR: 180, alpha: 0.6,
          color: p.accent,
        })
      }
    }
    const shockInterval = setInterval(triggerShock, 4200)

    const draw = () => {
      const w = W(), h = H()
      const m = mouseRef.current
      // Smooth mouse interpolation
      m.x += (m.targetX - m.x) * 0.12
      m.y += (m.targetY - m.y) * 0.12
      const my = m.y + scrollRef.current * .2
      const currentPal = themeRef.current

      ctx.clearRect(0, 0, w, h)

      // Ambient dynamic cursor aurora spotlight
      if (m.x > 0 && m.x < w) {
        const glow = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 380)
        glow.addColorStop(0, currentPal.aurora)
        glow.addColorStop(1, 'transparent')
        ctx.fillStyle = glow
        ctx.fillRect(0, 0, w, h)
      }

      // Update and draw stars
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        n.pulse += n.pulseSpeed

        // Soft magnetic drift toward/away from mouse
        const dx = n.x - m.x, dy = n.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 140 && dist > 0) {
          const force = (140 - dist) / 140
          n.vx += (dx / dist) * force * .25
          n.vy += (dy / dist) * force * .25
        }

        n.vx *= .98
        n.vy *= .98
        n.x += n.vx * n.depth
        n.y += n.vy * n.depth

        if (n.x < 0) n.x = w
        if (n.x > w) n.x = 0
        if (n.y < 0) n.y = h
        if (n.y > h) n.y = 0

        // Constellation lines ONLY near cursor (interactive radar, not full screen web)
        if (dist < 160) {
          for (let j = i + 1; j < nodes.length; j++) {
            const n2 = nodes[j]
            const d2x = n2.x - m.x, d2y = n2.y - my
            const dist2 = Math.sqrt(d2x * d2x + d2y * d2y)
            if (dist2 < 160) {
              const nodeDist = Math.sqrt((n.x - n2.x) ** 2 + (n.y - n2.y) ** 2)
              if (nodeDist < 100) {
                const alpha = (1 - nodeDist / 100) * (1 - dist / 160) * 0.4
                ctx.beginPath()
                ctx.moveTo(n.x, n.y)
                ctx.lineTo(n2.x, n2.y)
                ctx.strokeStyle = `rgba(${currentPal.edge}, ${alpha})`
                ctx.lineWidth = 0.75
                ctx.stroke()
              }
            }
          }
        }

        // Draw node
        const pulse = (Math.sin(n.pulse) + 1) / 2
        const alpha = (0.3 + pulse * 0.5) * n.depth
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r + pulse * .4, 0, Math.PI * 2)
        ctx.fillStyle = n.color
        ctx.globalAlpha = alpha
        ctx.fill()
        ctx.globalAlpha = 1
      }

      // Draw active ripples
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s]
        sw.r += 2.4
        sw.alpha -= 0.01
        if (sw.alpha <= 0 || sw.r > sw.maxR) {
          shockwaves.splice(s, 1)
        } else {
          ctx.beginPath()
          ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2)
          ctx.strokeStyle = sw.color
          ctx.globalAlpha = sw.alpha * 0.35
          ctx.lineWidth = 1.2
          ctx.stroke()
          ctx.globalAlpha = 1
        }
      }

      animId = requestAnimationFrame(draw)
    }

    const handleMouse = e => {
      mouseRef.current.targetX = e.clientX
      mouseRef.current.targetY = e.clientY
    }
    const handleScroll = () => { scrollRef.current = window.scrollY }
    const handleBlur = () => cancelAnimationFrame(animId)
    const handleFocus = () => { animId = requestAnimationFrame(draw) }

    window.addEventListener('mousemove', handleMouse)
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('blur', handleBlur)
    window.addEventListener('focus', handleFocus)

    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      clearInterval(shockInterval)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('blur', handleBlur)
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        zIndex: -1, pointerEvents: 'none',
        width: '100%', height: '100%',
      }}
      aria-hidden="true"
    />
  )
}
