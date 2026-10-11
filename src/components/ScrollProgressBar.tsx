import { motion, useScroll, useSpring } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const ScrollProgressBar = () => {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 30,
    restDelta: 0.001
  });

  if (reducedMotion) return null;

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[70] origin-left bg-gradient-to-r from-blue-600 via-primary to-indigo-500 shadow-[0_0_8px_rgba(37,99,235,0.6)] pointer-events-none"
    />
  );
};
