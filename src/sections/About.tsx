import { Code, BrainCircuit, FlaskConical, Laptop, Blocks, Users } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { InteractiveCard } from '../components/InteractiveCard';
import { ScrollReveal } from '../components/ScrollReveal';

export const About = () => {
  const identities = [
    {
      title: "Software Engineer",
      icon: <Code className="text-primary w-8 h-8 mb-4" />,
      description: "Architecting and developing robust software solutions, APIs, and scalable applications with modern engineering principles."
    },
    {
      title: "AI / ML Explorer",
      icon: <BrainCircuit className="text-primary w-8 h-8 mb-4" />,
      description: "Building intelligent systems utilizing artificial intelligence, machine learning, and deep learning technologies."
    },
    {
      title: "Researcher",
      icon: <FlaskConical className="text-primary w-8 h-8 mb-4" />,
      description: "Conducting applied research involving real-world datasets, computer vision, and predictive AI models."
    },
    {
      title: "Developer",
      icon: <Laptop className="text-primary w-8 h-8 mb-4" />,
      description: "Crafting responsive web, desktop, and mobile-ready applications with intuitive user experiences."
    },
    {
      title: "Builder",
      icon: <Blocks className="text-primary w-8 h-8 mb-4" />,
      description: "Transforming complex ideas and theoretical concepts into practical, user-centric software products."
    },
    {
      title: "Leader",
      icon: <Users className="text-primary w-8 h-8 mb-4" />,
      description: "Guiding initiatives within IEEE, student organizations, and volunteer community efforts to drive impact."
    }
  ];

  return (
    <section id="about" className="scroll-mt-24 lg:scroll-mt-0 py-12 lg:py-24 px-4 lg:px-6 relative bg-[#EFEFEF] dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-[1440px] w-full mx-auto">
        
        {/* Section Header */}
        <SectionHeader 
          eyebrow="01 — The Journey"
          title="The Journey"
          description="My path began with programming fundamentals and evolved through modern software development into the realm of Artificial Intelligence. Today, I focus on bridging the gap between theoretical AI models and real-world application engineering, continuously learning and building along the way."
        />

        {/* Identity Cards Grid with Interactive Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {identities.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.08}>
              <InteractiveCard className="p-8 cursor-default h-full">
                <div className="group-hover:scale-110 transition-transform duration-300 origin-left">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-3 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed">
                  {item.description}
                </p>
              </InteractiveCard>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};