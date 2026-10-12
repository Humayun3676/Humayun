import { motion } from 'framer-motion';
import { Phone, Mail, Globe } from 'lucide-react';
import { CONTACT, getWhatsAppLink, getEmailLink } from '../config/contact';
import { MagneticButton } from './MagneticButton';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer = ({ onOpenContact }: FooterProps) => {
  return (
    <footer className="bg-[#EFEFEF] dark:bg-slate-900 border-t border-gray-200/80 dark:border-slate-800/80 pt-16 lg:pt-28 pb-10 lg:pb-14 px-4 lg:px-6 relative overflow-hidden transition-colors duration-300">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[320px] bg-primary/10 dark:bg-blue-600/15 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto w-full">
        <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/50 dark:border-blue-800/40 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span>Get in Touch</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-slate-100 mb-6 tracking-tight">
            LET'S BUILD SOMETHING{' '}
            <span className="bg-gradient-to-r from-blue-600 via-primary to-indigo-500 bg-clip-text text-transparent">
              INTELLIGENT.
            </span>
          </h2>
          <p className="text-gray-600 dark:text-slate-300 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Have a project, opportunity, research idea, collaboration, or simply want to connect?
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <MagneticButton strength={0.2} className="w-full sm:w-auto">
              <button 
                onClick={onOpenContact}
                className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-primary-hover text-white rounded-xl transition-all shadow-[0_10px_25px_-5px_rgba(37,99,235,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(37,99,235,0.6)] font-bold flex items-center justify-center"
              >
                Contact Now
              </button>
            </MagneticButton>

            <MagneticButton strength={0.2} className="w-full sm:w-auto">
              <a 
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-2 border-gray-200/90 dark:border-slate-700/90 hover:border-primary dark:hover:border-primary text-gray-900 dark:text-slate-100 hover:text-primary dark:hover:text-primary rounded-xl transition-all shadow-sm font-bold flex items-center justify-center gap-2 group"
              >
                <Globe className="text-primary group-hover:scale-110 transition-transform" size={20} /> LinkedIn
              </a>
            </MagneticButton>
          </div>
        </motion.div>

        <div className="border-t border-gray-200/80 dark:border-slate-800/80 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-slate-100 tracking-wider mb-1">
              HUMAYUN MIRZA
            </h3>
            <p className="text-gray-600 dark:text-slate-400 text-xs uppercase tracking-widest font-semibold">
              Software Engineer • AI/ML Enthusiast
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href={getWhatsAppLink()} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="WhatsApp"
              className="p-3 bg-white/80 dark:bg-slate-800/80 border border-gray-200/80 dark:border-slate-700/80 rounded-xl text-gray-600 dark:text-slate-400 hover:text-primary dark:hover:text-blue-400 hover:border-primary/50 hover:scale-110 active:scale-95 transition-all shadow-2xs"
            >
              <Phone size={18} />
            </a>
            <a 
              href={getEmailLink()} 
              aria-label="Email"
              className="p-3 bg-white/80 dark:bg-slate-800/80 border border-gray-200/80 dark:border-slate-700/80 rounded-xl text-gray-600 dark:text-slate-400 hover:text-primary dark:hover:text-blue-400 hover:border-primary/50 hover:scale-110 active:scale-95 transition-all shadow-2xs"
            >
              <Mail size={18} />
            </a>
            <a 
              href={CONTACT.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn Profile"
              className="p-3 bg-white/80 dark:bg-slate-800/80 border border-gray-200/80 dark:border-slate-700/80 rounded-xl text-gray-600 dark:text-slate-400 hover:text-primary dark:hover:text-blue-400 hover:border-primary/50 hover:scale-110 active:scale-95 transition-all shadow-2xs"
            >
              <Globe size={18} />
            </a>
          </div>
        </div>
        
        <div className="mt-12 text-center text-gray-600 dark:text-slate-500 text-xs font-medium">
          <p>Built with curiosity, code, and continuous learning.</p>
        </div>
        </div>
      </div>
    </footer>
  );
};