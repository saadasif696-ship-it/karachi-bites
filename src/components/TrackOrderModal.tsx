import React, { useState, useEffect, useRef } from 'react';
import { X, Search, Clock, Truck, ChefHat, PackageCheck, AlertCircle, Loader2, RefreshCw, MapPin } from 'lucide-react';
import { Order, GoogleUser } from '../types';
import { getOrder } from '../api';
import { UserAvatar } from './UserAvatar';
import gsap from 'gsap';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
  initialPhone?: string;
  currentUser: GoogleUser | null;
}

const STEPS = [
  { key: 'Received', label: 'Order Received', desc: 'Sent to Kitchen', icon: Clock },
  { key: 'Preparing', label: 'Preparing', desc: 'Karahi & dishes freshly cooking', icon: ChefHat },
  { key: 'Out for Delivery', label: 'Dispatched', desc: 'Rider on the way', icon: Truck },
  { key: 'Delivered', label: 'Delivered', desc: 'Delivered to your door', icon: PackageCheck }
];

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({
  isOpen,
  onClose,
  initialOrderId = '',
  initialPhone = '',
  currentUser
}) => {
  const [orderId, setOrderId] = useState(initialOrderId);
  const [phone, setPhone] = useState(initialPhone);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const progressBarRef = useRef<HTMLDivElement>(null);
  const activeIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialOrderId) {
      setOrderId(initialOrderId);
      if (initialPhone) setPhone(initialPhone);
      handleLookup(initialOrderId, initialPhone);
    }
  }, [initialOrderId, initialPhone]);

  // GSAP 90 FPS Animation for Glowing Neon Lava-Orange Order Timeline
  useEffect(() => {
    if (!order || !progressBarRef.current) return;

    let targetWidth = '15%';
    if (order.status === 'Preparing') targetWidth = '45%';
    if (order.status === 'Out for Delivery') targetWidth = '75%';
    if (order.status === 'Delivered') targetWidth = '100%';

    // Animate glowing neon lava-orange progress line
    gsap.fromTo(
      progressBarRef.current,
      { width: '0%', opacity: 0.8 },
      {
        width: targetWidth,
        opacity: 1,
        duration: 1.1,
        ease: 'power3.out'
      }
    );

    // Continuous 90 FPS pulsing glow effect on active status icon
    if (activeIconRef.current) {
      const pulseTween = gsap.to(activeIconRef.current, {
        scale: 1.14,
        boxShadow: '0 0 24px rgba(255, 69, 0, 0.95), 0 0 45px rgba(247, 196, 78, 0.75)',
        repeat: -1,
        yoyo: true,
        duration: 0.7,
        ease: 'sine.inOut'
      });

      return () => {
        pulseTween.kill();
      };
    }
  }, [order?.status]);

  if (!isOpen) return null;

  async function handleLookup(overrideId?: string, overridePhone?: string) {
    const targetId = overrideId || orderId;
    const targetPhone = overridePhone !== undefined ? overridePhone : phone;

    if (!targetId.trim()) {
      setError('Please enter an Order ID (e.g., KB-2610-6622)');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await getOrder(targetId.trim(), targetPhone.trim() || undefined);
      if (res.success && res.order) {
        setOrder(res.order);
      } else {
        setError(res.error || 'Order not found. Please verify your Order ID.');
        setOrder(null);
      }
    } catch {
      setError('Could not reach the server to track order.');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  }

  function getStepStatus(stepKey: string, currentStatus: string) {
    const stepOrder = ['Received', 'Preparing', 'Out for Delivery', 'Delivered'];
    const currentIndex = stepOrder.indexOf(currentStatus);
    const stepIndex = stepOrder.indexOf(stepKey);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#241810]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#FFFDF8] rounded-3xl max-w-xl w-full border border-[#EFE2CD] shadow-2xl overflow-hidden my-4 sm:my-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#EFE2CD] flex items-center justify-between bg-[#FFF8EA]">
          <div className="flex items-center gap-2.5 sm:gap-3">
            {currentUser && (
              <UserAvatar user={currentUser} size="sm" showGoogleRing={true} />
            )}
            <div>
              <h2 className="text-base sm:text-xl font-black text-[#241810] leading-tight">
                Live Order Tracker
              </h2>
              <p className="text-[11px] sm:text-xs text-[#766457] mt-0.5">
                {currentUser ? `Orders for ${currentUser.name}` : 'Real-time kitchen & dispatch status across Karachi'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-[#241810] rounded-xl hover:bg-[#FAF6ED] transition-colors cursor-pointer"
            aria-label="Close Tracker"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
          {/* Lookup Input Form */}
          <div className="bg-[#FAF6ED] p-3.5 sm:p-4.5 rounded-2xl border border-[#EFE2CD] space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-[#241810] mb-1">
                  Order ID *
                </label>
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g. KB-2610-6622"
                  className="w-full text-xs font-mono bg-white border border-[#EFE2CD] rounded-xl px-3 py-2 text-[#241810] focus:outline-none focus:ring-2 focus:ring-[#C86314]/25 focus:border-[#C86314] placeholder-[#A58E7A]"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-[#241810] mb-1 flex items-center justify-between">
                  <span>Customer Phone</span>
                  <span className="text-[10px] text-[#766457] font-normal">Optional</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="03001234567"
                  className="w-full text-xs font-mono bg-white border border-[#EFE2CD] rounded-xl px-3 py-2 text-[#241810] focus:outline-none focus:ring-2 focus:ring-[#C86314]/25 focus:border-[#C86314] placeholder-[#A58E7A]"
                />
              </div>
            </div>

            <button
              onClick={() => handleLookup()}
              disabled={loading}
              className="w-full bg-[#C86314] hover:bg-[#B8550D] text-white py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-60 min-h-[42px]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Checking Order Status...
                </>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5" />
                  Find My Order
                </>
              )}
            </button>

            {/* Quick Demo Hint */}
            <div className="text-[11px] text-[#766457] text-center pt-0.5">
              Want to see a live order in action? Try Demo ID:{' '}
              <button
                type="button"
                onClick={() => {
                  setOrderId('KB-8841-DEMO');
                  setPhone('03001234567');
                  handleLookup('KB-8841-DEMO', '03001234567');
                }}
                className="text-[#C86314] font-mono underline hover:text-[#B8550D] font-bold cursor-pointer transition-colors"
              >
                KB-8841-DEMO
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-3.5 bg-red-50 border-2 border-red-500 rounded-2xl text-xs text-red-700 flex items-start gap-2.5 font-medium shadow-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Tracking Result View */}
          {order && (
            <div className="space-y-5 sm:space-y-6">
              {/* Order Metadata Box */}
              <div className="bg-[#FFF8EA] border border-[#EFE2CD] rounded-2xl p-3.5 sm:p-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#766457]">Order:</span>
                    <span className="font-mono font-bold text-sm text-[#241810]">{order.orderId}</span>
                  </div>
                  <div className="text-xs text-[#766457] mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C86314]" />
                    Branch: <strong className="text-[#241810] font-semibold">{order.branch}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLookup()}
                    className="p-1.5 text-[#766457] hover:text-[#241810] bg-white border border-[#EFE2CD] rounded-lg text-xs inline-flex items-center gap-1 cursor-pointer transition-colors"
                    title="Refresh Status"
                  >
                    <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                  </button>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/30">
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Glowing Neon 4-Step Order Timeline with GSAP & Mobile 360px support */}
              <div className="py-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#766457]">
                    Status Progression (Received → Delivered)
                  </h4>
                  <span className="text-[11px] font-mono text-[#C86314] font-black">
                    {order.status === 'Delivered' ? '100% Complete' : order.status === 'Out for Delivery' ? '75% Dispatched' : order.status === 'Preparing' ? '45% In Kitchen' : '15% Received'}
                  </span>
                </div>

                {/* Glowing Neon Lava-Orange Progress Track */}
                <div className="relative w-full h-3.5 bg-[#FAF6ED] rounded-full overflow-hidden border border-[#EFE2CD] shadow-inner p-0.5">
                  <div
                    ref={progressBarRef}
                    className="h-full rounded-full bg-gradient-to-r from-[#FFB300] via-[#FF5722] to-[#FF3D00] shadow-[0_0_18px_#FF5722,0_0_35px_#FF3D00]"
                    style={{ width: '15%' }}
                  />
                </div>

                {/* 4 Steps Grid - 2 columns on 360px mobile, 4 columns on desktop */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 pt-1">
                  {STEPS.map((step) => {
                    const statusType = getStepStatus(step.key, order.status);
                    const StepIcon = step.icon;

                    let bgClass = 'bg-[#FAF6ED] border-[#EFE2CD] text-stone-500';
                    let iconBg = 'bg-white text-stone-400 border border-[#EFE2CD]';

                    if (statusType === 'completed') {
                      bgClass = 'bg-[#2E7D32]/10 border-[#2E7D32]/40 text-[#241810]';
                      iconBg = 'bg-[#2E7D32] text-white font-bold shadow-xs';
                    } else if (statusType === 'current') {
                      bgClass = 'bg-[#FFF8EA] border-[#FF5722] text-[#241810] ring-2 ring-[#FF5722]/50 shadow-md';
                      iconBg = 'bg-[#FF5722] text-white shadow-[0_0_20px_rgba(255,87,34,0.95)]';
                    }

                    return (
                      <div
                        key={step.key}
                        className={`p-2.5 sm:p-3.5 rounded-2xl border flex flex-col items-center text-center transition-all ${bgClass}`}
                      >
                        <div
                          ref={statusType === 'current' ? activeIconRef : undefined}
                          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center mb-1.5 sm:mb-2 transition-transform ${iconBg}`}
                        >
                          <StepIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                        <span className="text-[11px] sm:text-xs font-black leading-tight text-[#241810]">{step.label}</span>
                        <span className="text-[9px] sm:text-[10px] text-[#766457] mt-0.5 leading-snug line-clamp-1 sm:line-clamp-none">{step.desc}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Items Breakdown */}
              <div className="border border-[#EFE2CD] rounded-2xl overflow-hidden text-xs bg-white">
                <div className="bg-[#FFF8EA] px-4 py-2.5 font-bold text-[#241810] border-b border-[#EFE2CD]">
                  Order Items Breakdown
                </div>
                <div className="divide-y divide-[#EFE2CD] p-3.5 sm:p-4 space-y-2">
                  {order.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between items-center pt-1">
                      <div>
                        <span className="font-semibold text-[#241810]">{it.name || `Item #${it.id}`}</span>
                        <span className="text-stone-500 ml-2">× {it.qty}</span>
                      </div>
                      <span className="font-bold text-[#241810] tabular-nums">
                        Rs. {(it.price || 0) * it.qty}
                      </span>
                    </div>
                  ))}

                  <div className="pt-2 border-t border-[#EFE2CD] flex justify-between text-[#766457]">
                    <span>Delivery Fee:</span>
                    <span className="tabular-nums font-semibold text-[#241810]">Rs. {order.deliveryFee || 150}</span>
                  </div>

                  <div className="flex justify-between font-black text-sm text-[#241810] pt-1.5">
                    <span>Total Amount:</span>
                    <span className="text-[#C86314] tabular-nums">Rs. {order.total}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
