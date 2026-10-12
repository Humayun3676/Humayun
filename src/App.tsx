import { useState, lazy, Suspense } from 'react';
import { Home } from './pages/Home';
import { ArrowLeft, Download, FileText } from 'lucide-react';
import { Routes, Route } from 'react-router-dom';
import { MagneticButton } from './components/MagneticButton';

const Resume = lazy(() => import('./pages/Resume').then((m) => ({ default: m.Resume })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

function AppContent() {
  const [viewResume, setViewResume] = useState(false);

  const handleDownloadPDF = () => {
    window.print();
  };

  if (viewResume) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-slate-900 flex flex-col items-center transition-colors duration-300">
        {/* Fixed Top Bar */}
        <div className="w-full bg-gray-900 text-white py-3 px-4 sm:px-6 shadow-md flex justify-between items-center gap-2 print:hidden sticky top-0 z-50">
          <button 
            onClick={() => setViewResume(false)}
            className="px-3 sm:px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-all flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium whitespace-nowrap"
          >
            <ArrowLeft size={16} /> <span className="hidden xs:inline">Back to </span>Portfolio
          </button>

          <span className="text-xs sm:text-sm font-medium text-gray-300 hidden md:inline">Resume Preview</span>

          <button 
            onClick={handleDownloadPDF}
            className="px-3 sm:px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-md transition-all flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium shadow-neon whitespace-nowrap"
          >
            <Download size={16} /> Download PDF
          </button>
        </div>

        {/* Resume Container */}
        <div className="w-full py-4 sm:py-8 px-2 sm:px-4 flex justify-center">
          <Suspense fallback={<div className="text-center py-20 text-gray-500">Loading Resume...</div>}>
            <Resume />
          </Suspense>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Home onViewResume={() => setViewResume(true)} />

      {/* Floating Preview Resume Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <MagneticButton strength={0.2}>
          <button 
            onClick={() => setViewResume(true)}
            className="px-4 py-2.5 bg-primary text-white rounded-full shadow-[0_10px_25px_-5px_rgba(37,99,235,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(37,99,235,0.6)] flex items-center gap-2 hover:bg-primary-hover transition-all font-semibold text-sm group"
          >
            <FileText size={16} className="group-hover:scale-110 transition-transform duration-300" /> Preview Resume
          </button>
        </MagneticButton>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppContent />} />
      <Route
        path="*"
        element={
          <Suspense fallback={null}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;