import { motion } from 'framer-motion'
import { springSnappy } from '../../brand/motion'

export function AgeSlider({ min = 18, max = 75, value, onChange }) {
  const displayValue = value >= max ? '75+' : String(value)
  const percent = ((value - min) / (max - min)) * 100

  return (
    <div className="surface-card-elevated overflow-hidden p-5">
      <div className="flex items-center gap-4">
        <div className="min-w-0 flex-1">
          <p className="label-editorial !text-sage-muted">Your age</p>

          <div className="mt-5">
            <input
              type="range"
              min={min}
              max={max}
              value={value}
              onChange={(e) => onChange(Number(e.target.value))}
              className="age-slider-input w-full"
              style={{ '--slider-fill': `${percent}%` }}
              aria-label="Select your age"
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={value}
            />
            <div className="mt-3 flex justify-between font-sans text-[11px] font-medium text-sage-muted">
              <span>{min}</span>
              <span>75+</span>
            </div>
          </div>
        </div>

        <motion.div
          className="flex w-[4.5rem] shrink-0 items-center justify-end"
          key={displayValue}
          initial={{ opacity: 0.6, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springSnappy}
        >
          <span className="font-display text-[2.85rem] font-semibold leading-none tracking-[-0.04em] text-forest tabular-nums">
            {displayValue}
          </span>
        </motion.div>
      </div>
    </div>
  )
}
