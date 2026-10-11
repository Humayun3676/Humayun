import { BookOpen } from 'lucide-react';
import { RESEARCH_DATA } from '../data/research';
import { SectionHeader } from '../components/SectionHeader';
import { InteractiveCard } from '../components/InteractiveCard';
import { ScrollReveal } from '../components/ScrollReveal';

export const Research = () => {
  return (
    <section id="research" className="scroll-mt-24 lg:scroll-mt-0 py-12 lg:py-24 px-4 lg:px-6 relative bg-[#EFEFEF] dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-[1440px] w-full mx-auto">
        
        {/* Section Header */}
        <SectionHeader 
          eyebrow="04 — Research"
          title="Research & Investigations"
          description="Academic contributions, ongoing investigations, and published papers in the fields of Artificial Intelligence and Computer Vision."
        />

        {/* Research Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {RESEARCH_DATA.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 0.1}>
              <InteractiveCard className="p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/60 rounded-xl text-primary border border-blue-100 dark:border-blue-900/40 group-hover:scale-110 transition-transform duration-300">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <span className={`text-xs font-bold tracking-wider uppercase block mb-1 ${item.status === 'Completed' ? 'text-emerald-600 dark:text-emerald-400' : 'text-primary'}`}>
                      {item.status}
                    </span>
                    <span className="text-gray-600 dark:text-slate-300 text-sm font-medium">
                      {item.area}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-4 group-hover:text-primary transition-colors duration-300 tracking-tight">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                  {item.description}
                </p>

                {/* Technologies Tags */}
                <div className="mt-auto pt-6 border-t border-gray-100 dark:border-slate-700/80 flex flex-wrap gap-2">
                  {item.technologies.map((tech, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-slate-100/90 dark:bg-slate-700/60 rounded-md text-xs text-gray-700 dark:text-slate-300 font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </InteractiveCard>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};