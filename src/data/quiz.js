/**
 * Assessment flow — 5 questions (single source of truth)
 *
 * Q1  frequency     — single select
 * Q2  age           — slider (18–75+)
 *     [interstitial after Q2]
 * Q3  outcomes      — multi select
 * Q4  duration      — single select
 * Q5  health_flags  — multi select (none exclusive)
 */

/** 0-based index of last question BEFORE interstitial (Q2 age = index 1) */
export const INTERSTITIAL_AFTER_INDEX = 1

export const QUESTIONS = [
  // ─── Question 1 ───
  {
    questionNumber: 1,
    id: 'frequency',
    type: 'single',
    section: 'About you',
    question: 'How often do you experience difficulty?',
    subtitle: 'Be honest — your answers are private and used only by your clinician.',
    options: [
      { id: 'rarely', label: 'Rarely', value: 1 },
      { id: 'sometimes', label: 'Sometimes', value: 2 },
      { id: 'often', label: 'Often', value: 3 },
      { id: 'almost_always', label: 'Almost always', value: 4 },
    ],
  },
  // ─── Question 2 ───
  {
    questionNumber: 2,
    id: 'age',
    type: 'slider',
    section: 'About you',
    question: "What's your age?",
    subtitle: 'Your treatment is matched to your body and history.',
    min: 18,
    max: 75,
    default: 38,
  },
  // ─── Question 3 (after interstitial) ───
  {
    questionNumber: 3,
    id: 'outcomes',
    type: 'multi',
    section: 'Your goals',
    question: 'What outcomes matter most to you?',
    subtitle: 'Choose all that apply.',
    options: [
      { id: 'confidence', label: 'Restore confidence', value: 1 },
      { id: 'performance', label: 'Improve performance', value: 2 },
      { id: 'anxiety', label: 'Reduce anxiety', value: 3 },
      { id: 'support', label: 'Long-term support', value: 4 },
      { id: 'spontaneity', label: 'Spontaneity', value: 5 },
    ],
  },
  // ─── Question 4 ───
  {
    questionNumber: 4,
    id: 'duration',
    type: 'single',
    section: 'Your symptoms',
    question: 'How long has this been a concern?',
    subtitle: 'This helps us understand whether recent or long-standing factors may apply.',
    options: [
      { id: 'under_3mo', label: 'Under 3 months', value: 1 },
      { id: '3_12mo', label: '3–12 months', value: 2 },
      { id: '1_3yr', label: '1–3 years', value: 3 },
      { id: 'over_3yr', label: 'Over 3 years', value: 4 },
    ],
  },
  // ─── Question 5 ───
  {
    questionNumber: 5,
    id: 'health_flags',
    type: 'multi',
    section: 'Your health',
    question: 'Any of the following apply?',
    subtitle: "We'll review your full history before prescribing.",
    exclusiveOptionId: 'none',
    options: [
      { id: 'heart', label: 'Heart condition', value: 1 },
      { id: 'blood_pressure', label: 'High blood pressure', value: 2 },
      { id: 'nitrates', label: 'Taking nitrates', value: 3 },
      { id: 'none', label: 'None of the above', value: 0 },
    ],
  },
]

export const QUESTION_COUNT = QUESTIONS.length

/** Questions shown after the interstitial */
export const QUESTIONS_AFTER_INTERSTITIAL = QUESTIONS.length - (INTERSTITIAL_AFTER_INDEX + 1)

export const INTERSTITIAL_STATS = [
  { value: 87, suffix: '%', label: 'Report improved confidence within 8 weeks' },
  { value: 4.9, suffix: '', label: 'Average patient satisfaction', decimals: 1 },
  { value: 24, suffix: 'hr', label: 'Typical physician review turnaround' },
]

export const TREATMENT_STEPS = [
  {
    step: '01',
    title: 'Complete your assessment',
    description: 'A few thoughtful questions — reviewed privately by a licensed physician.',
  },
  {
    step: '02',
    title: 'Receive your plan',
    description: 'FDA-approved options tailored to your profile, delivered discreetly.',
  },
  {
    step: '03',
    title: 'Ongoing support',
    description: 'Unlimited messaging with your care team. Adjust anytime, no hassle.',
  },
]

export const BENEFIT_CARDS = [
  {
    title: 'Clinically proven',
    description: 'Same active ingredients trusted by physicians for decades.',
    icon: 'check',
  },
  {
    title: 'Discreet delivery',
    description: 'Plain packaging. No pharmacy lines. Arrives on your schedule.',
    icon: 'package',
  },
  {
    title: 'Flexible dosing',
    description: 'Daily or as-needed options — matched to your lifestyle.',
    icon: 'calendar',
  },
]

export const PRODUCT = {
  name: 'Verdan Performance Plan',
  generic: 'Sildenafil 50mg · As-needed',
  description:
    'Physician-prescribed, pharmacy-grade treatment with ongoing care team access.',
  features: [
    'Unlimited physician messaging',
    'Free dosage adjustments',
    'Discreet monthly delivery',
    'Cancel anytime — no contracts',
  ],
  pricing: {
    monthly: 29,
    quarterly: 69,
    perDose: 4.5,
  },
  testimonial: {
    quote:
      'I was skeptical about doing this online. Verdan made it straightforward — private, professional, and it actually works.',
    author: 'Michael R.',
    meta: 'Verified patient · 6 months',
  },
}
