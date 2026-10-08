import { motion } from 'framer-motion';
import { Terminal, Cpu, Layers, Globe } from 'lucide-react';

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
    <section id="skills" className="scroll-mt-24 lg:scroll-mt-0 py-12 lg:py-24 px-4 lg:px-6 bg-[#EFEFEF] relative">
      {/* Background decoration */}
      <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-[1440px] w-full mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Technical Arsenal</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-8"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            A comprehensive map of the technologies, languages, and frameworks I use to build intelligent applications and robust software systems.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-soft p-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-50 rounded-lg">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600 hover:text-primary hover:bg-blue-50 hover:scale-105 transition-all duration-300 cursor-default"
                  >
                    {skill}
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