import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  QUESTIONS,
  INTERSTITIAL_AFTER_INDEX,
  QUESTION_COUNT,
} from '../data/quiz'
import { buildInsightsFromAnswers, getRecommendedProduct } from '../utils/insights'
import { buildAgeAnswer, getMultiSelections } from '../utils/answers'

const FunnelContext = createContext(null)

const STEPS = ['hero', 'quiz', 'interstitial', 'results', 'recommendation']

function isMultiQuestion(q) {
  return q?.type === 'multi'
}

export function FunnelProvider({ children }) {
  const [step, setStep] = useState('hero')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [selectedOption, setSelectedOption] = useState(null)
  const [selectedMulti, setSelectedMulti] = useState([])
  const [direction, setDirection] = useState(1)
  const [resultsKey, setResultsKey] = useState(0)

  const currentQuestion = step === 'quiz' ? QUESTIONS[questionIndex] : null
  const totalQuestions = QUESTION_COUNT
  const isMulti = isMultiQuestion(currentQuestion)
  const isSlider = currentQuestion?.type === 'slider'

  const insights = useMemo(() => buildInsightsFromAnswers(answers), [answers])
  const recommendation = useMemo(() => getRecommendedProduct(answers), [answers])

  const answeredCount = useMemo(() => {
    let n = 0
    if (answers.frequency) n++
    if (answers.age?.value != null) n++
    if (getMultiSelections(answers.outcomes).length) n++
    if (answers.duration) n++
    if (getMultiSelections(answers.health_flags).length) n++
    return n
  }, [answers])

  const hasAnswerForCurrent = isMulti
    ? selectedMulti.length > 0
    : isSlider
      ? selectedOption?.value != null
      : !!selectedOption

  const quizProgressPercent =
    step === 'quiz'
      ? ((questionIndex + (hasAnswerForCurrent ? 0.5 : 0)) / totalQuestions) * 100
      : (answeredCount / totalQuestions) * 100

  const funnelMeta = useMemo(() => {
    const qNum = currentQuestion?.questionNumber
    return {
      label:
        step === 'quiz' && qNum
          ? `Question ${qNum} of ${totalQuestions}`
          : step === 'interstitial'
            ? 'About your care'
            : step === 'results'
              ? 'Your results'
              : step === 'recommendation'
                ? 'Your plan'
                : null,
      progress: step === 'quiz' ? quizProgressPercent : step === 'hero' ? null : undefined,
    }
  }, [step, currentQuestion, totalQuestions, quizProgressPercent])

  const canGoBack =
    (step === 'quiz' && questionIndex > 0) ||
    step === 'interstitial' ||
    step === 'results' ||
    step === 'recommendation'

  const clearSelection = useCallback(() => {
    setSelectedOption(null)
    setSelectedMulti([])
  }, [])

  const restoreSelectionForQuestion = useCallback((q) => {
    if (!q) return
    const saved = answers[q.id]
    if (isMultiQuestion(q)) {
      setSelectedOption(null)
      setSelectedMulti(getMultiSelections(saved))
    } else if (q.type === 'slider') {
      setSelectedMulti([])
      setSelectedOption(saved ?? buildAgeAnswer(q.default ?? 38, q.max))
    } else {
      setSelectedMulti([])
      setSelectedOption(saved ?? null)
    }
  }, [answers])

  const startAssessment = useCallback(() => {
    setDirection(1)
    setStep('quiz')
    setQuestionIndex(0)
    setAnswers({})
    clearSelection()
  }, [clearSelection])

  const selectOption = useCallback((option) => {
    setSelectedOption(option)
  }, [])

  const toggleMultiOption = useCallback(
    (option) => {
      if (!currentQuestion) return
      const exclusiveId = currentQuestion.exclusiveOptionId

      setSelectedMulti((prev) => {
        const isSelected = prev.some((o) => o.id === option.id)
        if (exclusiveId && option.id === exclusiveId) {
          return isSelected ? [] : [option]
        }
        let next = isSelected ? prev.filter((o) => o.id !== option.id) : [...prev, option]
        if (exclusiveId) next = next.filter((o) => o.id !== exclusiveId)
        return next
      })
    },
    [currentQuestion],
  )

  const continueQuiz = useCallback(() => {
    if (!currentQuestion) return

    if (isMultiQuestion(currentQuestion)) {
      if (selectedMulti.length === 0) return
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: { type: 'multi', selections: selectedMulti },
      }))
    } else if (currentQuestion.type === 'slider') {
      if (selectedOption?.value == null) return
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: selectedOption }))
    } else {
      if (!selectedOption) return
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: selectedOption }))
    }

    clearSelection()

    if (questionIndex === INTERSTITIAL_AFTER_INDEX) {
      setQuestionIndex(questionIndex + 1)
      setDirection(1)
      setStep('interstitial')
      return
    }

    if (questionIndex < totalQuestions - 1) {
      setQuestionIndex(questionIndex + 1)
    } else {
      setResultsKey((k) => k + 1)
      setDirection(1)
      setStep('results')
    }
  }, [
    currentQuestion,
    selectedOption,
    selectedMulti,
    questionIndex,
    totalQuestions,
    clearSelection,
  ])

  const resumeAfterInterstitial = useCallback(() => {
    setDirection(1)
    setStep('quiz')
    // questionIndex already points to Q3 (index 2)
  }, [])

  const finishResults = useCallback(() => {
    setDirection(1)
    setStep('recommendation')
  }, [])

  const goBack = useCallback(() => {
    setDirection(-1)

    if (step === 'recommendation') {
      setResultsKey((k) => k + 1)
      setStep('results')
      return
    }
    if (step === 'results') {
      setQuestionIndex(totalQuestions - 1)
      restoreSelectionForQuestion(QUESTIONS[totalQuestions - 1])
      setStep('quiz')
      return
    }
    if (step === 'interstitial') {
      setQuestionIndex(INTERSTITIAL_AFTER_INDEX)
      restoreSelectionForQuestion(QUESTIONS[INTERSTITIAL_AFTER_INDEX])
      setStep('quiz')
      return
    }
    if (step === 'quiz' && questionIndex > 0) {
      const prevIndex = questionIndex - 1
      setQuestionIndex(prevIndex)
      restoreSelectionForQuestion(QUESTIONS[prevIndex])
    }
  }, [step, questionIndex, totalQuestions, restoreSelectionForQuestion])

  useEffect(() => {
    if (step !== 'quiz') return
    restoreSelectionForQuestion(QUESTIONS[questionIndex])
  }, [questionIndex, step, restoreSelectionForQuestion])

  const resetFunnel = useCallback(() => {
    setDirection(-1)
    setStep('hero')
    setQuestionIndex(0)
    setAnswers({})
    clearSelection()
    setResultsKey(0)
  }, [clearSelection])

  const value = useMemo(
    () => ({
      step,
      direction,
      questionIndex,
      currentQuestion,
      totalQuestions,
      answers,
      answeredCount,
      selectedOption,
      selectedMulti,
      isMulti,
      isSlider,
      insights,
      recommendation,
      resultsKey,
      funnelMeta,
      canGoBack,
      goTo: (nextStep, dir = 1) => {
        setDirection(dir)
        setStep(nextStep)
      },
      goBack,
      startAssessment,
      selectOption,
      toggleMultiOption,
      continueQuiz,
      resumeAfterInterstitial,
      finishResults,
      resetFunnel,
      steps: STEPS,
    }),
    [
      step,
      direction,
      questionIndex,
      currentQuestion,
      totalQuestions,
      answers,
      answeredCount,
      selectedOption,
      selectedMulti,
      isMulti,
      isSlider,
      insights,
      recommendation,
      resultsKey,
      funnelMeta,
      canGoBack,
      goBack,
      startAssessment,
      selectOption,
      toggleMultiOption,
      continueQuiz,
      resumeAfterInterstitial,
      finishResults,
      resetFunnel,
    ],
  )

  return <FunnelContext.Provider value={value}>{children}</FunnelContext.Provider>
}

export function useFunnel() {
  const ctx = useContext(FunnelContext)
  if (!ctx) throw new Error('useFunnel must be used within FunnelProvider')
  return ctx
}
