import heroFeastImg from './assets/images/karachi_hero_feast_1791536033852.jpg';
import drinksRaitaImg from './assets/images/karachi_drinks_raita_1791536103023.jpg';
import tandoorBreadImg from './assets/images/karachi_tandoor_bread_1791536139799.jpg';
import logoImg from './assets/images/karachi_bites_logo_transparent.png';
import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductMarquee } from './components/ProductMarquee';
import { CategoryNav } from './components/CategoryNav';
import { FilterBar } from './components/FilterBar';
import { MenuGrid } from './components/MenuGrid';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { TrackOrderModal } from './components/TrackOrderModal';
import { AdminModal } from './components/AdminModal';
import { KitchenTicketModal } from './components/KitchenTicketModal';
import { GoogleAuthModal } from './components/GoogleAuthModal';
import { MenuItemModal } from './components/MenuItemModal';
import { LegalModal } from './components/LegalModal';
import { NotFoundModal } from './components/NotFoundModal';
import { MenuItem, CartItem, Branch, FilterState, Order, GoogleUser } from './types';
import { getMenu, getBranches } from './api';
import { ShoppingBag, ArrowRight, MapPin, Clock, AlertTriangle, ShieldCheck, Flame, Sparkles, Phone, Mail, HelpCircle, FileText } from 'lucide-react';

const DEFAULT_BRANCHES: Branch[] = [
  { id: 'clifton', name: 'Clifton', area: 'South Karachi', address: 'Block 4, Clifton, near Boat Basin, Karachi', phone: '021-35876543', deliveryEstimate: '30-40 min' },
  { id: 'gulshan', name: 'Gulshan-e-Iqbal', area: 'East Karachi', address: 'Block 13-B, Main University Road, Gulshan-e-Iqbal, Karachi', phone: '021-34987654', deliveryEstimate: '35-45 min' },
  { id: 'nazimabad', name: 'North Nazimabad', area: 'Central Karachi', address: 'Block H, Hydri Market, North Nazimabad, Karachi', phone: '021-36654321', deliveryEstimate: '40-50 min' }
];

export default function App() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [branches, setBranches] = useState<Branch[]>(DEFAULT_BRANCHES);
  const [selectedBranch, setSelectedBranch] = useState<Branch>(DEFAULT_BRANCHES[0]);
  const [loading, setLoading] = useState(true);
  const [menuError, setMenuError] = useState<string | null>(null);

  // Authentic Google User State
  const [currentUser, setCurrentUser] = useState<GoogleUser | null>(() => {
    try {
      const saved = localStorage.getItem('kb_google_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        parsed.picture = '';
        return parsed;
      }
      return {
        id: 'google-saad-696',
        name: 'Saad Asif',
        email: 'saadasif696@gmail.com',
        picture: '',
        given_name: 'Saad',
        family_name: 'Asif',
        verified_email: true
      };
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('kb_google_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('kb_google_user');
      }
    } catch (e) {
      console.error('Error saving google user', e);
    }
  }, [currentUser]);

  // Cart Persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kb_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('kb_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Combined Filters
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    search: '',
    vegOnly: false,
    spicyOnly: false,
    maxPrice: 2000
  });

  // Modal Views
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackOpen, setIsTrackOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [googleModalReason, setGoogleModalReason] = useState<string | undefined>();
  const [ticketOrder, setTicketOrder] = useState<Order | null>(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'contact' | 'faq' | null>(null);
  const [isNotFoundOpen, setIsNotFoundOpen] = useState(false);

  // Dynamic Document Title based on active view/modal
  useEffect(() => {
    if (isTrackOpen) {
      document.title = 'Track Order | Karachi Bites';
    } else if (isCheckoutOpen) {
      document.title = 'Order Checkout | Karachi Bites';
    } else if (isAdminOpen) {
      document.title = 'Staff Portal | Karachi Bites';
    } else if (selectedMenuItem) {
      document.title = `${selectedMenuItem.name} | Karachi Bites`;
    } else {
      document.title = 'Karachi Bites | Authentic Gourmet Pakistani Cuisine & Karahi';
    }
  }, [isTrackOpen, isCheckoutOpen, isAdminOpen, selectedMenuItem]);

  // Initial lookup state for tracking
  const [trackInitialData, setTrackInitialData] = useState<{ id: string; phone: string }>({ id: '', phone: '' });

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function showToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  }

  // Fetch Menu and Branches
  async function loadData() {
    setLoading(true);
    setMenuError(null);
    try {
      const [menuData, branchData] = await Promise.all([
        getMenu(),
        getBranches()
      ]);
      setMenu(menuData);
      if (branchData && branchData.length > 0) {
        setBranches(branchData);
        setSelectedBranch(prev => branchData.find(b => b.id === prev.id) || branchData[0]);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unable to connect to Karachi Bites server';
      setMenuError(msg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  // Cart Handlers
  function handleAddToCart(item: MenuItem) {
    if (!item.available) return;
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) {
        return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, {
        id: item.id,
        name: item.name,
        price: item.price,
        category: item.category,
        image: item.image,
        qty: 1
      }];
    });
    showToast(`Added ${item.name} to order bag`);
  }

  function handleUpdateQty(id: number, delta: number) {
    setCart(prev => {
      return prev.map(c => {
        if (c.id === id) {
          const newQty = c.qty + delta;
          return newQty > 0 ? { ...c, qty: newQty } : null;
        }
        return c;
      }).filter(Boolean) as CartItem[];
    });
  }

  function handleRemoveFromCart(id: number) {
    setCart(prev => prev.filter(c => c.id !== id));
  }

  function handleClearCart() {
    setCart([]);
  }

  // Proceed to Checkout with Google Auth Gate
  function handleProceedToCheckout() {
    setIsCartOpen(false);
    if (!currentUser) {
      setGoogleModalReason('Please sign in with Google to pre-fill your delivery details and proceed to checkout.');
      setIsGoogleModalOpen(true);
    } else {
      setIsCheckoutOpen(true);
    }
  }

  function handleGoogleLoginSuccess(user: GoogleUser) {
    setCurrentUser(user);
    showToast(`Signed in as ${user.name}`);
    if (cart.length > 0 && !isCheckoutOpen) {
      setIsCheckoutOpen(true);
    }
  }

  function handleGoogleLogout() {
    setCurrentUser(null);
    showToast('Signed out from Google account');
  }

  // Filter Logic
  const categories = useMemo(() => {
    return Array.from(new Set(menu.map(item => item.category)));
  }, [menu]);

  const categoryCounts = useMemo(() => {
    const counts: { [key: string]: number } = { all: menu.length };
    for (const item of menu) {
      counts[item.category] = (counts[item.category] || 0) + 1;
    }
    return counts;
  }, [menu]);

  const filteredItems = useMemo(() => {
    return menu.filter(item => {
      if (filters.category !== 'all' && item.category !== filters.category) {
        return false;
      }
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description?.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc) return false;
      }
      if (filters.vegOnly && item.tags !== 'veg') {
        return false;
      }
      if (filters.spicyOnly && item.tags !== 'spicy') {
        return false;
      }
      if (item.price > filters.maxPrice) {
        return false;
      }
      return true;
    });
  }, [menu, filters]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = 150;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6ED] text-[#241810] relative overflow-x-hidden selection:bg-[#D4AF37] selection:text-[#0C0E14] max-w-full">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#0C0E14] text-[#F8F6F0] text-xs px-5 py-2.5 rounded-full shadow-2xl pointer-events-none transition-all flex items-center gap-2 border border-[#D4AF37]/50 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <span className="w-2 h-2 rounded-full bg-[#2E7D32]" />
          {toastMessage}
        </div>
      )}

      {/* Top Header with Dark Obsidian & Luxury Gold Theme */}
      <Header
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTrack={() => {
          setTrackInitialData({ id: '', phone: '' });
          setIsTrackOpen(true);
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
        selectedBranch={selectedBranch}
        branches={branches}
        onSelectBranch={setSelectedBranch}
        currentUser={currentUser}
        onOpenGoogleLogin={() => {
          setGoogleModalReason(undefined);
          setIsGoogleModalOpen(true);
        }}
        onLogoutGoogle={handleGoogleLogout}
      />

      {/* Luxury Obsidian & Gold Hero */}
      <Hero
        branches={branches}
        selectedBranch={selectedBranch}
        onSelectBranch={setSelectedBranch}
        onOpenTrack={() => setIsTrackOpen(true)}
      />

      {/* Left-to-Right Continuous Auto-Scrolling Product Ribbon */}
      <ProductMarquee
        items={menu}
        cart={cart}
        onAddToCart={handleAddToCart}
        onViewItemDetails={(item) => setSelectedMenuItem(item)}
      />

      {/* Category Navigation Bar matching reference pill buttons */}
      <CategoryNav
        categories={categories}
        activeCategory={filters.category}
        onSelectCategory={(cat) => setFilters(prev => ({ ...prev, category: cat }))}
        categoryCounts={categoryCounts}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full" id="menu">
        {/* Filter Bar */}
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          onResetFilters={() => setFilters({
            category: 'all',
            search: '',
            vegOnly: false,
            spicyOnly: false,
            maxPrice: 2000
          })}
          resultCount={filteredItems.length}
          totalCount={menu.length}
        />

        {/* Loading and Error States */}
        {loading ? (
          <div className="py-24 text-center space-y-3">
            <div className="w-9 h-9 border-3 border-[#C86314] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-[#766457] font-medium tracking-wide">Preparing fresh Karachi menu...</p>
          </div>
        ) : menuError ? (
          <div className="p-8 bg-[#FFFDF8] border-2 border-red-300 rounded-3xl text-center space-y-3 shadow-md max-w-lg mx-auto">
            <AlertTriangle className="w-8 h-8 text-[#C86314] mx-auto animate-pulse" />
            <h3 className="text-base font-bold text-[#241810]">Unable to load menu</h3>
            <p className="text-xs text-[#766457]">{menuError}</p>
            <button
              onClick={loadData}
              className="px-6 py-2.5 bg-[#C86314] hover:bg-[#B8550D] text-white rounded-full text-xs font-bold cursor-pointer transition-all shadow-sm"
            >
              Retry Connection
            </button>
          </div>
        ) : (
          /* Responsive Tall Product Cards Grid */
          <MenuGrid
            items={filteredItems}
            cart={cart}
            onAddToCart={handleAddToCart}
            onUpdateQty={handleUpdateQty}
            activeCategory={filters.category}
            onViewItemDetails={(item) => setSelectedMenuItem(item)}
          />
        )}

        {/* Middle Feature Section: Our Heritage */}
        <section id="heritage" className="mt-16 bg-[#FFFDF8] border border-[#EFE2CD] rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 flex items-center gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-[#EFE2CD] shadow-xs">
                <img
                  src={heroFeastImg}
                  alt="Clay wok karahi preparation"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[11px] uppercase font-bold text-[#C86314] tracking-wider block">Our Heritage</span>
                <h3 className="text-lg font-black text-[#241810] leading-tight">Master Chefs of Karachi</h3>
                <p className="text-xs text-[#766457] mt-1">Slow-marinated in house spices & cooked fresh to order.</p>
              </div>
            </div>

            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t md:border-t-0 md:border-l border-[#EFE2CD] pt-6 md:pt-0 md:pl-6">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#0C0E14] text-[#D4AF37] flex items-center justify-center shrink-0 border border-[#D4AF37]/40 shadow-xs">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#241810]">100% Fresh Daily</h4>
                  <p className="text-[11px] text-[#766457] mt-0.5">Tender, mouthwatering flavour in every single bite</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#0C0E14] text-[#2E7D32] flex items-center justify-center shrink-0 border border-[#2E7D32]/40 shadow-xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#241810]">Halal Certified</h4>
                  <p className="text-[11px] text-[#766457] mt-0.5">Fresh prime meat prepared daily in our kitchens</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#0C0E14] text-[#D4AF37] flex items-center justify-center shrink-0 border border-[#D4AF37]/40 shadow-xs">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#241810]">Fast Dispatch</h4>
                  <p className="text-[11px] text-[#766457] mt-0.5">Thermal bag delivery across 3 city hubs</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Drinks & Accompaniments Pairings */}
        <section id="pairings" className="mt-12 bg-gradient-to-r from-[#FFF8EA] via-[#FFFDF8] to-[#FFF8EA] border border-[#EFE2CD] rounded-3xl p-6 sm:p-8 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-6 space-y-3">
              <span className="text-xs uppercase font-extrabold text-[#C86314] tracking-widest bg-white/80 px-3 py-1 rounded-full border border-[#EFE2CD] inline-block">
                Signature Pairings
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#241810] tracking-tight">
                Chilled Pakola, Mint Raita & Karak Doodh Patti
              </h3>
              <p className="text-sm text-[#766457] leading-relaxed">
                No Karachi feast is complete without cold glass-bottle Pakola, freshly whipped coriander-mint yogurt raita, and fragrant cardamom chai.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => setFilters(prev => ({ ...prev, category: 'Drinks' }))}
                  className="bg-[#C86314] hover:bg-[#B8550D] text-white px-5 py-2.5 rounded-full font-bold text-xs transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  View Drinks & Raita
                </button>
                <span className="text-xs font-semibold text-[#766457]">From Rs. 150</span>
              </div>
            </div>

            <div className="md:col-span-6 flex justify-center">
              <div className="relative rounded-2xl overflow-hidden border-2 border-white shadow-md max-w-sm">
                <img
                  src={drinksRaitaImg}
                  alt="Pakola bottle, mint raita, and karak chai"
                  loading="lazy"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Fresh Tandoor Bread Showcase */}
        <section className="mt-12 bg-[#FFFDF8] border border-[#EFE2CD] rounded-3xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            <div className="md:col-span-6 h-64 md:h-80 overflow-hidden">
              <img
                src={tandoorBreadImg}
                alt="Fresh piping hot tandoori roghani naan and lachha parathas"
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="md:col-span-6 p-6 sm:p-10 space-y-3">
              <span className="text-xs uppercase font-extrabold text-[#C86314] tracking-widest bg-[#FFF8EA] px-3 py-1 rounded-full border border-[#EFE2CD] inline-block">
                Baked To Order
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#241810]">
                Fresh Clay Tandoor Roghani Naan & Crispy Parathas
              </h3>
              <p className="text-sm text-[#766457] leading-relaxed">
                Slapped onto incandescent clay tandoor walls seconds before your order leaves our kitchen, brushed with pure desi ghee and toasted sesame seeds.
              </p>
              <div className="pt-2">
                <a
                  href="#menu"
                  className="inline-flex items-center gap-1.5 text-xs font-black text-[#C86314] hover:underline"
                >
                  Pair with your favourite Karahi or BBQ <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Mobile Sticky Bottom Cart Bar */}
      {cartCount > 0 && (
        <div className="sticky bottom-0 z-30 sm:hidden bg-[#0C0E14]/95 backdrop-blur-md border-t border-[#252834] p-3 shadow-2xl">
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="text-[11px] text-[#A89E8C] block leading-none">
                {cartCount} {cartCount === 1 ? 'item' : 'items'} in order bag
              </span>
              <span className="text-base font-bold text-white tabular-nums">
                Rs. {cartSubtotal + deliveryFee}
                <span className="text-[10px] font-normal text-[#8E867A] ml-1 font-mono">(inc. delivery)</span>
              </span>
            </div>

            <button
              id="mobile-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="bg-[#C86314] hover:bg-[#D48400] text-white px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer min-h-[44px] shadow-sm active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              View Bag
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Architectural Warm Footer with Luxury Gold Ribbon & Complete Links */}
      <footer id="contact" className="relative mt-20 text-xs bg-[#0C0E14] text-[#E0D7CB] border-t border-[#252834]">
        {/* Metallic Gold to Caramel Ribbon */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#D4AF37] via-[#C86314] to-[#D4AF37]" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Col 1: Brand Info & Clickable Logo */}
            <div>
              <div className="mb-4">
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-3 mb-3 transition-all group"
                  aria-label="Karachi Bites Home"
                >
                  <img
                    src={logoImg}
                    alt="Karachi Bites Official Logo"
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.currentTarget.src = "/logo.png"; }}
                    className="h-8 w-auto max-h-8 max-w-[36px] object-contain block shrink-0 drop-shadow-[0_2px_8px_rgba(212,175,55,0.25)] group-hover:scale-105 transition-transform"
                  />
                  <div className="flex flex-col justify-center leading-tight">
                    <span className="font-serif tracking-wider font-black text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#F5D77F] via-[#D4AF37] to-[#C86314] uppercase">
                      Karachi Bites
                    </span>
                    <span className="text-[9px] text-[#A89E8C] tracking-widest uppercase font-semibold">
                      Authentic Karachi Kitchen · Est. 2026
                    </span>
                  </div>
                </a>
              </div>
              <p className="leading-relaxed text-[#A89E8C]">
                Traditional Shinwari Karahi, hand-rolled Parathas, and spiced grill specialists serving Karachiites across Clifton, Gulshan-e-Iqbal, and North Nazimabad.
              </p>
              <div className="mt-4 flex items-center gap-2 text-[11px] text-[#D4AF37] font-semibold bg-[#141722] border border-[#2B2F3E] px-3.5 py-1.5 rounded-full w-fit">
                <Clock className="w-3.5 h-3.5" />
                Open daily: 12:00 PM – 2:00 AM (PKT)
              </div>
            </div>

            {/* Col 2: Kitchen Hubs with Clickable Phone Numbers */}
            <div id="branches">
              <h4 className="font-bold text-sm text-white mb-3 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                Kitchen Hubs in Karachi
              </h4>
              <ul className="space-y-3">
                {branches.map(b => (
                  <li key={b.id} className="text-[#A89E8C] leading-snug">
                    <strong className="text-white font-bold">{b.name}:</strong> {b.address}
                    <div className="text-[11px] text-[#D4AF37] font-mono mt-0.5 flex items-center gap-2">
                      <span>{b.deliveryEstimate} delivery</span>
                      <span>·</span>
                      <a href={`tel:+92${b.phone.replace(/[^0-9]/g, '')}`} className="hover:underline text-white font-bold">
                        {b.phone}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Support & Hotlines */}
            <div>
              <h4 className="font-bold text-sm text-white mb-3 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                Support & Direct Hotlines
              </h4>
              <div className="space-y-2 font-mono text-xs text-[#A89E8C]">
                <div className="flex items-center justify-between">
                  <span>Clifton Hotline:</span>
                  <a href="tel:+922135876543" className="text-white font-bold hover:text-[#D4AF37] transition-colors">
                    021-35876543
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span>Gulshan Hotline:</span>
                  <a href="tel:+922134987654" className="text-white font-bold hover:text-[#D4AF37] transition-colors">
                    021-34987654
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span>Nazimabad Hotline:</span>
                  <a href="tel:+922136654321" className="text-white font-bold hover:text-[#D4AF37] transition-colors">
                    021-36654321
                  </a>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-[#202432]">
                  <span>WhatsApp Orders:</span>
                  <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="text-[#2E7D32] font-bold hover:underline">
                    +92 300 1234567
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span>Support Email:</span>
                  <a href="mailto:contact@karachibites.pk" className="text-[#D4AF37] hover:underline">
                    contact@karachibites.pk
                  </a>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1.5 cursor-pointer font-bold transition-colors bg-[#141722] border border-[#2B2F3E] px-3 py-1.5 rounded-full"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Staff Order Portal
                </button>
                <button
                  onClick={() => setIsNotFoundOpen(true)}
                  className="text-xs text-[#8E867A] hover:text-[#D4AF37] transition-colors cursor-pointer"
                  title="Test 404 handler"
                >
                  View 404 Page
                </button>
              </div>
            </div>
          </div>

          {/* Quick Legal & Help Links */}
          <div className="pt-6 border-t border-[#202432] flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-4 text-[#8E867A]">
              <button
                onClick={() => setLegalModalType('privacy')}
                className="hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <span>·</span>
              <button
                onClick={() => setLegalModalType('terms')}
                className="hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
              <span>·</span>
              <button
                onClick={() => setLegalModalType('contact')}
                className="hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                Contact & Hubs
              </button>
              <span>·</span>
              <button
                onClick={() => setLegalModalType('faq')}
                className="hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                FAQs
              </button>
            </div>

            <div className="text-[#8E867A] font-mono text-[11px]">
              Flat Delivery Rs. 150 · Real-time Status Tracker · Verified Google OAuth
            </div>
          </div>

          {/* Copyright bar with dynamic year */}
          <div className="pt-4 border-t border-[#202432] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#7E766A]">
            <p>© {new Date().getFullYear()} Karachi Bites. All rights reserved. Cash on Delivery.</p>
            <p>Crafted for authentic Karachi cuisine enthusiasts across Sindh, Pakistan.</p>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onProceedToCheckout={handleProceedToCheckout}
        deliveryFee={deliveryFee}
        currentUser={currentUser}
      />

      {/* Google Sign-In Modal */}
      <GoogleAuthModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        onLoginSuccess={handleGoogleLoginSuccess}
        currentUser={currentUser}
        onLogout={handleGoogleLogout}
        reason={googleModalReason}
      />

      {/* Item Details Modal */}
      <MenuItemModal
        item={selectedMenuItem}
        onClose={() => setSelectedMenuItem(null)}
        cart={cart}
        onAddToCart={handleAddToCart}
        onUpdateQty={handleUpdateQty}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        selectedBranch={selectedBranch}
        branches={branches}
        onSelectBranch={setSelectedBranch}
        deliveryFee={deliveryFee}
        onOrderSuccess={(orderId, phone) => {
          setTrackInitialData({ id: orderId, phone });
          setIsTrackOpen(true);
        }}
        onClearCart={handleClearCart}
        currentUser={currentUser}
        onOpenGoogleLogin={() => {
          setIsCheckoutOpen(false);
          setIsGoogleModalOpen(true);
        }}
      />

      {/* Track Order Modal */}
      <TrackOrderModal
        isOpen={isTrackOpen}
        onClose={() => setIsTrackOpen(false)}
        initialOrderId={trackInitialData.id}
        initialPhone={trackInitialData.phone}
        currentUser={currentUser}
      />

      {/* Admin Operations Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        menu={menu}
        onRefreshMenu={loadData}
        onPrintTicket={(order) => setTicketOrder(order)}
      />

      {/* Kitchen Ticket Printable Modal */}
      <KitchenTicketModal
        order={ticketOrder}
        onClose={() => setTicketOrder(null)}
      />

      {/* Legal & Contact Modal */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* Custom 404 Modal */}
      <NotFoundModal
        isOpen={isNotFoundOpen}
        onReturnHome={() => setIsNotFoundOpen(false)}
      />
    </div>
  );
}
