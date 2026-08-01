import type { Variants } from 'framer-motion';
import { EASINGS, SPRINGS } from './springs';

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: EASINGS.standard } },
  exit: { opacity: 0, transition: { duration: 0.15, ease: EASINGS.exit } },
};

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: EASINGS.entrance } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.15, ease: EASINGS.exit } },
};

export const slideDownVariants: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: EASINGS.entrance } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15, ease: EASINGS.exit } },
};

export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: SPRINGS.default },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.15 } },
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.02 },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: SPRINGS.snappy },
};
