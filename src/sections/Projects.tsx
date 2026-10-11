import { FolderGit2, Star } from 'lucide-react';
import { PROJECTS_DATA } from '../data/projects';
import { SectionHeader } from '../components/SectionHeader';
import { InteractiveCard } from '../components/InteractiveCard';
import { ScrollReveal } from '../components/ScrollReveal';

export const Projects = () => {
  return (
    <section id="projects" className="scroll-mt-24 lg:scroll-mt-0 py-12 lg:py-24 px-4 lg:px-6 relative bg-[#EFEFEF] dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-[1440px] w-full mx-auto">
        
        {/* Section Header */}
        <SectionHeader 
          eyebrow="03 — Featured Projects"
          title="Featured Projects"
          description="A showcase of my technical journey, from core programming fundamentals to advanced artificial intelligence and full-stack applications."
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS_DATA.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.08}>
              <InteractiveCard isFeatured={project.featured} className="p-8 h-full">
                {/* Top Row: Icon & Featured Star */}
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/60 text-primary rounded-xl group-hover:bg-primary group-hover:text-white transition-colors duration-300 border border-blue-100 dark:border-blue-900/40">
                    <FolderGit2 className="w-6 h-6" />
                  </div>
                  {project.featured && (
                    <div className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/70 border border-blue-200/60 dark:border-blue-800/60 px-3 py-1 rounded-full text-primary dark:text-blue-400">
                      <Star className="w-3.5 h-3.5 fill-primary dark:fill-blue-400" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Featured</span>
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-2 group-hover:text-primary transition-colors duration-300 tracking-tight">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies Tags */}
                <div className="mt-auto pt-6 border-t border-gray-100 dark:border-slate-700/80 flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="px-2.5 py-1 bg-slate-100/90 dark:bg-slate-700/60 rounded-md text-xs text-gray-700 dark:text-slate-300 font-medium hover:text-primary dark:hover:text-blue-400 transition-colors"
                    >
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