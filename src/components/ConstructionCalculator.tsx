import React, { useState } from 'react';
import {
  Calculator,
  ArrowRight,
  MessageCircle,
  FileSpreadsheet,
  Check,
  Hammer,
  Layers,
  Sparkles,
  Phone,
  HardHat,
  BadgePercent,
} from 'lucide-react';
import { COMPANY_INFO, INITIAL_CONSTRUCTION_RATES } from '../data/mockData';
import { ConstructionRateItem, CompanyInfo } from '../types';

interface ConstructionCalculatorProps {
  constructionRates?: ConstructionRateItem[];
  companyInfo?: CompanyInfo;
}

export const ConstructionCalculator: React.FC<ConstructionCalculatorProps> = ({
  constructionRates = INITIAL_CONSTRUCTION_RATES,
  companyInfo = COMPANY_INFO,
}) => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'with_material' | 'labor_only'>('calculator');
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

  // Find dynamic rate if exists in constructionRates
  const greyRateItem = constructionRates.find((r) => r.category === 'with_material' && r.title.toLowerCase().includes('grey'));
  const standardRateItem = constructionRates.find((r) => r.category === 'with_material' && r.title.toLowerCase().includes('standard'));
  const premiumRateItem = constructionRates.find((r) => r.category === 'with_material' && r.title.toLowerCase().includes('luxury'));

  const ratesPerSqFt = {
    grey: greyRateItem?.rateNumeric || 3100,
    standard: standardRateItem?.rateNumeric || 5400,
    premium: premiumRateItem?.rateNumeric || 7200,
    luxury: 9500,
  };

  const currentSqFt = Math.round(plotSpecs[plotSize].sqFtPerFloor * floorMultiplier[floors]);
  const estimatedTotalCost = currentSqFt * ratesPerSqFt[finishType];

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

  const withMaterialRates = constructionRates.filter((r) => r.category === 'with_material');
  const laborOnlyRates = constructionRates.filter((r) => r.category === 'labor_only');

  return (
    <section id="construction-rates" className="py-20 sm:py-24 bg-navy-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400 mb-3">
            <Hammer className="w-4 h-4" />
            <span>تعمیراتی ریٹ لسٹ اور لاگت کا تخمینہ</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Construction & Labor Rate List
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Transparent market rates for turnkey construction (With-Material) and skilled labor contracting in Lahore, Punjab & Islamabad. Grade-60 steel, verified cement, and turnkey craftsmanship.
          </p>
        </div>

        {/* View Mode Switcher Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-navy-950 rounded-2xl border border-gold-500/30 shadow-xl max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'calculator'
                  ? 'bg-gold-500 text-navy-950 shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Cost Calculator (لاگت کیلکولیٹر)</span>
            </button>

            <button
              onClick={() => setActiveTab('with_material')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'with_material'
                  ? 'bg-gold-500 text-navy-950 shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>With-Material Rates (ود میٹریل ریٹس)</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 font-mono">
                {withMaterialRates.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('labor_only')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'labor_only'
                  ? 'bg-gold-500 text-navy-950 shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <HardHat className="w-4 h-4" />
              <span>Labor-Only Rates (صرف لیبر ریٹ لسٹ)</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-amber-300 font-mono">
                {laborOnlyRates.length}
              </span>
            </button>
          </div>
        </div>

        {/* 1. CALCULATOR VIEW */}
        {activeTab === 'calculator' && (
          <div className="bg-navy-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 animate-in fade-in duration-200">
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
                    Basement + Double Story
                  </button>
                </div>
              </div>

              {/* Step 3: Finish Quality */}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-gold-400 block mb-3">
                  3. Construction & Finishing Package
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFinishType('grey')}
                    className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                      finishType === 'grey'
                        ? 'bg-gold-500/10 border-gold-400 text-white'
                        : 'bg-navy-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-sm">
                      <span>Grey Structure</span>
                      <span className="text-gold-400 font-mono text-xs">Rs {ratesPerSqFt.grey}/sq ft</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Earthquake-safe structural frame, Grade-60 steel, bricks, plumbing & electrical piping.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFinishType('standard')}
                    className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                      finishType === 'standard'
                        ? 'bg-gold-500/10 border-gold-400 text-white'
                        : 'bg-navy-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-sm">
                      <span>Standard Turnkey</span>
                      <span className="text-gold-400 font-mono text-xs">Rs {ratesPerSqFt.standard}/sq ft</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Complete move-in ready with Master tiles, Porta sanitary, semi-solid wood, paint.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFinishType('premium')}
                    className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                      finishType === 'premium'
                        ? 'bg-gold-500/10 border-gold-400 text-white'
                        : 'bg-navy-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-sm">
                      <span>Premium Luxury (A+)</span>
                      <span className="text-gold-400 font-mono text-xs">Rs {ratesPerSqFt.premium}/sq ft</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Solid ashwood doors, Spanish porcelain, Grohe fittings, false ceilings & Corian.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFinishType('luxury')}
                    className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                      finishType === 'luxury'
                        ? 'bg-gold-500/10 border-gold-400 text-white'
                        : 'bg-navy-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-sm">
                      <span>Executive Smart Home</span>
                      <span className="text-gold-400 font-mono text-xs">Rs {ratesPerSqFt.luxury}/sq ft</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Italian marble floors, smart home automation, imported German kitchen & fixtures.
                    </p>
                  </button>
                </div>
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-5 p-6 sm:p-10 bg-navy-900/60 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-gold-400 font-bold block mb-2">
                  Budget Projection Summary
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mb-6">
                  Estimated Project Cost
                </h3>

                <div className="p-6 bg-navy-950 rounded-2xl border border-gold-500/30 mb-6 space-y-4">
                  <div>
                    <span className="text-xs text-slate-400">Total Estimated Cost (PKR)</span>
                    <div className="font-serif text-3xl sm:text-4xl font-extrabold text-gold-400 mt-1">
                      {formatPakistaniRupees(estimatedTotalCost)}
                    </div>
                    <span className="text-xs text-slate-400 font-mono">
                      Approx. Rs {estimatedTotalCost.toLocaleString()}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block">Total Covered Area</span>
                      <strong className="text-white text-sm font-mono">{currentSqFt.toLocaleString()} Sq Ft</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Estimated Timeline</span>
                      <strong className="text-white text-sm font-mono">{getTimeline()}</strong>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-gold-400 shrink-0" />
                    <span>Fixed-price contract guarantee (no hidden escalation)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-gold-400 shrink-0" />
                    <span>10-year structural warranty & 1-year free maintenance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-gold-400 shrink-0" />
                    <span>Free architectural consultation & complete BOQ breakdown</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${companyInfo.whatsappDirect}?text=Hello%20Khan%20Brothers,%20I%20used%20your%20cost%20calculator%20for%20a%20${plotSize}%20${floors}%20house%20(${finishType}%20finish).%20Estimated%20cost:%20${encodeURIComponent(formatPakistaniRupees(estimatedTotalCost))}.%20Please%20share%20detailed%20BOQ.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Get Detailed BOQ on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* 2. WITH-MATERIAL RATE LIST VIEW */}
        {activeTab === 'with_material' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {withMaterialRates.map((rate) => (
                <div
                  key={rate.id}
                  className="bg-navy-950 rounded-2xl border border-gold-500/30 p-6 sm:p-7 shadow-xl hover:border-gold-400 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400">
                          With Material (میٹریل کے ساتھ)
                        </span>
                        <h3 className="font-serif text-xl font-bold text-white mt-1">
                          {rate.title}
                        </h3>
                        {rate.urduTitle && (
                          <p className="text-xs text-gold-300 font-serif mt-0.5">
                            {rate.urduTitle}
                          </p>
                        )}
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-serif text-2xl font-extrabold text-gold-400 block">
                          {rate.ratePerUnit}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase">{rate.unit}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 mt-4 leading-relaxed">
                      {rate.description}
                    </p>

                    {rate.specs && rate.specs.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-slate-800/80">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                          Material & Brand Specifications:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {rate.specs.map((spec, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-md bg-navy-900 border border-slate-800 text-[11px] text-slate-300 font-medium"
                            >
                              ✓ {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                    <span className="text-xs text-slate-400">
                      Head Office: <strong className="text-slate-200">Ferozepur Road, Lahore</strong>
                    </span>
                    <a
                      href={`https://wa.me/${companyInfo.whatsappDirect}?text=Hello%20Khan%20Brothers,%20I%20am%20interested%20in%20contracting%20for%20*${encodeURIComponent(rate.title)}*%20at%20${encodeURIComponent(rate.ratePerUnit)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Book Construction Contract</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. LABOR-ONLY RATE LIST VIEW */}
        {activeTab === 'labor_only' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-navy-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
              <div className="p-5 sm:p-6 bg-navy-900 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                    <HardHat className="w-5 h-5 text-gold-400" />
                    <span>Daily & Covered-Area Labor Rates (مزدوری ریٹ لسٹ)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Skilled civil construction labor, masonry (چنائی), shuttering, plaster, and MEP technicians in Lahore and surrounding regions.
                  </p>
                </div>
                <a
                  href={`https://wa.me/${companyInfo.whatsappDirect}?text=Hello%20Khan%20Brothers,%20I%20need%20skilled%20labor%20teams%20for%20construction%20work.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shrink-0"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Labor Supervisor ({companyInfo.phone})</span>
                </a>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-navy-950 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="py-3.5 px-4 font-bold">Work Category (کام کی تفصیل)</th>
                      <th className="py-3.5 px-4 font-bold">Labor Rate (PKR)</th>
                      <th className="py-3.5 px-4 font-bold">Unit Basis</th>
                      <th className="py-3.5 px-4 font-bold">Scope of Work Included</th>
                      <th className="py-3.5 px-4 text-right font-bold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {laborOnlyRates.map((rate) => (
                      <tr key={rate.id} className="hover:bg-slate-900/50 transition-colors">
                        <td className="py-4 px-4 font-bold text-white">
                          <div>
                            <span className="text-sm">{rate.title}</span>
                            {rate.urduTitle && (
                              <span className="block text-gold-300 font-serif text-xs font-normal mt-0.5">
                                {rate.urduTitle}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4 font-extrabold text-gold-400 text-sm font-mono whitespace-nowrap">
                          {rate.ratePerUnit}
                        </td>
                        <td className="py-4 px-4 text-slate-300 font-medium whitespace-nowrap">
                          {rate.unit}
                        </td>
                        <td className="py-4 px-4 text-slate-300 max-w-md">
                          <p className="line-clamp-2">{rate.description}</p>
                          {rate.specs && rate.specs.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {rate.specs.map((s, idx) => (
                                <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-navy-900 text-slate-400 border border-slate-800">
                                  {s}
                                </span>
                              ))}
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <a
                            href={`https://wa.me/${companyInfo.whatsappDirect}?text=Hello%20Khan%20Brothers,%20I%20would%20like%20to%20hire%20labor%20teams%20for%20*${encodeURIComponent(rate.title)}*%20(${encodeURIComponent(rate.ratePerUnit)}).`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gold-500/20 hover:bg-gold-500 text-gold-300 hover:text-navy-950 font-bold transition-all text-xs"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>Book Team</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
