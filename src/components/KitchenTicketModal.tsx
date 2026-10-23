import React from 'react';
import { X, Printer } from 'lucide-react';
import { Order } from '../types';

interface KitchenTicketModalProps {
  order: Order | null;
  onClose: () => void;
}

export const KitchenTicketModal: React.FC<KitchenTicketModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  function handlePrint() {
    window.print();
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#241810]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FFFDF8] rounded-3xl max-w-sm w-full border border-[#EFE2CD] shadow-2xl overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-[#EFE2CD] flex items-center justify-between bg-[#FFF8EA] no-print">
          <span className="text-xs font-bold text-[#241810]">Kitchen Print Slip</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 text-xs font-bold bg-[#C86314] hover:bg-[#B8550D] text-white rounded-full inline-flex items-center gap-1.5 cursor-pointer transition-all shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-[#241810] rounded-xl hover:bg-[#FAF6ED] cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Thermal Receipt Slip */}
        <div className="p-6 font-mono text-xs space-y-4 text-black bg-white" id="kitchen-ticket">
          <div className="text-center space-y-1 border-b border-black/40 pb-3">
            <h2 className="text-base font-bold uppercase tracking-wider">KARACHI BITES</h2>
            <p className="text-[11px]">KITCHEN DISPATCH TICKET</p>
            <p className="text-[11px] font-bold">BRANCH: {order.branch.toUpperCase()}</p>
          </div>

          <div className="space-y-1 border-b border-black/40 pb-3">
            <div className="flex justify-between">
              <span>ORDER ID:</span>
              <span className="font-bold">{order.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span>DATE/TIME:</span>
              <span>{new Date(order.created_at).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>CUSTOMER:</span>
              <span className="font-bold">{order.customer.name}</span>
            </div>
            <div className="flex justify-between">
              <span>PHONE:</span>
              <span>{order.customer.phone}</span>
            </div>
            <div>
              <span>ADDRESS:</span>
              <p className="font-sans text-[11px] mt-0.5">{order.customer.address}</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="space-y-2 border-b border-black/40 pb-3">
            <div className="flex justify-between font-bold border-b border-black/20 pb-1">
              <span>QTY / ITEM</span>
              <span>AMOUNT</span>
            </div>
            {order.items.map((it, idx) => (
              <div key={idx} className="flex justify-between">
                <span>{it.qty}x {it.name || `Item #${it.id}`}</span>
                <span>Rs. {(it.price || 0) * it.qty}</span>
              </div>
            ))}
          </div>

          {order.notes && (
            <div className="border-b border-black/40 pb-3">
              <span className="font-bold">KITCHEN INSTRUCTIONS:</span>
              <p className="mt-0.5 italic">{order.notes}</p>
            </div>
          )}

          <div className="space-y-1 pt-1">
            <div className="flex justify-between">
              <span>SUBTOTAL:</span>
              <span>Rs. {order.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>DELIVERY FEE:</span>
              <span>Rs. {order.deliveryFee || 150}</span>
            </div>
            <div className="flex justify-between font-bold text-sm pt-1 border-t border-black/30">
              <span>GRAND TOTAL:</span>
              <span>Rs. {order.total}</span>
            </div>
          </div>

          <div className="text-center pt-3 text-[10px] border-t border-dashed border-black/40">
            *** CASH ON DELIVERY ***<br />
            Verify rider cash before handing delivery bag.
          </div>
        </div>
      </div>
    </div>
  );
};
