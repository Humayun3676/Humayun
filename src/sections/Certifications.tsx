import { useState, lazy, Suspense } from 'react';
import { Award } from 'lucide-react';
import { CERTIFICATIONS_DATA } from '../data/certifications';
import { CertificationGrid } from '../components/CertificationGrid';
import { SectionHeader } from '../components/SectionHeader';
import { InteractiveCard } from '../components/InteractiveCard';
import { ScrollReveal } from '../components/ScrollReveal';

const CertificateModal = lazy(() =>
  import('../components/CertificateModal').then((m) => ({ default: m.CertificateModal }))
);

export const Certifications = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);


  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'AI / ML':
        return 'text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 border-purple-200/50 dark:border-purple-800/40';
      case 'Programming':
        return 'text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border-blue-200/50 dark:border-blue-800/40';
      case 'Software Engineering':
        return 'text-cyan-600 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/60 border-cyan-200/50 dark:border-cyan-800/40';
      case 'Testing & Automation':
        return 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200/50 dark:border-emerald-800/40';
      case 'Leadership':
        return 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border-amber-200/50 dark:border-amber-800/40';
      default:
        return 'text-primary dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border-blue-200/50 dark:border-blue-800/40';
    }
  };

  return (
    <section id="certifications" className="scroll-mt-24 lg:scroll-mt-0 py-12 lg:py-24 px-4 lg:px-6 relative bg-[#EFEFEF] dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-[1440px] w-full mx-auto">
        
        {/* Section Header */}
        <SectionHeader 
          eyebrow="06 — Credentials"
          title="Certification Vault"
          description="A verified archive of my professional credentials, continuous learning, and specialized training in software engineering and artificial intelligence."
        />

        {/* Certifications Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {CERTIFICATIONS_DATA.map((cert, index) => (
            <ScrollReveal key={cert.id} delay={index * 0.05}>
              <InteractiveCard
                isFeatured={cert.featured}
                onClick={() => setSelectedCertificate(cert.imagePath || `/certificates/${cert.fileName}`)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedCertificate(cert.imagePath || `/certificates/${cert.fileName}`);
                  }
                }}
                tabIndex={0}
                role="button"
                className="p-6 cursor-pointer h-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-blue-50 dark:bg-slate-700/60 rounded-lg group-hover:bg-primary transition-colors group-hover:rotate-6 duration-300">
                      <Award className="text-primary group-hover:text-white w-6 h-6 transition-colors" />
                    </div>
                    {cert.logo && (
                      <div className="bg-white/95 dark:bg-white/90 p-0.5 rounded-sm flex items-center justify-center shadow-xs">
                        <img
                          src={cert.logo}
                          alt={`${cert.issuer} logo`}
                          width={48}
                          height={24}
                          className="h-6 w-auto max-w-[48px] object-contain dark:brightness-100 dark:contrast-125"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    )}
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${getCategoryBadgeClass(cert.category)}`}>
                    {cert.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-2 group-hover:text-primary transition-colors duration-300 tracking-tight">
                  {cert.title}
                </h3>
                
                <p className="text-gray-600 dark:text-slate-400 text-sm flex-grow">
                  Issued by <span className="text-gray-900 dark:text-slate-200 font-medium">{cert.issuer}</span>
                </p>
              </InteractiveCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Logo Grid Integration */}
        <CertificationGrid />

      </div>

      {/* Lazy-loaded Certificate Modal */}
      {selectedCertificate && (
        <Suspense fallback={null}>
          <CertificateModal
            imagePath={selectedCertificate}
            onClose={() => setSelectedCertificate(null)}
          />
        </Suspense>
      )}
    </section>
  );
};