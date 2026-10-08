import { motion } from 'framer-motion';
import { Code, BrainCircuit, FlaskConical, Laptop, Blocks, Users } from 'lucide-react';

export const About = () => {
  const identities = [
    {
      title: "Software Engineer",
      icon: <Code className="text-primary w-8 h-8 mb-4" />,
      description: "Architecting and developing robust software solutions, APIs, and scalable applications with modern engineering principles."
    },
    {
      title: "AI / ML Explorer",
      icon: <BrainCircuit className="text-primary w-8 h-8 mb-4" />,
      description: "Building intelligent systems utilizing artificial intelligence, machine learning, and deep learning technologies."
    },
    {
      title: "Researcher",
      icon: <FlaskConical className="text-primary w-8 h-8 mb-4" />,
      description: "Conducting applied research involving real-world datasets, computer vision, and predictive AI models."
    },
    {
      title: "Developer",
      icon: <Laptop className="text-primary w-8 h-8 mb-4" />,
      description: "Crafting responsive web, desktop, and mobile-ready applications with intuitive user experiences."
    },
    {
      title: "Builder",
      icon: <Blocks className="text-primary w-8 h-8 mb-4" />,
      description: "Transforming complex ideas and theoretical concepts into practical, user-centric software products."
    },
    {
      title: "Leader",
      icon: <Users className="text-primary w-8 h-8 mb-4" />,
      description: "Guiding initiatives within IEEE, student organizations, and volunteer community efforts to drive impact."
    }
  ];

  return (
    <section id="about" className="py-12 lg:py-24 px-4 lg:px-6 relative bg-[#EFEFEF]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">The Journey</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-8"></div>
          <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            My path began with programming fundamentals and evolved through modern software development into the realm of Artificial Intelligence. Today, I focus on bridging the gap between theoretical AI models and real-world application engineering, continuously learning and building along the way.
          </p>
        </motion.div>

        {/* Identity Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {identities.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl hover:shadow-lg transition-all duration-300 group shadow-soft hover:-translate-y-1 cursor-default relative overflow-hidden"
            >
              
              <div className="relative z-10">
                <div className="group-hover:scale-110 transition-all duration-300 origin-left">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};