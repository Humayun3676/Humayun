import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { RESEARCH_DATA } from '../data/research';

export const Research = () => {
  return (
    <section id="research" className="py-24 px-6 bg-surface relative border-t border-border">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-4 tracking-tight">Research & Investigations</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-8 shadow-neon"></div>
          <p className="text-text-muted max-w-2xl mx-auto text-base md:text-lg">
            Academic contributions, ongoing investigations, and published papers in the fields of Artificial Intelligence and Computer Vision.
          </p>
        </motion.div>

        {/* Research Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {RESEARCH_DATA.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-charcoal border border-border p-8 rounded-xl hover:border-primary/60 transition-all duration-300 group flex flex-col h-full relative overflow-hidden shadow-glass"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg border border-primary/30 text-primary group-hover:scale-110 transition-transform">
                  <BookOpen size={24} />
                </div>
                <div>
                  <span className={`text-xs font-bold tracking-wider uppercase block mb-1 ${item.status === 'Completed' ? 'text-green-400' : 'text-primary'}`}>
                    {item.status}
                  </span>
                  <span className="text-text-muted text-sm font-medium">
                    {item.area}
                  </span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-text-main mb-4 group-hover:text-primary transition-colors duration-300">
                {item.title}
              </h3>
              
              <p className="text-text-muted mb-8 flex-grow leading-relaxed">
                {item.description}
              </p>

              {/* Technologies Tags */}
              <div className="mt-auto pt-6 border-t border-border/50 flex flex-wrap gap-2">
                {item.technologies.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1 bg-background border border-border rounded-md text-xs text-text-muted">
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