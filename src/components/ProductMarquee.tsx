import React from 'react';
import { MenuItem, CartItem } from '../types';
import { Plus, Flame, Leaf, Sparkles, Eye } from 'lucide-react';
import { triggerFlyToCartAnimation } from '../utils/animations';

interface ProductMarqueeProps {
  items: MenuItem[];
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onViewItemDetails: (item: MenuItem) => void;
}

export const ProductMarquee: React.FC<ProductMarqueeProps> = ({
  items,
  cart,
  onAddToCart,
  onViewItemDetails
}) => {
  if (!items || items.length === 0) return null;

  // Duplicate items twice to ensure endless continuous loop with zero gap
  const duplicatedItems = [...items, ...items];

  return (
    <section className="relative py-8 bg-[#0C0E14] border-y border-[#262A36] overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-24 bg-[#D4AF37]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-24 bg-[#C86314]/10 blur-3xl pointer-events-none" />

      {/* Top Banner Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-ping" />
          <span className="text-xs uppercase tracking-widest font-black text-[#D4AF37] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            Live Kitchen Reel · All Dishes
          </span>
          <span className="text-xs text-[#8E867A] hidden sm:inline">
            (Hover any dish to inspect or add)
          </span>
        </div>

        <div className="text-[11px] font-mono text-[#A89E8C] bg-[#161922] px-3 py-1 rounded-full border border-[#2B2F3E]">
          Continuous Stream · Left to Right
        </div>
      </div>

      {/* Gradient Faders on edges for ultra-premium cinematic look */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#0C0E14] via-[#0C0E14]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#0C0E14] via-[#0C0E14]/80 to-transparent z-10 pointer-events-none" />

      {/* Moving Marquee Tape */}
      <div className="w-full overflow-hidden py-2">
        <div className="animate-marquee-ltr flex items-center gap-4 sm:gap-6">
          {duplicatedItems.map((item, index) => {
            const inCart = cart.find(c => c.id === item.id);
            return (
              <div
                key={`${item.id}-${index}`}
                onClick={() => onViewItemDetails(item)}
                className="group relative w-64 sm:w-72 shrink-0 bg-[#141722] hover:bg-[#1A1E2C] border border-[#2B2F3E] hover:border-[#D4AF37] rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer shadow-md hover:shadow-[0_0_25px_rgba(212,175,55,0.25)] hover:-translate-y-1"
              >
                {/* Image Section */}
                <div className="relative h-36 sm:h-40 overflow-hidden bg-[#0F1118]">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-[#8E867A] font-bold">
                      {item.name}
                    </div>
                  )}

                  {/* Gradient over image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141722] via-transparent to-transparent opacity-80" />

                  {/* Category & Tag badges */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="text-[10px] uppercase font-black bg-[#0C0E14]/90 text-[#D4AF37] border border-[#D4AF37]/40 px-2 py-0.5 rounded-md backdrop-blur-xs">
                      {item.category}
                    </span>
                    {item.tags === 'spicy' && (
                      <span className="text-[10px] font-bold bg-[#C86314]/90 text-white px-1.5 py-0.5 rounded-md flex items-center gap-0.5 backdrop-blur-xs">
                        <Flame className="w-3 h-3" />
                      </span>
                    )}
                    {item.tags === 'veg' && (
                      <span className="text-[10px] font-bold bg-[#2E7D32]/90 text-white px-1.5 py-0.5 rounded-md flex items-center gap-0.5 backdrop-blur-xs">
                        <Leaf className="w-3 h-3" />
                      </span>
                    )}
                  </div>

                  {/* Quick View hint on hover */}
                  <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="p-1.5 rounded-full bg-[#0C0E14]/90 text-[#D4AF37] border border-[#D4AF37]/50 inline-flex items-center justify-center shadow-xs">
                      <Eye className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-3.5 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-black text-white group-hover:text-[#D4AF37] transition-colors truncate">
                      {item.name}
                    </h4>
                  </div>

                  <p className="text-[11px] text-[#A89E8C] line-clamp-1">
                    {item.portion || item.description}
                  </p>

                  <div className="pt-1 flex items-center justify-between border-t border-[#232734]">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#7E766A] block leading-none">Price</span>
                      <span className="text-sm font-black text-[#D4AF37] tabular-nums">
                        Rs. {item.price}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(item);
                        triggerFlyToCartAnimation(e.currentTarget);
                      }}
                      className="inline-flex items-center gap-1 bg-[#C86314] hover:bg-[#D48400] text-white px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
                      title="Add directly to cart"
                    >
                      <Plus className="w-3 h-3" />
                      <span>{inCart ? `${inCart.qty} in Bag` : 'Add'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
