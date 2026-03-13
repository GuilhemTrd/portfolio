import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { AnimatedChars, DrawLine } from './AnimatedText'

const experiences = [
  {
    index: '01',
    period: '2022 — 2025',
    role: 'Développeur Web & Chef de projet',
    company: 'ARS Auvergne-Rhône-Alpes',
    location: 'Lyon',
    description:
      'Lead développeur sur l\'outil TSAN (gestion des transporteurs sanitaires) et sur la refonte de l\'intranet SharePoint. Mise en place des pipelines CI/CD GitLab, refactoring d\'architecture. En parallèle : pilotage de projet en autonomie, rédaction de specs, encadrement d\'une équipe de 3 développeurs en Scrum et gestion des risques RSSI.',
    tags: ['Symfony', 'Twig', 'SharePoint', 'GitLab', 'CI/CD', 'SQL', 'Scrum'],
  },
  {
    index: '02',
    period: 'Fév 2022',
    role: 'Développeur Full Stack',
    company: 'Le Tabagnon',
    location: 'Saint-Genis-les-Ollières',
    description: 'Mise à jour et refonte du site web existant. Architecture MVC, PHP.',
    tags: ['PHP', 'MVC'],
  },
  {
    index: '03',
    period: 'Mai — Juin 2021',
    role: 'Développeur Full Stack',
    company: 'Les Petits Loustics',
    location: 'Brussieu',
    description: 'Création du site internet from scratch. Stack PHP, MySQL, GitHub.',
    tags: ['PHP', 'MySQL', 'GitHub'],
  },
]

const education = [
  {
    period: '2023 — 2025',
    degree: 'Mastère Expert Développement Web',
    school: 'YNOV Campus Lyon',
    detail: 'React, Angular, Symfony, Laravel, DevOps, CI/CD, Agile',
  },
  {
    period: '2022 — 2023',
    degree: 'Bachelor 3 Informatique',
    school: 'YNOV Campus Lyon',
    detail: '',
  },
  {
    period: '2020 — 2022',
    degree: 'BTS SIO option SLAM',
    school: 'Lycée La Martinière Duchère, Lyon',
    detail: '',
  },
  {
    period: '2018 — 2020',
    degree: 'Bac STI2D option SIN',
    school: 'Lycée René Cassin, Tarare',
    detail: '',
  },
]

function FadeUp({ children, delay = 0, style = {} }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

// Experience card with hover accent bar
function ExperienceCard({ exp, delay }) {
  const [hovered, setHovered] = useState(false)

  return (
    <FadeUp delay={delay}>
      <div
        style={{ position: 'relative', overflow: 'hidden' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Animated left accent bar */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: hovered ? '100%' : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '2px',
            background: 'var(--text)',
            transformOrigin: 'top',
          }}
        />

        <div
          style={{
            paddingBottom: '48px',
            marginBottom: '48px',
            borderBottom: '1px solid var(--border)',
            paddingLeft: '16px',
          }}
        >
          {/* Header row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '16px',
              gap: '24px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '4px' }}>
                <span style={{ fontSize: '11px', color: 'var(--muted)' }}>
                  <AnimatedChars text={exp.index} triggerOnView={true} />
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 500, letterSpacing: '-0.3px' }}>
                  {exp.role}
                </h3>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--muted)', paddingLeft: '27px' }}>
                {exp.company} · {exp.location}
              </p>
            </div>
            <span style={{ fontSize: '13px', color: 'var(--muted)', whiteSpace: 'nowrap', paddingTop: '2px' }}>
              {exp.period}
            </span>
          </div>

          {/* Description */}
          <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '20px', paddingLeft: '27px' }}>
            {exp.description}
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingLeft: '27px' }}>
            {exp.tags.map(tag => (
              <span
                key={tag}
                style={{
                  padding: '4px 10px',
                  border: '1px solid var(--border)',
                  borderRadius: '2px',
                  fontSize: '11px',
                  color: 'var(--muted)',
                  letterSpacing: '0.3px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </FadeUp>
  )
}

export default function Experience() {
  return (
    <section id="experience" style={{ padding: '140px 40px', background: '#efede7' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Animated divider replaces <hr> */}
        <DrawLine style={{ marginBottom: '80px' }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '80px' }}>
          <FadeUp>
            <p style={{ fontSize: '12px', color: 'var(--muted)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              Expérience
            </p>
          </FadeUp>

          <div>
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.index} exp={exp} delay={i * 0.08} />
            ))}
          </div>
        </div>

        {/* Education */}
        <div style={{ marginTop: '100px' }}>
          {/* Animated divider replaces <hr> */}
          <DrawLine style={{ marginBottom: '80px' }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '80px' }}>
            <FadeUp>
              <p style={{ fontSize: '12px', color: 'var(--muted)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                Formation
              </p>
            </FadeUp>

            <div>
              {education.map((edu, i) => (
                <FadeUp key={edu.degree} delay={i * 0.06}>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '100px 1fr',
                      gap: '32px',
                      paddingBottom: '28px',
                      marginBottom: '28px',
                      borderBottom: i < education.length - 1 ? '1px solid var(--border)' : 'none',
                    }}
                  >
                    <span style={{ fontSize: '12px', color: 'var(--muted)', paddingTop: '2px' }}>{edu.period}</span>
                    <div>
                      <p style={{ fontSize: '15px', fontWeight: 500, marginBottom: '2px', letterSpacing: '-0.2px' }}>
                        {edu.degree}
                      </p>
                      <p style={{ fontSize: '13px', color: 'var(--muted)' }}>{edu.school}</p>
                      {edu.detail && (
                        <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '6px', lineHeight: 1.7 }}>
                          {edu.detail}
                        </p>
                      )}
                    </div>
                  </div>
                </FadeUp>
              ))}

              {/* Certif */}
              <FadeUp delay={0.3}>
                <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '32px', paddingTop: '28px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--muted)' }}>2023</span>
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: 500, marginBottom: '2px' }}>
                      Certification Cybersécurité
                    </p>
                    <p style={{ fontSize: '13px', color: 'var(--muted)' }}>ANSSI MOOC</p>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
