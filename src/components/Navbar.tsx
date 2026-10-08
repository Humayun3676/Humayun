import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar = ({ onOpenContact }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Research', href: '#research' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certifications', href: '#certifications' },
  ];

  return (
    <>
      <nav className="fixed left-0 top-0 h-full w-16 md:w-20 bg-white border-r border-gray-200 z-50 flex flex-col items-center py-6 justify-between">
        
        {/* Top: Hamburger Menu Toggle */}
        <button 
          className="text-gray-600 hover:text-gray-900 transition-colors p-2"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={28} strokeWidth={1.5} />
        </button>

        {/* Bottom: Profile Picture Logo */}
        <a href="/" className="relative group">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full p-[2px] border border-slate-200 group-hover:border-gray-400 transition-all duration-300">
            <img 
              src="/humayun.jpg" 
              alt="Humayun Mirza" 
              className="w-full h-full rounded-full object-cover grayscale contrast-125"
            />
          </div>
        </a>
      </nav>

      {/* Drawer Overlay & Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[51]"
            />
            
            {/* Sliding Drawer */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-72 bg-white shadow-soft z-[52] flex flex-col"
            >
              <div className="p-6 flex justify-between items-center border-b border-gray-100">
                <span className="font-bold text-gray-900 text-lg tracking-tight">Navigation</span>
                <button onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-gray-900 p-2">
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col p-6 space-y-2 flex-grow">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-600 font-medium hover:text-primary hover:bg-background px-4 py-3 rounded-xl transition-all"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="p-6 border-t border-gray-100">
                <button onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }} className="w-full px-5 py-4 text-center bg-primary text-white rounded-xl font-bold hover:bg-primary-hover shadow-soft transition-all">
                  Contact Now
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};