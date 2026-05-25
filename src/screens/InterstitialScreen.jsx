import { motion } from 'framer-motion'
import {
  INTERSTITIAL_STATS,
  TREATMENT_STEPS,
  BENEFIT_CARDS,
  QUESTIONS_AFTER_INTERSTITIAL,
} from '../data/quiz'
import { IMAGES, LOCAL_IMAGES, LOCAL_FALLBACKS } from '../brand/tokens'
import { staggerItem, staggerParent, DURATION, EASE_OUT_EXPO } from '../brand/motion'
import { SafeImage } from '../components/ui/SafeImage'
import { useFunnel } from '../context/FunnelContext'
import { Button } from '../components/ui/Button'
import { AnimatedCounter } from '../components/ui/AnimatedCounter'
import { FunnelHeader } from '../components/layout/FunnelHeader'
import { EditorialLabel } from '../components/ui/EditorialLabel'

const ICONS = {
  check: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  package:
    'M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10.5 11.25h3',
  calendar: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5',
}

export function InterstitialScreen() {
  const { resumeAfterInterstitial } = useFunnel()
  const remaining = QUESTIONS_AFTER_INTERSTITIAL

  return (
    <section className="min-h-full">
      <div className="gradient-hero screen-x pt-7 pb-12">
        <div className="funnel-content">
          <FunnelHeader showProgress variant="light" />

          <EditorialLabel variant="light" className="block text-center">
            Results patients experienced
          </EditorialLabel>
          <motion.h2
            className="mt-3 text-center type-display-lg text-ivory"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: DURATION.slow, ease: EASE_OUT_EXPO }}
          >
            Real outcomes. Real discretion.
          </motion.h2>

          <motion.div
            className="mt-9 grid grid-cols-3 gap-2.5"
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {INTERSTITIAL_STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={staggerItem}
                className="flex flex-col items-center rounded-[var(--radius-lg)] border border-ivory/8 bg-ivory/5 px-2 py-5 text-center backdrop-blur-sm"
              >
                <p className="font-display text-[1.7rem] font-semibold leading-none text-copper-light">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals ?? 0}
                  />
                </p>
                <p className="mt-2.5 font-sans text-[9px] leading-snug text-ivory/48">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="gradient-warm screen-x py-11">
        <div className="funnel-content">
          <EditorialLabel>How treatment works</EditorialLabel>
          <h3 className="mt-2 type-display-md">Your plan in three steps</h3>
          <p className="mt-2 type-body-sm">Physician-guided from assessment through ongoing care.</p>

          <motion.div
            className="mt-8 space-y-3"
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-24px' }}
          >
            {TREATMENT_STEPS.map((step, i) => (
              <motion.div key={step.step} variants={staggerItem} className="surface-card flex gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest font-display text-lg font-semibold text-ivory">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-forest">{step.title}</h4>
                  <p className="mt-1.5 type-body-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="bg-forest-deep screen-x py-11">
        <div className="funnel-content">
          <div className="overflow-hidden rounded-[var(--radius-xl)] ring-1 ring-ivory/8">
            <SafeImage
              src={LOCAL_IMAGES.interstitial}
              fallbacks={[IMAGES.interstitialPhoto]}
              localFallback={LOCAL_FALLBACKS.interstitial}
              alt="Licensed physician care"
              className="aspect-[5/3] w-full object-cover object-center"
            />
          </div>
          <motion.div
            className="mt-5 grid gap-3"
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {BENEFIT_CARDS.map((card) => (
              <motion.div
                key={card.title}
                variants={staggerItem}
                className="flex gap-4 rounded-[var(--radius-lg)] border border-ivory/8 bg-ivory/6 p-5 backdrop-blur-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-copper/18">
                  <svg
                    className="h-5 w-5 text-copper-light"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={ICONS[card.icon]} />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-ivory">{card.title}</h4>
                  <p className="mt-1 type-body-sm text-ivory/52">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="gradient-warm screen-x py-9 safe-bottom">
        <div className="funnel-content">
          <Button variant="secondary" fullWidth size="lg" onClick={resumeAfterInterstitial}>
            Continue Assessment
          </Button>
          <p className="mt-3 text-center type-caption">
            {remaining} question{remaining !== 1 ? 's' : ''} remaining
          </p>
        </div>
      </div>
    </section>
  )
}
