import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { AnimatedChars, DrawLine } from './AnimatedText'

const roles = ['développeur full stack', 'développeur front-end', 'développeur back-end']

function useTypewriter(words, speed = 80, pause = 2000) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIndex % words.length]
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, text.length + 1))
        if (text.length + 1 === word.length) {
          setTimeout(() => setDeleting(true), pause)
        }
      } else {
        setText(word.slice(0, text.length - 1))
        if (text.length - 1 === 0) {
          setDeleting(false)
          setWordIndex(i => i + 1)
        }
      }
    }, deleting ? speed / 2 : speed)
    return () => clearTimeout(timeout)
  }, [text, deleting, wordIndex, words, speed, pause])

  return text
}

export default function Hero() {
  const typed = useTypewriter(roles)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: e.clientX - window.innerWidth / 2,
        y: e.clientY - window.innerHeight / 2,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const parallaxX = mousePos.x * 0.012
  const parallaxY = mousePos.y * 0.012

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateRows: '1fr auto',
        padding: '0 40px',
        paddingTop: '120px',
      }}
    >
      {/* Main content */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '52px',
            width: 'fit-content',
          }}
        >
          <div style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: '#4ade80',
            animation: 'pulse-dot 2s ease infinite',
          }} />
          <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
            Disponible · Ouvert aux offres
          </span>
          <style>{`
            @keyframes pulse-dot {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.3; }
            }
          `}</style>
        </motion.div>

        {/* Display name — big serif with mouse parallax */}
        <div
          style={{
            marginBottom: '32px',
            transform: `translate(${parallaxX}px, ${parallaxY}px)`,
            transition: 'transform 0.1s linear',
            willChange: 'transform',
          }}
        >
          {/* Guilhem */}
          <h1
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(72px, 12vw, 160px)',
              fontWeight: 600,
              lineHeight: 0.9,
              letterSpacing: '-4px',
              color: 'var(--text)',
              overflow: 'hidden',
            }}
          >
            <AnimatedChars text="Guilhem" delay={0.3} />
          </h1>

          {/* Tardy + location */}
          <h1
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(72px, 12vw, 160px)',
              fontWeight: 600,
              lineHeight: 0.9,
              letterSpacing: '-4px',
              color: 'var(--text)',
              display: 'flex',
              alignItems: 'baseline',
              gap: '24px',
              overflow: 'hidden',
            }}
          >
            <AnimatedChars text="Tardy" delay={0.62} />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 'clamp(14px, 1.5vw, 20px)',
                fontWeight: 300,
                color: 'var(--muted)',
                letterSpacing: '0',
                fontStyle: 'normal',
                alignSelf: 'flex-end',
                paddingBottom: '18px',
              }}
            >
              Lyon, France
            </motion.span>
          </h1>
        </div>

        {/* Divider line + typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            marginBottom: '48px',
          }}
        >
          <div style={{ width: '40px', height: '1px', background: 'var(--border)' }} />
          <span
            style={{
              fontSize: '15px',
              color: 'var(--muted)',
              minWidth: '260px',
            }}
          >
            {typed}
            <span style={{ opacity: 0.4 }}>|</span>
          </span>
        </motion.div>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.5 }}
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <a
            href="#experience"
            style={{
              padding: '12px 28px',
              background: 'var(--text)',
              color: 'var(--bg)',
              fontSize: '13px',
              fontWeight: 500,
              borderRadius: '2px',
              letterSpacing: '0.3px',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Voir le parcours
          </a>
          <a
            href="mailto:guilhem.trd@gmail.com"
            className="link-hover"
            style={{ fontSize: '13px', color: 'var(--muted)' }}
          >
            guilhem.trd@gmail.com
          </a>
        </motion.div>
      </div>

      {/* Bottom border replaced with DrawLine */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', paddingBottom: '0' }}>
        <DrawLine style={{ marginTop: '60px' }} />
      </div>
    </section>
  )
}
