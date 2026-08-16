import { motion } from 'framer-motion';
import { FolderGit2, Star } from 'lucide-react';
import { PROJECTS_DATA } from '../data/projects';

export const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6 bg-background relative border-t border-border">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-4 tracking-tight">Featured Projects</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-8 shadow-neon"></div>
          <p className="text-text-muted max-w-2xl mx-auto text-base md:text-lg">
            A showcase of my technical journey, from core programming fundamentals to advanced artificial intelligence and full-stack applications.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS_DATA.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-surface border ${project.featured ? 'border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.1)]' : 'border-border'} p-8 rounded-xl hover:border-primary/80 transition-all duration-300 group flex flex-col h-full relative overflow-hidden`}
            >
              {/* Top Row: Icon & Featured Star */}
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-charcoal rounded-lg border border-border group-hover:border-primary/50 transition-colors">
                  <FolderGit2 className="text-primary w-6 h-6" />
                </div>
                {project.featured && (
                  <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full border border-primary/30">
                    <Star className="w-3 h-3 text-primary fill-primary" />
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Featured</span>
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-text-main mb-2 group-hover:text-primary transition-colors duration-300">
                {project.title}
              </h3>
              
              <p className="text-text-muted text-sm mb-6 flex-grow leading-relaxed">
                {project.description}
              </p>

              {/* Technologies Tags */}
              <div className="mt-auto pt-6 border-t border-border/50 flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1 bg-charcoal border border-border rounded-md text-xs text-text-muted font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};