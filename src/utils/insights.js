import { parseAssessmentAnswers } from './answers'

/**
 * Insights driven by Q1–Q5:
 * Q1 frequency → care profile
 * Q2 age + Q5 health → safety
 * Q1 + Q3 + Q4 → treatment match
 */
export function buildInsightsFromAnswers(answers) {
  const a = parseAssessmentAnswers(answers)

  const freq = a.frequencyValue ?? 2
  const age = a.ageValue ?? 38
  const dur = a.durationValue ?? 2

  // Q1 — Care profile (frequency)
  const profileKey = freq <= 2 ? 'low' : freq === 3 ? 'mid' : 'high'
  const profileTitles = {
    low: 'Mild-intermittent pattern',
    mid: 'Moderate-intermittent pattern',
    high: 'Consistent pattern identified',
  }
  const profileDescriptions = {
    low: `You reported symptoms ${a.frequencyLabel?.toLowerCase() ?? 'infrequently'} — often responsive to flexible, as-needed protocols.`,
    mid: `You reported symptoms ${a.frequencyLabel?.toLowerCase() ?? 'periodically'} — situational factors may play a role; we treat this successfully with personalized dosing.`,
    high: `You reported symptoms ${a.frequencyLabel?.toLowerCase() ?? 'frequently'} — daily or as-needed protocols can both be effective with physician guidance.`,
  }

  // Q2 + Q5 — Safety
  const safetyKey = a.hasRiskFlags || age >= 65 ? 'review' : 'clear'
  const safetyTitles = {
    clear: 'No contraindications flagged',
    review: 'Physician review recommended',
  }
  let safetyDescription = ''
  if (a.hasNitrates) {
    safetyDescription =
      'You indicated you are taking nitrates — a physician must review before any prescription is issued.'
  } else if (a.hasHeart || a.hasBloodPressure) {
    safetyDescription =
      'Your health screening includes cardiovascular factors — our physicians will confirm the safest treatment path.'
  } else if (age >= 65) {
    safetyDescription = `At age ${a.ageLabel ?? age}, a tailored dose and physician review ensure the safest effective option for you.`
  } else if (a.hasNoneOnly) {
    safetyDescription =
      'You reported no heart conditions, high blood pressure, or nitrate use — standard PDE5 inhibitors appear appropriate pending physician confirmation.'
  } else {
    safetyDescription =
      'Based on your health screening, standard PDE5 inhibitors appear appropriate pending physician confirmation.'
  }

  // Q1 + Q3 + Q4 — Treatment match
  let matchKey = 'flexible'
  if (freq >= 3 || dur >= 3) matchKey = 'daily'
  else if (freq <= 2 && dur <= 2 && a.wantsSpontaneity) matchKey = 'asNeeded'
  else if (freq <= 2 && dur <= 2) matchKey = 'asNeeded'

  const matchTitles = {
    asNeeded: 'As-needed protocol recommended',
    daily: 'Daily protocol may suit you',
    flexible: 'Flexible dosing recommended',
  }

  const goalsPhrase =
    a.outcomeLabels.length > 0
      ? `Your goals (${a.outcomeLabels.join(', ')})`
      : 'Your goals'

  const durationPhrase = a.durationLabel ? `concern duration of ${a.durationLabel.toLowerCase()}` : 'symptom history'

  const matchDescriptions = {
    asNeeded: `${goalsPhrase} and ${durationPhrase} suggest on-demand treatment offers flexibility without daily commitment.`,
    daily: `${goalsPhrase}, ${durationPhrase}, and symptom frequency suggest a steady daily protocol may provide more consistent results.`,
    flexible: `${goalsPhrase} and ${durationPhrase} support either as-needed or daily dosing — your physician will finalize the best fit.`,
  }

  if (a.wantsSupport || a.wantsAnxiety) {
    matchDescriptions[matchKey] += ' Unlimited clinician messaging is included with your plan.'
  }

  return [
    {
      id: 'profile',
      label: 'Care profile',
      title: profileTitles[profileKey],
      description: profileDescriptions[profileKey],
    },
    {
      id: 'safety',
      label: 'Safety screening',
      title: safetyTitles[safetyKey],
      description: safetyDescription,
    },
    {
      id: 'match',
      label: 'Treatment match',
      title: matchTitles[matchKey],
      description: matchDescriptions[matchKey],
    },
  ]
}

export function getRecommendedProduct(answers) {
  const a = parseAssessmentAnswers(answers)
  const freq = a.frequencyValue ?? 2
  const dur = a.durationValue ?? 2

  if (a.hasNitrates) {
    return {
      name: 'Verdan Guided Plan',
      generic: 'Custom protocol · Physician-led',
      blurb: 'Because you reported nitrate use, a physician-led custom protocol is required before any treatment.',
    }
  }

  if (a.hasRiskFlags) {
    return {
      name: 'Verdan Guided Plan',
      generic: 'Custom protocol · Physician-led',
      blurb: 'Your health screening calls for enhanced physician oversight and a tailored treatment approach.',
    }
  }

  if (freq >= 3 || dur >= 4) {
    return {
      name: 'Verdan Daily Plan',
      generic: 'Tadalafil 5mg · Daily',
      blurb: 'Based on how often symptoms occur and how long you’ve had this concern, daily tadalafil may offer steadier results.',
    }
  }

  if (a.wantsSpontaneity || (freq <= 2 && dur <= 2)) {
    return {
      name: 'Verdan Performance Plan',
      generic: 'Sildenafil 50mg · As-needed',
      blurb: 'Matched to your goals and symptom pattern — as-needed sildenafil with ongoing physician support.',
    }
  }

  return {
    name: 'Verdan Performance Plan',
    generic: 'Sildenafil 50mg · As-needed',
    blurb: 'As-needed sildenafil with unlimited physician support — aligned with your assessment responses.',
  }
}
