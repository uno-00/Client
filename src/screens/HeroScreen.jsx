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
    <section className="hero-screen relative overflow-x-hidden">
      <HeroMedia />

      <div className="hero-shell screen-x funnel-content-wide relative z-10 flex flex-col safe-bottom">
        <motion.header
          className="flex items-center"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.hero, ease: EASE_OUT_EXPO }}
        >
          <Logo variant="light" />
        </motion.header>

        <div className="hero-main flex flex-1 flex-col justify-end">
          <motion.div
            className="w-full lg:max-w-[32rem]"
            initial="hidden"
            animate="visible"
            variants={staggerParent}
          >
            <motion.div variants={staggerItem}>
              <EditorialLabel variant="light" className="hero-eyebrow block">
                Private · Physician-guided
              </EditorialLabel>
            </motion.div>

            <motion.h1 variants={fadeUpHero} className="type-display-xl">
              Modern care for a more confident you
            </motion.h1>

            <motion.p variants={staggerItem} className="hero-lede max-w-[20rem] type-body text-ivory/70">
              <span className="font-medium text-ivory/92">{BRAND.tagline}</span>
              <span className="mt-2 block text-[14px] text-ivory/48">
                A discreet assessment reviewed by licensed physicians.
              </span>
            </motion.p>

            <motion.div
              variants={staggerItem}
              className="hero-stats-card overflow-hidden rounded-[var(--radius-xl)] border border-ivory/10 bg-ivory/5 backdrop-blur-md"
            >
              <div className="grid grid-cols-3 divide-x divide-ivory/8">
                {stats.map((s) => (
                  <div key={s.l} className="hero-stat-item px-2 text-center">
                    <p className="hero-stat-value font-display font-semibold leading-none text-copper-light">
                      {s.v}
                    </p>
                    <p className="hero-stat-label mt-1.5 font-sans font-medium tracking-[0.1em] text-ivory/42 uppercase">
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="hero-cta glass-dark"
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
