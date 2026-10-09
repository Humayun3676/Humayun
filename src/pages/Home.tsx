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
    <div className="bg-[#EFEFEF] dark:bg-slate-900 min-h-screen text-text-main dark:text-slate-200 font-sans flex flex-col lg:flex-row w-full overflow-x-hidden transition-colors duration-300">
      <Navbar onOpenContact={() => setIsContactOpen(true)} />
      
      <div className="flex-1 mt-16 lg:mt-0 lg:ml-20 transition-all duration-300 w-full lg:w-[calc(100%-5rem)]">
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