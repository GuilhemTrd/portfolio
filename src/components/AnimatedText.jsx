import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

// ─── AnimatedChars ────────────────────────────────────────────────────────────
// Splits text into individual characters that slide up from a clipped container.
export function AnimatedChars({
  text,
  delay = 0,
  style = {},
  charStyle = {},
  triggerOnView = false,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const shouldAnimate = triggerOnView ? inView : true

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.028,
        delayChildren: delay,
      },
    },
  }

  const charVariants = {
    hidden: { y: '110%' },
    visible: {
      y: 0,
      transition: {
        duration: 0.85,
        ease: EASE,
      },
    },
  }

  return (
    <motion.span
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={shouldAnimate ? 'visible' : 'hidden'}
      style={{ display: 'inline-block', ...style }}
      aria-label={text}
    >
      {text.split('').map((char, i) => (
        <span
          key={i}
          style={{ overflow: 'hidden', display: 'inline-block', lineHeight: 'inherit' }}
        >
          <motion.span
            variants={charVariants}
            style={{ display: 'inline-block', ...charStyle }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

// ─── DrawLine ─────────────────────────────────────────────────────────────────
// A horizontal rule that animates scaleX from 0 → 1.
export function DrawLine({ style = {} }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : {}}
      transition={{ duration: 1.2, ease: EASE }}
      style={{
        height: '1px',
        background: 'var(--border)',
        width: '100%',
        transformOrigin: 'left',
        ...style,
      }}
    />
  )
}

// ─── useCountUp ───────────────────────────────────────────────────────────────
// Animates a number from 0 → target over 1.8s (ease-out) when inView is true.
// If target is not a pure integer (e.g. "3+", "FR/EN"), returns it as-is.
export function useCountUp(target, inView) {
  const numericTarget = parseInt(target, 10)
  const isNumeric = !isNaN(numericTarget) && String(numericTarget) === String(target)
  const hasSuffix = !isNumeric && /^(\d+)(\D+)$/.test(String(target))
  const match = hasSuffix ? String(target).match(/^(\d+)(\D+)$/) : null
  const baseNum = match ? parseInt(match[1], 10) : null
  const suffix = match ? match[2] : ''

  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    // Pure string with no leading digits — return immediately
    if (!isNumeric && !hasSuffix) return
    if (!inView || started.current) return

    started.current = true
    const finalValue = isNumeric ? numericTarget : baseNum
    const duration = 1800
    const startTime = performance.now()

    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * finalValue))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [inView, isNumeric, hasSuffix, numericTarget, baseNum])

  if (!isNumeric && !hasSuffix) return target
  if (!isNumeric && hasSuffix) return `${count}${suffix}`
  return count
}
