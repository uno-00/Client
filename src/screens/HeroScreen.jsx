import { motion } from 'framer-motion'
import { BRAND } from '../brand/tokens'
import {
  staggerParent,
  staggerItem,
  fadeUpHero,
  DURATION,
  EASE_OUT_EXPO,
} from '../brand/motion'
import { useFunnel } from '../context/FunnelContext'
import { Button } from '../components/ui/Button'
import { Logo } from '../components/ui/Logo'
import { HeroMedia } from '../components/ui/HeroMedia'
import { EditorialLabel } from '../components/ui/EditorialLabel'
import { LogoMarquee } from '../components/ui/LogoMarquee'

const stats = [
  { v: '50k+', l: 'Assessments' },
  { v: '4.9', l: 'Patient rating' },
  { v: '24h', l: 'Physician review' },
]

export function HeroScreen() {
  const { startAssessment } = useFunnel()

  return (
    <section className="relative min-h-dvh overflow-hidden">
      <HeroMedia />

      <div className="relative z-10 flex min-h-dvh flex-col px-6 pb-10 pt-7 safe-bottom">
        <motion.header
          className="flex items-center"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.hero, ease: EASE_OUT_EXPO }}
        >
          <Logo variant="light" />
        </motion.header>

        <div className="flex flex-1 flex-col justify-end pb-4 pt-12">
          <motion.div initial="hidden" animate="visible" variants={staggerParent}>
            <motion.div variants={staggerItem}>
              <EditorialLabel variant="light" className="mb-4 block">
                Private · Physician-guided
              </EditorialLabel>
            </motion.div>

            <motion.h1 variants={fadeUpHero} className="type-display-xl">
              Modern care for a more confident you
            </motion.h1>

            <motion.p variants={staggerItem} className="mt-5 max-w-[20rem] type-body text-ivory/70">
              <span className="font-medium text-ivory/92">{BRAND.tagline}</span>
              <span className="mt-2 block text-[14px] text-ivory/48">
                A discreet assessment reviewed by licensed physicians.
              </span>
            </motion.p>

            <motion.div
              variants={staggerItem}
              className="mt-8 overflow-hidden rounded-[var(--radius-xl)] border border-ivory/10 bg-ivory/5 backdrop-blur-md"
            >
              <div className="grid grid-cols-3 divide-x divide-ivory/8">
                {stats.map((s) => (
                  <div key={s.l} className="px-2 py-4 text-center">
                    <p className="font-display text-[1.6rem] font-semibold leading-none text-copper-light">
                      {s.v}
                    </p>
                    <p className="mt-1.5 font-sans text-[9px] font-medium tracking-[0.1em] text-ivory/42 uppercase">
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="glass-dark mt-8 p-5"
            >
              <Button variant="primary" size="lg" fullWidth onClick={startAssessment}>
                Start Assessment
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Button>
              <p className="mt-4 text-center text-[11px] tracking-wide text-ivory/38">
                No commitment · Confidential · HIPAA secure
              </p>
            </motion.div>

            <motion.div variants={staggerItem}>
              <LogoMarquee />
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
