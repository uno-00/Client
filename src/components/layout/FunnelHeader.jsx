import { useFunnel } from '../../context/FunnelContext'
import { Logo } from '../ui/Logo'
import { ProgressBar } from '../ui/ProgressBar'

export function FunnelHeader({ showProgress = true, variant = 'dark' }) {
  const { funnelMeta, goBack, canGoBack } = useFunnel()

  return (
    <header className="mb-7 shrink-0">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {canGoBack && (
            <button
              type="button"
              onClick={goBack}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-sage/15 bg-white/95 shadow-soft text-forest transition-all duration-200 hover:border-sage/35 hover:shadow-elevated active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
              aria-label="Go back"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <Logo variant={variant} size="sm" />
        </div>
        {funnelMeta.label && (
          <span
            className={
              variant === 'light'
                ? 'text-[11px] font-medium tracking-wide text-ivory/55'
                : 'text-[11px] font-medium tracking-wide text-sage-muted'
            }
          >
            {funnelMeta.label}
          </span>
        )}
      </div>
      {showProgress && funnelMeta.progress != null && <ProgressBar value={funnelMeta.progress} />}
    </header>
  )
}
