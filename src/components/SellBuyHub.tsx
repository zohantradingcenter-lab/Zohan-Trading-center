import React, { useState } from 'react';
import { ShoppingBag, Tag, Zap, ShieldCheck, ArrowRight, CheckCircle2, TrendingUp, Search, MessageCircle, Sparkles } from 'lucide-react';
import { COMPANY_INFO, MARKET_RATES } from '../data/mockData';
import { MarketRateItem, CompanyInfo } from '../types';

interface SellBuyHubProps {
  onOpenSellModal: (actionType?: 'Sell' | 'Direct Cash Buyout') => void;
  onExploreProperties: () => void;
  marketRates?: MarketRateItem[];
  companyInfo?: CompanyInfo;
}

export const SellBuyHub: React.FC<SellBuyHubProps> = ({
  onOpenSellModal,
  onExploreProperties,
  marketRates = MARKET_RATES,
  companyInfo = COMPANY_INFO,
}) => {
  const [selectedCity, setSelectedCity] = useState<string>('All');

  const filteredRates = selectedCity === 'All'
    ? marketRates
    : marketRates.filter((item) => item.city === selectedCity);

  return (
    <section id="sell-buy-hub" className="py-20 sm:py-24 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Urdu subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>پراپرٹی خرید و فروخت کا سب سے بااعتماد پلیٹ فارم</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-navy-950">
            Real Estate Buy & Sell Hub
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Whether you want to <strong>Buy</strong> your dream home at genuine market rates or <strong>Sell</strong> your plot/villa for maximum cash value — Khan Brothers & Builders delivers verified, transparent, and swift transactions.
          </p>
        </div>

        {/* Dual Pillar: BUY vs SELL Mega Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* BUY CARD */}
          <div className="rounded-2xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white p-8 sm:p-10 border border-gold-500/30 shadow-xl flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gold-500/20 border border-gold-400/40 flex items-center justify-center text-gold-400">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold-400 font-mono">
                  پراپرٹی خریدیں · BUY
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                Looking to Buy a Property?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Browse 100% legally clear houses, residential plots, commercial floors, and luxury penthouses in Islamabad, Rawalpindi, Lahore, and Karachi.
              </p>

              <div className="space-y-3 mb-8 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <span><strong>Zero Disputed Land:</strong> Full registry, allotment & non-encumbrance verification.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <span><strong>Direct Owner Meetings:</strong> Transparent pricing with zero deceptive commission markups.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <span><strong>Authority Transfer Support:</strong> Complete biometric transfer handling at DHA & CDA.</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onExploreProperties}
                className="flex-1 py-3.5 px-6 rounded-lg bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search Properties to Buy</span>
              </button>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappDirect}?text=Hello%20Khan%20Brothers,%20I%20am%20looking%20to%20buy%20a%20property.%20Please%20share%20fresh%20options.`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                title="Inquire on WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* SELL CARD */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-navy-950 text-white p-8 sm:p-10 border border-slate-700 shadow-xl flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                  <Tag className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">
                  پراپرٹی بیچیں · SELL
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                Want to Sell Your Property?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Sell your plot, house, commercial plaza, or file directly. We connect you with qualified cash buyers or buy directly through our corporate fund.
              </p>

              <div className="space-y-3 mb-8 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>10,000+ Active Cash Investors:</strong> Immediate reach to overseas & local buyers.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Free Market Valuation:</strong> Learn the true 2026 market demand before closing.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>⚡ Urgent Cash Buyout:</strong> We purchase plots & houses directly within 48 hours.</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onOpenSellModal('Sell')}
                className="flex-1 py-3.5 px-6 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Tag className="w-4 h-4" />
                <span>List Property to Sell</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenSellModal('Direct Cash Buyout')}
                className="py-3.5 px-5 rounded-lg bg-navy-900 hover:bg-navy-800 text-gold-400 font-bold text-xs uppercase tracking-wider border border-gold-500/30 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Zap className="w-4 h-4 text-gold-400" />
                <span>Urgent Cash Sale</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Society Rates & Market Price Benchmark Guide */}
        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-700 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span>مارکیٹ ریٹس · 2026 Price Benchmark</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-950">
                Prevailing Real Estate Market Rates
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Current buying & selling benchmarks for prime Pakistani societies.
              </p>
            </div>

            {/* City Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-lg">
              {['All', 'Islamabad', 'Rawalpindi', 'Lahore', 'Karachi'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedCity(c)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    selectedCity === c
                      ? 'bg-navy-950 text-gold-400 shadow-xs'
                      : 'text-slate-600 hover:text-navy-900'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Market Rates Table / Grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredRates.map((rate, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      {rate.city}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      rate.trend === 'Rising'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {rate.trend}
                    </span>
                  </div>

                  <h4 className="font-serif text-sm font-bold text-navy-950 line-clamp-1">
                    {rate.society}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">{rate.size}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Price Bracket</span>
                    <span className="font-serif text-sm font-bold text-gold-700">
                      {rate.priceRange}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenSellModal('Sell')}
                    className="text-[11px] font-bold text-navy-950 hover:text-gold-600 transition-colors cursor-pointer"
                  >
                    Sell/Buy &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Valuation Banner */}
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-gold-500/10 via-amber-500/10 to-transparent border border-gold-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-gold-600 shrink-0" />
              <p className="text-xs sm:text-sm text-slate-700">
                Want an accurate, zero-cost valuation for your specific plot number or house?
              </p>
            </div>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappDirect}?text=Hello%20Khan%20Brothers,%20I%20would%20like%20a%20free%20market%20valuation%20for%20my%20property.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-lg bg-navy-950 hover:bg-navy-900 text-gold-400 text-xs font-bold uppercase transition-colors shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Get Free Valuation on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
