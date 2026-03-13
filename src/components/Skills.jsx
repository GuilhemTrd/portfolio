import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const skillGroups = [
  {
    label: 'Front-End',
    color: 'var(--cyan)',
    skills: [
      { name: 'React', level: 85 },
      { name: 'Angular', level: 80 },
      { name: 'JavaScript', level: 85 },
      { name: 'Twig', level: 90 },
      { name: 'Bootstrap', level: 90 },
    ],
  },
  {
    label: 'Back-End',
    color: 'var(--purple)',
    skills: [
      { name: 'Symfony / PHP', level: 90 },
      { name: 'Laravel', level: 75 },
      { name: 'Java', level: 70 },
      { name: 'API REST', level: 85 },
      { name: 'MySQL / GraphQL', level: 80 },
    ],
  },
  {
    label: 'Outils & DevOps',
    color: '#34d399',
    skills: [
      { name: 'Git / GitLab', level: 85 },
      { name: 'CI/CD', level: 75 },
      { name: 'Scrum / Agile', level: 90 },
      { name: 'SharePoint', level: 80 },
      { name: 'WordPress', level: 75 },
    ],
  },
]

const techIcons = [
  { name: 'React', icon: '⚛️' },
  { name: 'Angular', icon: '🔺' },
  { name: 'PHP', icon: '🐘' },
  { name: 'Symfony', icon: '🎵' },
  { name: 'Laravel', icon: '🔴' },
  { name: 'MySQL', icon: '🗄️' },
  { name: 'Git', icon: '🌿' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Scrum', icon: '⚡' },
  { name: 'Java', icon: '☕' },
]

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="section" ref={ref} style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-tag">Stack technique</div>
          <h2 className="section-title">
            Mes{' '}
            <span className="grad-cyan">compétences</span>
          </h2>
        </motion.div>

        {/* Tech marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          style={{
            overflow: 'hidden',
            marginBottom: '64px',
            padding: '20px 0',
            position: 'relative',
          }}
        >
          <div style={{
            display: 'flex',
            gap: '24px',
            animation: 'marquee 20s linear infinite',
            width: 'max-content',
          }}>
            {[...techIcons, ...techIcons].map((tech, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 20px',
                border: '1px solid var(--border)',
                borderRadius: '100px',
                background: 'var(--card)',
                whiteSpace: 'nowrap',
                fontSize: '14px',
                color: 'var(--muted)',
              }}>
                <span>{tech.icon}</span>
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
          <style>{`
            @keyframes marquee {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
          `}</style>
        </motion.div>

        {/* Skill bars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              className="glow-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + gi * 0.15, duration: 0.6 }}
              style={{ '--hover-color': group.color }}
            >
              <div style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '12px',
                color: group.color,
                letterSpacing: '2px',
                marginBottom: '24px',
                textTransform: 'uppercase',
              }}>
                {group.label}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {group.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '6px',
                      fontSize: '14px',
                    }}>
                      <span>{skill.name}</span>
                      <span style={{ color: 'var(--muted)', fontFamily: 'Space Mono', fontSize: '11px' }}>
                        {skill.level}%
                      </span>
                    </div>
                    <div style={{
                      height: '3px',
                      background: 'var(--border)',
                      borderRadius: '2px',
                      overflow: 'hidden',
                    }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ delay: 0.4 + gi * 0.15 + si * 0.05, duration: 0.8, ease: 'easeOut' }}
                        style={{
                          height: '100%',
                          background: `linear-gradient(90deg, ${group.color}, ${group.color}88)`,
                          borderRadius: '2px',
                          boxShadow: `0 0 8px ${group.color}60`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
