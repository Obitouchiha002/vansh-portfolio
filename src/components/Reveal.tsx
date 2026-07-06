import { motion } from 'motion/react';

/* =========================================================================
   Reveal — reusable scroll-reveal wrapper (fade + slide-up).
   Purely additive: it only wraps children in a motion.div and animates them
   into view. It adds NO styling of its own unless you pass `className`, so it
   never changes your theme colors, classNames or layout.

     <Reveal>            ...single block fades + slides up on scroll
     <RevealStagger>     ...container whose <RevealItem> children stagger in
       <RevealItem>...</RevealItem>
     </RevealStagger>
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: any;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
};

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  duration = 0.6,
  once = true,
  amount = 0.2,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: any;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number;
};

/* Wrap a list; its direct <RevealItem> children animate in one-by-one. */
export function RevealStagger({
  children,
  className,
  stagger = 0.12,
  delayChildren = 0,
  once = true,
  amount = 0.2,
}: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren } } }}
    >
      {children}
    </motion.div>
  );
}

type ItemProps = { key?: string; children: any; className?: string; y?: number; duration?: number };

export function RevealItem({ children, className, y = 28, duration = 0.55 }: ItemProps) {
  return (
    <motion.div
      className={className}
      variants={{ hidden: { opacity: 0, y }, show: { opacity: 1, y: 0, transition: { duration, ease: EASE } } }}
    >
      {children}
    </motion.div>
  );
}
