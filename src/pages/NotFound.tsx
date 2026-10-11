import { useEffect } from 'react';
import { Home } from 'lucide-react';

export const NotFound = () => {
  useEffect(() => {
    let meta = document.querySelector('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'robots');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'noindex, follow');

    return () => {
      meta?.setAttribute('content', 'index, follow');
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#EFEFEF] dark:bg-[#0B1120] text-text-main dark:text-slate-100 px-4 text-center transition-colors duration-300">
      <h1 className="text-8xl sm:text-9xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter">404</h1>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-slate-100 mb-2">Page Not Found</h2>
      <p className="text-gray-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
        The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
      </p>
      <a 
        href="/"
        className="px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl transition-all shadow-md font-bold flex items-center justify-center gap-2 group"
      >
        <Home size={20} className="group-hover:scale-110 transition-transform" />
        Return to Homepage
      </a>
    </div>
  );
};
