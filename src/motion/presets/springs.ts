import type { Transition } from 'framer-motion';

export const SPRINGS = {
  snappy: { type: 'spring', stiffness: 600, damping: 35 } satisfies Transition,
  default: { type: 'spring', stiffness: 400, damping: 30, mass: 0.8 } satisfies Transition,
  gentle: { type: 'spring', stiffness: 200, damping: 25, mass: 1 } satisfies Transition,
  bouncy: { type: 'spring', stiffness: 500, damping: 20 } satisfies Transition,
  slow: { type: 'spring', stiffness: 150, damping: 28 } satisfies Transition,
} as const;

export const EASINGS = {
  standard: [0.4, 0, 0.2, 1] as const,
  entrance: [0.16, 1, 0.3, 1] as const,
  exit: [0.4, 0, 1, 1] as const,
  bounce: [0.34, 1.56, 0.64, 1] as const,
} as const;
