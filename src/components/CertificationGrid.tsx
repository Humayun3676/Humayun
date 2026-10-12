export const CertificationGrid = () => {
  const certs = [
    { name: 'IBM', logo: '/logos/ibm.webp', darkInvert: true },
    { name: 'DeepLearning.AI', logo: '/logos/deeplearning.webp' },
    { name: 'Coursera', logo: '/logos/coursera.svg' },
    { name: 'Google', logo: '/logos/google.webp' },
    { name: 'University of Michigan', logo: '/logos/michigan.webp' },
    { name: 'IEEE', logo: '/logos/ieee.webp' },
    { name: 'DIGISKILLS', logo: '/logos/digiskills.webp' },
    { name: 'The University of Faisalabad', logo: '/logos/tuf.webp' },
    { name: 'University of California Irvine', logo: '/logos/uci.webp' },
    { name: 'LearnQuest', logo: '/logos/learnquest.webp' },
    { name: 'University of Colarado', logo: '/logos/ucolorado.webp' },
    { name: 'University of Pennsylvania', logo: '/logos/upennsylvynia.webp' },
    { name: 'VLG', logo: '/logos/vlgsialkot.webp' },
    { name: 'University of Sialkot', logo: '/logos/uskt.webp' },
    { name: 'NAVTTC', logo: '/logos/navttc.webp' },
    { name: 'National Volunteer Corps', logo: '/logos/nvc.webp' },
    { name: 'Ignite', logo: '/logos/ignite.webp' },
    { name: 'United Nations', logo: '/logos/uncc.webp' },
    { name: 'Sololearn', logo: '/logos/sololearn.webp' },
    { name: 'HP', logo: '/logos/hp.webp' },
  ];

  const duplicatedCerts = [...certs, ...certs, ...certs];

  return (
    <div className="py-14 overflow-hidden relative w-full bg-[#EFEFEF] dark:bg-slate-900 transition-colors duration-300">
      <style>{`
        @keyframes marqueeInfinite {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
        .animate-marquee-smooth {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: marqueeInfinite 32s linear infinite;
        }
        .animate-marquee-smooth:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="text-center mb-10">
        <h3 className="text-xs uppercase font-bold tracking-[0.25em] text-gray-600 dark:text-slate-400">
          Certified & Affiliated With
        </h3>
        <div className="w-12 h-0.5 bg-primary/40 mx-auto mt-2 rounded-full" />
      </div>

      {/* Deep Gradient Fading Edge Masks */}
      <div className="absolute left-0 top-0 z-20 w-28 sm:w-36 h-full bg-gradient-to-r from-[#EFEFEF] dark:from-slate-900 to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 z-20 w-28 sm:w-36 h-full bg-gradient-to-l from-[#EFEFEF] dark:from-slate-900 to-transparent pointer-events-none"></div>

      {/* Smooth Marquee Track */}
      <div className="animate-marquee-smooth items-center">
        {duplicatedCerts.map((cert, index) => (
          <div 
            key={`${cert.name}-${index}`} 
            className="flex items-center justify-center flex-shrink-0 px-6 sm:px-8 py-2 group cursor-pointer"
          >
            <div className="h-14 sm:h-16 flex items-center justify-center">
              <img 
                src={cert.logo} 
                alt={`${cert.name} logo`} 
                width={120}
                height={48}
                loading="lazy"
                decoding="async"
                className={`max-h-12 w-auto max-w-[120px] object-contain transition-all duration-300 filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 ${
                  cert.darkInvert || cert.name === 'IBM' ? 'dark:invert dark:opacity-75 group-hover:dark:opacity-100' : ''
                }`} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};