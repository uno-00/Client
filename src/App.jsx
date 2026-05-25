import { AnimatePresence } from 'framer-motion'
import { FunnelProvider, useFunnel } from './context/FunnelContext'
import { ScreenWrapper } from './components/layout/ScreenWrapper'
import { useScrollToTop } from './hooks/useScrollToTop'
import { HeroScreen } from './screens/HeroScreen'
import { QuizScreen } from './screens/QuizScreen'
import { InterstitialScreen } from './screens/InterstitialScreen'
import { ResultsRevealScreen } from './screens/ResultsRevealScreen'
import { RecommendationScreen } from './screens/RecommendationScreen'

function FunnelRouter() {
  const { step, direction } = useFunnel()
  useScrollToTop([step])

  const screens = {
    hero: HeroScreen,
    quiz: QuizScreen,
    interstitial: InterstitialScreen,
    results: ResultsRevealScreen,
    recommendation: RecommendationScreen,
  }

  const Screen = screens[step] ?? HeroScreen

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <ScreenWrapper key={step} direction={direction}>
        <Screen />
      </ScreenWrapper>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <FunnelProvider>
      <main className="relative flex min-h-dvh items-stretch justify-center overflow-hidden bg-[#080f0c] lg:items-center lg:py-6">
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 50%, rgb(26 61 48 / 0.35), transparent 70%)',
          }}
          aria-hidden="true"
        />
        <div
          data-funnel-frame
          className="scrollbar-hide frame-glow relative h-dvh max-h-dvh w-full max-w-[390px] overflow-x-hidden overflow-y-auto overscroll-contain bg-ivory lg:h-[min(844px,92dvh)] lg:max-h-[min(844px,92dvh)] lg:rounded-[2rem] lg:ring-1 lg:ring-white/10"
        >
          <FunnelRouter />
        </div>
      </main>
    </FunnelProvider>
  )
}
