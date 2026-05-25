/**
 * Normalizes raw funnel answers into a consistent shape for insights + recommendations.
 * Maps to Question 1–5 in QUESTIONS.
 */

export function buildAgeAnswer(age, max = 75) {
  return {
    id: `age-${age}`,
    value: age,
    label: age >= max ? '75+' : String(age),
  }
}

export function getMultiSelections(raw) {
  if (!raw) return []
  if (raw.selections) return raw.selections
  if (Array.isArray(raw)) return raw
  return []
}

/** Parsed answers aligned to Q1–Q5 */
export function parseAssessmentAnswers(answers = {}) {
  const frequency = answers.frequency
  const age = answers.age
  const outcomes = getMultiSelections(answers.outcomes)
  const duration = answers.duration
  const healthFlags = getMultiSelections(answers.health_flags)

  const frequencyValue = frequency?.value ?? null
  const ageValue = age?.value ?? null
  const durationValue = duration?.value ?? null

  const hasNoneOnly =
    healthFlags.some((f) => f.id === 'none') && healthFlags.length === 1
  const hasHeart = healthFlags.some((f) => f.id === 'heart')
  const hasBloodPressure = healthFlags.some((f) => f.id === 'blood_pressure')
  const hasNitrates = healthFlags.some((f) => f.id === 'nitrates')
  const hasRiskFlags = hasHeart || hasBloodPressure || hasNitrates

  const outcomeIds = outcomes.map((o) => o.id)
  const wantsConfidence = outcomeIds.includes('confidence')
  const wantsPerformance = outcomeIds.includes('performance')
  const wantsAnxiety = outcomeIds.includes('anxiety')
  const wantsSupport = outcomeIds.includes('support')
  const wantsSpontaneity = outcomeIds.includes('spontaneity')

  return {
    // Q1
    frequency,
    frequencyValue,
    frequencyLabel: frequency?.label ?? null,
    // Q2
    age,
    ageValue,
    ageLabel: age?.label ?? null,
    // Q3
    outcomes,
    outcomeIds,
    outcomeLabels: outcomes.map((o) => o.label),
    wantsConfidence,
    wantsPerformance,
    wantsAnxiety,
    wantsSupport,
    wantsSpontaneity,
    // Q4
    duration,
    durationValue,
    durationLabel: duration?.label ?? null,
    // Q5
    healthFlags,
    hasNoneOnly,
    hasHeart,
    hasBloodPressure,
    hasNitrates,
    hasRiskFlags,
    /** All five answered (for debug / completeness checks) */
    isComplete:
      frequencyValue != null &&
      ageValue != null &&
      outcomes.length > 0 &&
      durationValue != null &&
      healthFlags.length > 0,
  }
}
