import React from 'react';
import { ArrowRight, Building2, CheckCircle2, Shield, Award } from 'lucide-react';
import heroVillaImg from '../assets/images/hero_luxury_villa_1790537322140.jpg';
import { COMPANY_INFO } from '../data/mockData';

interface HeroProps {
  onExploreProperties: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProperties, onContactClick }) => {
  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center bg-navy-950 text-white overflow-hidden pt-8 pb-16">
      {/* Background Hero Image with Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroVillaImg}
          alt="Khan Brothers & Builders Luxury Villa Architecture"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-105 animate-in fade-in zoom-in-95 duration-1000"
        />
        {/* Navy & Gold Depth Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/90 via-navy-950/75 to-navy-950/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Subtle Brand Kicker */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-800/90 border border-gold-500/30 text-gold-300 text-xs sm:text-sm font-medium tracking-wide mb-6 backdrop-blur-md shadow-lg shadow-black/40">
          <Building2 className="w-4 h-4 text-gold-400" />
          <span>Premier Real Estate & Turnkey Builders in Pakistan</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl text-balance leading-tight drop-shadow-md">
          Building Dreams.{' '}
          <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-amber-500 bg-clip-text text-transparent">
            Creating Futures.
          </span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl text-balance leading-relaxed font-normal">
          {COMPANY_INFO.subheading}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            onClick={onExploreProperties}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold px-8 py-4 rounded text-sm uppercase tracking-wider shadow-xl shadow-gold-500/20 hover:shadow-gold-500/40 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Explore Properties</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onContactClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-navy-900/80 hover:bg-navy-800/90 text-white font-semibold px-8 py-4 rounded text-sm uppercase tracking-wider border border-slate-700 hover:border-gold-400/50 backdrop-blur-md transition-all duration-200 cursor-pointer"
          >
            <span>Contact Us</span>
          </button>
        </div>

        {/* Trust Statement & Key Badges */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 w-full max-w-4xl">
          <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-gold-400 mb-5">
            {COMPANY_INFO.trustStatement}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left">
            <div className="flex items-center gap-3 bg-navy-900/60 backdrop-blur-sm p-3 rounded border border-slate-800/70">
              <Shield className="w-5 h-5 text-gold-400 shrink-0" />
              <div>
                <p className="text-xs text-slate-400 font-medium">Clear Title Guarantee</p>
                <p className="text-sm font-bold text-white">100% Legal & Approved</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-navy-900/60 backdrop-blur-sm p-3 rounded border border-slate-800/70">
              <Award className="w-5 h-5 text-gold-400 shrink-0" />
              <div>
                <p className="text-xs text-slate-400 font-medium">Proven Track Record</p>
                <p className="text-sm font-bold text-white">15+ Years Excellence</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-navy-900/60 backdrop-blur-sm p-3 rounded border border-slate-800/70">
              <Building2 className="w-5 h-5 text-gold-400 shrink-0" />
              <div>
                <p className="text-xs text-slate-400 font-medium">Structures Delivered</p>
                <p className="text-sm font-bold text-white">450+ Units Handed Over</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-navy-900/60 backdrop-blur-sm p-3 rounded border border-slate-800/70">
              <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0" />
              <div>
                <p className="text-xs text-slate-400 font-medium">Satisfied Investors</p>
                <p className="text-sm font-bold text-white">2,800+ Families Trust Us</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
