import { motion, useReducedMotion } from 'framer-motion';

const revealTransition = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1],
};

export default function SectionTransition({
  children,
  className = '',
  delay = 0,
  amount = 0.2,
  once = true,
  variant = 'reveal',
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const variants = {
    reveal: {
      initial: { opacity: 0.85, y: 14, filter: 'blur(2px)', clipPath: 'inset(2% 0 0 0)' },
      inView: { opacity: 1, y: 0, filter: 'blur(0px)', clipPath: 'inset(0% 0 0 0)' },
    },
    fade: {
      initial: { opacity: 0.94 },
      inView: { opacity: 1 },
    },
  };

  const selected = variants[variant] || variants.reveal;

  return (
    <motion.div
      className={className}
      initial={selected.initial}
      whileInView={selected.inView}
      viewport={{ once, amount, margin: '-8% 0px -8% 0px' }}
      transition={{ ...revealTransition, delay }}
    >
      {children}
    </motion.div>
  );
}
