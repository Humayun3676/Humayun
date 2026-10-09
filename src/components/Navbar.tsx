import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar = ({ onOpenContact }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Research', href: '#research' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certifications', href: '#certifications' },
  ];

  return (
    <>
      <nav className="fixed left-0 top-0 w-full lg:w-20 h-16 lg:h-full bg-white dark:bg-slate-900 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-slate-800 z-50 transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto w-full h-full flex flex-row lg:flex-col items-center px-4 lg:px-0 py-0 lg:py-6 justify-between">
        
        {/* Top: Hamburger Menu Toggle */}
        <button 
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors p-2"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={28} strokeWidth={1.5} />
        </button>

        {/* Bottom: Toggle & Profile Picture */}
        <div className="flex flex-row lg:flex-col items-center gap-3 lg:gap-4">
          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <a href="/" className="relative group">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full p-[2px] border border-slate-200 dark:border-slate-700 group-hover:border-gray-400 dark:group-hover:border-slate-500 transition-all duration-300">
              <img 
                src="/profile.png" 
                alt="Humayun Mirza" 
                className="w-full h-full rounded-full object-cover grayscale contrast-125"
              />
            </div>
          </a>
        </div>
        </div>
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
                className="fixed top-0 left-0 h-full w-72 bg-white dark:bg-slate-900 shadow-soft z-[52] flex flex-col"
              >
              <div className="p-6 flex justify-between items-center border-b border-gray-100 dark:border-slate-800">
                <span className="font-bold text-gray-900 dark:text-slate-100 text-lg tracking-tight">Navigation</span>
                <button onClick={() => setMobileMenuOpen(false)} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-2">
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col p-6 space-y-2 flex-grow">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-600 dark:text-slate-300 font-medium hover:text-primary dark:hover:text-primary hover:bg-background dark:hover:bg-slate-800 px-4 py-3 rounded-xl transition-all"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="p-6 border-t border-gray-100 dark:border-slate-800">
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