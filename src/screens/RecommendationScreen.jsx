import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PRODUCT } from '../data/quiz'
import { IMAGES, LOCAL_IMAGES, LOCAL_FALLBACKS } from '../brand/tokens'
import { fadeUp, staggerItem, staggerParent, DURATION, EASE_OUT_EXPO } from '../brand/motion'
import { SafeImage } from '../components/ui/SafeImage'
import { useFunnel } from '../context/FunnelContext'
import { Button } from '../components/ui/Button'
import { FunnelHeader } from '../components/layout/FunnelHeader'
import { StickyFooter } from '../components/layout/StickyFooter'
import { EditorialLabel } from '../components/ui/EditorialLabel'

const PLANS = [
  { id: 'monthly', label: 'Monthly', price: PRODUCT.pricing.monthly, period: '/mo' },
  {
    id: 'quarterly',
    label: 'Quarterly',
    price: PRODUCT.pricing.quarterly,
    period: '/3 mo',
    popular: true,
    savings: 'Save 21%',
  },
]

export function RecommendationScreen() {
  const { recommendation } = useFunnel()
  const [selectedPlan, setSelectedPlan] = useState('quarterly')
  const activePlan = PLANS.find((p) => p.id === selectedPlan)

  return (
    <section className="flex min-h-full flex-col bg-ivory">
      <motion.div
        className="gradient-hero screen-x pt-7 pb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="funnel-content">
          <FunnelHeader showProgress variant="light" />
          <EditorialLabel variant="light">Your matched plan</EditorialLabel>
          <motion.h1
            className="mt-3 font-display text-[2rem] font-semibold leading-[1.05] tracking-[-0.03em] text-ivory drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: DURATION.slow, ease: EASE_OUT_EXPO }}
          >
            {recommendation.name}
          </motion.h1>
          <p className="mt-2 text-sm font-semibold text-copper-light">{recommendation.generic}</p>
          <p className="mt-3 text-[13px] leading-relaxed text-ivory/72">{recommendation.blurb}</p>
        </div>
      </motion.div>

      <div className="screen-x funnel-content relative flex-1 pb-8">
        <motion.div
          className="-mt-12 surface-card-elevated overflow-hidden"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: DURATION.slow, ease: EASE_OUT_EXPO }}
        >
          <div className="relative bg-ivory-dark">
            <SafeImage
              src={LOCAL_IMAGES.product}
              fallbacks={[IMAGES.productPhoto]}
              localFallback={LOCAL_FALLBACKS.product}
              alt="Verdan care kit"
              className="aspect-[16/10] w-full object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-deep/30 to-transparent" />
            <span className="absolute bottom-3 left-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold tracking-wide text-forest shadow-soft uppercase">
              Physician-prescribed
            </span>
          </div>

          <div className="p-5">
            <p className="text-[14px] leading-relaxed text-forest/72">{PRODUCT.description}</p>
            <motion.ul
              className="mt-5 space-y-3 border-t border-sage/12 pt-5"
              variants={staggerParent}
              initial="hidden"
              animate="visible"
            >
              {PRODUCT.features.map((f) => (
                <motion.li
                  key={f}
                  variants={staggerItem}
                  className="flex items-center gap-3 text-[13px] text-forest"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest text-ivory">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {f}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>

        <div className="mt-8">
          <h2 className="type-display-md">Select billing</h2>
          <p className="mt-1 text-[13px] text-sage-muted">
            From ${PRODUCT.pricing.perDose}/dose · Free discreet shipping
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {PLANS.map((plan) => (
              <motion.button
                key={plan.id}
                type="button"
                onClick={() => setSelectedPlan(plan.id)}
                whileTap={{ scale: 0.98 }}
                className={[
                  'relative rounded-[var(--radius-lg)] border p-4 text-left transition-all duration-300',
                  selectedPlan === plan.id
                    ? 'border-copper bg-white shadow-elevated ring-2 ring-copper/25'
                    : 'surface-card hover:border-sage/40',
                ].join(' ')}
                aria-pressed={selectedPlan === plan.id}
              >
                {plan.popular && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-copper px-2.5 py-0.5 text-[9px] font-bold text-ivory uppercase">
                    {plan.savings}
                  </span>
                )}
                <p className="text-sm font-semibold text-forest">{plan.label}</p>
                <p className="mt-1 font-display text-[1.75rem] font-semibold leading-none text-forest">
                  ${plan.price}
                  <span className="text-xs font-sans font-normal text-sage-muted">{plan.period}</span>
                </p>
              </motion.button>
            ))}
          </div>
        </div>

        <motion.blockquote
          className="surface-card mt-6 p-5"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex gap-0.5 text-copper" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="mt-3 font-display text-[15px] leading-relaxed text-forest/85">
            &ldquo;{PRODUCT.testimonial.quote}&rdquo;
          </p>
          <footer className="mt-3 text-[11px] font-medium text-sage-muted">
            {PRODUCT.testimonial.author} · {PRODUCT.testimonial.meta}
          </footer>
        </motion.blockquote>

        <div className="mt-5 flex flex-wrap justify-center gap-3 text-[10px] text-sage-muted">
          <span>256-bit SSL</span>
          <span>·</span>
          <span>Cancel anytime</span>
          <span>·</span>
          <span>Licensed pharmacies</span>
        </div>
      </div>

      <StickyFooter className="!bg-ivory/98">
        <div className="mb-3 flex min-w-0 items-baseline justify-between gap-4">
          <span className="shrink-0 text-[13px] font-medium text-sage-muted">Due today</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={selectedPlan}
              className="shrink-0 text-right font-display text-2xl font-semibold tabular-nums text-forest"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              ${activePlan?.price}
              <span className="text-sm font-sans font-normal text-sage-muted">{activePlan?.period}</span>
            </motion.span>
          </AnimatePresence>
        </div>
        <Button variant="primary" fullWidth size="lg">
          Get Started — ${activePlan?.price}
        </Button>
        <p className="mt-2.5 text-center text-[10px] leading-relaxed tracking-wide text-sage-muted">
          Physician review included · Ships in 2–3 business days
        </p>
      </StickyFooter>
    </section>
  )
}
