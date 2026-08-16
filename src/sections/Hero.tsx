import { motion } from 'framer-motion';

interface HeroProps {
  onViewResume: () => void;
}

export const Hero = ({ onViewResume }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden px-6 pt-20">
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        
       {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8 relative group"
        >
          <div className="absolute inset-0 bg-primary rounded-full blur-[30px] opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
          
          <img
            src="/profile.png"
            alt="Humayun Mirza"
            className="relative w-44 h-44 md:w-52 md:h-52 object-cover rounded-full shadow-neon hover:scale-105 transition-transform duration-500 cursor-pointer"
          />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-text-main tracking-tight mb-4"
        >
          HUMAYUN MIRZA
        </motion.h1>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-3xl font-medium text-primary mb-6"
        >
          SOFTWARE ENGINEER
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-text-muted text-xs md:text-sm tracking-widest uppercase mb-8 font-medium"
        >
          AI/ML Enthusiast • Researcher • Developer • Builder • Leader
        </motion.p>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed text-base md:text-lg"
        >
          Building practical software and exploring intelligent systems through artificial intelligence, machine learning, computer vision, and modern software engineering.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <a href="#projects" className="w-full sm:w-auto px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-md transition-all shadow-neon font-medium">
            Explore My Work
          </a>
          <button 
            onClick={onViewResume}
            className="px-8 py-3 bg-transparent border border-primary text-primary hover:bg-primary/10 rounded-md transition-all font-medium flex items-center justify-center gap-2"
          >
            View Resume
          </button>
        </motion.div>
      </div>
    </section>
  );
};