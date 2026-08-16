import { motion } from 'framer-motion';
import { Phone, Mail, Globe } from 'lucide-react';
import { CONTACT, getWhatsAppLink, getEmailLink } from '../config/contact';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer = ({ onOpenContact }: FooterProps) => {
  return (
    <footer className="bg-background border-t border-border pt-24 pb-12 px-6 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-6 tracking-tight">
            LET'S BUILD SOMETHING <span className="text-primary">INTELLIGENT.</span>
          </h2>
          <p className="text-text-muted text-lg mb-10 max-w-2xl mx-auto">
            Have a project, opportunity, research idea, collaboration, or simply want to connect?
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button 
              onClick={onOpenContact}
              className="w-full sm:w-auto px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-md transition-all shadow-neon font-medium"
            >
              Contact Now
            </button>
            <a 
              href={CONTACT.linkedin}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-3 bg-surface border border-border hover:border-primary text-text-main rounded-md transition-all font-medium flex items-center justify-center gap-2"
            >
              <Globe className="text-primary group-hover:scale-110 transition-transform" size={20} /> LinkedIn
            </a>
          </div>
        </motion.div>

        <div className="border-t border-border/50 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-left">
            <h3 className="text-xl font-bold text-text-main tracking-wider mb-1">
              HUMAYUN MIRZA
            </h3>
            <p className="text-text-muted text-xs uppercase tracking-widest">
              Software Engineer • AI/ML Enthusiast
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a href={getWhatsAppLink()} target="_blank" rel="noreferrer" className="p-2 bg-charcoal border border-border rounded-md text-text-muted hover:text-primary hover:border-primary/50 transition-all">
              <Phone size={18} />
            </a>
            <a href={getEmailLink()} className="p-2 bg-charcoal border border-border rounded-md text-text-muted hover:text-primary hover:border-primary/50 transition-all">
              <Mail size={18} />
            </a>
            <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="p-2 bg-charcoal border border-border rounded-md text-text-muted hover:text-primary hover:border-primary/50 transition-all">
              <Globe size={18} />
            </a>
          </div>
        </div>
        
        <div className="mt-12 text-center text-text-dim text-sm">
          <p>Built with curiosity, code, and continuous learning.</p>
        </div>
      </div>
    </footer>
  );
};