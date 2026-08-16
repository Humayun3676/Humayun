import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar = ({ onOpenContact }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Research', href: '#research' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certifications', href: '#certifications' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-glass' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Profile Picture Logo */}
        <a href="/" className="relative group">
          <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-r from-primary to-primary-hover group-hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-300">
            {/* MAKE SURE THIS src MATCHES YOUR FILE NAME IN THE PUBLIC FOLDER */}
            <img 
              src="/profile.png" 
              alt="Humayun Mirza" 
              className="w-full h-full rounded-full object-cover border-2 border-background"
            />
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-text-muted hover:text-white transition-colors">
              {link.name}
            </a>
          ))}
          <button onClick={onOpenContact} className="px-5 py-2 text-sm font-medium bg-primary/10 text-primary border border-primary/30 rounded-md hover:bg-primary hover:text-white transition-all shadow-neon">
            Contact Now
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-text-main"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-surface border-b border-border md:hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-text-muted hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <button onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }} className="mt-4 px-5 py-3 w-full text-center bg-primary text-white rounded-md font-medium">
                Contact Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};