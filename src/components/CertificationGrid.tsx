export const CertificationGrid = () => {
  const certs = [
    { name: 'IBM', logo: '/logos/ibm.png' },
    { name: 'DeepLearning.AI', logo: '/logos/deeplearning.png' },
    { name: 'Google', logo: '/logos/google.png' },
    { name: 'University of Michigan', logo: '/logos/michigan.png' },
    { name: 'IEEE', logo: '/logos/ieee.png' },
    { name: 'DIGISKILLS', logo: '/logos/digiskills.png' },
    { name: 'The University of Faisalabad', logo: '/logos/tuf.png' },
    { name: 'University of California Irvine', logo: '/logos/uci.png' },
    { name: 'LearnQuest', logo: '/logos/learnquest.png' },
    { name: 'University of Colarado', logo: '/logos/ucolorado.png' },
    { name: 'University of Pennsylvania', logo: '/logos/upennsylvynia.png' },
    { name: 'VLG', logo: '/logos/vlgsialkot.png' },
    { name: 'University of Sialkot', logo: '/logos/uskt.png' },
    { name: 'NAVTTC', logo: '/logos/navttc.png' },
    { name: 'National Volunteer Corps', logo: '/logos/nvc.png' },
    { name: 'Ignite', logo: '/logos/ignite.png' },
    { name: 'United Nations', logo: '/logos/uncc.png' },
    { name: 'Sololearn', logo: '/logos/sololearn.png' },
    { name: 'HP', logo: '/logos/hp.png' },
    
  ];

  const duplicatedCerts = [...certs, ...certs, ...certs];

  return (
    <div className="py-12 overflow-hidden relative w-full bg-[#EFEFEF]">
      {/* Inline keyframes style so it guarantees scrolling without tailwind config dependency */}
      <style>{`
        @keyframes customMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-custom-marquee {
          display: flex;
          width: max-content;
          animation: customMarquee 20s linear infinite;
        }
        .animate-custom-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <h3 className="text-center text-gray-500 mb-10 uppercase tracking-widest text-sm font-semibold">
        Certified & Affiliated With
      </h3>

      {/* Gradient Fading Edges */}
      <div className="absolute left-0 top-0 z-10 w-24 h-full bg-gradient-to-r from-[#EFEFEF] to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 z-10 w-24 h-full bg-gradient-to-l from-[#EFEFEF] to-transparent pointer-events-none"></div>

      {/* Scrolling Track */}
      <div className="animate-custom-marquee items-center gap-16">
        {duplicatedCerts.map((cert, index) => (
          <div 
            key={`${cert.name}-${index}`} 
            className="flex items-center justify-center transition-all duration-300 px-4"
          >
            <img 
              src={cert.logo} 
              alt={cert.name} 
              className="h-16 w-auto object-contain opacity-80 hover:opacity-100 hover:scale-125 transition-all duration-300 cursor-pointer" 
            />
          </div>
        ))}
      </div>
    </div>
  );
};