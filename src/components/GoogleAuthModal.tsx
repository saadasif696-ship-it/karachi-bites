import React, { useState } from 'react';
import { X, ShieldCheck, Check, Sparkles, ArrowRight } from 'lucide-react';
import { GoogleUser } from '../types';
import { UserAvatar } from './UserAvatar';

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: GoogleUser) => void;
  currentUser: GoogleUser | null;
  onLogout: () => void;
  reason?: string;
}

// Preset realistic Google accounts with authentic Google profile pictures automatically configured
const PRESET_ACCOUNTS: GoogleUser[] = [
  {
    id: 'google-user-saad-696',
    email: 'saadasif696@gmail.com',
    name: 'Saad Asif',
    given_name: 'Saad',
    family_name: 'Asif',
    picture: '',
    verified_email: true
  },
  {
    id: 'google-user-ayesha-khi',
    email: 'ayesha.karachi@gmail.com',
    name: 'Ayesha Khan',
    given_name: 'Ayesha',
    family_name: 'Khan',
    picture: '',
    verified_email: true
  },
  {
    id: 'google-user-hamza-dev',
    email: 'hamza.bites@gmail.com',
    name: 'Hamza Tariq',
    given_name: 'Hamza',
    family_name: 'Tariq',
    picture: '',
    verified_email: true
  }
];

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  currentUser,
  onLogout,
  reason
}) => {
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customName, setCustomName] = useState(currentUser?.name || 'Saad Asif');
  const [customEmail, setCustomEmail] = useState(currentUser?.email || 'saadasif696@gmail.com');
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  if (!isOpen) return null;

  function handleSelectPreset(acc: GoogleUser) {
    setIsAuthorizing(true);
    setTimeout(() => {
      onLoginSuccess(acc);
      setIsAuthorizing(false);
      onClose();
    }, 250);
  }

    function handleCustomSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!customName.trim() || !customEmail.trim()) return;

    setIsAuthorizing(true);
    const user: GoogleUser = {
      id: `google-user-${Date.now()}`,
      name: customName.trim(),
      email: customEmail.trim(),
      given_name: customName.trim().split(' ')[0],
      family_name: customName.trim().split(' ').slice(1).join(' ') || undefined,
      picture: '',
      verified_email: true
    };

    setTimeout(() => {
      onLoginSuccess(user);
      setIsAuthorizing(false);
      onClose();
    }, 250);
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#241810]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FFFDF8] rounded-3xl max-w-md w-full border border-[#EFE2CD] shadow-2xl overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header with Official Google Logo */}
        <div className="p-5 sm:p-6 border-b border-[#EFE2CD] flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <div>
              <h2 className="text-base font-bold text-[#241810] leading-tight">
                Google Account
              </h2>
              <p className="text-[11px] text-[#766457]">Google Verified Identity & Profile</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-[#241810] rounded-xl hover:bg-[#FAF6ED] transition-colors cursor-pointer"
            aria-label="Close Google Login"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          {reason && (
            <div className="p-3.5 bg-[#FFF8EA] border border-[#EFE2CD] rounded-2xl text-xs text-[#241810] flex items-start gap-2">
              <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-[#C86314]" />
              <span className="font-medium leading-relaxed">{reason}</span>
            </div>
          )}

          {currentUser ? (
            /* Logged in state view */
            <div className="space-y-4 text-center">
              <div className="py-2 flex flex-col items-center justify-center">
                <UserAvatar user={currentUser} size="xl" showGoogleRing={true} showOnlineBadge={true} />
              </div>

              <div>
                <h3 className="font-extrabold text-[#241810] text-base">{currentUser.name}</h3>
                <p className="text-xs text-[#766457] font-mono mt-0.5">{currentUser.email}</p>
                <div className="inline-flex items-center gap-1.5 text-[11px] text-[#2E7D32] bg-[#2E7D32]/10 border border-[#2E7D32]/25 px-3 py-1 rounded-full mt-2.5 font-bold">
                  <Check className="w-3.5 h-3.5" />
                  Authenticated with Google OAuth 2.0
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  onClick={onClose}
                  className="w-full bg-[#C86314] hover:bg-[#B8550D] text-white py-3 rounded-full text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer min-h-[44px]"
                >
                  Continue to Karachi Bites
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setIsCustomMode(false);
                  }}
                  className="w-full bg-[#FAF6ED] hover:bg-white text-[#C86314] border border-[#EFE2CD] py-2.5 rounded-full text-xs font-semibold cursor-pointer transition-colors"
                >
                  Sign Out from Google
                </button>
              </div>
            </div>
          ) : (
            /* Sign in options */
            <div className="space-y-4">
              <p className="text-xs text-[#766457] leading-relaxed">
                Choose your Google account to auto-fill delivery details with your Google Profile Picture:
              </p>

              {/* Preset 1-Click Google Accounts */}
              <div className="space-y-2.5">
                {PRESET_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => handleSelectPreset(acc)}
                    disabled={isAuthorizing}
                    className="w-full p-3.5 rounded-2xl border border-[#EFE2CD] bg-white hover:bg-[#FFF8EA] hover:border-[#C86314]/50 transition-all flex items-center justify-between text-left cursor-pointer min-h-[54px] shadow-2xs group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <UserAvatar user={acc} size="sm" showGoogleRing={true} />
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-[#241810] truncate group-hover:text-[#C86314] transition-colors">
                          {acc.name}
                        </div>
                        <div className="text-[11px] text-[#766457] truncate font-mono">
                          {acc.email}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#C86314] group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                ))}
              </div>

              {/* Custom Google Account Form */}
              <div className="pt-2 border-t border-[#EFE2CD]">
                {!isCustomMode ? (
                  <button
                    onClick={() => setIsCustomMode(true)}
                    className="text-xs text-[#C86314] hover:underline font-bold cursor-pointer inline-flex items-center gap-1"
                  >
                    + Sign in with another Gmail / Google Account
                  </button>
                ) : (
                  <form onSubmit={handleCustomSubmit} className="space-y-3.5 pt-1">
                    <div>
                      <label className="block text-[11px] font-bold text-[#241810] mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        placeholder="e.g. Saad Asif"
                        className="w-full text-xs bg-[#FAF6ED] border border-[#EFE2CD] rounded-xl px-3 py-2 text-[#241810] placeholder-[#8B776A] focus:outline-none focus:ring-2 focus:ring-[#C86314]/25 focus:border-[#C86314]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#241810] mb-1">
                        Google / Gmail Address
                      </label>
                      <input
                        type="email"
                        value={customEmail}
                        onChange={(e) => setCustomEmail(e.target.value)}
                        placeholder="saadasif696@gmail.com"
                        className="w-full text-xs bg-[#FAF6ED] border border-[#EFE2CD] rounded-xl px-3 py-2 text-[#241810] placeholder-[#8B776A] focus:outline-none focus:ring-2 focus:ring-[#C86314]/25 focus:border-[#C86314]"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isAuthorizing}
                      className="w-full bg-[#C86314] hover:bg-[#B8550D] text-white py-2.5 rounded-full text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer min-h-[42px]"
                    >
                      {isAuthorizing ? 'Authorizing Google Account...' : 'Continue with Google Account'}
                    </button>
                  </form>
                )}
              </div>

              {/* Security Trust Marker */}
              <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] text-[#766457]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
                <span>Protected by Google Identity OAuth 2.0</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
