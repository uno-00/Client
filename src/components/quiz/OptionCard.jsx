import { motion } from 'framer-motion'
import { springSnappy, optionItem, tapScaleLight } from '../../brand/motion'

const LETTERS = ['A', 'B', 'C', 'D']

export function OptionCard({ option, selected, onSelect, index, variant = 'default' }) {
  const letter = LETTERS[index] ?? String(index + 1)
  const isSimple = variant === 'simple'

  if (isSimple) {
    return (
      <motion.button
        type="button"
        onClick={() => onSelect(option)}
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
            'flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200',
            selected
              ? 'border-copper bg-copper shadow-[0_0_0_3px_rgb(192_120_85/0.15)]'
              : 'border-sage/25 bg-transparent group-hover:border-sage/45',
          ].join(' ')}
        >
          {selected && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={springSnappy}
              className="h-2 w-2 rounded-full bg-ivory"
            />
          )}
        </span>
      </motion.button>
    )
  }

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(option)}
      variants={optionItem(index)}
      initial="hidden"
      animate="visible"
      whileTap={tapScaleLight}
      className={[
        'group relative w-full overflow-hidden rounded-[var(--radius-lg)] border text-left transition-all duration-300',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper',
        'min-h-[60px]',
        selected
          ? 'border-copper/35 bg-white shadow-elevated'
          : 'border-sage/15 bg-white shadow-soft hover:border-sage/35 hover:shadow-elevated',
      ].join(' ')}
      aria-pressed={selected}
    >
      {selected && (
        <motion.div
          layoutId="option-accent"
          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-copper-light to-copper"
          transition={springSnappy}
        />
      )}

      <div className="flex items-center gap-4 px-4 py-4 pl-5">
        <span
          className={[
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-300',
            selected
              ? 'bg-forest text-ivory'
              : 'bg-ivory-dark text-sage-muted group-hover:bg-sage/12 group-hover:text-forest',
          ].join(' ')}
        >
          {letter}
        </span>
        <span
          className={[
            'flex-1 text-[15px] leading-snug',
            selected ? 'font-medium text-forest' : 'text-forest/78',
          ].join(' ')}
        >
          {option.label}
        </span>
        <motion.div
          className={[
            'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300',
            selected ? 'border-copper bg-copper' : 'border-sage/30 bg-transparent',
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
        </motion.div>
      </div>
    </motion.button>
  )
}
