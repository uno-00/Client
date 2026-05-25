import { useState, useCallback } from 'react'

/**
 * Tries primary URL, then fallbacks, then local static asset.
 */
export function SafeImage({
  src,
  fallbacks = [],
  localFallback = '',
  alt = '',
  className = '',
  ...props
}) {
  const sources = [src, ...fallbacks, localFallback].filter(Boolean)
  const [index, setIndex] = useState(0)

  const handleError = useCallback(() => {
    setIndex((i) => (i < sources.length - 1 ? i + 1 : i))
  }, [sources.length])

  const current = sources[index] ?? localFallback

  if (!current) {
    return (
      <div
        className={`flex items-center justify-center bg-ivory-dark ${className}`}
        role="img"
        aria-label={alt}
      />
    )
  }

  return (
    <img
      src={current}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
      decoding="async"
      {...props}
    />
  )
}
