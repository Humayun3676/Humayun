import { Terminal, Cpu, Layers, Globe } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { InteractiveCard } from '../components/InteractiveCard';
import { ScrollReveal } from '../components/ScrollReveal';

export const Skills = () => {
  const skillCategories = [
    {
      title: "AI & Machine Learning",
      icon: <Cpu className="text-primary w-6 h-6" />,
      skills: ["Artificial Intelligence", "Machine Learning", "Deep Learning", "Computer Vision", "Natural Language Processing", "Prediction Systems", "Classification"]
    },
    {
      title: "Frameworks & Libraries",
      icon: <Layers className="text-primary w-6 h-6" />,
      skills: ["OpenCV", "PyTorch", "TensorFlow", "Keras", "DeepFace", "Pandas", "Scikit-learn", "NumPy", "Flask", "React.js"]
    },
    {
      title: "Programming Languages",
      icon: <Terminal className="text-primary w-6 h-6" />,
      skills: ["Python", "C++", "C#", "Java", "JavaScript", "TypeScript", "SQL"]
    },
    {
      title: "Web & Architecture",
      icon: <Globe className="text-primary w-6 h-6" />,
      skills: ["HTML5", "CSS3", "Tailwind CSS", "Node.js", "Bubble.io", "API Integration", "Database Modeling"]
    }
  ];

  return (
    <section id="skills" className="scroll-mt-24 lg:scroll-mt-0 py-12 lg:py-24 px-4 lg:px-6 bg-[#EFEFEF] dark:bg-slate-900 relative transition-colors duration-300">
      {/* Subtle Background radial bloom */}
      <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-primary/5 dark:bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-[1440px] w-full mx-auto relative z-10">
        
        {/* Section Header */}
        <SectionHeader 
          eyebrow="02 — Technical Arsenal"
          title="Technical Arsenal"
          description="A comprehensive map of the technologies, languages, and frameworks I use to build intelligent applications and robust software systems."
        />

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <InteractiveCard className="p-8 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/60 text-primary rounded-xl border border-blue-100 dark:border-blue-900/40">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 tracking-tight">
                    {category.title}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="px-3.5 py-1.5 bg-slate-100/90 dark:bg-slate-700/60 rounded-full text-xs md:text-sm font-medium text-gray-700 dark:text-slate-300 hover:text-primary dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:scale-105 hover:border-primary/40 border border-slate-200/50 dark:border-slate-700/50 transition-all duration-200 cursor-default shadow-xs"
                    >
                      {skill}
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