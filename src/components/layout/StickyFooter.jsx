import { motion } from 'framer-motion'
import { fadeUp } from '../../brand/motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Full-width sticky CTA bar. Use at section root (not inside px-6 wrappers)
 * so horizontal padding is not clipped by overflow-x-hidden on the frame.
 */
export function StickyFooter({ children, className = '' }) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      className={[
        'sticky bottom-0 z-30 mt-auto w-full shrink-0 border-t border-sage/10 bg-ivory/98 px-6 py-5 backdrop-blur-2xl safe-bottom',
        'shadow-[0_-16px_48px_-12px_rgba(12,31,23,0.1)]',
        className,
      ].join(' ')}
      variants={fadeUp}
      initial={reducedMotion ? false : 'hidden'}
      animate="visible"
    >
      <div className="mx-auto w-full max-w-full">{children}</div>
    </motion.div>
  )
}
