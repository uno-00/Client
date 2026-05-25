import { BRAND } from '../../brand/tokens'

export function Logo({ variant = 'light', size = 'md', className = '' }) {
  const textColors = {
    light: 'text-ivory',
    dark: 'text-forest',
  }

  const sizes = {
    sm: 'text-[17px]',
    md: 'text-xl',
  }

  const markFill = variant === 'light' ? '#b8cdc3' : '#8da698'
  const accentFill = variant === 'light' ? '#d4936f' : '#c07855'

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect width="32" height="32" rx="9" fill={variant === 'light' ? 'rgba(255,255,255,0.08)' : 'rgba(26,61,48,0.06)'} />
        <path
          d="M16 7c-4.5 0-8 3.2-8 7.2 0 2.8 1.4 5.2 3.6 6.5L16 25l4.4-4.3c2.2-1.3 3.6-3.7 3.6-6.5C24 10.2 20.5 7 16 7z"
          stroke={markFill}
          strokeWidth="1.25"
          fill="none"
        />
        <circle cx="16" cy="14.2" r="3.2" fill={accentFill} />
      </svg>
      <span className={`font-display font-semibold tracking-[-0.03em] ${textColors[variant]} ${sizes[size]}`}>
        {BRAND.name}
      </span>
    </div>
  )
}
