import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { CERTIFICATIONS_DATA } from '../data/certifications';
import { CertificationGrid } from '../components/CertificationGrid';

export const Certifications = () => {
  return (
    <section id="certifications" className="py-24 px-6 bg-surface relative border-t border-border">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-4 tracking-tight">Certification Vault</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-8 shadow-neon"></div>
          <p className="text-text-muted max-w-2xl mx-auto text-base md:text-lg">
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
              className={`bg-charcoal border ${cert.featured ? 'border-primary/40 shadow-[0_0_15px_rgba(139,92,246,0.05)]' : 'border-border'} p-6 rounded-xl hover:border-primary transition-all duration-300 group flex flex-col h-full relative`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-background rounded-lg border border-border group-hover:border-primary/50 transition-colors">
                  <Award className="text-primary w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-text-muted bg-surface px-3 py-1 rounded-full border border-border">
                  {cert.category}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-text-main mb-2 group-hover:text-primary transition-colors duration-300">
                {cert.title}
              </h3>
              
              <p className="text-text-muted text-sm flex-grow">
                Issued by <span className="text-text-main font-medium">{cert.issuer}</span>
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