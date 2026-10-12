import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}

export const SectionHeader = ({ eyebrow, title, description, className = '' }: SectionHeaderProps) => {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={false}
      whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`text-center mb-16 ${className}`}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/50 dark:border-blue-800/40 text-primary text-xs font-bold uppercase tracking-widest mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          <span>{eyebrow}</span>
        </div>
      )}

      <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-gray-900 dark:text-slate-100 mb-4 tracking-tight">
        {title}
      </h2>

      <motion.div
        initial={false}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="w-20 h-1 bg-gradient-to-r from-blue-600 via-primary to-indigo-500 mx-auto rounded-full mb-8 origin-center shadow-[0_0_12px_rgba(37,99,235,0.4)]"
      />

      {description && (
        <p className="text-gray-600 dark:text-slate-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
};
