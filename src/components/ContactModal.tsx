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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          
          {/* Centering Flexbox Wrapper */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            
            {/* Modal */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-soft overflow-hidden pointer-events-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 tracking-tight">LET'S CONNECT</h3>
                  <button onClick={onClose} className="text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors bg-slate-50 dark:bg-slate-700 p-1 rounded-lg border border-gray-200 dark:border-slate-600">
                    <X size={20} />
                  </button>
                </div>
                
                <p className="text-gray-600 dark:text-slate-300 mb-8 text-sm leading-relaxed">
                  Have a project, opportunity, collaboration, or idea? Reach out directly through any of these platforms.
                </p>

                <div className="flex flex-col gap-4">
                  <a 
                    href={getWhatsAppLink()} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-slate-600 rounded-xl text-gray-900 dark:text-slate-100 transition-colors border border-gray-100 dark:border-slate-600 hover:border-primary/50 group"
                  >
                    <Phone className="text-primary group-hover:scale-110 transition-transform" size={20} />
                    <span className="font-semibold">Chat on WhatsApp</span>
                  </a>

                  <a 
                    href={getEmailLink()} 
                    className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-slate-600 rounded-xl text-gray-900 dark:text-slate-100 transition-colors border border-gray-100 dark:border-slate-600 hover:border-primary/50 group"
                  >
                    <Mail className="text-primary group-hover:scale-110 transition-transform" size={20} />
                    <span className="font-semibold">Email Me</span>
                  </a>

                  <a 
                    href={CONTACT.linkedin}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-slate-600 rounded-xl text-gray-900 dark:text-slate-100 transition-colors border border-gray-100 dark:border-slate-600 hover:border-primary/50 group"
                  >
                    <Globe className="text-primary group-hover:scale-110 transition-transform" size={20} />
                    <span className="font-semibold">Connect on LinkedIn</span>
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