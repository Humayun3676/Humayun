import { motion } from 'framer-motion';

interface HeroProps {
  onViewResume: () => void;
}

export const Hero = ({ onViewResume }: HeroProps) => {
  return (
    <section className="relative flex items-center justify-center overflow-hidden px-4 lg:px-6 bg-[#EFEFEF] dark:bg-slate-900 transition-colors duration-300">
      <div className="relative z-10 max-w-[1440px] mx-auto w-full flex flex-col lg:flex-row-reverse items-center justify-between gap-8 lg:gap-16 pt-8 pb-8 lg:pt-12 lg:pb-12">
        
        {/* Left Column: Text */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left order-1 lg:pr-12">
          <div className="max-w-[600px] mx-auto lg:mx-0 w-full">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-slate-100 tracking-tight mb-4"
            >
              Hi, I'm <br className="hidden lg:block" /> HUMAYUN MIRZA
            </motion.h1>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-3xl font-bold text-gray-500 dark:text-slate-400 tracking-wider mb-6"
            >
              SOFTWARE ENGINEER
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-gray-500 dark:text-slate-400 text-xs md:text-sm tracking-widest uppercase mb-8 font-semibold"
            >
              AI/ML Enthusiast • Researcher • Developer • Builder • Leader
            </motion.p>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-gray-600 dark:text-slate-300 mb-10 leading-relaxed text-base md:text-lg"
            >
              Building practical software and exploring intelligent systems through artificial intelligence, machine learning, computer vision, and modern software engineering.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4"
            >
              <a href="#projects" className="w-full sm:w-auto px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl transition-all shadow-soft font-bold flex items-center justify-center">
                Explore My Work
              </a>
              <button 
                onClick={onViewResume}
                className="w-full sm:w-auto px-8 py-3 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 text-gray-900 dark:text-slate-100 hover:border-primary dark:hover:border-primary hover:text-primary dark:hover:text-primary rounded-xl transition-all shadow-sm font-bold flex items-center justify-center gap-2"
              >
                View Resume
              </button>
            </motion.div>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center order-2 mt-12 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-[500px] lg:max-w-[550px] flex justify-center lg:justify-end"
          >
            <img
              src="/humayun.jpg"
              alt="Humayun Mirza"
              className="w-full h-auto max-h-[640px] object-cover object-top rounded-2xl"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
};