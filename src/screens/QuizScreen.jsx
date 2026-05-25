import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFunnel } from '../context/FunnelContext'
import { Button } from '../components/ui/Button'
import { FunnelHeader } from '../components/layout/FunnelHeader'
import { StickyFooter } from '../components/layout/StickyFooter'
import { OptionCard } from '../components/quiz/OptionCard'
import { MultiOptionCard } from '../components/quiz/MultiOptionCard'
import { AgeSlider } from '../components/quiz/AgeSlider'
import { EditorialLabel } from '../components/ui/EditorialLabel'
import { questionVariants } from '../brand/motion'
import { buildAgeAnswer } from '../utils/answers'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function QuizScreen() {
  const {
    currentQuestion,
    totalQuestions,
    selectedOption,
    selectedMulti,
    isMulti,
    isSlider,
    selectOption,
    toggleMultiOption,
    continueQuiz,
  } = useFunnel()

  const reducedMotion = useReducedMotion()
  const ageValue = isSlider ? (selectedOption?.value ?? currentQuestion?.default ?? 38) : null

  const handleContinue = useCallback(() => {
    continueQuiz()
  }, [continueQuiz])

  const handleAgeChange = useCallback(
    (age) => {
      if (currentQuestion) selectOption(buildAgeAnswer(age, currentQuestion.max))
    },
    [currentQuestion, selectOption],
  )

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Enter') handleContinue()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleContinue])

  if (!currentQuestion) return null

  const sectionLabel = currentQuestion.section ?? 'Assessment'
  const canContinue = isMulti
    ? selectedMulti.length > 0
    : isSlider
      ? ageValue != null
      : !!selectedOption

  const continueHint = isMulti
    ? 'Select at least one option'
    : 'Select an option to continue'

  const qVariants = reducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : questionVariants

  return (
    <section className="relative flex min-h-dvh flex-col gradient-warm">
      <div className="pointer-events-none absolute inset-0 pattern-dots opacity-25" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-0 w-full flex-1 flex-col px-6 pb-6 pt-7">
        <FunnelHeader showProgress />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            variants={qVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-1 flex-col pb-4"
          >
            <div className="mb-6 flex items-center justify-between">
              <EditorialLabel className="!text-sage-muted">{sectionLabel}</EditorialLabel>
              <span className="font-sans text-[11px] font-medium tabular-nums text-sage-muted">
                {currentQuestion.questionNumber} / {totalQuestions}
              </span>
            </div>

            <h2 className="type-display-lg">{currentQuestion.question}</h2>
            <p className="mt-3 max-w-[22rem] type-body">{currentQuestion.subtitle}</p>

            {isSlider && (
              <div className="mt-8">
                <AgeSlider
                  min={currentQuestion.min}
                  max={currentQuestion.max}
                  value={ageValue}
                  onChange={handleAgeChange}
                />
              </div>
            )}

            {isMulti && (
              <fieldset className="mt-8">
                <legend className="sr-only">{currentQuestion.question}</legend>
                <div className="surface-card-elevated divide-y divide-sage/10 overflow-hidden p-1">
                  {currentQuestion.options.map((option, index) => (
                    <MultiOptionCard
                      key={option.id}
                      option={option}
                      index={index}
                      selected={selectedMulti.some((o) => o.id === option.id)}
                      onToggle={toggleMultiOption}
                    />
                  ))}
                </div>
                {selectedMulti.length > 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 text-center text-[11px] font-semibold text-copper"
                  >
                    {selectedMulti.length} selected
                  </motion.p>
                )}
              </fieldset>
            )}

            {!isSlider && !isMulti && (
              <fieldset className="mt-8">
                <legend className="sr-only">{currentQuestion.question}</legend>
                <div className="surface-card-elevated divide-y divide-sage/10 overflow-hidden p-1">
                  {currentQuestion.options.map((option, index) => (
                    <OptionCard
                      key={option.id}
                      option={option}
                      index={index}
                      variant="simple"
                      selected={selectedOption?.id === option.id}
                      onSelect={selectOption}
                    />
                  ))}
                </div>
              </fieldset>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <StickyFooter>
        <Button variant="secondary" fullWidth disabled={!canContinue} onClick={handleContinue}>
          Continue
        </Button>
        {!canContinue && (
          <p className="mt-2.5 text-center type-caption">{continueHint}</p>
        )}
      </StickyFooter>
    </section>
  )
}
