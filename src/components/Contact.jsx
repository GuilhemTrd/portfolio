import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { AnimatedChars, DrawLine } from './AnimatedText'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText('guilhem.trd@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const rowVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (delay) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay },
    }),
  }

  return (
    <section id="contact" ref={ref} style={{ padding: '140px 40px 80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Animated divider replaces <hr> */}
        <DrawLine style={{ marginBottom: '80px' }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '80px', alignItems: 'end', marginBottom: '120px' }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ fontSize: '12px', color: 'var(--muted)', letterSpacing: '1.5px', textTransform: 'uppercase' }}
          >
            Contact
          </motion.p>

          <div>
            {/* Heading with AnimatedChars */}
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(40px, 6vw, 80px)',
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: '-2px',
                marginBottom: '32px',
              }}
            >
              <AnimatedChars text="Travaillons" delay={0.1} triggerOnView={true} />
              <br />
              <AnimatedChars text="ensemble." delay={0.35} triggerOnView={true} />
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.6 }}
              style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '400px', marginBottom: '48px' }}
            >
              Ouvert aux opportunités full stack, aux missions et aux échanges.
              N'hésite pas à me contacter — je réponds rapidement.
            </motion.p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Email row */}
              <motion.div
                custom={0.3}
                variants={rowVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                style={{ display: 'flex', alignItems: 'center', gap: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}
              >
                <span style={{ fontSize: '12px', color: 'var(--muted)', width: '80px', letterSpacing: '0.5px' }}>Email</span>
                <a href="mailto:guilhem.trd@gmail.com" className="link-hover" style={{ fontSize: '15px', flex: 1 }}>
                  guilhem.trd@gmail.com
                </a>
                <button
                  onClick={copy}
                  style={{
                    fontSize: '12px',
                    color: 'var(--muted)',
                    padding: '6px 12px',
                    border: '1px solid var(--border)',
                    borderRadius: '2px',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--text)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}
                >
                  {copied ? '✓ Copié' : 'Copier'}
                </button>
              </motion.div>

              {/* Phone row */}
              <motion.div
                custom={0.4}
                variants={rowVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                style={{ display: 'flex', alignItems: 'center', gap: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}
              >
                <span style={{ fontSize: '12px', color: 'var(--muted)', width: '80px', letterSpacing: '0.5px' }}>Téléphone</span>
                <a href="tel:+33679750842" className="link-hover" style={{ fontSize: '15px', flex: 1 }}>
                  06 79 75 08 42
                </a>
              </motion.div>

              {/* LinkedIn row */}
              <motion.div
                custom={0.5}
                variants={rowVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                style={{ display: 'flex', alignItems: 'center', gap: '20px', paddingBottom: '16px' }}
              >
                <span style={{ fontSize: '12px', color: 'var(--muted)', width: '80px', letterSpacing: '0.5px' }}>LinkedIn</span>
                <a
                  href="https://www.linkedin.com/in/guilhemtardy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-hover"
                  style={{ fontSize: '15px', flex: 1 }}
                >
                  guilhemtardy ↗
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '32px',
            borderTop: '1px solid var(--border)',
            fontSize: '12px',
            color: 'var(--muted)',
          }}
        >
          <span>© 2026 Guilhem Tardy</span>
        </motion.div>
      </div>
    </section>
  )
}
