import { motion } from 'framer-motion'
import { springSoft } from '../../brand/motion'

export function ProgressBar({ value = 0, className = '' }) {
  return (
    <div
      className={`h-[3px] w-full overflow-hidden rounded-full bg-sage/15 ${className}`}
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-copper-dark via-copper to-copper-light"
        initial={false}
        animate={{ width: `${value}%` }}
        transition={springSoft}
      />
    </div>
  )
}
