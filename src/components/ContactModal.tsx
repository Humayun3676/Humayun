import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, Globe, X } from 'lucide-react';
import { getWhatsAppLink, getEmailLink, CONTACT } from '../config/contact';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />
          
          {/* Centering Flexbox Wrapper */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            
            {/* Modal */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-surface border border-border rounded-xl shadow-glass overflow-hidden pointer-events-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-text-main tracking-tight">LET'S CONNECT</h3>
                  <button onClick={onClose} className="text-text-muted hover:text-white transition-colors bg-charcoal p-1 rounded-md border border-border">
                    <X size={20} />
                  </button>
                </div>
                
                <p className="text-text-muted mb-8 text-sm leading-relaxed">
                  Have a project, opportunity, collaboration, or idea? Reach out directly through any of these platforms.
                </p>

                <div className="flex flex-col gap-4">
                  <a 
                    href={getWhatsAppLink()} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-charcoal hover:bg-border rounded-lg text-text-main transition-colors border border-transparent hover:border-primary/50 group"
                  >
                    <Phone className="text-primary group-hover:scale-110 transition-transform" size={20} />
                    <span className="font-medium">Chat on WhatsApp</span>
                  </a>

                  <a 
                    href={getEmailLink()} 
                    className="flex items-center gap-3 p-4 bg-charcoal hover:bg-border rounded-lg text-text-main transition-colors border border-transparent hover:border-primary/50 group"
                  >
                    <Mail className="text-primary group-hover:scale-110 transition-transform" size={20} />
                    <span className="font-medium">Email Me</span>
                  </a>

                  <a 
                    href={CONTACT.linkedin}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-charcoal hover:bg-border rounded-lg text-text-main transition-colors border border-transparent hover:border-primary/50 group"
                  >
                    <Globe className="text-primary group-hover:scale-110 transition-transform" size={20} />
                    <span className="font-medium">Connect on LinkedIn</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};