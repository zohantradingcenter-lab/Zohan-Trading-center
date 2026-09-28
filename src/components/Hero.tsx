import React from 'react';
import { ArrowRight, Tag, ShoppingBag, CheckCircle2, Shield, Award, Zap, MessageCircle } from 'lucide-react';
import heroVillaImg from '../assets/images/hero_luxury_villa_1790537322140.jpg';
import { COMPANY_INFO, INITIAL_HERO_CONTENT } from '../data/mockData';
import { HeroContent, CompanyInfo } from '../types';

interface HeroProps {
  onExploreProperties: () => void;
  onContactClick: () => void;
  onOpenSellModal: () => void;
  heroContent?: HeroContent;
  companyInfo?: CompanyInfo;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreProperties,
  onContactClick,
  onOpenSellModal,
  heroContent = INITIAL_HERO_CONTENT,
  companyInfo = COMPANY_INFO,
}) => {
  return (
    <section id="home" className="relative min-h-[94vh] flex items-center justify-center bg-navy-950 text-white overflow-hidden pt-8 pb-16">
      {/* Background Hero Image with Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroContent.bgImageUrl || heroVillaImg}
          alt="Khan Brothers & Builders Real Estate Properties"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-105 animate-in fade-in zoom-in-95 duration-1000"
        />
        {/* Navy & Gold Depth Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/92 via-navy-950/78 to-navy-950/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-500/15 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Subtle Brand Kicker */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900/90 border border-gold-500/40 text-gold-300 text-xs sm:text-sm font-semibold tracking-wide mb-6 backdrop-blur-md shadow-lg shadow-black/40">
          <Tag className="w-4 h-4 text-gold-400" />
          <span>{heroContent.badge}</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl text-balance leading-tight drop-shadow-md">
          {heroContent.title}{' '}
          <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-amber-500 bg-clip-text text-transparent block sm:inline">
            {heroContent.highlightedTitle}
          </span>
        </h1>

        {/* Urdu & English Subheading */}
        {heroContent.urduSubtitle && (
          <p className="mt-4 text-base sm:text-lg font-medium text-gold-200 font-serif">
            {heroContent.urduSubtitle}
          </p>
        )}

        <p className="mt-2 text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl text-balance leading-relaxed font-normal">
          {heroContent.description}
        </p>

        {/* Urgent Cash Buyout Pill */}
        {heroContent.urgentNotice && (
          <div className="mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-medium">
            <Zap className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span>{heroContent.urgentNotice}</span>
          </div>
        )}

        {/* Action Buttons: BUY vs SELL */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
          {/* Buy Button */}
          <button
            onClick={onExploreProperties}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold px-7 py-4 rounded-lg text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-gold-500/20 hover:shadow-gold-500/40 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Buy a Property (خریدیں)</span>
          </button>

          {/* Sell Button */}
          <button
            onClick={onOpenSellModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-7 py-4 rounded-lg text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-emerald-600/30 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Tag className="w-4 h-4" />
            <span>Sell Your Property (بیچیں)</span>
          </button>

          {/* WhatsApp Direct */}
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsappDirect}?text=Hello%20Khan%20Brothers,%20I%20want%20to%20buy%20or%20sell%20a%20property.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-navy-900/80 hover:bg-navy-800 text-white font-semibold px-6 py-4 rounded-lg text-xs sm:text-sm uppercase tracking-wider border border-slate-700 hover:border-gold-400/50 backdrop-blur-md transition-all duration-200 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp: 0306-8700693</span>
          </a>
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
                <p className="text-xs text-slate-400 font-medium">Safe Transfer</p>
                <p className="text-sm font-bold text-white">100% Legal & Approved</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-navy-900/60 backdrop-blur-sm p-3 rounded border border-slate-800/70">
              <Tag className="w-5 h-5 text-gold-400 shrink-0" />
              <div>
                <p className="text-xs text-slate-400 font-medium">Best Market Value</p>
                <p className="text-sm font-bold text-white">Top Rates for Sellers</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-navy-900/60 backdrop-blur-sm p-3 rounded border border-slate-800/70">
              <ShoppingBag className="w-5 h-5 text-gold-400 shrink-0" />
              <div>
                <p className="text-xs text-slate-400 font-medium">Cash Investors</p>
                <p className="text-sm font-bold text-white">10,000+ Active Buyers</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-navy-900/60 backdrop-blur-sm p-3 rounded border border-slate-800/70">
              <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0" />
              <div>
                <p className="text-xs text-slate-400 font-medium">Deals Closed</p>
                <p className="text-sm font-bold text-white">2,800+ Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

