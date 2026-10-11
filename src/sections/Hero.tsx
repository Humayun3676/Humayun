import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import { HeroConstellation } from '../components/HeroConstellation';
import { MagneticButton } from '../components/MagneticButton';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface HeroProps {
  onViewResume: () => void;
}

export const Hero = ({ onViewResume }: HeroProps) => {
  const reducedMotion = useReducedMotion();

  const easeTransition = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="relative flex items-center justify-center overflow-hidden px-4 lg:px-6 bg-[#EFEFEF] dark:bg-slate-900 transition-colors duration-300 min-h-[calc(100vh-4rem)] lg:min-h-screen">
      {/* AI / ML Constellation Canvas */}
      <HeroConstellation />

      {/* Atmospheric Ambient Glow Mesh */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 dark:bg-blue-600/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative z-10 max-w-[1440px] mx-auto w-full flex flex-col lg:flex-row-reverse items-center justify-between gap-8 lg:gap-16 pt-8 pb-8 lg:pt-12 lg:pb-12">
        
        {/* Left Column: Text */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left order-1 lg:pr-12">
          <div className="max-w-[620px] mx-auto lg:mx-0 w-full">
            
            {/* Greeting & Name */}
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 24, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.1, ease: easeTransition }}
            >
              <span className="text-sm md:text-base font-bold text-primary tracking-widest uppercase mb-2 block">
                Hi, I'm
              </span>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4 leading-none bg-gradient-to-r from-gray-950 via-slate-800 to-blue-700 dark:from-white dark:via-blue-100 dark:to-blue-400 bg-clip-text text-transparent">
                HUMAYUN MIRZA
              </h1>
            </motion.div>
            
            {/* Software Engineer Headline */}
            <motion.h2 
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.25, ease: easeTransition }}
              className="text-xl md:text-3xl font-extrabold text-gray-700 dark:text-slate-300 tracking-wider mb-6 flex items-center justify-center lg:justify-start gap-3"
            >
              <span>SOFTWARE ENGINEER</span>
            </motion.h2>

            {/* Role highlight pill line */}
            <motion.div 
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: easeTransition }}
              className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-1.5 text-gray-500 dark:text-slate-400 text-xs md:text-sm tracking-widest uppercase mb-8 font-semibold"
            >
              <span className="text-primary font-bold">AI/ML Enthusiast</span>
              <span className="text-gray-400 dark:text-slate-600">•</span>
              <span>Researcher</span>
              <span className="text-gray-400 dark:text-slate-600">•</span>
              <span>Developer</span>
              <span className="text-gray-400 dark:text-slate-600">•</span>
              <span>Builder</span>
              <span className="text-gray-400 dark:text-slate-600">•</span>
              <span>Leader</span>
            </motion.div>

            {/* Paragraph description */}
            <motion.p 
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: easeTransition }}
              className="text-gray-600 dark:text-slate-300 mb-10 leading-relaxed text-base md:text-lg"
            >
              Building practical software and exploring intelligent systems through artificial intelligence, machine learning, computer vision, and modern software engineering.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: easeTransition }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4"
            >
              <MagneticButton strength={0.2} className="w-full sm:w-auto">
                <a 
                  href="#projects" 
                  className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-primary-hover text-white rounded-xl transition-all shadow-[0_10px_25px_-5px_rgba(37,99,235,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(37,99,235,0.6)] font-bold flex items-center justify-center gap-2 group"
                >
                  <span>Explore My Work</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </a>
              </MagneticButton>

              <MagneticButton strength={0.2} className="w-full sm:w-auto">
                <button 
                  onClick={onViewResume}
                  className="w-full sm:w-auto px-8 py-3.5 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-2 border-gray-200/90 dark:border-slate-700/90 text-gray-900 dark:text-slate-100 hover:border-primary dark:hover:border-primary hover:text-primary dark:hover:text-primary rounded-xl transition-all shadow-sm font-bold flex items-center justify-center gap-2 group"
                >
                  <FileText size={18} className="group-hover:scale-110 transition-transform duration-300" />
                  <span>View Resume</span>
                </button>
              </MagneticButton>
            </motion.div>

          </div>
        </div>

        {/* Right Column: Image */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center order-2 mt-8 lg:mt-0">
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: easeTransition }}
            className="relative w-full max-w-[480px] lg:max-w-[540px] flex justify-center lg:justify-end"
          >
            {/* Ambient Halo Ring behind Portrait */}
            <div className="absolute -inset-2 lg:-inset-4 rounded-3xl bg-gradient-to-tr from-primary/30 via-blue-500/20 to-indigo-500/30 blur-2xl opacity-60 dark:opacity-75 pointer-events-none"></div>

            <div className="relative rounded-2xl overflow-hidden border border-white/60 dark:border-slate-700/60 shadow-2xl">
              <picture>
                <source srcSet="/humayun-mirza-software-engineer.webp" type="image/webp" />
                <img
                  src="/humayun.jpg"
                  alt="Humayun Mirza, Software Engineer & AI/ML Developer from Sialkot, Pakistan"
                  width={681}
                  height={1024}
                  fetchPriority="high"
                  className="w-full h-auto max-h-[640px] object-cover object-top rounded-2xl transition-transform duration-700 hover:scale-[1.02]"
                />
              </picture>
              {/* Subtle vignette blend at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};