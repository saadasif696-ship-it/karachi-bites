import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { CartItem, GoogleUser } from '../types';
import { UserAvatar } from './UserAvatar';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (itemId: number, delta: number) => void;
  onRemoveItem: (itemId: number) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  deliveryFee: number;
  currentUser: GoogleUser | null;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  deliveryFee,
  currentUser
}) => {
  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal + (cart.length > 0 ? deliveryFee : 0);
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#241810]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF8] border-l border-[#EFE2CD] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#EFE2CD] flex items-center justify-between bg-[#FFF8EA]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#C86314] text-white flex items-center justify-center shadow-xs">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-black text-[#241810] leading-tight">
                  Your Order Bag
                </h2>
                <p className="text-[11px] text-[#766457]">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-[#241810] rounded-xl hover:bg-[#FAF6ED] transition-colors cursor-pointer"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Status Bar if logged in */}
          {currentUser && (
            <div className="px-4 py-2.5 bg-[#2E7D32]/10 border-b border-[#2E7D32]/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <UserAvatar user={currentUser} size="xs" showGoogleRing={true} />
                <span className="text-[#241810] font-semibold truncate">
                  Ordering as <strong className="font-bold text-[#2E7D32]">{currentUser.name}</strong>
                </span>
              </div>
              <span className="text-[10px] text-[#2E7D32] bg-[#2E7D32]/15 border border-[#2E7D32]/30 px-2 py-0.5 rounded-full font-bold">
                Google Verified
              </span>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 bg-[#FAF6ED]/50">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#FFF8EA] border border-[#EFE2CD] flex items-center justify-center mx-auto text-[#C86314]">
                  <ShoppingBag className="w-8 h-8 opacity-80" />
                </div>
                <p className="font-bold text-[#241810] text-base">Your cart is empty</p>
                <p className="text-xs text-[#766457] max-w-xs mx-auto">
                  Add signature Karahi, fresh tandoor BBQ, or aromatic Biryani from our menu to get started.
                </p>
                <button
                  onClick={onClose}
                  className="mt-3 text-xs font-bold text-[#C86314] hover:underline cursor-pointer"
                >
                  Explore Karachi Menu
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl border border-[#EFE2CD] bg-white flex items-center justify-between gap-3 shadow-2xs hover:border-[#C86314]/40 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-[#241810] truncate">{item.name}</h4>
                      <p className="text-xs text-[#766457] mt-0.5">
                        Rs. {item.price} each · <span className="tabular-nums font-bold text-[#C86314]">Rs. {item.price * item.qty}</span>
                      </p>
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center bg-[#FAF6ED] border border-[#EFE2CD] rounded-full">
                        <button
                          onClick={() => onUpdateQty(item.id, -1)}
                          className="w-7 h-7 flex items-center justify-center text-[#766457] hover:text-[#C86314] cursor-pointer font-bold"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold tabular-nums text-[#241810]">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.id, 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#766457] hover:text-[#C86314] cursor-pointer font-bold"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1.5 text-stone-400 hover:text-[#C86314] transition-colors cursor-pointer"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="pt-2 text-right">
                  <button
                    onClick={onClearCart}
                    className="text-xs text-stone-400 hover:text-[#C86314] underline cursor-pointer font-semibold transition-colors"
                  >
                    Clear whole cart
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer with Calculations */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#EFE2CD] bg-[#FFF8EA] space-y-3.5">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#766457]">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-semibold text-[#241810]">Rs. {subtotal}</span>
                </div>
                <div className="flex justify-between text-[#766457]">
                  <span>Flat Delivery Fee</span>
                  <span className="tabular-nums font-semibold text-[#241810]">Rs. {deliveryFee}</span>
                </div>
                <div className="flex justify-between text-base font-black text-[#241810] pt-2 border-t border-[#EFE2CD]">
                  <span>Grand Total</span>
                  <span className="tabular-nums text-[#C86314]">Rs. {total}</span>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full bg-[#C86314] hover:bg-[#B8550D] text-white py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer min-h-[48px]"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-[#766457] flex items-center justify-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
                Cash on Delivery · Verified server-side total
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
