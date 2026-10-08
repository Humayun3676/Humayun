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
    <div className="bg-[#EFEFEF] min-h-screen text-text-main font-sans flex">
      <Navbar onOpenContact={() => setIsContactOpen(true)} />
      
      <div className="flex-1 md:ml-20 transition-all duration-300">
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
      </div>
      
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </div>
  );
};