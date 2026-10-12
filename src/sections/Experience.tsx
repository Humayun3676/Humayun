import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import { EXPERIENCE_HISTORY } from '../data/experience';
import { EDUCATION_HISTORY } from '../data/education';
import { SectionHeader } from '../components/SectionHeader';
import { InteractiveCard } from '../components/InteractiveCard';

export const Experience = () => {
  const easeTransition = [0.22, 1, 0.36, 1] as const;

  return (
    <section id="experience" className="scroll-mt-24 lg:scroll-mt-0 py-12 lg:py-24 px-4 lg:px-6 relative bg-[#EFEFEF] dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-[1440px] w-full mx-auto">
        
        {/* Section Header */}
        <SectionHeader 
          eyebrow="05 — Experience"
          title="Experience & Education"
          description="My professional background and academic foundation."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Experience Column */}
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/60 text-primary rounded-xl border border-blue-100 dark:border-blue-900/40">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100 tracking-tight">
                Professional Journey
              </h3>
            </div>
            
            <div className="relative pl-8 space-y-10 ml-4">
              {/* Vertical Animated Line */}
              <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-slate-200 dark:bg-slate-700/80" />
              <motion.div 
                initial={false}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: easeTransition }}
                className="absolute left-0 top-3 bottom-3 w-[2px] bg-gradient-to-b from-blue-600 via-primary to-indigo-500 origin-top shadow-[0_0_8px_rgba(37,99,235,0.4)]"
              />

              {EXPERIENCE_HISTORY.map((exp, index) => (
                <motion.div 
                  key={exp.id}
                  initial={false}
                  whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: easeTransition }}
                  className="relative group"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[41px] top-4 w-5 h-5 bg-white dark:bg-slate-900 border-4 border-primary rounded-full group-hover:scale-125 group-hover:shadow-[0_0_12px_rgba(37,99,235,0.6)] transition-all duration-300 z-10"></div>
                  
                  <InteractiveCard className="p-6">
                    <span className="text-primary text-xs font-bold tracking-wider uppercase mb-1 block">
                      {exp.period} • {exp.type}
                    </span>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-1 tracking-tight">
                      {exp.role}
                    </h4>
                    <h5 className="text-gray-600 dark:text-slate-300 font-medium text-sm mb-4">
                      {exp.organization}
                    </h5>
                    
                    <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                      {exp.confidential ? exp.publicDescription : exp.description}
                    </p>

                    {/* Skills Used */}
                    {exp.skills && exp.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/80">
                        {exp.skills.map((skill, sIndex) => (
                          <span key={sIndex} className="text-xs font-medium text-gray-700 dark:text-slate-300 bg-slate-100/90 dark:bg-slate-700/60 px-2.5 py-1 rounded-md">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </InteractiveCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/60 text-primary rounded-xl border border-blue-100 dark:border-blue-900/40">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100 tracking-tight">
                Academic Foundation
              </h3>
            </div>
            
            <div className="relative pl-8 space-y-10 ml-4">
              {/* Vertical Animated Line */}
              <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-slate-200 dark:bg-slate-700/80" />
              <motion.div 
                initial={false}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: easeTransition }}
                className="absolute left-0 top-3 bottom-3 w-[2px] bg-gradient-to-b from-blue-600 via-primary to-indigo-500 origin-top shadow-[0_0_8px_rgba(37,99,235,0.4)]"
              />

              {EDUCATION_HISTORY.map((edu, index) => (
                <motion.div 
                  key={edu.id}
                  initial={false}
                  whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: easeTransition }}
                  className="relative group"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[41px] top-4 w-5 h-5 bg-white dark:bg-slate-900 border-4 border-primary rounded-full group-hover:scale-125 group-hover:shadow-[0_0_12px_rgba(37,99,235,0.6)] transition-all duration-300 z-10"></div>
                  
                  <InteractiveCard className="p-6">
                    <span className="text-primary text-xs font-bold tracking-wider uppercase mb-1 block">
                      {edu.status}
                    </span>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-1 tracking-tight">
                      {edu.degree}
                    </h4>
                    <h5 className="text-gray-600 dark:text-slate-300 font-medium text-sm">
                      {edu.institution}
                    </h5>
                  </InteractiveCard>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};