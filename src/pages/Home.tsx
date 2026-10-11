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
import { ScrollProgressBar } from '../components/ScrollProgressBar';
import { CustomCursor } from '../components/CustomCursor';

interface HomeProps {
  onViewResume: () => void;
}

export const Home = ({ onViewResume }: HomeProps) => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="bg-[#EFEFEF] dark:bg-slate-900 min-h-screen text-text-main dark:text-slate-200 font-sans flex flex-col lg:flex-row w-full overflow-x-hidden transition-colors duration-300 relative">
      <ScrollProgressBar />
      <CustomCursor />

      {/* Subtle Noise Texture Overlay */}
      <div className="bg-noise fixed inset-0 pointer-events-none z-40 opacity-40 mix-blend-overlay" />

      {/* Atmospheric Background Ambient Blobs */}
      <div className="fixed top-0 left-1/3 w-[800px] h-[600px] bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[700px] h-[500px] bg-indigo-500/5 dark:bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <Navbar onOpenContact={() => setIsContactOpen(true)} />
      
      <div className="flex-1 mt-16 lg:mt-0 lg:ml-20 transition-all duration-300 w-full lg:w-[calc(100%-5rem)] relative z-10">
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