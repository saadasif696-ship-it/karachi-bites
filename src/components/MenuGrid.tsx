import React, { useRef, useEffect } from 'react';
import { Plus, Minus, Flame, Leaf, UtensilsCrossed, Info } from 'lucide-react';
import { MenuItem, CartItem } from '../types';
import { triggerFlyToCartAnimation, setupCard3DTilt } from '../utils/animations';

interface MenuGridProps {
  items: MenuItem[];
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onUpdateQty: (itemId: number, delta: number) => void;
  activeCategory: string;
  onViewItemDetails: (item: MenuItem) => void;
}

interface FoodCardProps {
  item: MenuItem;
  cartEntry?: CartItem;
  onAddToCart: (item: MenuItem, btnEl: HTMLElement) => void;
  onUpdateQty: (itemId: number, delta: number) => void;
  onViewItemDetails: (item: MenuItem) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({
  item,
  cartEntry,
  onAddToCart,
  onUpdateQty,
  onViewItemDetails
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isAvailable = item.available !== false;

  useEffect(() => {
    if (!cardRef.current || !isAvailable) return;
    const cleanup = setupCard3DTilt(cardRef.current);
    return cleanup;
  }, [isAvailable]);

  return (
    <article
      ref={cardRef}
      className={`rounded-3xl border-2 transition-all duration-300 flex flex-col justify-between overflow-hidden group relative will-change-transform ${
        !isAvailable
          ? 'border-[#EFE2CD] opacity-60 bg-[#F5EFE6]'
          : 'bg-gradient-to-b from-[#FFFDF8] via-[#FFFBF2] to-[#FFF8EA] border-[#EFE2CD] hover:border-[#D4AF37] shadow-sm hover:shadow-xl'
      }`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Premium Metallic Gold corner notch */}
      <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden z-10">
        <div className="w-12 h-12 bg-[#0C0E14] -rotate-45 -translate-y-8 translate-x-2 shadow-2xs border-b-2 border-[#D4AF37]" />
      </div>

      {/* Visual Photo Card Top */}
      <div
        onClick={() => onViewItemDetails(item)}
        className="relative h-52 sm:h-56 bg-[#FAF6ED] overflow-hidden cursor-pointer"
        style={{ transform: 'translateZ(10px)' }}
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#FAF6ED] text-[#766457] p-4 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C86314]">{item.category}</span>
            <span className="text-sm font-bold text-[#241810] mt-1">{item.name}</span>
          </div>
        )}

        {/* Dietary Tag Over Image with paper-cut pill styling */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5" style={{ transform: 'translateZ(20px)' }}>
          {item.tags === 'veg' && (
            <span className="inline-flex items-center gap-1 bg-white/95 text-[#2E7D32] text-[11px] font-black px-3 py-1 rounded-full shadow-xs backdrop-blur-xs border border-[#2E7D32]/25">
              <Leaf className="w-3 h-3 text-[#2E7D32]" />
              Veg
            </span>
          )}
          {item.tags === 'spicy' && (
            <span className="inline-flex items-center gap-1 bg-white/95 text-[#C86314] text-[11px] font-black px-3 py-1 rounded-full shadow-xs backdrop-blur-xs border border-[#C86314]/25">
              <Flame className="w-3 h-3 text-[#C86314]" />
              Spicy
            </span>
          )}
          {item.tags === 'mild' && (
            <span className="inline-flex items-center bg-white/95 text-[#8D6B1F] text-[11px] font-black px-3 py-1 rounded-full shadow-xs backdrop-blur-xs border border-[#D4AF37]/40">
              Mild
            </span>
          )}
        </div>

        {/* Out of Stock Overlay */}
        {!isAvailable && (
          <div className="absolute inset-0 bg-[#0C0E14]/70 backdrop-blur-2xs flex items-center justify-center">
            <span className="bg-[#C86314] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-xl shadow-lg">
              Sold Out Today
            </span>
          </div>
        )}

        {/* Detail hint button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewItemDetails(item);
          }}
          className="absolute bottom-3 right-3 p-2 bg-[#0C0E14]/90 hover:bg-[#0C0E14] text-[#D4AF37] border border-[#D4AF37]/50 rounded-full shadow-md transition-all cursor-pointer hover:scale-110 active:scale-95"
          title="View dish details"
          style={{ transform: 'translateZ(20px)' }}
          aria-label={`View details for ${item.name}`}
        >
          <Info className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Card Content & Action */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between" style={{ transform: 'translateZ(15px)' }}>
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] uppercase font-black text-[#D4AF37] tracking-wider bg-[#0C0E14] px-2.5 py-0.5 rounded-full border border-[#D4AF37]/40 shadow-2xs">
              {item.category}
            </span>
            <span className="text-[11px] font-mono text-[#A58E7A]">
              #{item.id}
            </span>
          </div>

          <h3
            onClick={() => onViewItemDetails(item)}
            className="text-lg font-black text-[#241810] leading-snug hover:text-[#C86314] transition-colors cursor-pointer line-clamp-1 mt-1"
          >
            {item.name}
          </h3>

          <p className="text-xs text-[#766457] mt-1.5 line-clamp-2 leading-relaxed font-normal">
            {item.description}
          </p>
        </div>

        {/* Bottom Action Footer with Price and Rich Caramel/Gold Button */}
        <div className="mt-5 pt-4 border-t border-[#EFE2CD] flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#8B776A] block leading-none">Price</span>
            <span className="text-xl font-black text-[#241810] tabular-nums">
              Rs. {item.price}
            </span>
          </div>

          {/* Actions with Fly-to-Cart Particle Animation */}
          {!isAvailable ? (
            <button
              disabled
              className="px-4 py-2 rounded-full text-xs font-bold bg-[#EFE2CD] text-stone-500 cursor-not-allowed min-h-[42px]"
            >
              Unavailable
            </button>
          ) : cartEntry ? (
            <div className="flex items-center bg-[#FFF8EA] border-2 border-[#C86314] rounded-full overflow-hidden min-h-[42px] shadow-2xs">
              <button
                onClick={() => onUpdateQty(item.id, -1)}
                className="w-8 h-8 flex items-center justify-center text-[#C86314] hover:bg-[#C86314]/15 transition-colors cursor-pointer font-bold"
                aria-label={`Decrease ${item.name} quantity`}
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-7 text-center text-sm font-black tabular-nums text-[#241810]">
                {cartEntry.qty}
              </span>
              <button
                onClick={(e) => {
                  onUpdateQty(item.id, 1);
                  triggerFlyToCartAnimation(e.currentTarget);
                }}
                className="w-8 h-8 flex items-center justify-center text-[#C86314] hover:bg-[#C86314]/15 transition-colors cursor-pointer font-bold"
                aria-label={`Increase ${item.name} quantity`}
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={(e) => {
                onAddToCart(item, e.currentTarget);
                triggerFlyToCartAnimation(e.currentTarget);
              }}
              className="inline-flex items-center justify-center gap-1.5 bg-[#C86314] hover:bg-[#D48400] text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all cursor-pointer min-h-[42px] shadow-sm hover:shadow-md active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Add to Bag
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export const MenuGrid: React.FC<MenuGridProps> = ({
  items,
  cart,
  onAddToCart,
  onUpdateQty,
  activeCategory,
  onViewItemDetails
}) => {
  if (items.length === 0) {
    return (
      <div className="py-20 text-center space-y-3 bg-[#FFFDF8] rounded-3xl border border-[#EFE2CD] p-8 shadow-sm">
        <UtensilsCrossed className="w-10 h-10 text-[#D4AF37] mx-auto animate-pulse" />
        <h3 className="text-lg font-bold text-[#241810]">No delicious items found</h3>
        <p className="text-xs text-[#766457] max-w-sm mx-auto">
          Try clearing your search keyword, adjusting your price limit, or disabling dietary filters.
        </p>
      </div>
    );
  }

  const groupedCategories = activeCategory === 'all'
    ? Array.from(new Set(items.map(item => item.category)))
    : [activeCategory];

  return (
    <div className="space-y-12">
      {groupedCategories.map((category) => {
        const categoryItems = items.filter(i => i.category === category);
        if (categoryItems.length === 0) return null;

        return (
          <section key={category} className="space-y-5">
            {/* Styled category header with obsidian and gold ribbon */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-dashed border-[#EFE2CD]">
              <div className="flex items-center gap-3">
                <div className="w-3 h-8 rounded-full bg-[#0C0E14] border border-[#D4AF37] shadow-xs" />
                <h2 className="text-2xl sm:text-3xl font-black text-[#241810] tracking-tight">
                  {category}
                </h2>
                <span className="text-xs font-black text-[#D4AF37] bg-[#0C0E14] border border-[#D4AF37]/50 px-3 py-1 rounded-full shadow-2xs">
                  {categoryItems.length} dishes
                </span>
              </div>
            </div>

            {/* Product Cards Grid with 3D Tilt Effect */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {categoryItems.map((item) => {
                const cartEntry = cart.find(c => c.id === item.id);
                return (
                  <FoodCard
                    key={item.id}
                    item={item}
                    cartEntry={cartEntry}
                    onAddToCart={(item) => onAddToCart(item)}
                    onUpdateQty={onUpdateQty}
                    onViewItemDetails={onViewItemDetails}
                  />
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};
