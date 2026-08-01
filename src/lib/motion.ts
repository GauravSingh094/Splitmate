import type { MotionProps, Transition, Variants } from 'framer-motion';

/**
 * Splito Motion System
 *
 * Central repository of all Framer Motion animation presets.
 * Every animated component in the application should reference these
 * instead of defining inline variants, ensuring visual consistency.
 *
 * All presets automatically respect prefers-reduced-motion via
 * MotionProvider's `reducedMotion="user"` setting.
 *
 * Usage:
 *   import { motion } from 'framer-motion';
 *   import { VARIANTS, TRANSITIONS } from '@/lib/motion';
 *
 *   <motion.div variants={VARIANTS.fade} initial="hidden" animate="visible" />
 */

// ============================================================
// Transitions
// ============================================================

export const TRANSITIONS = {
  /** Fast — for micro-interactions (hover, press). */
  fast: { duration: 0.15, ease: [0.4, 0, 0.2, 1] } satisfies Transition,

  /** Default — general purpose. */
  default: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } satisfies Transition,

  /** Smooth — page-level transitions, modals. */
  smooth: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } satisfies Transition,

  /** Slow — emphasis, large decorative elements. */
  slow: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } satisfies Transition,

  /** Spring — interactive elements, cards. */
  spring: { type: 'spring', stiffness: 400, damping: 30, mass: 0.8 } satisfies Transition,

  /** Spring snappy — buttons, toggles. */
  springSnappy: { type: 'spring', stiffness: 600, damping: 35 } satisfies Transition,

  /** Spring gentle — floating elements, tooltips. */
  springGentle: { type: 'spring', stiffness: 200, damping: 25, mass: 1 } satisfies Transition,

  /** Tween with overshoot — drawer/modal entrances. */
  enter: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } satisfies Transition,

  /** Exit — faster, ease-in. */
  exit: { duration: 0.2, ease: [0.4, 0, 1, 1] } satisfies Transition,
} as const;

// ============================================================
// Base Variants
// ============================================================

/** Fade in/out. */
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: TRANSITIONS.default },
  exit: { opacity: 0, transition: TRANSITIONS.exit },
};

/** Slide up (content entering from below). */
export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: TRANSITIONS.enter },
  exit: { opacity: 0, y: 8, transition: TRANSITIONS.exit },
};

/** Slide down (content entering from above). */
export const slideDownVariants: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0, transition: TRANSITIONS.enter },
  exit: { opacity: 0, y: -8, transition: TRANSITIONS.exit },
};

/** Slide in from the right. */
export const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: TRANSITIONS.enter },
  exit: { opacity: 0, x: -12, transition: TRANSITIONS.exit },
};

/** Slide in from the left. */
export const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: TRANSITIONS.enter },
  exit: { opacity: 0, x: 12, transition: TRANSITIONS.exit },
};

/** Scale in from center. */
export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: TRANSITIONS.spring },
  exit: { opacity: 0, scale: 0.97, transition: TRANSITIONS.exit },
};

/** Scale from a small size (used for popovers). */
export const scaleUpVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: TRANSITIONS.springSnappy },
  exit: { opacity: 0, scale: 0.9, transition: TRANSITIONS.exit },
};

// ============================================================
// Composite Variants
// ============================================================

/** Card entrance — slide up + scale. Suitable for grid item entrance. */
export const cardEntranceVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...TRANSITIONS.spring, stiffness: 300, damping: 28 },
  },
  exit: { opacity: 0, y: 8, scale: 0.98, transition: TRANSITIONS.exit },
};

/** Modal overlay — full-screen backdrop. */
export const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: TRANSITIONS.fast },
  exit: { opacity: 0, transition: TRANSITIONS.exit },
};

/** Modal dialog — slides up, scales in. */
export const dialogVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: TRANSITIONS.enter,
  },
  exit: { opacity: 0, scale: 0.97, y: 8, transition: TRANSITIONS.exit },
};

/** Drawer from the right side. */
export const drawerRightVariants: Variants = {
  hidden: { x: '100%', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: TRANSITIONS.enter },
  exit: { x: '100%', opacity: 0, transition: TRANSITIONS.exit },
};

/** Drawer from the left side. */
export const drawerLeftVariants: Variants = {
  hidden: { x: '-100%', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: TRANSITIONS.enter },
  exit: { x: '-100%', opacity: 0, transition: TRANSITIONS.exit },
};

/** Drawer from the bottom. */
export const drawerBottomVariants: Variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: TRANSITIONS.enter },
  exit: { y: '100%', opacity: 0, transition: TRANSITIONS.exit },
};

/** Drawer from the top. */
export const drawerTopVariants: Variants = {
  hidden: { y: '-100%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: TRANSITIONS.enter },
  exit: { y: '-100%', opacity: 0, transition: TRANSITIONS.exit },
};

// ============================================================
// Stagger Containers
// ============================================================

/**
 * Container variants for staggered child animations.
 * Apply to the parent, then use any child variant with:
 *   initial="hidden" animate="visible"
 */
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
  exit: { opacity: 0, transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};

/** Faster stagger — for dense lists. */
export const staggerFastContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.02 },
  },
};

/** Stagger item — use with staggerContainerVariants on the parent. */
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: TRANSITIONS.spring },
  exit: { opacity: 0, y: -6, transition: TRANSITIONS.exit },
};

/** List reveal — used for ordered lists. */
export const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: TRANSITIONS.default },
  exit: { opacity: 0, x: -4, transition: TRANSITIONS.exit },
};

// ============================================================
// Interactive Motion Props
// ============================================================

/**
 * Hover lift effect — raises a card/element on hover.
 * Spread directly onto a motion component: `{...HOVER_LIFT}`
 */
export const HOVER_LIFT: MotionProps = {
  whileHover: { y: -2, scale: 1.01, transition: TRANSITIONS.springSnappy },
  whileTap: { y: 0, scale: 0.99, transition: TRANSITIONS.fast },
};

/**
 * Button press — subtle scale feedback for interactive elements.
 */
export const BUTTON_PRESS: MotionProps = {
  whileTap: { scale: 0.97, transition: TRANSITIONS.fast },
};

/**
 * Subtle hover — for list items and less prominent elements.
 */
export const SUBTLE_HOVER: MotionProps = {
  whileHover: { scale: 1.005, transition: TRANSITIONS.fast },
  whileTap: { scale: 0.995, transition: TRANSITIONS.fast },
};

// ============================================================
// Page Transitions
// ============================================================

/** Full-page transition — used at the route level. */
export const pageTransitionVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...TRANSITIONS.enter, delay: 0.05 },
  },
  exit: { opacity: 0, y: -4, transition: TRANSITIONS.exit },
};

// ============================================================
// Convenience Re-export Map
// ============================================================

/**
 * Named map of all variant presets.
 * Import as: `import { VARIANTS } from '@/lib/motion'`
 *
 * @example
 * <motion.div variants={VARIANTS.slideUp} initial="hidden" animate="visible" />
 */
export const VARIANTS = {
  fade: fadeVariants,
  slideUp: slideUpVariants,
  slideDown: slideDownVariants,
  slideRight: slideRightVariants,
  slideLeft: slideLeftVariants,
  scale: scaleVariants,
  scaleUp: scaleUpVariants,
  cardEntrance: cardEntranceVariants,
  overlay: overlayVariants,
  dialog: dialogVariants,
  drawerRight: drawerRightVariants,
  drawerLeft: drawerLeftVariants,
  drawerBottom: drawerBottomVariants,
  drawerTop: drawerTopVariants,
  staggerContainer: staggerContainerVariants,
  staggerFastContainer: staggerFastContainerVariants,
  staggerItem: staggerItemVariants,
  listItem: listItemVariants,
  page: pageTransitionVariants,
} as const;
