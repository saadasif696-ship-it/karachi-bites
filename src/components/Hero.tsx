import heroFeastImage from '../assets/images/karachi_hero_feast_1791536033852.jpg';
import React from 'react';
import { MapPin, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Branch } from '../types';

interface HeroProps {
  branches: Branch[];
  selectedBranch: Branch;
  onSelectBranch: (branch: Branch) => void;
  onOpenTrack: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  branches,
  selectedBranch,
  onSelectBranch,
  onOpenTrack
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0A0C10] via-[#10131B] to-[#151924] pt-8 sm:pt-14 pb-20 sm:pb-28 text-white">
      {/* Subtle atmospheric gold and amber radial warmth */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] rounded-full bg-[#C86314]/15 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Hero Copy - Ultra-Premium Gourmet Culinary Dining Brand */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181C28] border border-[#D4AF37]/40 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-[11px] uppercase tracking-widest font-black text-[#D4AF37]">
                Master Chefs of Karachi · Est. 2026
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] drop-shadow-sm">
              Karachi's Royal{' '}
              <span className="bg-gradient-to-r from-[#F5D061] via-[#D4AF37] to-[#C86314] bg-clip-text text-transparent">
                Flavours Delivered.
              </span>
            </h1>

            <p className="text-[#C5BDB0] text-base sm:text-lg max-w-lg leading-relaxed font-normal">
              Sizzling tender Malai Boti, succulent Seekh Kebabs, rich Shinwari Karahi, and fragrant Dum Biryani prepared fresh to order and delivered piping hot across Karachi.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2 bg-[#C86314] hover:bg-[#D48400] text-white px-6 sm:px-7 py-3.5 rounded-full font-bold text-sm transition-all shadow-lg shadow-[#C86314]/25 hover:shadow-xl active:scale-95 min-h-[48px]"
              >
                Explore Menu
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={onOpenTrack}
                className="inline-flex items-center justify-center gap-2 bg-[#141722] hover:bg-[#1D2230] text-[#D4AF37] border border-[#D4AF37]/60 px-5 sm:px-6 py-3.5 rounded-full font-bold text-sm transition-all shadow-sm min-h-[48px] cursor-pointer active:scale-95"
              >
                Track Order
              </button>
            </div>

            {/* Branch Selector: Sleek Obsidian & Metallic Gold theme */}
            <div className="pt-3">
              <span className="text-[11px] uppercase font-black text-[#8E867A] tracking-wider block mb-2">
                Select Your Kitchen Branch:
              </span>
              <div className="flex flex-wrap gap-2">
                {branches.map((b) => {
                  const isSelected = selectedBranch.id === b.id;
                  const isClifton = b.id === 'clifton';

                  let btnStyle = 'bg-[#141722] text-[#C5BDB0] border-[#2A2E3D] hover:bg-[#1E2230] hover:text-white';
                  if (isSelected) {
                    btnStyle = 'bg-[#D4AF37] text-[#0C0E14] border-[#D4AF37] font-black shadow-md ring-2 ring-[#D4AF37]/30';
                  } else if (isClifton) {
                    btnStyle = 'bg-[#1A1E2C] text-[#D4AF37] border-[#D4AF37]/60 hover:bg-[#22283A]';
                  }

                  return (
                    <button
                      key={b.id}
                      onClick={() => onSelectBranch(b)}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer active:scale-95 ${btnStyle}`}
                    >
                      <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-[#0C0E14]' : 'text-[#D4AF37]'}`} />
                      <span>{b.name}</span>
                      <span className={`text-[11px] ${isSelected ? 'text-[#0C0E14]/80' : 'text-[#8E867A]'}`}>
                        ({b.deliveryEstimate})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Micro proof badges */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs text-[#C5BDB0] font-semibold">
              <span className="inline-flex items-center gap-1.5 bg-[#141722] border border-[#2B2F3E] px-3 py-1.5 rounded-full shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#2E7D32]" />
                Flat delivery Rs. 150
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#141722] border border-[#2B2F3E] px-3 py-1.5 rounded-full shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
                Cash on Delivery
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#141722] border border-[#2B2F3E] px-3 py-1.5 rounded-full shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                3 Karachi Kitchens
              </span>
            </div>
          </div>

          {/* Right Side: Big Circle displaying authentic Karachi Desi Food Feast */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
            {/* Ambient Gold Glow behind food circle */}
            <div className="absolute inset-0 max-w-[460px] max-h-[460px] mx-auto rounded-full bg-[#D4AF37]/15 blur-2xl pointer-events-none" />

            {/* The Big Circle with Desi Food Feast */}
            <div className="relative w-full max-w-[420px] sm:max-w-[450px] aspect-square rounded-full p-2.5 sm:p-3 bg-gradient-to-tr from-[#0C0E14] via-[#1D2230] to-[#0C0E14] shadow-2xl border-4 border-[#D4AF37]/40 ring-4 ring-[#C86314]/20 group">
              <div className="w-full h-full rounded-full overflow-hidden relative shadow-inner">
                <img
                  src={heroFeastImage}
                  alt="Authentic Karachi Desi Food Feast - Shinwari Karahi, Dum Biryani & Malai Boti"
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    e.currentTarget.src = "/images/karachi_hero_feast_1791536033852.jpg";
                  }}
                />

                {/* Subtle dark gradient overlay at bottom of circle for depth */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Elegant Curved Transition into page body */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-10 sm:h-14 text-[#FAF6ED]"
          fill="currentColor"
        >
          <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
};
