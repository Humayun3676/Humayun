import { motion } from 'framer-motion';
import { Phone, Mail, Globe } from 'lucide-react';
import { CONTACT, getWhatsAppLink, getEmailLink } from '../config/contact';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer = ({ onOpenContact }: FooterProps) => {
  return (
    <footer className="bg-[#EFEFEF] border-t border-gray-200 pt-24 pb-12 px-6 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            LET'S BUILD SOMETHING <span className="text-primary">INTELLIGENT.</span>
          </h2>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
            Have a project, opportunity, research idea, collaboration, or simply want to connect?
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button 
              onClick={onOpenContact}
              className="w-full sm:w-auto px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl transition-all shadow-soft font-bold flex items-center justify-center"
            >
              Contact Now
            </button>
            <a 
              href={CONTACT.linkedin}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-3 bg-white border-2 border-gray-200 hover:border-primary text-gray-900 hover:text-primary rounded-xl transition-all shadow-sm font-bold flex items-center justify-center gap-2 group"
            >
              <Globe className="text-primary group-hover:scale-110 transition-transform" size={20} /> LinkedIn
            </a>
          </div>
        </motion.div>

        <div className="border-t border-gray-200 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-left">
            <h3 className="text-xl font-bold text-gray-900 tracking-wider mb-1">
              HUMAYUN MIRZA
            </h3>
            <p className="text-gray-600 text-xs uppercase tracking-widest">
              Software Engineer • AI/ML Enthusiast
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a href={getWhatsAppLink()} target="_blank" rel="noreferrer" className="p-2 bg-slate-50 border border-gray-200 rounded-lg text-gray-600 hover:text-primary hover:border-primary/50 transition-all">
              <Phone size={18} />
            </a>
            <a href={getEmailLink()} className="p-2 bg-slate-50 border border-gray-200 rounded-lg text-gray-600 hover:text-primary hover:border-primary/50 transition-all">
              <Mail size={18} />
            </a>
            <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="p-2 bg-slate-50 border border-gray-200 rounded-lg text-gray-600 hover:text-primary hover:border-primary/50 transition-all">
              <Globe size={18} />
            </a>
          </div>
        </div>
        
        <div className="mt-12 text-center text-gray-500 text-sm font-medium">
          <p>Built with curiosity, code, and continuous learning.</p>
        </div>
      </div>
    </footer>
  );
};