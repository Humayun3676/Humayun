import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { CERTIFICATIONS_DATA } from '../data/certifications';
import { CertificationGrid } from '../components/CertificationGrid';

export const Certifications = () => {
  return (
    <section id="certifications" className="scroll-mt-24 lg:scroll-mt-0 py-12 lg:py-24 px-4 lg:px-6 relative bg-[#EFEFEF] dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-[1440px] w-full mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-slate-100 mb-4 tracking-tight">Certification Vault</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-8"></div>
          <p className="text-gray-600 dark:text-slate-300 max-w-2xl mx-auto text-base md:text-lg">
            A verified archive of my professional credentials, continuous learning, and specialized training in software engineering and artificial intelligence.
          </p>
        </motion.div>

        {/* Certifications Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {CERTIFICATIONS_DATA.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white dark:bg-slate-800 dark:border dark:border-slate-700 rounded-2xl shadow-soft ${cert.featured ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''} p-6 hover:-translate-y-2 hover:shadow-lg transition-all duration-300 group flex flex-col h-full relative`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-primary transition-colors">
                  <Award className="text-primary group-hover:text-white w-6 h-6 transition-colors" />
                </div>
                <span className="text-xs font-bold text-primary bg-blue-50 px-3 py-1 rounded-full">
                  {cert.category}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-2 group-hover:text-primary transition-colors duration-300">
                {cert.title}
              </h3>
              
              <p className="text-gray-600 dark:text-slate-400 text-sm flex-grow">
                Issued by <span className="text-gray-900 dark:text-slate-200 font-medium">{cert.issuer}</span>
              </p>
            </motion.div>
          ))}
        </div>

        {/* Logo Grid Integration */}
        <CertificationGrid />

      </div>
    </section>
  );
};