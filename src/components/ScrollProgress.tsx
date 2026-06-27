import { motion, useScroll, useSpring } from 'motion/react';

/* Thin progress bar at the very top — shows how far down the page you are.
   Gives a sense of progress so long scrolling feels less endless. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1 origin-left z-[70] bg-gradient-to-r from-neon-green via-neon-cyan to-neon-blue"
    />
  );
}
