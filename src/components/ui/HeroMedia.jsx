import { useState } from 'react'
import { motion } from 'framer-motion'
import { LOCAL_IMAGES, LOCAL_FALLBACKS, REMOTE_IMAGES, VIDEO } from '../../brand/tokens'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { SafeImage } from './SafeImage'

export function HeroMedia() {
  const [videoOk, setVideoOk] = useState(true)
  const reducedMotion = useReducedMotion()

  return (
    <div className="hero-media absolute inset-0 overflow-hidden">
      <motion.div
        className="h-full w-full"
        initial={reducedMotion ? false : { scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : { duration: 22, ease: [0.25, 0.1, 0.25, 1] }
        }
      >
        <SafeImage
          src={LOCAL_IMAGES.hero}
          fallbacks={[REMOTE_IMAGES.heroPhoto]}
          localFallback={LOCAL_FALLBACKS.hero}
          alt=""
          className="h-full w-full object-cover object-[center_18%]"
          loading="eager"
          fetchPriority="high"
        />
      </motion.div>

      {videoOk && !reducedMotion && (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={LOCAL_IMAGES.hero}
          className="absolute inset-0 h-full w-full object-cover opacity-15 mix-blend-soft-light"
          onError={() => setVideoOk(false)}
          aria-hidden="true"
        >
          <source src={VIDEO.hero} type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/50 via-forest/65 to-forest-deep/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_12%,rgba(192,120,85,0.2),transparent_50%)]" />
      <div className="absolute inset-0 vignette-bottom" />
      <div className="noise-overlay absolute inset-0" aria-hidden="true" />
    </div>
  )
}
