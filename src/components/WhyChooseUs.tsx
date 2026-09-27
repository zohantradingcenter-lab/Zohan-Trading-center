import React from 'react';
import { ShieldCheck, FileText, CheckCircle, Scale, Clock, Award, Users, HardHat } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-gold-500" />,
      title: '100% Legal & Approved Documentation',
      description: 'Zero disputes or disputed land. We verify all title deeds, registry files, and statutory NOCs across CDA, LDA, RDA, DHA, and Bahria Town before initiating any transaction.',
    },
    {
      icon: <FileText className="w-6 h-6 text-gold-500" />,
      title: 'Zero Hidden Escalation Clauses',
      description: 'Our construction contracts are locked with fixed-price Bill of Quantities (BOQ). We protect our clients from inflationary spikes with transparent procurement policies.',
    },
    {
      icon: <HardHat className="w-6 h-6 text-gold-500" />,
      title: 'Grade-A Material Assurance',
      description: 'We exclusively use certified Grade-60 steel (Mughal / Amreli), high-strength cement (Bestway / DG), and conduct independent third-party laboratory cylinder crushing tests on every concrete slab.',
    },
    {
      icon: <Clock className="w-6 h-6 text-gold-500" />,
      title: 'Guaranteed On-Time Milestone Delivery',
      description: 'Strict Gantt-chart project management with weekly photographic and video logs. If we delay, our contracts include enforceable liquidated damages clauses.',
    },
    {
      icon: <Users className="w-6 h-6 text-gold-500" />,
      title: 'Dedicated Overseas Pakistani Desk',
      description: 'Over 2,800 overseas Pakistani families trust our remote management, embassy Power of Attorney assistance, and Roshan Digital Account compliant banking flows.',
    },
    {
      icon: <Award className="w-6 h-6 text-gold-500" />,
      title: '10-Year Structural Integrity Warranty',
      description: 'Every building constructed by Khan Brothers & Builders comes backed with an official 10-year structural warranty certificate and 1-year complimentary MEP maintenance.',
    },
  ];

  return (
    <section id="why-us" className="py-20 sm:py-24 bg-slate-100/70 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-600 mb-3">
            <Scale className="w-4 h-4" />
            <span>The Khan Brothers Difference</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-950 tracking-tight">
            Why Choose Us
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            In an industry plagued by unverified promises and substandard materials, Khan Brothers & Builders stands out for absolute transparency, engineering rigor, and client loyalty.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-start"
            >
              <div className="w-12 h-12 rounded-lg bg-navy-950 flex items-center justify-center mb-6 shadow-md shadow-navy-950/20">
                {item.icon}
              </div>

              <h3 className="font-serif text-lg sm:text-xl font-bold text-navy-950 mb-3">
                {item.title}
              </h3>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Real Estate & Construction Standards Banner */}
        <div className="mt-16 bg-navy-950 text-white rounded-2xl p-8 sm:p-10 border border-gold-500/30 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-gold-400 font-bold block mb-2">
              Verified Credibility
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
              Registered with PEC & Chamber of Commerce
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Pakistan Engineering Council (PEC) licensed engineers, CDA / LDA licensed developers, and active corporate members of the Islamabad Chamber of Commerce & Industry (ICCI).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-4 py-2 rounded-lg bg-navy-900 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>PEC Registered</span>
            </span>
            <span className="px-4 py-2 rounded-lg bg-navy-900 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>CDA Authorized</span>
            </span>
            <span className="px-4 py-2 rounded-lg bg-navy-900 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>DHA Verified</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
