import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X, ShieldCheck, ChevronRight, LayoutDashboard, MapPin } from 'lucide-react';
import { COMPANY_INFO, logoImg } from '../data/mockData';
import { CompanyInfo } from '../types';

interface HeaderProps {
  onOpenConsultation: () => void;
  onOpenSellModal: () => void;
  onOpenAdmin: () => void;
  companyInfo?: CompanyInfo;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation, onOpenSellModal, onOpenAdmin, companyInfo = COMPANY_INFO }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Buy Property', href: '#properties', badge: 'خریدیں' },
    { name: 'Sell Property', href: '#sell-buy-hub', badge: 'بیچیں' },
    { name: 'Market Rates', href: '#sell-buy-hub' },
    { name: 'Construction Rates', href: '#construction-rates', badge: 'ریٹس' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Utility Announcement Bar */}
      <div className="bg-navy-950 text-slate-300 text-xs border-b border-navy-800/80 px-4 py-2 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4 lg:gap-6">
            <span className="flex items-center gap-1.5 text-gold-400 font-semibold">
              <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span>{companyInfo.address}</span>
            </span>
            <span className="hidden xl:inline text-slate-600">|</span>
            <span className="hidden xl:inline items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 inline mr-1" />
              <span>DHA, Bahria Town & LDA Authorized</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-gold-500/20 hover:bg-gold-500/30 text-gold-300 border border-gold-400/50 text-[11px] font-bold transition-all cursor-pointer shadow-sm"
              title="Open Admin CMS"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-gold-400" />
              <span>Admin Panel (ایڈمن)</span>
            </button>

            <a
              href={`tel:${companyInfo.phone}`}
              className="flex items-center gap-1.5 hover:text-gold-400 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              <span>{companyInfo.phone}</span>
            </a>
            <a
              href={`https://wa.me/${companyInfo.whatsappDirect}?text=Hello%20Khan%20Brothers%20Builders,%20I%20am%20interested%20in%20property%20consultation`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-navy-950/95 backdrop-blur-md shadow-xl py-2.5 border-b border-gold-500/20'
            : 'bg-navy-900 py-3.5 border-b border-slate-800'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Wordmark & New Custom Logo */}
          <a href="#home" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-11 h-11 rounded-lg overflow-hidden border border-gold-400/50 shadow-md shadow-gold-500/10 bg-navy-950 flex items-center justify-center shrink-0">
              <img
                src={logoImg}
                alt="Khan Brothers & Builders Official Logo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-gold-400 transition-colors">
                Khan Brothers & Builders
              </span>
              <span className="text-[10px] tracking-widest uppercase text-gold-400/90 font-medium">
                Real Estate & Construction · Lahore
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-200 hover:text-gold-400 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold-400 hover:after:w-full after:transition-all after:duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenSellModal}
              className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider px-3.5 py-2.5 rounded shadow-md transition-all duration-200 cursor-pointer"
            >
              <span>+ Sell Property</span>
            </button>

            <button
              onClick={onOpenConsultation}
              className="hidden md:inline-flex items-center gap-1.5 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded shadow-lg shadow-gold-500/20 hover:shadow-gold-500/40 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Contact Us</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded text-slate-300 hover:text-gold-400 hover:bg-navy-800 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-950/98 backdrop-blur-xl border-b border-gold-500/30 px-6 py-6 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-4">
            <div className="pb-2 border-b border-navy-800/80 flex items-center justify-between">
              <span className="text-xs text-gold-400 font-semibold flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Nishtar Colony, Ferozepur Rd, Lahore
              </span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="text-[11px] font-bold text-gold-400 bg-navy-900 border border-gold-500/40 px-2.5 py-1 rounded"
              >
                Admin Panel
              </button>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-200 hover:text-gold-400 py-2 border-b border-navy-800/60 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-gold-400" />
              </a>
            ))}
            
            <div className="pt-4 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSellModal();
                }}
                className="w-full text-center py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded shadow-md"
              >
                + Sell Your Property (فروخت کریں)
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full text-center py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 font-bold text-xs uppercase tracking-wider rounded shadow-md"
              >
                Contact & Appointment
              </button>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 px-1">
                <span>Call: {COMPANY_INFO.phone}</span>
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappDirect}`}
                  className="text-emerald-400 font-semibold"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
