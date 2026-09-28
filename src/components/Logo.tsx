import React from 'react';
import logoImg from '../assets/images/khan_brothers_logo_1790544967736.jpg';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  showText = true,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10 sm:w-11 sm:h-11',
    lg: 'w-14 h-14',
  };

  return (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      {/* Premium Emblem with subtle golden border & glow */}
      <div
        className={`relative ${sizeClasses[size]} rounded-lg overflow-hidden border border-gold-400/60 shadow-md shadow-gold-500/10 group-hover:border-gold-300 transition-all duration-300 shrink-0 bg-navy-950`}
      >
        <img
          src={logoImg}
          alt="Khan Brothers & Builders Logo"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-gold-400/30 rounded-lg pointer-events-none" />
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-gold-400 transition-colors">
              Khan Brothers
            </span>
            <span className="font-serif text-xs sm:text-sm font-semibold text-gold-400 tracking-wide">
              & Builders
            </span>
          </div>
          <span className="text-[10px] tracking-[0.2em] uppercase text-slate-300 group-hover:text-gold-300/90 font-medium transition-colors">
            Real Estate & Construction
          </span>
        </div>
      )}
    </div>
  );
};
