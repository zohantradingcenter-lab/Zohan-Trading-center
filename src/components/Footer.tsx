import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, MessageCircle, ArrowUp, Lock } from 'lucide-react';
import { COMPANY_INFO, logoImg } from '../data/mockData';
import { CompanyInfo } from '../types';

interface FooterProps {
  onOpenAdmin?: () => void;
  companyInfo?: CompanyInfo;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, companyInfo = COMPANY_INFO }) => {
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
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-gold-400/50 shadow-md bg-navy-950 shrink-0">
                <img src={logoImg} alt="Khan Brothers & Builders" className="w-full h-full object-cover" />
              </div>
              <span className="font-serif text-lg font-bold text-white tracking-tight">
                {companyInfo.name}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Pakistan&apos;s premier luxury real estate agency, property buy/sell consultants, and turnkey Grade-A civil construction builders. Headquartered at {companyInfo.address} with operations nationwide.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span className="text-xs text-slate-300 font-medium">
                Verified Clear Titles & Registered Real Estate Agency
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
                <a href="#properties" className="hover:text-gold-400 transition-colors">Buy Property (خریدیں)</a>
              </li>
              <li>
                <a href="#sell-buy-hub" className="hover:text-gold-400 transition-colors">Sell Property (بیچیں)</a>
              </li>
              <li>
                <a href="#sell-buy-hub" className="hover:text-gold-400 transition-colors">Live Market Rates</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-gold-400 transition-colors">Signature Projects</a>
              </li>
              <li>
                <a href="#services" className="hover:text-gold-400 transition-colors">Turnkey Construction</a>
              </li>
            </ul>
          </div>

          {/* Market Sectors */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-4 font-mono">
              Top Focus Locations
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>Ferozepur Road & Nishtar Colony, Lahore</li>
              <li>DHA Lahore (Phase 1 to Phase 9 Prism)</li>
              <li>Bahria Town Lahore & Rawalpindi</li>
              <li>DHA Islamabad & CDA Sectors</li>
              <li>Gulberg Commercial Hub, Lahore</li>
              <li>Clifton & DHA Karachi</li>
            </ul>
          </div>

          {/* Contact Summary with Updated Address */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-4 font-mono">
              Head Office Contact
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-slate-200">
              <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
              <span>
                <strong>Head Office:</strong> {companyInfo.address}
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-xs">
              <Phone className="w-4 h-4 text-gold-400 shrink-0" />
              <a href={`tel:${companyInfo.phone}`} className="hover:text-gold-400 transition-colors font-medium">
                {companyInfo.phone}
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-xs">
              <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <a href={`https://wa.me/${companyInfo.whatsappDirect}`} className="text-emerald-400 hover:underline font-semibold">
                WhatsApp: {companyInfo.whatsapp}
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-xs">
              <Mail className="w-4 h-4 text-gold-400 shrink-0" />
              <a href={`mailto:${companyInfo.email}`} className="hover:text-gold-400 transition-colors">
                {companyInfo.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Admin Toggle */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Khan Brothers & Builders. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 text-gold-400/80 hover:text-gold-300 font-semibold cursor-pointer transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin Login (ایڈمن پورٹل)</span>
              </button>
            )}

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
