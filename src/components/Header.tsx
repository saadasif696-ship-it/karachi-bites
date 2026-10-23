import logoImage from '../assets/images/karachi_bites_logo_transparent.png';
import React, { useState } from 'react';
import { ShoppingBag, ShieldCheck, MapPin, LogOut, ChevronDown, Sparkles, Package, Menu, X, Phone, Mail } from 'lucide-react';
import { Branch, GoogleUser } from '../types';
import { UserAvatar } from './UserAvatar';

interface HeaderProps {
  cartCount: number;
  cartSubtotal: number;
  onOpenCart: () => void;
  onOpenTrack: () => void;
  onOpenAdmin: () => void;
  selectedBranch: Branch;
  branches: Branch[];
  onSelectBranch: (branch: Branch) => void;
  currentUser: GoogleUser | null;
  onOpenGoogleLogin: () => void;
  onLogoutGoogle: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartSubtotal,
  onOpenCart,
  onOpenTrack,
  onOpenAdmin,
  selectedBranch,
  branches,
  onSelectBranch,
  currentUser,
  onOpenGoogleLogin,
  onLogoutGoogle
}) => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isClifton = selectedBranch.id === 'clifton';

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#1A1A2E]/95 backdrop-blur-md border-b border-[#D4A017]/20 transition-all shadow-lg">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo & Branch Tag */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            {/* Clickable Brand Logo pointing to homepage */}
            <a
              href="/"
              onClick={handleLogoClick}
              className="flex items-center group cursor-pointer shrink-0"
              aria-label="Karachi Bites Homepage"
            >
              <div className="flex items-center gap-2 py-1 px-1 rounded-lg transition-all">
                <img
                  src={logoImage}
                  alt="Karachi Bites Emblem"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "/logo.png";
                  }}
                  className="h-8 w-auto max-h-8 max-w-[36px] object-contain block shrink-0 drop-shadow-[0_2px_6px_rgba(212,175,55,0.25)] group-hover:scale-105 transition-transform"
                />
                <div className="flex flex-col justify-center leading-tight">
                  <span className="font-serif tracking-wider font-extrabold text-xs sm:text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#F5D061] via-[#D4A017] to-[#C1121F] uppercase">
                    Karachi Bites
                  </span>
                  <span className="text-[8px] sm:text-[9px] text-[#A89E8C] tracking-widest uppercase font-medium">
                    Spice Route
                  </span>
                </div>
              </div>
            </a>

            {/* Branch Selector: Sleek Obsidian & Metallic Gold theme */}
            <div className="relative">
              <button
                onClick={() => setBranchDropdownOpen(!branchDropdownOpen)}
                className={`inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-bold px-2.5 sm:px-3.5 py-1.5 rounded-full border shadow-sm transition-all cursor-pointer ${
                  isClifton
                    ? 'bg-[#D4A017]/10 hover:bg-[#D4A017]/20 text-[#D4A017] border-[#D4A017]/70 ring-1 ring-[#D4A017]/30'
                    : 'bg-[#2D2D44] text-[#E0D7CB] border-[#4A4D6B] hover:bg-[#3A3D5B]'
                }`}
                title="Click to switch kitchen branch"
              >
                <MapPin className={`w-3.5 h-3.5 ${isClifton ? 'text-[#D4A017]' : 'text-[#C1121F]'}`} />
                <span className={isClifton ? 'text-[#D4A017] font-black' : 'text-[#E0D7CB]'}>
                  {selectedBranch.name}
                </span>
                <span className="hidden sm:inline text-[#8E867A]">
                  · {selectedBranch.deliveryEstimate}
                </span>
                <ChevronDown className="w-3 h-3 text-[#8E867A]" />
              </button>

              {/* Branch Selection Dropdown */}
              {branchDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-[#2D2D44] border border-[#4A4D6B] rounded-2xl shadow-2xl py-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3.5 py-1.5 text-[10px] uppercase font-black text-[#A89E8C] border-b border-[#3A3D5B]">
                    Select Kitchen Branch
                  </div>
                  {branches.map((b) => {
                    const isCurrent = b.id === selectedBranch.id;
                    return (
                      <button
                        key={b.id}
                        onClick={() => {
                          onSelectBranch(b);
                          setBranchDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between transition-colors cursor-pointer ${
                          isCurrent
                            ? 'bg-[#D4A017]/10 text-[#D4A017] font-black'
                            : 'hover:bg-[#3A3D5B] text-[#E0D7CB]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#D4A017]" />
                          <span>{b.name}</span>
                        </div>
                        <span className="text-[10px] text-[#A89E8C]">
                          {b.deliveryEstimate}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-[#E0D7CB]">
            <a
              href="#menu"
              className="hover:text-[#D4A017] transition-colors py-1 relative group"
            >
              Menu
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4A017] transition-all group-hover:w-full"></span>
            </a>
            <button
              onClick={onOpenTrack}
              className="hover:text-[#D4A017] transition-colors cursor-pointer py-1 flex items-center gap-1.5"
            >
              <Package className="w-4 h-4 text-[#D4A017]" />
              Track Order
            </button>
            <button
              onClick={onOpenAdmin}
              className="hover:text-[#D4A017] transition-colors flex items-center gap-1.5 cursor-pointer py-1 text-[#A89E8C]"
            >
              <ShieldCheck className="w-4 h-4 text-[#A89E8C]" />
              Staff Portal
            </button>
            <a
              href="tel:+922135876543"
              className="text-xs text-[#A89E8C] hover:text-[#D4A017] transition-colors flex items-center gap-1 font-mono"
            >
              <Phone className="w-3.5 h-3.5" />
              021-35876543
            </a>
          </nav>

          {/* Actions: Google Profile + Cart + Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* User Profile Area */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 sm:gap-2 p-1 pl-1.5 pr-2 sm:pr-2.5 rounded-full bg-[#2D2D44] hover:bg-[#3A3D5B] border border-[#4A4D6B] hover:border-[#D4A017] transition-all cursor-pointer shadow-sm active:scale-95"
                  aria-label="User Account Menu"
                >
                  <UserAvatar user={currentUser} size="sm" showGoogleRing={true} showOnlineBadge={true} />

                  <div className="hidden sm:flex flex-col text-left leading-none">
                    <span className="text-xs font-bold text-white max-w-[100px] truncate">
                      {currentUser.given_name || currentUser.name.split(' ')[0]}
                    </span>
                    <span className="text-[10px] text-[#D4A017] font-bold">Google</span>
                  </div>

                  <ChevronDown className="w-3.5 h-3.5 text-[#8E867A]" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-[#2D2D44] border border-[#4A4D6B] rounded-2xl shadow-2xl py-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-3 border-b border-[#3A3D5B] bg-[#3A3D5B]">
                      <div className="flex items-center gap-3">
                        <UserAvatar user={currentUser} size="lg" showGoogleRing={true} showOnlineBadge={true} />
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-white text-sm truncate">{currentUser.name}</div>
                          <div className="text-[11px] text-[#A89E8C] truncate font-mono mt-0.5">{currentUser.email}</div>
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#2E7D32] bg-[#2E7D32]/10 border border-[#2E7D32]/30 px-2 py-0.5 rounded-full mt-1.5">
                            Verified Google Account
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onOpenTrack();
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-[#1C2130] text-[#C5BDB0] hover:text-[#D4AF37] cursor-pointer font-semibold flex items-center justify-between transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <Package className="w-3.5 h-3.5 text-[#D4A017]" />
                          My Orders & Live Tracking
                        </span>
                        <span className="text-[10px] text-[#A89E8C] font-mono">Live</span>
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onOpenGoogleLogin();
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-[#1C2130] text-[#C5BDB0] hover:text-[#D4AF37] cursor-pointer font-semibold flex items-center gap-2 transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                        Switch Account
                      </button>
                    </div>

                    <div className="pt-1 border-t border-[#242838]">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onLogoutGoogle();
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-red-950/40 text-red-400 flex items-center gap-2 cursor-pointer font-bold transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out of Google
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenGoogleLogin}
                className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#141722] hover:bg-[#1C2130] text-white border border-[#2B2F3E] hover:border-[#D4AF37] px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer min-h-[38px] shadow-sm active:scale-95"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span className="hidden sm:inline">Google Sign-In</span>
                <span className="sm:hidden text-[11px]">Sign In</span>
              </button>
            )}

            {/* Shopping Bag Button */}
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              aria-label={`Shopping Cart with ${cartCount} items`}
              className="relative flex items-center gap-1.5 sm:gap-2 bg-[#C1121F] hover:bg-[#780000] text-white px-3 sm:px-4.5 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all cursor-pointer min-h-[40px] sm:min-h-[42px] shadow-md hover:shadow-lg active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" id="header-cart-icon" />
              <span className="tabular-nums font-black">{cartCount}</span>
              {cartCount > 0 && (
                <span className="hidden md:inline tabular-nums text-xs border-l border-white/30 pl-2 font-mono">
                  Rs. {cartSubtotal}
                </span>
              )}
            </button>

            {/* Accessible Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#2D2D44] hover:bg-[#3A3D5B] text-[#D4A017] border border-[#4A4D6B] cursor-pointer transition-colors"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="absolute top-16 left-0 right-0 bg-[#1A1A2E] border-b border-[#D4A017]/20 p-5 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-[#2D2D44] hover:bg-[#3A3D5B] text-white p-3 rounded-2xl text-xs font-bold border border-[#4A4D6B]"
              >
                Menu
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTrack();
                }}
                className="flex items-center justify-center gap-2 bg-[#2D2D44] hover:bg-[#3A3D5B] text-[#D4A017] p-3 rounded-2xl text-xs font-bold border border-[#4A4D6B]"
              >
                <Package className="w-4 h-4 text-[#D4AF37]" />
                Track Order
              </button>
            </div>

            {/* Branch Switcher for Mobile */}
            <div className="p-3.5 rounded-2xl bg-[#2D2D44] border border-[#4A4D6B]">
              <span className="text-[10px] uppercase font-black text-[#A89E8C] block mb-2">
                Fulfilling Kitchen Branch
              </span>
              <div className="grid grid-cols-3 gap-2">
                {branches.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => {
                      onSelectBranch(b);
                      setMobileMenuOpen(false);
                    }}
                    className={`py-2 px-1 text-center rounded-xl text-[11px] font-bold border transition-colors ${
                      b.id === selectedBranch.id
                        ? 'bg-[#D4A017] text-[#1A1A2E] border-[#D4A017]'
                        : 'bg-[#3A3D5B] text-[#E0D7CB] border-[#4A4D6B]'
                    }`}
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Clickable Kitchen Hotlines */}
            <div className="space-y-2 pt-1 border-t border-[#4A4D6B]">
              <span className="text-[10px] uppercase font-black text-[#A89E8C] block">
                Direct Kitchen Hotlines
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                <a
                  href="tel:+922135876543"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#2D2D44] border border-[#4A4D6B] text-[#D4A017] hover:bg-[#3A3D5B]"
                >
                  <span>Clifton:</span>
                  <strong>+92 21 35876543</strong>
                </a>
                <a
                  href="tel:+922134987654"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#2D2D44] border border-[#4A4D6B] text-[#D4A017] hover:bg-[#3A3D5B]"
                >
                  <span>Gulshan:</span>
                  <strong>+92 21 34987654</strong>
                </a>
                <a
                  href="tel:+922136654321"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#2D2D44] border border-[#4A4D6B] text-[#D4A017] hover:bg-[#3A3D5B]"
                >
                  <span>Nazimabad:</span>
                  <strong>+92 21 36654321</strong>
                </a>
              </div>
            </div>

            {/* Staff portal and Contact link */}
            <div className="pt-2 flex items-center justify-between border-t border-[#4A4D6B] text-xs">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="text-[#A89E8C] hover:text-[#D4A017] flex items-center gap-1.5 py-1"
              >
                <ShieldCheck className="w-4 h-4" />
                Staff Portal
              </button>

              <a
                href="mailto:contact@karachibites.pk"
                className="text-[#A89E8C] hover:text-[#D4A017] flex items-center gap-1.5 py-1"
              >
                <Mail className="w-4 h-4" />
                contact@karachibites.pk
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
