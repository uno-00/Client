import { motion } from 'framer-motion'
import { springSnappy, optionItem, tapScaleLight } from '../../brand/motion'

export function MultiOptionCard({ option, selected, onToggle, index }) {
  return (
    <motion.button
      type="button"
      onClick={() => onToggle(option)}
      variants={optionItem(index)}
      initial="hidden"
      animate="visible"
      whileTap={tapScaleLight}
      className={[
        'group relative flex w-full min-h-[56px] items-center justify-between px-5 py-4 text-left transition-colors duration-200',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-copper',
        selected ? 'bg-copper/6' : 'bg-white hover:bg-ivory-dark/60',
      ].join(' ')}
      aria-pressed={selected}
    >
      <span
        className={[
          'text-[15px] leading-snug',
          selected ? 'font-semibold text-forest' : 'font-medium text-forest/82',
        ].join(' ')}
      >
        {option.label}
      </span>
      <span
        className={[
          'flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded border-2 transition-all duration-200',
          selected
            ? 'border-copper bg-copper shadow-[0_0_0_3px_rgb(192_120_85/0.15)]'
            : 'border-sage/25 bg-transparent group-hover:border-sage/45',
        ].join(' ')}
      >
        {selected && (
          <motion.svg
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={springSnappy}
            className="h-3 w-3 text-ivory"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </motion.svg>
        )}
      </span>
    </motion.button>
  )
}
