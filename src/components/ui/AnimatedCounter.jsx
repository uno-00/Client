import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export function AnimatedCounter({
  value,
  decimals = 0,
  suffix = '',
  duration = 1.8,
  className = '',
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20px' })
  const [display, setDisplay] = useState('0' + suffix)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!inView || hasAnimated.current) return
    hasAnimated.current = true

    const start = performance.now()
    let frameId

    const tick = (now) => {
      const elapsed = now - start
      const t = Math.min(elapsed / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - t, 3)
      const current = value * eased
      const num = decimals > 0 ? current.toFixed(decimals) : Math.round(current).toString()
      setDisplay(`${num}${suffix}`)
      if (t < 1) frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [inView, value, decimals, suffix, duration])

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  )
}
