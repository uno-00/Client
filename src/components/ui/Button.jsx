import { motion } from 'framer-motion'
import { springSnappy, tapScale } from '../../brand/motion'

const variants = {
  primary: 'btn-primary-gradient btn-primary-shine text-ivory',
  secondary:
    'bg-forest text-ivory shadow-soft hover:bg-forest-muted active:bg-forest-deep',
}

export function Button({
  children,
  variant = 'primary',
  disabled = false,
  fullWidth = false,
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const sizes = {
    md: 'min-h-[52px] px-7 text-[15px]',
    lg: 'min-h-[56px] px-8 text-base',
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileTap={disabled ? undefined : tapScale}
      whileHover={disabled ? undefined : { y: -1 }}
      transition={springSnappy}
      className={[
        'relative inline-flex items-center justify-center gap-2.5 rounded-full font-semibold tracking-[0.01em]',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper',
        'disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none disabled:hover:translate-y-0',
        variant === 'primary' && !disabled ? 'hover:brightness-[1.03]' : '',
        variants[variant],
        sizes[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </motion.button>
  )
}
