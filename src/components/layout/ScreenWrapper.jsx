import { motion } from 'framer-motion'
import { pageTransition, pageVariants } from '../../brand/motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const fadeOnly = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
}

export function ScreenWrapper({ children, className = '', direction = 1 }) {
  const reducedMotion = useReducedMotion()
  const variants = reducedMotion ? fadeOnly : pageVariants

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={pageTransition(direction, reducedMotion)}
      className={`min-h-dvh w-full ${className}`}
    >
      {children}
    </motion.div>
  )
}
