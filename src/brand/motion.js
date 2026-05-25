/** Shared Framer Motion presets — keep transitions consistent across screens */

export const DURATION = {
  fast: 0.22,
  normal: 0.38,
  slow: 0.55,
  hero: 0.72,
}

export const EASE_SMOOTH = [0.25, 0.1, 0.25, 1]
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1]
export const EASE_IN_OUT = [0.45, 0, 0.55, 1]

export const springSnappy = { type: 'spring', stiffness: 420, damping: 34, mass: 0.85 }
export const springSoft = { type: 'spring', stiffness: 280, damping: 28, mass: 1 }

/** Full-screen funnel step (used in ScreenWrapper) */
export const pageTransition = (direction = 1, reduced = false) =>
  reduced
    ? { duration: DURATION.fast, ease: EASE_SMOOTH }
    : {
        duration: DURATION.normal,
        ease: EASE_OUT_EXPO,
      }

export const pageVariants = {
  enter: (direction) => ({
    opacity: 0,
    y: direction > 0 ? 18 : -10,
  }),
  center: {
    opacity: 1,
    y: 0,
  },
  exit: (direction) => ({
    opacity: 0,
    y: direction > 0 ? -10 : 14,
  }),
}

export const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.normal, ease: EASE_OUT_EXPO },
  },
}

export const fadeUpHero = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.hero, ease: EASE_OUT_EXPO },
  },
}

export const staggerParent = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.12 },
  },
}

export const staggerParentFast = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.06 },
  },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.normal, ease: EASE_OUT_EXPO },
  },
}

export const questionVariants = {
  initial: { opacity: 0, y: 16, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: DURATION.slow, ease: EASE_OUT_EXPO },
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: 'blur(2px)',
    transition: { duration: DURATION.fast, ease: EASE_IN_OUT },
  },
}

export const optionItem = (index) => ({
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.045,
      duration: DURATION.normal,
      ease: EASE_OUT_EXPO,
    },
  },
})

export const tapScale = { scale: 0.985 }
export const tapScaleLight = { scale: 0.992 }
