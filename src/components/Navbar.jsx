import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const links = [
  { label: 'À propos', href: '#about' },
  { label: 'Expérience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '24px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(245,244,240,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
      }}
    >
      <a href="#" style={{ fontSize: '15px', fontWeight: 500, letterSpacing: '-0.3px' }}>
        Guilhem Tardy
      </a>

      <nav style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
        {links.map(link => (
          <a
            key={link.href}
            href={link.href}
            className="link-hover"
            style={{ fontSize: '14px', color: 'var(--muted)' }}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </motion.header>
  )
}
