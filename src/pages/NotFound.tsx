import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#EFEFEF] px-4 text-center">
      <h1 className="text-8xl sm:text-9xl font-black text-gray-900 mb-4 tracking-tighter">404</h1>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
      </p>
      <button 
        onClick={() => navigate('/')}
        className="px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl transition-all shadow-md font-bold flex items-center justify-center gap-2"
      >
        <Home size={20} />
        Return to Homepage
      </button>
    </div>
  );
};
