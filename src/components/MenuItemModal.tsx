import React from 'react';
import { X, Plus, Minus, Flame, Leaf } from 'lucide-react';
import { MenuItem, CartItem } from '../types';

interface MenuItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onUpdateQty: (id: number, delta: number) => void;
}

export const MenuItemModal: React.FC<MenuItemModalProps> = ({
  item,
  onClose,
  cart,
  onAddToCart,
  onUpdateQty
}) => {
  if (!item) return null;

  const cartEntry = cart.find(c => c.id === item.id);
  const isAvailable = item.available !== false;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#241810]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FFFDF8] rounded-3xl max-w-lg w-full border border-[#EFE2CD] shadow-2xl overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Visual Cover if image exists */}
        {item.image && (
          <div className="relative h-60 sm:h-72 bg-[#FAF6ED] overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF8] via-transparent to-black/30" />
            <button
              onClick={onClose}
              className="absolute top-3.5 right-3.5 p-2 bg-white/90 hover:bg-white text-[#241810] rounded-full transition-colors cursor-pointer border border-[#EFE2CD] shadow-sm"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-[#C86314] bg-white/90 px-2.5 py-0.5 rounded-full border border-[#EFE2CD]">
                  {item.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-black leading-tight text-[#241810] mt-1.5 drop-shadow-2xs">
                  {item.name}
                </h2>
              </div>
              <span className="text-lg font-black tabular-nums bg-[#0C0E14] text-[#D4AF37] px-3.5 py-1.5 rounded-full shadow-md border-2 border-[#D4AF37]">
                Rs. {item.price}
              </span>
            </div>
          </div>
        )}

        <div className="p-5 sm:p-6 space-y-4">
          {!item.image && (
            <div className="flex items-start justify-between border-b border-[#EFE2CD] pb-3">
              <div>
                <span className="text-xs uppercase font-bold text-[#C86314]">{item.category}</span>
                <h2 className="text-xl font-black text-[#241810]">{item.name}</h2>
              </div>
              <button onClick={onClose} className="p-1 text-stone-400 hover:text-[#241810]">
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Tags and Availability Pill */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {item.tags === 'veg' && (
              <span className="inline-flex items-center gap-1 text-[#2E7D32] bg-[#2E7D32]/10 border border-[#2E7D32]/25 font-bold px-3 py-1 rounded-full">
                <Leaf className="w-3.5 h-3.5 text-[#2E7D32]" />
                Vegetarian Recipe
              </span>
            )}
            {item.tags === 'spicy' && (
              <span className="inline-flex items-center gap-1 text-[#C86314] bg-[#C86314]/10 border border-[#C86314]/25 font-bold px-3 py-1 rounded-full">
                <Flame className="w-3.5 h-3.5 text-[#C86314]" />
                Spicy Karachi Blend
              </span>
            )}
            {item.tags === 'mild' && (
              <span className="text-[#D4AF37] bg-[#0C0E14] border border-[#D4AF37]/40 font-bold px-3 py-1 rounded-full">
                Mild Seasoning
              </span>
            )}
            <span className="text-[#766457] bg-[#FAF6ED] border border-[#EFE2CD] px-3 py-1 rounded-full font-mono text-[11px]">
              Item #{item.id}
            </span>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-[#241810]">About this dish:</h4>
            <p className="text-sm text-[#766457] leading-relaxed font-normal">
              {item.description}
            </p>
          </div>



          {/* Portion and Spiciness Details */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#FFF8EA] border border-[#EFE2CD]">
              <span className="text-[#766457] block text-[11px] font-medium">Serving:</span>
              <span className="font-bold text-[#241810]">{item.portion || 'Standard Serving'}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#FFF8EA] border border-[#EFE2CD]">
              <span className="text-[#766457] block text-[11px] font-medium">Kitchen Style:</span>
              <span className="font-bold text-[#241810]">{item.spiceLevel || 'Chef Special'}</span>
            </div>
          </div>

          {/* Add to Cart Actions */}
          <div className="pt-4 border-t border-[#EFE2CD] flex items-center justify-between gap-4">
            <div>
              <span className="text-xs text-[#766457] block font-medium">Unit Price</span>
              <span className="text-xl font-black text-[#241810] tabular-nums">Rs. {item.price}</span>
            </div>

            {!isAvailable ? (
              <button disabled className="px-5 py-2.5 rounded-full text-xs font-bold bg-[#EFE2CD] text-stone-500 cursor-not-allowed">
                Currently Out of Stock
              </button>
            ) : cartEntry ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-[#FAF6ED] border border-[#C86314] rounded-full overflow-hidden min-h-[42px]">
                  <button
                    onClick={() => onUpdateQty(item.id, -1)}
                    className="w-9 h-9 flex items-center justify-center text-[#C86314] hover:bg-[#C86314]/10 cursor-pointer font-bold"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold tabular-nums text-[#241810]">
                    {cartEntry.qty}
                  </span>
                  <button
                    onClick={() => onUpdateQty(item.id, 1)}
                    className="w-9 h-9 flex items-center justify-center text-[#C86314] hover:bg-[#C86314]/10 cursor-pointer font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <button
                  onClick={onClose}
                  className="bg-[#2E7D32] hover:bg-[#256628] text-white px-4 py-2.5 rounded-full text-xs font-bold cursor-pointer shadow-xs min-h-[42px]"
                >
                  Done
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onAddToCart(item);
                  onClose();
                }}
                className="inline-flex items-center justify-center gap-1.5 bg-[#C86314] hover:bg-[#B8550D] text-white px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95 cursor-pointer min-h-[44px]"
              >
                <Plus className="w-4 h-4" />
                Add to Order Bag
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
