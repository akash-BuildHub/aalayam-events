import { motion, useReducedMotion } from 'framer-motion';

const revealTransition = {
  duration: 0.85,
  ease: [0.22, 1, 0.36, 1],
};

export default function SectionTransition({
  children,
  className = '',
  delay = 0,
  amount = 0.2,
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: false, amount }}
      transition={{ ...revealTransition, delay }}
    >
      {children}
    </motion.div>
  );
}
