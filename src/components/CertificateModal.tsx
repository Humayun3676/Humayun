import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { CERTIFICATIONS_DATA } from '../data/certifications';

interface CertificateModalProps {
  imagePath: string | null;
  onClose: () => void;
}

export const CertificateModal = ({ imagePath, onClose }: CertificateModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (imagePath) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [imagePath, onClose]);

  if (!imagePath || typeof document === 'undefined') return null;

  const activeCert = CERTIFICATIONS_DATA.find((c) => c.imagePath === imagePath);
  const activeAlt = activeCert
    ? `${activeCert.issuer} certificate: ${activeCert.title}`
    : 'Professional certification credential';

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4 animate-fadeIn"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Certificate preview"
      tabIndex={-1}
    >
      {/* Close button positioned on the screen backdrop */}
      <button
        type="button"
        onClick={onClose}
        className="fixed top-4 right-4 bg-slate-800/80 hover:bg-slate-700/80 text-white p-2.5 rounded-full z-50 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
        aria-label="Close modal"
      >
        <X className="w-6 h-6" />
      </button>

      <div
        className="relative w-auto h-auto max-w-[95vw] max-h-[95vh] rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imagePath}
          alt={activeAlt}
          decoding="async"
          className="w-auto h-auto max-w-full max-h-[90vh] object-contain block"
        />
      </div>
    </div>,
    document.body
  );
};
