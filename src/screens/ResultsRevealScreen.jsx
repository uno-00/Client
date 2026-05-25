import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { springSoft, fadeUp, DURATION, EASE_OUT_EXPO } from '../brand/motion'
import { useFunnel } from '../context/FunnelContext'
import { Button } from '../components/ui/Button'
import { CircularProgress } from '../components/ui/CircularProgress'
import { FunnelHeader } from '../components/layout/FunnelHeader'
import { EditorialLabel } from '../components/ui/EditorialLabel'
import { useReducedMotion } from '../hooks/useReducedMotion'

const LOADING_STEPS = [
  'Reviewing your responses',
  'Cross-referencing clinical guidelines',
  'Matching treatment protocols',
  'Preparing your personalized plan',
]

export function ResultsRevealScreen() {
  const { finishResults, insights, recommendation, resultsKey } = useFunnel()
  const reducedMotion = useReducedMotion()

  const [phase, setPhase] = useState('loading')
  const [loadProgress, setLoadProgress] = useState(0)
  const [loadStepIndex, setLoadStepIndex] = useState(0)
  const [revealedInsights, setRevealedInsights] = useState(0)
  const [showRecommendation, setShowRecommendation] = useState(false)
  const mountedRef = useRef(true)

  // Reset sequence when entering (or re-entering) results
  useEffect(() => {
    mountedRef.current = true
    setPhase(reducedMotion ? 'insights' : 'loading')
    setLoadProgress(reducedMotion ? 100 : 0)
    setLoadStepIndex(0)
    setRevealedInsights(reducedMotion ? insights.length : 0)
    setShowRecommendation(reducedMotion)

    return () => {
      mountedRef.current = false
    }
  }, [resultsKey, reducedMotion, insights.length])

  useEffect(() => {
    if (phase !== 'loading' || reducedMotion) return

    let progress = 0
    const progressInterval = setInterval(() => {
      progress = Math.min(progress + 2, 100)
      if (mountedRef.current) setLoadProgress(progress)
      if (progress >= 100) clearInterval(progressInterval)
    }, 60)

    const stepInterval = setInterval(() => {
      if (mountedRef.current) {
        setLoadStepIndex((i) => (i < LOADING_STEPS.length - 1 ? i + 1 : i))
      }
    }, 850)

    const revealTimeout = setTimeout(() => {
      if (mountedRef.current) setPhase('insights')
    }, 3000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(stepInterval)
      clearTimeout(revealTimeout)
    }
  }, [phase, reducedMotion])

  useEffect(() => {
    if (phase !== 'insights' || reducedMotion) return

    const timers = insights.map((_, i) =>
      setTimeout(() => {
        if (mountedRef.current) setRevealedInsights(i + 1)
      }, 500 + i * 750),
    )

    const finalTimer = setTimeout(() => {
      if (mountedRef.current) {
        setShowRecommendation(true)
        setPhase('complete')
      }
    }, 500 + insights.length * 750 + 700)

    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(finalTimer)
    }
  }, [phase, insights, reducedMotion])

  return (
    <section className="flex min-h-dvh flex-col gradient-warm">
      <div className="screen-x funnel-content relative flex min-h-dvh flex-1 flex-col py-7">
        <div className="pointer-events-none absolute inset-0 pattern-dots opacity-30" aria-hidden="true" />
        <FunnelHeader showProgress />

        <AnimatePresence mode="wait">
          {phase === 'loading' && (
            <motion.div
              key="loading"
              className="flex flex-1 flex-col items-center justify-center py-16 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: DURATION.normal, ease: EASE_OUT_EXPO }}
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 m-auto h-56 w-56 rounded-full border border-sage/15"
                  aria-hidden="true"
                />
                <CircularProgress progress={loadProgress} size={148} strokeWidth={5} />
              </div>

              <AnimatePresence mode="wait">
                <motion.h2
                  key={loadStepIndex}
                  className="mt-10 font-display text-2xl font-semibold text-forest"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: DURATION.fast, ease: EASE_OUT_EXPO }}
                >
                  {LOADING_STEPS[loadStepIndex]}…
                </motion.h2>
              </AnimatePresence>

              <p className="mt-3 text-sm text-sage-muted">Analyzing your responses</p>

              <div className="mt-8 h-1.5 w-52 overflow-hidden rounded-full bg-sage/20">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-copper to-copper-light"
                  style={{ width: `${loadProgress}%` }}
                  layout
                />
              </div>

              <ul className="mt-8 space-y-2 text-left text-xs text-sage-muted" aria-live="polite">
                {LOADING_STEPS.map((step, i) => (
                  <li
                    key={step}
                    className={i <= loadStepIndex ? 'text-forest font-medium' : 'opacity-50'}
                  >
                    {i < loadStepIndex ? '✓' : i === loadStepIndex ? '…' : '○'} {step}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {(phase === 'insights' || phase === 'complete') && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-1 flex-col pb-8"
            >
              <EditorialLabel>Your personalized insights</EditorialLabel>
              <motion.h2
                className="mt-3 type-display-lg"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                Assessment complete
              </motion.h2>
              <p className="mt-2 type-body-sm">
                Based on your 5-question assessment
              </p>

              <div className="mt-8 space-y-4">
                {insights.map((insight, i) => (
                  <AnimatePresence key={insight.id}>
                    {revealedInsights > i && (
                      <motion.article
                        initial={{ opacity: 0, y: 20, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: DURATION.slow, ease: EASE_OUT_EXPO }}
                        className="surface-card-elevated overflow-hidden"
                      >
                        <div className="flex items-stretch">
                          <div className="w-1 shrink-0 bg-gradient-to-b from-copper to-copper-light" />
                          <div className="p-5">
                            <p className="text-[10px] font-semibold tracking-widest text-sage-muted uppercase">
                              {insight.label}
                            </p>
                            <h3 className="mt-1 font-display text-xl font-semibold text-forest">
                              {insight.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-forest/70">
                              {insight.description}
                            </p>
                          </div>
                        </div>
                      </motion.article>
                    )}
                  </AnimatePresence>
                ))}
              </div>

              <AnimatePresence>
                {showRecommendation && (
                  <motion.div
                    className="mt-8 overflow-hidden rounded-[var(--radius-xl)] gradient-hero p-6 shadow-elevated ring-1 ring-ivory/10"
                    initial={{ opacity: 0, y: 28, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={springSoft}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-copper/25 ring-1 ring-copper/30">
                        <svg
                          className="h-7 w-7 text-copper-light"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs tracking-widest text-sage-light uppercase">
                          Recommended for you
                        </p>
                        <h3 className="mt-1 font-display text-xl font-semibold text-ivory">
                          {recommendation.name}
                        </h3>
                        <p className="mt-0.5 text-sm text-copper-light/90">{recommendation.generic}</p>
                        <p className="mt-2 text-sm leading-relaxed text-ivory/70">
                          {recommendation.blurb}
                        </p>
                      </div>
                    </div>
                    <motion.div
                      className="mt-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                    >
                      <Button variant="primary" fullWidth onClick={finishResults}>
                        View Your Plan
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
