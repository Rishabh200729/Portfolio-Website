import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'
import { X } from 'lucide-react'
import confetti from 'canvas-confetti'

const PROMPT = 'rishabh@portfolio:~$'

const COMMANDS = {
  help: () => [
    { t: 'cyan', v: '╔═══════════════════════════════════╗' },
    { t: 'cyan', v: '║  RISHABH.OS — Available Commands  ║' },
    { t: 'cyan', v: '╚═══════════════════════════════════╝' },
    { t: 'text', v: '  whoami          — About Rishabh' },
    { t: 'text', v: '  skills          — Tech stack' },
    { t: 'text', v: '  projects        — Project list' },
    { t: 'text', v: '  stats           — ASCII metrics' },
    { t: 'text', v: '  hire            — 🎉 Shoot your shot' },
    { t: 'text', v: '  matrix          — Wake up, Neo.' },
    { t: 'text', v: '  yolo            — Secret mode' },
    { t: 'text', v: '  ping rishabh    — Latency test' },
    { t: 'text', v: '  sudo hire-me    — Permission level: ∞' },
    { t: 'text', v: '  cat resume      — View resume PDF' },
    { t: 'text', v: '  clear           — Clear terminal' },
  ],
  whoami: () => [
    { t: 'cyan', v: '  ██████╗ ██████╗ ' },
    { t: 'cyan', v: '  ██╔══██╗██╔══██╗' },
    { t: 'cyan', v: '  ██████╔╝██║  ██║' },
    { t: 'cyan', v: '  ██╔══██╗██║  ██║' },
    { t: 'cyan', v: '  ██║  ██║██████╔╝' },
    { t: 'cyan', v: '  ╚═╝  ╚═╝╚═════╝ ' },
    { t: 'green', v: '  Rishabh Dutt — Full-Stack Engineer' },
    { t: 'text', v: '  Thapar Institute, B.Tech CSE (2028)' },
    { t: 'text', v: '  CGPA: 9.06 · DSA: 290+ problems' },
    { t: 'muted', v: '  Building: MERN · AI · CV · Queues' },
  ],
  skills: () => [
    { t: 'cyan', v: '[ TECH STACK ]' },
    { t: 'amber', v: '  Languages   ' + '█'.repeat(9) + '░  JS · TS · Python · C++' },
    { t: 'cyan',  v: '  Frontend    ' + '█'.repeat(8) + '░░ React · Next.js · CSS' },
    { t: 'violet',v: '  Backend     ' + '█'.repeat(8) + '░░ Node · Express · FastAPI' },
    { t: 'green', v: '  Data/Infra  ' + '█'.repeat(7) + '░░░ Postgres · Redis · Docker' },
  ],
  projects: () => [
    { t: 'cyan', v: '[ PROJECTS ]' },
    { t: 'green', v: '  EventsNearMe  →  events-near-me-six.vercel.app' },
    { t: 'text', v: '    Next.js · Node · MongoDB · Redis · RabbitMQ' },
    { t: 'green', v: '  Finance Tracker  →  finance-tracker-sage-beta.vercel.app' },
    { t: 'text', v: '    Next.js 15 · TypeScript · Gemini AI · Drizzle ORM' },
    { t: 'green', v: '  UptimePing  →  uptime-ping-omega.vercel.app' },
    { t: 'text', v: '    Next.js · Drizzle ORM · Real-time monitoring' },
    { t: 'green', v: '  FinScribe  →  github.com/Rishabh200729/FinScribe' },
    { t: 'text', v: '    Sentence Transformers · MiniLM · Python' },
  ],
  stats: () => [
    { t: 'cyan', v: '[ PERFORMANCE METRICS ]' },
    { t: 'text', v: '  CGPA       ████████████████████ 9.06/10' },
    { t: 'text', v: '  DSA Probs  ██████████████████░░ 290+' },
    { t: 'text', v: '  Projects   ████████████░░░░░░░░ 5+ shipped' },
    { t: 'text', v: '  Internships████████░░░░░░░░░░░░ 3 total' },
    { t: 'green', v: '  Status     ██ ONLINE · AVAILABLE' },
  ],
  hire: (cb) => {
    confetti({ particleCount: 180, spread: 90, origin: { y: .6 }, colors: ['#ff2a85', '#ff7a00', '#00f0ff', '#ffe600', '#9d4edd'] })
    setTimeout(() => { window.location.href = 'mailto:rishabhdutt792@gmail.com' }, 800)
    return [
      { t: 'green', v: '  🎉 Permission granted! Opening email...' },
      { t: 'cyan', v: '  rishabhdutt792@gmail.com' },
      { t: 'muted', v: "  Let's build something great." },
    ]
  },
  'ping rishabh': () => {
    const latencies = [12, 8, 15, 11, 9]
    return [
      { t: 'cyan', v: '  PING rishabh.dev (103.0.0.1) 56 bytes of data.' },
      ...latencies.map((l, i) => ({ t: 'text', v: `  64 bytes from rishabh.dev: icmp_seq=${i + 1} ttl=64 time=${l} ms` })),
      { t: 'green', v: `  5 packets transmitted, 5 received, 0% loss` },
      { t: 'amber', v: `  rtt min/avg/max = 8/11/${Math.max(...latencies)} ms` },
    ]
  },
  'sudo hire-me': () => {
    setTimeout(() => { window.open('https://www.linkedin.com/in/rishabh-dutt-a05a66210/', '_blank') }, 600)
    return [
      { t: 'green', v: '  [sudo] password for recruiter: ••••••••' },
      { t: 'cyan', v: '  Permission granted. sudo level: ∞' },
      { t: 'green', v: '  Opening LinkedIn profile...' },
    ]
  },
  'cat resume': () => {
    setTimeout(() => { window.open('/resume.pdf', '_blank') }, 400)
    return [
      { t: 'text', v: '  Reading resume.pdf...' },
      { t: 'green', v: '  → Opening PDF in new tab' },
    ]
  },
  matrix: (cb) => { cb?.('matrix'); return [{ t: 'green', v: '  Wake up, Neo... Initiating matrix rain.' }] },
  yolo: (cb) => { cb?.('yolo'); return [{ t: 'amber', v: '  🎉 YOLO MODE ACTIVATED. Brace yourself.' }] },
  clear: () => '__clear__',
}

const CHIPS = ['help', 'whoami', 'skills', 'projects', 'hire', 'matrix', 'yolo', 'sudo hire-me']

export default function TerminalHUD({ onClose, onCommand }) {
  const [lines, setLines] = useState([{ t: 'cyan', v: 'RISHABH.OS v1.0.0 — type `help` to begin' }])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [histIdx, setHistIdx] = useState(-1)
  const outputRef = useRef(null)
  const inputRef = useRef(null)

  const scrollBottom = () => {
    setTimeout(() => { if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight }, 30)
  }

  const runCommand = useCallback((raw) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return

    setHistory(h => [cmd, ...h])
    setHistIdx(-1)
    setLines(prev => [...prev, { t: 'prompt', v: `${PROMPT} ${raw}` }])

    const fn = COMMANDS[cmd]
    if (!fn) {
      setLines(prev => [...prev, { t: 'red', v: `  command not found: ${cmd}. Try 'help'.` }])
    } else {
      const result = fn(onCommand)
      if (result === '__clear__') {
        setLines([{ t: 'cyan', v: 'Terminal cleared.' }])
      } else {
        setLines(prev => [...prev, ...result])
      }
    }
    scrollBottom()
  }, [onCommand])

  const onKey = e => {
    if (e.key === 'Enter') { runCommand(input); setInput('') }
    else if (e.key === 'ArrowUp') {
      const idx = Math.min(histIdx + 1, history.length - 1)
      setHistIdx(idx); setInput(history[idx] || '')
      e.preventDefault()
    } else if (e.key === 'ArrowDown') {
      const idx = Math.max(histIdx - 1, -1)
      setHistIdx(idx); setInput(idx < 0 ? '' : history[idx] || '')
      e.preventDefault()
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const match = Object.keys(COMMANDS).find(c => c.startsWith(input.toLowerCase()))
      if (match) setInput(match)
    }
  }

  useEffect(() => { inputRef.current?.focus(); scrollBottom() }, [lines])

  return (
    <motion.div
      className="terminal-hud"
      drag
      dragMomentum={false}
      dragElastic={0}
      initial={{ opacity: 0, y: 80, scale: .9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 60, scale: .88 }}
      transition={{ type: 'spring', stiffness: 360, damping: 28 }}
    >
      {/* Header */}
      <div className="terminal-top">
        <span className="terminal-title">▶ rishabh@portfolio</span>
        <button className="terminal-close" onClick={onClose} aria-label="Close terminal"><X size={14} /></button>
      </div>

      {/* Output */}
      <div className="terminal-output" ref={outputRef}>
        {lines.map((line, i) => (
          <motion.span
            key={i}
            className={`term-line term-${line.t === 'prompt' ? 'green' : line.t === 'text' ? 'muted' : line.t}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .15 }}
          >
            {line.t === 'prompt' ? line.v : line.v}
            {'\n'}
          </motion.span>
        ))}
      </div>

      {/* Quick-chips */}
      <div className="terminal-chips">
        {CHIPS.map(c => (
          <button key={c} className="term-chip" onClick={() => { setInput(c); setTimeout(() => runCommand(c), 0); setInput('') }}>
            {c}
          </button>
        ))}
      </div>

      {/* Input row */}
      <div className="terminal-input-row" onClick={() => inputRef.current?.focus()}>
        <span className="terminal-prompt-label">{PROMPT}</span>
        <input
          ref={inputRef}
          className="terminal-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKey}
          autoComplete="off"
          spellCheck={false}
          aria-label="Terminal input"
        />
        <span style={{ width: '8px', height: '14px', background: 'var(--cyan)', display: 'inline-block', animation: 'blink 1s step-end infinite' }} />
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </motion.div>
  )
}
