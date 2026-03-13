import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AnimatedChars, DrawLine, useCountUp } from './AnimatedText'

const skills = [
  'React', 'Angular', 'NestJS', 'Symfony',
  'Laravel', 'PHP', 'TypeScript', 'JavaScript',
  'MySQL', 'GraphQL', 'Docker', 'GitLab CI/CD',
]

function FadeUp({ children, delay = 0, style = {} }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

// Animated stat value that uses useCountUp
function StatValue({ n }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const count = useCountUp(n, inView)
  return (
    <div
      ref={ref}
      style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: '52px',
        fontWeight: 600,
        letterSpacing: '-2px',
        marginBottom: '6px',
        lineHeight: 1,
      }}
    >
      {count}
    </div>
  )
}

export default function About() {
  const skillsRef = useRef(null)
  const skillsInView = useInView(skillsRef, { once: true, margin: '-80px' })

  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' })

  const chipVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section id="about" style={{ padding: '140px 40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Animated divider replaces <hr> */}
        <DrawLine style={{ marginBottom: '80px' }} />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.6fr',
            gap: '80px',
            alignItems: 'start',
          }}
        >
          {/* Left label */}
          <FadeUp>
            <p style={{ fontSize: '12px', color: 'var(--muted)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              À propos
            </p>
          </FadeUp>

          {/* Right content */}
          <div>
            {/* Section title with AnimatedChars */}
            <FadeUp delay={0.05}>
              <p
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(26px, 3vw, 38px)',
                  fontWeight: 400,
                  lineHeight: 1.4,
                  letterSpacing: '-0.5px',
                  marginBottom: '40px',
                  color: 'var(--text)',
                }}
              >
                Développeur full stack de 23 ans, basé à Lyon.
                Je conçois des <em>applications web</em> — interfaces, APIs, bases de données.
                J'ai aussi touché à la gestion de projet en entreprise, ce qui me donne
                une bonne lecture du besoin sans que ce soit mon cœur de métier.
              </p>
            </FadeUp>

            {/* Skills list with staggered chips */}
            <FadeUp delay={0.15}>
              <p style={{ fontSize: '12px', color: 'var(--muted)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '20px' }}>
                Stack
              </p>
            </FadeUp>
            <motion.div
              ref={skillsRef}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.04 } },
              }}
              initial="hidden"
              animate={skillsInView ? 'visible' : 'hidden'}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}
            >
              {skills.map(skill => (
                <motion.span
                  key={skill}
                  variants={chipVariants}
                  style={{
                    padding: '7px 14px',
                    border: '1px solid var(--border)',
                    borderRadius: '2px',
                    fontSize: '13px',
                    color: 'var(--text)',
                    background: 'transparent',
                    transition: 'border-color 0.2s, background 0.2s',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--text)'
                    e.currentTarget.style.background = 'var(--text)'
                    e.currentTarget.style.color = 'var(--bg)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'var(--text)'
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0',
            marginTop: '100px',
            borderTop: '1px solid var(--border)',
          }}
        >
          {[
            { n: '3+', label: 'années d\'expérience' },
            { n: '830', label: 'TOEIC / 990' },
            { n: '10+', label: 'projets' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              style={{
                padding: '40px 32px',
                borderRight: i < 2 ? '1px solid var(--border)' : 'none',
              }}
            >
              <StatValue n={stat.n} />
              <div style={{ fontSize: '13px', color: 'var(--muted)' }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
