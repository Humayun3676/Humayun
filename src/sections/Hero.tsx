import { motion } from 'framer-motion';

interface HeroProps {
  onViewResume: () => void;
}

export const Hero = ({ onViewResume }: HeroProps) => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-4 lg:px-6 bg-[#EFEFEF]">
      <div className="relative z-10 mx-auto flex flex-col lg:flex-row items-center w-full min-h-[85vh] pt-8 lg:pt-0 gap-12 lg:gap-0">
        
        {/* Left Column: Image */}
        <div className="flex-1 lg:flex-[0.45] w-full h-full flex justify-center lg:justify-start items-end self-center lg:self-end pt-4 lg:pt-0 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full flex justify-center md:justify-start"
          >
            <img
              src="/humayun.jpg"
              alt="Humayun Mirza"
              className="w-full max-w-sm md:max-w-none md:w-[80%] lg:w-[85%] h-auto object-contain object-bottom"
            />
          </motion.div>
        </div>

        {/* Right Column: Text */}
        <div className="flex-1 lg:flex-[0.55] w-full flex flex-col justify-center text-center lg:text-left px-0 lg:px-6 py-8 lg:py-0 lg:pr-12 xl:pr-24 order-1 lg:order-2">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight mb-4"
          >
            Hi, I'm <br className="hidden lg:block" /> HUMAYUN MIRZA
          </motion.h1>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-3xl font-bold text-gray-500 tracking-wider mb-6"
          >
            SOFTWARE ENGINEER
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-500 text-xs md:text-sm tracking-widest uppercase mb-8 font-semibold"
          >
            AI/ML Enthusiast • Researcher • Developer • Builder • Leader
          </motion.p>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-600 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed text-base md:text-lg"
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
              className="w-full sm:w-auto px-8 py-3 bg-white border-2 border-gray-200 text-gray-900 hover:border-primary hover:text-primary rounded-xl transition-all shadow-sm font-bold flex items-center justify-center gap-2"
            >
              View Resume
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};