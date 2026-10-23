import React from 'react';
import { GoogleUser } from '../types';

interface UserAvatarProps {
  user: GoogleUser | null;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showGoogleRing?: boolean;
  showOnlineBadge?: boolean;
  className?: string;
  onClick?: () => void;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  size = 'md',
  showGoogleRing = true,
  showOnlineBadge = false,
  className = '',
  onClick
}) => {
  // Size configurations
  const sizeMap = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs font-bold',
    md: 'w-9 h-9 text-sm font-bold',
    lg: 'w-12 h-12 text-base font-black',
    xl: 'w-16 h-16 text-2xl font-black'
  };

  const badgeSizeMap = {
    xs: 'w-1.5 h-1.5 -bottom-0.5 -right-0.5',
    sm: 'w-2 h-2 -bottom-0.5 -right-0.5',
    md: 'w-2.5 h-2.5 bottom-0 right-0',
    lg: 'w-3.5 h-3.5 bottom-0 right-0 border-2',
    xl: 'w-4 h-4 bottom-0.5 right-0.5 border-2'
  };

  const name = user?.name || 'Google User';
  // Use first name initial (e.g. S for Saad)
  const initial = (user?.given_name || name).trim().charAt(0).toUpperCase() || 'S';

  // Official Google Account color palette
  const getGoogleColor = (str: string) => {
    const googleColors = [
      'bg-[#1A73E8]', // Official Google Blue
      'bg-[#EA4335]', // Official Google Red
      'bg-[#188038]', // Official Google Green
      'bg-[#F29900]', // Official Google Amber
      'bg-[#9334E6]'  // Official Google Purple
    ];
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return googleColors[Math.abs(hash) % googleColors.length];
  };

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center shrink-0 ${sizeMap[size]} ${className} ${
        onClick ? 'cursor-pointer hover:opacity-95' : ''
      }`}
    >
      {/* Official Google 4-Color Ring */}
      {showGoogleRing && (
        <span
          className="absolute -inset-0.5 rounded-full p-[1.5px] bg-gradient-to-tr from-[#4285F4] via-[#EA4335] to-[#FBBC05] opacity-90 shadow-2xs pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Main Avatar Container: Official Google First-Name Initial */}
      <div className="relative w-full h-full rounded-full overflow-hidden bg-[#FFFDF8] border border-[#EFE2CD] shadow-2xs flex items-center justify-center z-1">
        <div
          className={`w-full h-full rounded-full ${getGoogleColor(
            name
          )} text-white font-extrabold flex items-center justify-center select-none shadow-inner tracking-tight`}
        >
          <span>{initial}</span>
        </div>
      </div>

      {/* Online indicator */}
      {showOnlineBadge && (
        <span
          className={`absolute ${badgeSizeMap[size]} bg-[#2E7D32] rounded-full border-white shadow-2xs z-2 ring-1 ring-white`}
          title="Online via Google"
        />
      )}
    </div>
  );
};
