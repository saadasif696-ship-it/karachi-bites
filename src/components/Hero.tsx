import heroFeastImage from '../assets/images/karachi_hero_feast_1791536033852.jpg';
import React from 'react';
import { MapPin, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
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
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#1A1A2E]">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A2E] via-[#2D2D44] to-[#1A1A2E]" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#D4A017]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#C1121F]/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#D4A017]/5 rounded-full" />

      {/* Spice pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23D4A017' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Content */}
          <div className="space-y-8 text-center lg:text-left">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4A017]/10 border border-[#D4A017]/30 mx-auto lg:mx-0">
              <span className="w-2 h-2 rounded-full bg-[#D4A017] animate-pulse" />
              <span className="text-xs font-bold text-[#D4A017] uppercase tracking-widest">
                Karachi's Finest · Since 2020
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05]">
              Taste the{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#F5D061] via-[#D4A017] to-[#C1121F] bg-clip-text text-transparent">
                  Spice Route
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M1 5.5C40 2 80 2 100 4C120 6 160 6 199 3" stroke="#D4A017" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
              <br />
              <span className="text-white">of Karachi</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-[#E0D7CB] max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Authentic Malai Boti, sizzling Seekh Kebabs, rich Karahi, and fragrant Biryani —
              crafted by master chefs and delivered piping hot to your doorstep.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#menu"
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#D4A017] to-[#F5D061] hover:from-[#C8940F] hover:to-[#E8C447] text-[#1A1A2E] px-8 py-4 rounded-full font-black text-base transition-all shadow-lg shadow-[#D4A017]/30 hover:shadow-xl hover:shadow-[#D4A017]/40 active:scale-95 min-h-[56px]"
              >
                Explore Menu
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={onOpenTrack}
                className="inline-flex items-center justify-center gap-2 bg-[#2D2D44] hover:bg-[#3A3D5B] text-white border-2 border-[#4A4D6B] hover:border-[#D4A017] px-8 py-4 rounded-full font-bold text-base transition-all min-h-[56px]"
              >
                <Flame className="w-5 h-5 text-[#C1121F]" />
                Track Order
              </button>
            </div>

            {/* Branch Selector */}
            <div className="pt-4">
              <span className="text-xs uppercase font-bold text-[#A89E8C] tracking-widest block mb-3 text-center lg:text-left">
                Choose Your Kitchen
              </span>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {branches.map((b) => {
                  const isSelected = selectedBranch.id === b.id;
                  return (
                    <button
                      key={b.id}
                      onClick={() => onSelectBranch(b)}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                        isSelected
                          ? 'bg-[#D4A017] text-[#1A1A2E] shadow-lg shadow-[#D4A017]/30'
                          : 'bg-[#2D2D44] text-[#E0D7CB] border border-[#4A4D6B] hover:border-[#D4A017]'
                      }`}
                    >
                      <MapPin className={`w-4 h-4 ${isSelected ? 'text-[#1A1A2E]' : 'text-[#D4A017]'}`} />
                      <span>{b.name}</span>
                      <span className={`text-xs ${isSelected ? 'text-[#1A1A2E]/70' : 'text-[#A89E8C]'}`}>
                        {b.deliveryEstimate}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#E0D7CB] bg-[#2D2D44]/50 border border-[#4A4D6B] px-4 py-2 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                Flat Rs. 150 Delivery
              </span>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#E0D7CB] bg-[#2D2D44]/50 border border-[#4A4D6B] px-4 py-2 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
                Cash on Delivery
              </span>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Glow behind image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] bg-gradient-to-tr from-[#D4A017]/20 to-[#C1121F]/20 rounded-full blur-3xl" />
            </div>

            {/* Main image container */}
            <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[480px] lg:h-[480px]">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-4 border-[#D4A017]/30 animate-pulse" />

              {/* Inner ring */}
              <div className="absolute inset-4 rounded-full border-2 border-[#C1121F]/20" />

              {/* Image */}
              <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-[#D4A017]/40 shadow-2xl">
                <img
                  src={heroFeastImage}
                  alt="Karachi Bites Signature Feast"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  loading="eager"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/80 via-transparent to-transparent" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#C1121F] text-white px-6 py-3 rounded-full font-black text-sm shadow-lg">
                🔥 500+ Happy Customers
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#FDF8F0"/>
        </svg>
      </div>
    </section>
  );
};
