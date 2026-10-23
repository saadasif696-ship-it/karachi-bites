import React from 'react';
import { Plus, Minus, Flame, Leaf } from 'lucide-react';
import { MenuItem, CartItem } from '../types';
import { triggerFlyToCartAnimation } from '../utils/animations';

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
  onAddToCart: (item: MenuItem) => void;
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
  const isAvailable = item.available !== false;

  return (
    <article className="card-premium overflow-hidden">
      {/* Image Section */}
      <div className="relative h-48 sm:h-52 overflow-hidden cursor-pointer" onClick={() => onViewItemDetails(item)}>
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#FDF8F0] to-[#F5EDE0] flex flex-col items-center justify-center p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C1121F]">{item.category}</span>
            <span className="text-sm font-bold text-[#1A1A2E] mt-2">{item.name}</span>
          </div>
        )}

        {/* Tags */}
        <div className="absolute top-3 left-3 flex gap-2">
          {item.tags === 'veg' && (
            <span className="inline-flex items-center gap-1 bg-white/95 text-[#22C55E] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
              <Leaf className="w-3 h-3" /> Veg
            </span>
          )}
          {item.tags === 'spicy' && (
            <span className="inline-flex items-center gap-1 bg-[#C1121F]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
              <Flame className="w-3 h-3" /> Spicy
            </span>
          )}
          {item.tags === 'mild' && (
            <span className="inline-flex items-center bg-white/95 text-[#D4A017] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
              Mild
            </span>
          )}
        </div>

        {/* Availability Badge */}
        {!isAvailable && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <span className="bg-[#C1121F] text-white text-xs font-bold px-4 py-2 rounded-full">
              Sold Out
            </span>
          </div>
        )}

        {/* Category Label */}
        <div className="absolute bottom-3 left-3">
          <span className="text-[10px] uppercase font-bold text-white bg-[#1A1A2E]/80 px-2.5 py-1 rounded-full backdrop-blur-sm">
            {item.category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3
            onClick={() => onViewItemDetails(item)}
            className="text-base font-bold text-[#1A1A2E] leading-tight hover:text-[#C1121F] transition-colors cursor-pointer line-clamp-1"
          >
            {item.name}
          </h3>
          <span className="text-xs text-[#6B7280] font-mono shrink-0">#{item.id}</span>
        </div>

        <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed mb-4">
          {item.description}
        </p>

        {/* Bottom Action */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB]">
          <div>
            <span className="text-xs text-[#6B7280] block">Price</span>
            <span className="text-lg font-black text-[#1A1A2E]">
              Rs. {item.price}
            </span>
          </div>

          {!isAvailable ? (
            <button disabled className="px-4 py-2 rounded-full text-xs font-bold bg-[#E5E7EB] text-[#6B7280] cursor-not-allowed">
              Unavailable
            </button>
          ) : cartEntry ? (
            <div className="flex items-center gap-1 bg-[#FDF8F0] border border-[#D4A017] rounded-full overflow-hidden">
              <button
                onClick={() => onUpdateQty(item.id, -1)}
                className="w-8 h-8 flex items-center justify-center text-[#C1121F] hover:bg-[#C1121F]/10 transition-colors font-bold"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-6 text-center text-sm font-bold text-[#1A1A2E]">
                {cartEntry.qty}
              </span>
              <button
                onClick={(e) => {
                  onUpdateQty(item.id, 1);
                  triggerFlyToCartAnimation(e.currentTarget);
                }}
                className="w-8 h-8 flex items-center justify-center text-[#C1121F] hover:bg-[#C1121F]/10 transition-colors font-bold"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={(e) => {
                onAddToCart(item);
                triggerFlyToCartAnimation(e.currentTarget);
              }}
              className="btn-chili flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold"
            >
              <Plus className="w-4 h-4" />
              Add
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
      <div className="py-16 text-center space-y-3 bg-white rounded-2xl border border-[#E5E7EB] p-8">
        <div className="text-4xl">🍽️</div>
        <h3 className="text-lg font-bold text-[#1A1A2E]">No items found</h3>
        <p className="text-sm text-[#6B7280]">Try adjusting your filters</p>
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
            {/* Category Header */}
            <div className="flex items-center gap-4">
              <div className="w-1 h-10 rounded-full bg-gradient-to-b from-[#D4A017] to-[#C1121F]" />
              <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A2E]">
                {category}
              </h2>
              <span className="text-xs font-bold text-[#D4A017] bg-[#1A1A2E] px-3 py-1.5 rounded-full">
                {categoryItems.length} {categoryItems.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {categoryItems.map((item) => {
                const cartEntry = cart.find(c => c.id === item.id);
                return (
                  <FoodCard
                    key={item.id}
                    item={item}
                    cartEntry={cartEntry}
                    onAddToCart={onAddToCart}
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
