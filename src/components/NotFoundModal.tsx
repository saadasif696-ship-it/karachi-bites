import React from 'react';
import { Home, UtensilsCrossed, ArrowLeft, Search } from 'lucide-react';

interface NotFoundProps {
  isOpen: boolean;
  onReturnHome: () => void;
}

export const NotFoundModal: React.FC<NotFoundProps> = ({ isOpen, onReturnHome }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#12151E] border-2 border-[#D4AF37]/50 rounded-3xl max-w-md w-full p-6 sm:p-8 text-center text-white shadow-2xl relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#C86314]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1A1E2A] border-2 border-[#D4AF37] flex items-center justify-center mx-auto text-[#D4AF37] shadow-lg">
            <UtensilsCrossed className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#D4AF37] bg-[#1A1E2A] px-3 py-1 rounded-full border border-[#2B2F3E]">
              Error 404 · Page Not Found
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-3">
              This Table is Empty!
            </h2>
            <p className="text-xs sm:text-sm text-[#A89E8C] mt-2 leading-relaxed">
              The dish or page you are looking for has been moved or is fresh out of the clay wok. Let's get you back to our royal menu.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onReturnHome}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C86314] hover:bg-[#D48400] text-white px-6 py-3 rounded-full text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              Return to Homepage
            </button>
            <button
              onClick={() => {
                onReturnHome();
                setTimeout(() => {
                  const el = document.getElementById('menu');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1A1E2A] hover:bg-[#252A3A] text-[#D4AF37] border border-[#D4AF37]/40 px-5 py-3 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer"
            >
              <Search className="w-4 h-4" />
              Explore Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
