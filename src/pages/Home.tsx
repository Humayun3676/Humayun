import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Skills } from '../sections/Skills';
import { Projects } from '../sections/Projects';
import { Research } from '../sections/Research';
import { Experience } from '../sections/Experience';
import { Certifications } from '../sections/Certifications';
import { Footer } from '../components/Footer';
import { ContactModal } from '../components/ContactModal';

interface HomeProps {
  onViewResume: () => void;
}

export const Home = ({ onViewResume }: HomeProps) => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="bg-background min-h-screen text-text-main font-sans">
      <Navbar onOpenContact={() => setIsContactOpen(true)} />
      
      <main>
        <Hero onViewResume={onViewResume} />
        <About />
        <Skills />
        <Projects />
        <Research />
        <Experience />
        <Certifications />
      </main>

      <Footer onOpenContact={() => setIsContactOpen(true)} />
      
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </div>
  );
};