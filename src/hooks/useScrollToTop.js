import { useEffect } from 'react'

export function useScrollToTop(deps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    const frame = document.querySelector('[data-funnel-frame]')
    if (frame) frame.scrollTo({ top: 0, behavior: 'instant' })
  }, deps)
}
