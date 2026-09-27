import React from 'react';
import { SERVICES, COMPANY_INFO } from '../data/mockData';
import { Hammer, Check, ArrowRight, MessageSquare } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-20 sm:py-24 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-600 mb-3">
            <Hammer className="w-4 h-4" />
            <span>Comprehensive Solutions</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-950 tracking-tight">
            Our Core Services
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            From plot sourcing and architectural design to Grade-A civil construction and property management, we provide a unified turnkey experience across Pakistan.
          </p>
        </div>

        {/* Services Bento Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-slate-50 hover:bg-white rounded-xl p-7 border border-slate-200/90 hover:border-gold-500/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header with human editorial numbering */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-2xl font-bold text-gold-600 tabular-nums">
                    {service.number}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                    Expertise
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-navy-950 group-hover:text-gold-600 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs font-semibold text-gold-700 mt-1 mb-3">
                  {service.tagline}
                </p>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                  {service.description}
                </p>

                {/* Key Checklist */}
                <div className="space-y-2 pt-4 border-t border-slate-200/80 mb-6">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-600">
                      <Check className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <button
                  onClick={() => onSelectService(service.title)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-950 group-hover:text-gold-600 transition-colors cursor-pointer"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappDirect}?text=Hello%20Khan%20Brothers,%20I%20want%20to%20discuss%20${encodeURIComponent(service.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded text-slate-400 hover:text-emerald-600 transition-colors"
                  title="Discuss on WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
