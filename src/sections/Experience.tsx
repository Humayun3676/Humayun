import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import { EXPERIENCE_HISTORY } from '../data/experience';
import { EDUCATION_HISTORY } from '../data/education';

export const Experience = () => {
  return (
    <section id="experience" className="scroll-mt-24 lg:scroll-mt-0 py-12 lg:py-24 px-4 lg:px-6 relative bg-[#EFEFEF] dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-[1440px] w-full mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-slate-100 mb-4 tracking-tight">Experience & Education</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-8"></div>
          <p className="text-gray-600 dark:text-slate-300 max-w-2xl mx-auto text-base md:text-lg">
            My professional background and academic foundation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Experience Column */}
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Briefcase className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Professional Journey</h3>
            </div>
            
            <div className="border-l-2 border-gray-200 dark:border-slate-700 pl-8 space-y-12 ml-4">
              {EXPERIENCE_HISTORY.map((exp, index) => (
                <motion.div 
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[41px] top-1 w-5 h-5 bg-white dark:bg-slate-800 border-4 border-primary rounded-full group-hover:bg-primary transition-colors shadow-sm"></div>
                  
                  <div className="bg-white dark:bg-slate-800 dark:border dark:border-slate-700 rounded-2xl shadow-soft p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                    <span className="text-primary text-sm font-bold tracking-wider uppercase mb-1 block">
                      {exp.period} • {exp.type}
                    </span>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-1">{exp.role}</h4>
                    <h5 className="text-gray-600 dark:text-slate-300 font-medium mb-4">{exp.organization}</h5>
                    
                    <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                      {exp.confidential ? exp.publicDescription : exp.description}
                    </p>

                    {/* Skills Used */}
                    {exp.skills && exp.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/50">
                        {exp.skills.map((skill, sIndex) => (
                          <span key={sIndex} className="text-xs font-medium text-gray-600 dark:text-slate-300 bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="p-3 bg-blue-50 rounded-lg">
                <GraduationCap className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Academic Foundation</h3>
            </div>
            
            <div className="border-l-2 border-gray-200 dark:border-slate-700 pl-8 space-y-12 ml-4">
              {EDUCATION_HISTORY.map((edu, index) => (
                <motion.div 
                  key={edu.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[41px] top-1 w-5 h-5 bg-white dark:bg-slate-800 border-4 border-primary rounded-full group-hover:bg-primary transition-colors shadow-sm"></div>
                  
                  <div className="bg-white dark:bg-slate-800 dark:border dark:border-slate-700 rounded-2xl shadow-soft p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                    <span className="text-primary text-sm font-bold tracking-wider uppercase mb-1 block">
                      {edu.status}
                    </span>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-1">{edu.degree}</h4>
                    <h5 className="text-gray-600 dark:text-slate-300 font-medium">{edu.institution}</h5>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};