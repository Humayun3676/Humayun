import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { RESEARCH_DATA } from '../data/research';

export const Research = () => {
  return (
    <section id="research" className="scroll-mt-24 lg:scroll-mt-0 py-12 lg:py-24 px-4 lg:px-6 relative bg-[#EFEFEF]">
      <div className="max-w-[1440px] w-full mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Research & Investigations</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-8"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
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
              className="bg-white rounded-2xl shadow-soft p-8 hover:-translate-y-2 hover:shadow-lg transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-50 rounded-lg text-primary group-hover:scale-110 transition-transform">
                  <BookOpen size={24} />
                </div>
                <div>
                  <span className={`text-xs font-bold tracking-wider uppercase block mb-1 ${item.status === 'Completed' ? 'text-green-500' : 'text-primary'}`}>
                    {item.status}
                  </span>
                  <span className="text-gray-600 text-sm font-medium">
                    {item.area}
                  </span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300">
                {item.title}
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                {item.description}
              </p>

              {/* Technologies Tags */}
              <div className="mt-auto pt-6 border-t border-border/50 flex flex-wrap gap-2">
                {item.technologies.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1 bg-gray-100 rounded-md text-xs text-gray-600">
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