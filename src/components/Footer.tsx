import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, MessageCircle, ArrowUp } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy-950 text-slate-400 border-t border-navy-800/80 pt-16 pb-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-navy-800/60">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center font-serif font-black text-navy-950 text-base">
                KB
              </div>
              <span className="font-serif text-lg font-bold text-white tracking-tight">
                Khan Brothers & Builders
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Pakistan&apos;s premier luxury real estate agency, commercial developers, and turnkey Grade-A civil construction contractors. Registered with PEC and authorized across CDA, LDA, and DHA.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span className="text-xs text-slate-300 font-medium">
                Verified Clear Titles & ISO Compliant Engineering
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-4 font-mono">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <a href="#home" className="hover:text-gold-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-gold-400 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#properties" className="hover:text-gold-400 transition-colors">Featured Properties</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-gold-400 transition-colors">Landmark Projects</a>
              </li>
              <li>
                <a href="#services" className="hover:text-gold-400 transition-colors">Construction Services</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-gold-400 transition-colors">Why Choose Us</a>
              </li>
            </ul>
          </div>

          {/* Market Sectors */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-4 font-mono">
              Prime Locations
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>DHA Islamabad & DHA Lahore</li>
              <li>Bahria Town Phase 1-8 & Rawalpindi</li>
              <li>Islamabad CDA Sectors (F-7, F-10, E-11, G-13)</li>
              <li>Gulberg Commercial Hub, Lahore</li>
              <li>Clifton & DHA Phase 8, Karachi</li>
              <li>Gwadar Port Commercial District</li>
            </ul>
          </div>

          {/* Contact Summary */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-4 font-mono">
              Direct Contact
            </h4>
            <div className="flex items-start gap-2.5 text-xs">
              <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
              <span>Blue Area, Islamabad · DHA Lahore · Clifton Karachi</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs">
              <Phone className="w-4 h-4 text-gold-400 shrink-0" />
              <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-gold-400 transition-colors">
                {COMPANY_INFO.phone}
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-xs">
              <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <a href={`https://wa.me/${COMPANY_INFO.whatsappDirect}`} className="text-emerald-400 hover:underline">
                WhatsApp: {COMPANY_INFO.whatsapp}
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-xs">
              <Mail className="w-4 h-4 text-gold-400 shrink-0" />
              <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-gold-400 transition-colors">
                {COMPANY_INFO.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Khan Brothers & Builders. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="text-slate-500">Government Registered NTN: 4892011-3</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-gold-400 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
