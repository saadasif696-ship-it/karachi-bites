import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, Loader2, ArrowRight, Copy, Check, MapPin, Phone, User, Mail, ShieldCheck } from 'lucide-react';
import { CartItem, Branch, CustomerInfo, GoogleUser } from '../types';
import { createOrder } from '../api';
import { UserAvatar } from './UserAvatar';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  selectedBranch: Branch;
  branches: Branch[];
  onSelectBranch: (branch: Branch) => void;
  deliveryFee: number;
  currentUser: GoogleUser | null;
  onOpenGoogleLogin: () => void;
  onOrderSuccess: (orderId: string, phone: string) => void;
  onClearCart?: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  selectedBranch,
  branches,
  onSelectBranch,
  deliveryFee,
  currentUser,
  onOpenGoogleLogin,
  onOrderSuccess,
  onClearCart
}) => {
  const [formData, setFormData] = useState<CustomerInfo>({
    name: '',
    phone: '',
    address: '',
    email: '',
    notes: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [createdOrder, setCreatedOrder] = useState<{ orderId: string; total: number } | null>(null);
  const [copied, setCopied] = useState(false);

  // Auto-fill from Google Profile whenever user signs in
  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        name: prev.name.trim() === '' ? currentUser.name : prev.name,
        email: currentUser.email || prev.email
      }));
    }
  }, [currentUser]);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal + deliveryFee;

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      errs.name = 'Please provide customer name';
    }

    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    const pakPhoneRegex = /^(03[0-9]{9}|\+923[0-9]{9})$/;
    if (!cleanPhone) {
      errs.phone = 'Mobile number is required for rider dispatch';
    } else if (!pakPhoneRegex.test(cleanPhone)) {
      errs.phone = 'Enter a valid Pakistani mobile number (e.g. 03001234567)';
    }

    if (!formData.address.trim() || formData.address.trim().length < 6) {
      errs.address = 'Detailed delivery address is required in Karachi';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await createOrder({
        customer: {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          email: formData.email?.trim() || undefined,
          notes: formData.notes?.trim() || undefined
        },
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          qty: item.qty
        })),
        branchId: selectedBranch.id,
        googleUser: currentUser ? {
          email: currentUser.email,
          name: currentUser.name,
          picture: currentUser.picture
        } : undefined
      });

      if (response.success && response.order) {
        setCreatedOrder({
          orderId: response.order.orderId,
          total: response.order.total
        });
        onClearCart?.();
      } else {
        setServerError('Server could not process this order. Please try again.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Connection failed. Please check network.';
      setServerError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyOrderId = () => {
    if (!createdOrder) return;
    navigator.clipboard.writeText(createdOrder.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#241810]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FFFDF8] rounded-3xl max-w-lg w-full border border-[#EFE2CD] shadow-2xl overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#EFE2CD] flex items-center justify-between bg-[#FFF8EA]">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-[#241810] leading-tight">
              {createdOrder ? 'Order Confirmed!' : 'Delivery Checkout'}
            </h2>
            <p className="text-xs text-[#766457] mt-0.5">
              {createdOrder ? 'Kitchen acknowledged your order' : `Fulfilling from Karachi Bites ${selectedBranch.name}`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-[#241810] rounded-xl hover:bg-[#FAF6ED] transition-colors cursor-pointer"
            aria-label="Close Checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success View */}
        {createdOrder ? (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            {/* Show User Avatar with Checkmark */}
            <div className="relative inline-flex items-center justify-center mx-auto">
              <UserAvatar user={currentUser} size="xl" showGoogleRing={true} />
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#2E7D32] text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm font-bold">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-black text-[#241810]">
                Shukriya, {currentUser?.given_name || formData.name}!
              </h3>
              <p className="text-sm text-[#766457] max-w-md mx-auto leading-relaxed">
                Your order has been registered with Karachi Bites {selectedBranch.name}. A rider will deliver hot to your doorstep.
              </p>
            </div>

            {/* Order Details Badge */}
            <div className="bg-[#FFF8EA] border border-[#EFE2CD] rounded-2xl p-4.5 text-left space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#766457] font-medium">Order ID:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[#241810] text-sm">{createdOrder.orderId}</span>
                  <button
                    onClick={handleCopyOrderId}
                    className="p-1 text-[#766457] hover:text-[#241810] cursor-pointer transition-colors"
                    title="Copy Order ID"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#2E7D32]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-[#766457] font-medium">Total Due (Cash on Delivery):</span>
                <span className="font-black text-[#C86314] text-base tabular-nums">Rs. {createdOrder.total}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-[#766457] font-medium">Kitchen Branch:</span>
                <span className="text-xs font-bold text-[#241810]">{selectedBranch.name}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-[#766457] font-medium">Status:</span>
                <span className="text-xs font-bold text-[#2E7D32] bg-[#2E7D32]/10 border border-[#2E7D32]/30 px-2.5 py-0.5 rounded-full">
                  Received in Kitchen
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => {
                  onOrderSuccess(createdOrder.orderId, formData.phone);
                  onClose();
                }}
                className="w-full bg-[#C86314] hover:bg-[#B8550D] text-white py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer min-h-[48px]"
              >
                Track Live Order
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                className="w-full bg-[#FAF6ED] hover:bg-white text-[#766457] hover:text-[#241810] border border-[#EFE2CD] py-2.5 rounded-full font-bold text-xs transition-colors cursor-pointer"
              >
                Back to Karachi Bites Home
              </button>
            </div>
          </div>
        ) : (
          /* Form View */
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
            {serverError && (
              <div className="p-3.5 bg-red-50 border-2 border-red-500 rounded-2xl text-xs text-red-700 flex items-start gap-2.5 font-medium shadow-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                <span>{serverError}</span>
              </div>
            )}

            {/* Google Profile Card in Checkout */}
            {currentUser ? (
              <div className="p-3.5 bg-[#FFF8EA] border border-[#EFE2CD] rounded-2xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <UserAvatar user={currentUser} size="md" showGoogleRing={true} showOnlineBadge={true} />
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-[#241810] truncate flex items-center gap-1.5">
                      <span>{currentUser.name}</span>
                      <span className="text-[10px] text-[#2E7D32] font-bold bg-[#2E7D32]/10 border border-[#2E7D32]/30 px-2 py-0.2 rounded-full">
                        Google Verified
                      </span>
                    </div>
                    <div className="text-[11px] text-[#766457] truncate font-mono">{currentUser.email}</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenGoogleLogin}
                  className="text-[11px] text-[#C86314] hover:text-[#B8550D] hover:underline shrink-0 cursor-pointer font-bold"
                >
                  Switch
                </button>
              </div>
            ) : (
              <div className="p-3 bg-[#FFF8EA] border border-[#EFE2CD] rounded-2xl flex items-center justify-between gap-3 text-xs">
                <div className="text-[#766457]">
                  Sign in with Google to pre-fill your details?
                </div>
                <button
                  type="button"
                  onClick={onOpenGoogleLogin}
                  className="text-xs font-bold text-[#C86314] hover:underline cursor-pointer whitespace-nowrap"
                >
                  Sign In with Google
                </button>
              </div>
            )}

            {/* Branch Selection */}
            <div>
              <label className="block text-xs font-bold text-[#241810] mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#C86314]" />
                Fulfilling Kitchen Branch
              </label>
              <select
                value={selectedBranch.id}
                onChange={(e) => {
                  const b = branches.find(item => item.id === e.target.value);
                  if (b) onSelectBranch(b);
                }}
                className="w-full text-sm bg-[#FAF6ED] border border-[#EFE2CD] rounded-xl px-3 py-2.5 text-[#241810] focus:outline-none focus:ring-2 focus:ring-[#C86314]/25 focus:border-[#C86314]"
              >
                {branches.map(b => (
                  <option key={b.id} value={b.id} className="bg-white text-[#241810]">
                    {b.name} ({b.area} — {b.deliveryEstimate})
                  </option>
                ))}
              </select>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-[#241810] mb-1.5 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#766457]" />
                Customer Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g. Saad Asif"
                className={`w-full text-sm bg-[#FAF6ED] border rounded-xl px-3 py-2 text-[#241810] placeholder-[#8B776A] focus:outline-none focus:ring-2 ${
                  errors.name ? 'border-red-500 focus:ring-red-500/25' : 'border-[#EFE2CD] focus:ring-[#C86314]/25 focus:border-[#C86314]'
                }`}
              />
              {errors.name && (
                <p className="text-[11px] text-[#C86314] mt-1 font-medium">{errors.name}</p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-[#241810] mb-1.5 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#766457]" />
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="saadasif696@gmail.com"
                className="w-full text-sm bg-[#FAF6ED] border border-[#EFE2CD] rounded-xl px-3 py-2 text-[#241810] placeholder-[#8B776A] focus:outline-none focus:ring-2 focus:ring-[#C86314]/25 focus:border-[#C86314]"
              />
            </div>

            {/* Pakistani Mobile Phone */}
            <div>
              <label className="block text-xs font-bold text-[#241810] mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#766457]" />
                  Pakistani Mobile Number *
                </span>
                <span className="text-[11px] text-[#766457]">For SMS updates</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="03001234567"
                className={`w-full text-sm bg-[#FAF6ED] border rounded-xl px-3 py-2 text-[#241810] placeholder-[#8B776A] font-mono focus:outline-none focus:ring-2 ${
                  errors.phone ? 'border-red-500 focus:ring-red-500/25' : 'border-[#EFE2CD] focus:ring-[#C86314]/25 focus:border-[#C86314]'
                }`}
              />
              {errors.phone ? (
                <p className="text-[11px] text-[#C86314] mt-1 font-medium">{errors.phone}</p>
              ) : (
                <p className="text-[11px] text-[#766457] mt-1">Format: 03XX-XXXXXXX or 03XXXXXXXXX</p>
              )}
            </div>

            {/* Complete Address */}
            <div>
              <label className="block text-xs font-bold text-[#241810] mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#766457]" />
                Full Delivery Address *
              </label>
              <textarea
                rows={2}
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Apartment/House #, Street, Block/Phase, Landmark in Karachi..."
                className={`w-full text-sm bg-[#FAF6ED] border rounded-xl px-3 py-2 text-[#241810] placeholder-[#8B776A] focus:outline-none focus:ring-2 ${
                  errors.address ? 'border-red-500 focus:ring-red-500/25' : 'border-[#EFE2CD] focus:ring-[#C86314]/25 focus:border-[#C86314]'
                }`}
              />
              {errors.address && (
                <p className="text-[11px] text-[#C86314] mt-1 font-medium">{errors.address}</p>
              )}
            </div>

            {/* Special Notes */}
            <div>
              <label className="block text-xs font-medium text-[#766457] mb-1.5">
                Special Delivery Notes (Optional)
              </label>
              <input
                type="text"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="e.g. Extra mint raita, ring bell twice"
                className="w-full text-sm bg-[#FAF6ED] border border-[#EFE2CD] rounded-xl px-3 py-2 text-[#241810] placeholder-[#8B776A] focus:outline-none focus:ring-2 focus:ring-[#C86314]/25 focus:border-[#C86314]"
              />
            </div>

            {/* Summary Box */}
            <div className="p-3.5 bg-[#FFF8EA] rounded-2xl border border-[#EFE2CD] space-y-1.5 text-xs">
              <div className="flex justify-between text-[#766457]">
                <span>Items Subtotal</span>
                <span className="tabular-nums font-semibold text-[#241810]">Rs. {subtotal}</span>
              </div>
              <div className="flex justify-between text-[#766457]">
                <span>Flat Delivery Fee</span>
                <span className="tabular-nums font-semibold text-[#241810]">Rs. {deliveryFee}</span>
              </div>
              <div className="flex justify-between font-black text-sm text-[#241810] pt-2 border-t border-[#EFE2CD]">
                <span>Total Amount (Cash on Delivery)</span>
                <span className="text-[#C86314] tabular-nums">Rs. {total}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#C86314] hover:bg-[#B8550D] text-white py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[48px] disabled:opacity-60 disabled:cursor-not-allowed shadow-md active:scale-95"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying & Placing Order...
                </>
              ) : (
                <>
                  Confirm Order (Cash on Delivery)
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-[11px] text-center text-[#766457] flex items-center justify-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
              Safe Cash on Delivery at your doorstep
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
