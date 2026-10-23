import React from 'react';
import { X, ShieldCheck, FileText, Phone, Mail, HelpCircle, MapPin } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | 'contact' | 'faq' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#12151E] border-2 border-[#D4AF37]/50 rounded-3xl max-w-xl w-full max-h-[85vh] flex flex-col text-white shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#252834] flex items-center justify-between bg-[#151924]">
          <div className="flex items-center gap-2.5">
            {type === 'privacy' && <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />}
            {type === 'terms' && <FileText className="w-5 h-5 text-[#D4AF37]" />}
            {type === 'contact' && <Phone className="w-5 h-5 text-[#D4AF37]" />}
            {type === 'faq' && <HelpCircle className="w-5 h-5 text-[#D4AF37]" />}
            <h3 className="text-base sm:text-lg font-black text-white capitalize">
              {type === 'privacy' && 'Privacy Policy'}
              {type === 'terms' && 'Terms of Service'}
              {type === 'contact' && 'Contact & Kitchen Hotlines'}
              {type === 'faq' && 'Frequently Asked Questions'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#252A3A] text-[#8E867A] hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#C5BDB0] leading-relaxed">
          {type === 'privacy' && (
            <>
              <p>
                <strong>Karachi Bites</strong> values your privacy. This policy outlines how we handle customer data for online delivery across Karachi.
              </p>
              <h4 className="text-white font-bold text-sm mt-3">1. Information We Collect</h4>
              <p>
                When placing an order or signing in with Google, we collect your name, Pakistani mobile number, delivery address in Karachi, and email address to fulfill orders and provide live GPS/order tracking.
              </p>
              <h4 className="text-white font-bold text-sm mt-3">2. Data Security</h4>
              <p>
                Your phone numbers and address information are strictly used by our kitchen staff and dedicated dispatch riders for order fulfillment. We never sell or share customer personal information with external advertisers.
              </p>
              <h4 className="text-white font-bold text-sm mt-3">3. Payment Privacy</h4>
              <p>
                All deliveries operate on a Cash on Delivery (COD) basis. No credit card details or bank passwords are required or stored on our servers.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <p>
                Welcome to Karachi Bites online ordering platform. By placing an order, you agree to the following terms:
              </p>
              <h4 className="text-white font-bold text-sm mt-3">1. Order Placement & Dispatch</h4>
              <p>
                All orders are prepared fresh upon receipt. Kitchen prep times average 25–35 minutes followed by thermal bag rider dispatch.
              </p>
              <h4 className="text-white font-bold text-sm mt-3">2. Delivery Fee & Areas</h4>
              <p>
                A flat delivery fee of Rs. 150 applies to all orders fulfilled by our Clifton, Gulshan-e-Iqbal, and North Nazimabad kitchen hubs. Customers must provide an accessible address and active contact number.
              </p>
              <h4 className="text-white font-bold text-sm mt-3">3. Cancellations</h4>
              <p>
                Orders can be modified or cancelled within 5 minutes of placement before our master chefs begin tandoor and wok preparation.
              </p>
            </>
          )}

          {type === 'contact' && (
            <div className="space-y-4">
              <p>
                Need assistance with an existing order or want to book catering for corporate events and weddings in Karachi? Contact our kitchen managers directly:
              </p>
              <div className="bg-[#181B26] p-4 rounded-2xl border border-[#2B2F3E] space-y-3 font-mono">
                <div className="flex items-center justify-between">
                  <span>Clifton Kitchen Hub:</span>
                  <a href="tel:+922135876543" className="text-[#D4AF37] font-bold hover:underline">
                    +92 21 35876543
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span>Gulshan-e-Iqbal Hub:</span>
                  <a href="tel:+922134987654" className="text-[#D4AF37] font-bold hover:underline">
                    +92 21 34987654
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span>North Nazimabad Hub:</span>
                  <a href="tel:+922136654321" className="text-[#D4AF37] font-bold hover:underline">
                    +92 21 36654321
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span>Official Email:</span>
                  <a href="mailto:contact@karachibites.pk" className="text-[#D4AF37] font-bold hover:underline">
                    contact@karachibites.pk
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span>WhatsApp Hotline:</span>
                  <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="text-[#2E7D32] font-bold hover:underline">
                    +92 300 1234567
                  </a>
                </div>
              </div>
            </div>
          )}

          {type === 'faq' && (
            <div className="space-y-3">
              <div>
                <h4 className="text-white font-bold text-sm">How long does delivery take?</h4>
                <p className="mt-1">Average delivery time is 30–45 minutes depending on your distance from our Clifton, Gulshan, or Nazimabad kitchen.</p>
              </div>
              <div className="pt-2 border-t border-[#252834]">
                <h4 className="text-white font-bold text-sm">Are your meats 100% Halal certified?</h4>
                <p className="mt-1">Yes, all chicken, mutton, and beef cuts are 100% Halal, slaughtered fresh daily, and slow marinated with authentic regional spices.</p>
              </div>
              <div className="pt-2 border-t border-[#252834]">
                <h4 className="text-white font-bold text-sm">What payment methods are supported?</h4>
                <p className="mt-1">We accept Cash on Delivery (COD) as well as direct mobile bank transfers upon rider arrival.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#252834] bg-[#151924] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#1A1E2A] hover:bg-[#252A3A] text-white text-xs font-bold border border-[#2B2F3E] cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
