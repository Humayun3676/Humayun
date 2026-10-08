import { motion } from 'framer-motion';
import { FolderGit2, Star } from 'lucide-react';
import { PROJECTS_DATA } from '../data/projects';

export const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6 relative bg-[#EFEFEF]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Featured Projects</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-8"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
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
              className={`bg-white rounded-2xl shadow-soft ${project.featured ? 'ring-2 ring-primary ring-offset-2 ring-offset-slate-50' : ''} p-8 hover:-translate-y-2 hover:shadow-lg transition-all duration-300 group flex flex-col h-full relative overflow-hidden`}
            >
              {/* Top Row: Icon & Featured Star */}
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-blue-50 text-primary rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                  <FolderGit2 className="w-6 h-6" />
                </div>
                {project.featured && (
                  <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full text-primary">
                    <Star className="w-3 h-3 fill-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Featured</span>
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                {project.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">
                {project.description}
              </p>

              {/* Technologies Tags */}
              <div className="mt-auto pt-6 border-t border-gray-100 flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1 bg-gray-100 rounded-lg text-xs text-gray-600 font-medium">
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