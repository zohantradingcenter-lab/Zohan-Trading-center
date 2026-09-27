import React, { useState } from 'react';
import { Calculator, ArrowRight, MessageCircle, FileSpreadsheet, Check } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export const ConstructionCalculator: React.FC = () => {
  const [plotSize, setPlotSize] = useState<'5marla' | '10marla' | '1kanal' | '2kanal'>('10marla');
  const [floors, setFloors] = useState<'double' | 'single' | 'doubleBasement'>('double');
  const [finishType, setFinishType] = useState<'grey' | 'standard' | 'premium' | 'luxury'>('premium');

  // Specs & square footage rules in Pakistan
  const plotSpecs = {
    '5marla': { label: '5 Marla (125 Sq Yds)', sqFtPerFloor: 1125, plotAreaSqFt: 1125 },
    '10marla': { label: '10 Marla (250 Sq Yds)', sqFtPerFloor: 2250, plotAreaSqFt: 2250 },
    '1kanal': { label: '1 Kanal (500 Sq Yds)', sqFtPerFloor: 4500, plotAreaSqFt: 4500 },
    '2kanal': { label: '2 Kanal (1,000 Sq Yds)', sqFtPerFloor: 9000, plotAreaSqFt: 9000 },
  };

  const floorMultiplier = {
    single: 1.0,
    double: 1.9, // Ground + First + Mumty
    doubleBasement: 2.7, // Basement + Ground + First + Mumty
  };

  const ratesPerSqFt = {
    grey: 3100, // PKR per sq ft for Grey Structure (Grade-60 steel, Bestway cement)
    standard: 5400, // Complete turnkey with local A-grade finishes
    premium: 7200, // A+ European sanitary, Spanish porcelain, solid ashwood
    luxury: 9500, // Ultra luxury smart home, Italian marble, imported appliances
  };

  const currentSqFt = Math.round(plotSpecs[plotSize].sqFtPerFloor * floorMultiplier[floors]);
  const estimatedTotalCost = currentSqFt * ratesPerSqFt[finishType];

  // Helper to format in Lakhs or Crores
  const formatPakistaniRupees = (amount: number) => {
    if (amount >= 10000000) {
      const crores = (amount / 10000000).toFixed(2);
      return `Rs ${crores} Crore`;
    }
    const lakhs = (amount / 100000).toFixed(2);
    return `Rs ${lakhs} Lakh`;
  };

  const getTimeline = () => {
    if (plotSize === '5marla') return '6 to 8 Months';
    if (plotSize === '10marla') return '9 to 11 Months';
    if (plotSize === '1kanal') return '12 to 14 Months';
    return '16 to 20 Months';
  };

  return (
    <section className="py-20 sm:py-24 bg-navy-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400 mb-3">
            <Calculator className="w-4 h-4" />
            <span>Instant Estimator</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Construction Cost Calculator
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Estimate your residential construction investment based on current 2026 market rates for Grade-60 steel, cement, bricks, and premium turnkey finishes in Pakistan.
          </p>
        </div>

        {/* Interactive Calculator Card */}
        <div className="bg-navy-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Controls Column */}
          <div className="lg:col-span-7 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-slate-800 space-y-8">
            {/* Step 1: Plot Size */}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gold-400 block mb-3">
                1. Select Plot Size
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(['5marla', '10marla', '1kanal', '2kanal'] as const).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setPlotSize(size)}
                    className={`py-3 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer text-center border ${
                      plotSize === size
                        ? 'bg-gold-500 text-navy-950 border-gold-400 shadow-md'
                        : 'bg-navy-900 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {size === '5marla' && '5 Marla'}
                    {size === '10marla' && '10 Marla'}
                    {size === '1kanal' && '1 Kanal'}
                    {size === '2kanal' && '2 Kanal'}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Number of Floors */}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gold-400 block mb-3">
                2. Building Elevation / Floors
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFloors('single')}
                  className={`py-3 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center border ${
                    floors === 'single'
                      ? 'bg-gold-500 text-navy-950 border-gold-400'
                      : 'bg-navy-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  Single Story
                </button>
                <button
                  type="button"
                  onClick={() => setFloors('double')}
                  className={`py-3 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center border ${
                    floors === 'double'
                      ? 'bg-gold-500 text-navy-950 border-gold-400'
                      : 'bg-navy-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  Double Story + Mumty
                </button>
                <button
                  type="button"
                  onClick={() => setFloors('doubleBasement')}
                  className={`py-3 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center border ${
                    floors === 'doubleBasement'
                      ? 'bg-gold-500 text-navy-950 border-gold-400'
                      : 'bg-navy-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  Double Story + Basement
                </button>
              </div>
            </div>

            {/* Step 3: Finish Quality Tier */}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gold-400 block mb-3">
                3. Finishing & Construction Package
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setFinishType('grey')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    finishType === 'grey'
                      ? 'border-gold-500 bg-navy-900/90 shadow-md'
                      : 'border-slate-800 bg-navy-900/40 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-white">Grey Structure Only</span>
                    <span className="text-xs text-gold-400 font-mono">Rs 3,100 / sq ft</span>
                  </div>
                  <p className="text-xs text-slate-400">Foundation, Grade-60 steel, brickwork, plaster, underground tanks.</p>
                </div>

                <div
                  onClick={() => setFinishType('standard')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    finishType === 'standard'
                      ? 'border-gold-500 bg-navy-900/90 shadow-md'
                      : 'border-slate-800 bg-navy-900/40 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-white">Standard Turnkey</span>
                    <span className="text-xs text-gold-400 font-mono">Rs 5,400 / sq ft</span>
                  </div>
                  <p className="text-xs text-slate-400">A-grade local porcelain tiles, Portacabin baths, standard woodwork.</p>
                </div>

                <div
                  onClick={() => setFinishType('premium')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    finishType === 'premium'
                      ? 'border-gold-500 bg-navy-900/90 shadow-md'
                      : 'border-slate-800 bg-navy-900/40 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-white">Premium Executive A+</span>
                    <span className="text-xs text-gold-400 font-mono">Rs 7,200 / sq ft</span>
                  </div>
                  <p className="text-xs text-slate-400">Spanish tiles, Grohe fittings, solid ashwood doors, modern kitchen.</p>
                </div>

                <div
                  onClick={() => setFinishType('luxury')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    finishType === 'luxury'
                      ? 'border-gold-500 bg-navy-900/90 shadow-md'
                      : 'border-slate-800 bg-navy-900/40 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-white">Ultra-Luxury Designer</span>
                    <span className="text-xs text-gold-400 font-mono">Rs 9,500 / sq ft</span>
                  </div>
                  <p className="text-xs text-slate-400">Italian marble, smart automation, VRF AC, double glass thermal windows.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5 p-6 sm:p-10 bg-gradient-to-b from-navy-950 to-navy-900 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
                Estimate Summary
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mt-1">
                Estimated Investment
              </h3>

              {/* Main Total Highlight */}
              <div className="mt-6 p-6 rounded-xl bg-navy-900/90 border border-gold-500/40 shadow-inner">
                <span className="text-xs text-slate-400 uppercase tracking-wider block">Estimated Total Cost</span>
                <div className="font-serif text-3xl sm:text-4xl font-extrabold text-gold-300 mt-1 tabular-nums">
                  {formatPakistaniRupees(estimatedTotalCost)}
                </div>
                <span className="text-xs text-slate-400 block mt-2">
                  Estimated based on {currentSqFt.toLocaleString()} Sq Ft Covered Area
                </span>
              </div>

              {/* Breakdown Details */}
              <div className="mt-6 space-y-3 text-xs text-slate-300">
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Plot Dimension:</span>
                  <span className="font-semibold text-white">{plotSpecs[plotSize].label}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Approx. Covered Area:</span>
                  <span className="font-semibold text-white tabular-nums">{currentSqFt.toLocaleString()} Sq Ft</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Rate Benchmark:</span>
                  <span className="font-semibold text-gold-400 tabular-nums">Rs {ratesPerSqFt[finishType].toLocaleString()} / Sq Ft</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Completion Timeline:</span>
                  <span className="font-semibold text-white">{getTimeline()}</span>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-lg bg-navy-950 border border-slate-800 text-[11px] text-slate-400">
                * Rates are indicative based on standard soil conditions in Islamabad/Lahore. Includes MEP, labor, grey structure & finishes.
              </div>
            </div>

            {/* Quick Action CTAs */}
            <div className="mt-8 space-y-3">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappDirect}?text=Hello%20Khan%20Brothers,%20I%20used%20your%20construction%20calculator%20for%20a%20${encodeURIComponent(plotSpecs[plotSize].label)}%20(${encodeURIComponent(currentSqFt.toString())}%20Sq%20Ft).%20Please%20share%20a%20detailed%20BOQ.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold py-3.5 px-4 rounded-lg text-xs uppercase tracking-wider shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Get Itemized BOQ via WhatsApp</span>
              </a>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-400 text-center">
                <Check className="w-3.5 h-3.5 text-gold-400" />
                <span>Fixed-Price Contract Guarantee with Zero Escalation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
