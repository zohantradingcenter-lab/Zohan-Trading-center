import React, { useState } from 'react';
import { Phone, Mail, Clock, Send, MessageCircle, MapPin, CheckCircle } from 'lucide-react';
import { OFFICE_LOCATIONS, COMPANY_INFO } from '../data/mockData';
import { OfficeLocation, CompanyInfo, InquiryLead } from '../types';

interface ContactSectionProps {
  officeLocations?: OfficeLocation[];
  companyInfo?: CompanyInfo;
  onSubmitInquiry?: (data: InquiryLead) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  officeLocations = OFFICE_LOCATIONS,
  companyInfo = COMPANY_INFO,
  onSubmitInquiry,
}) => {
  const [activeOfficeTab, setActiveOfficeTab] = useState<'Lahore' | 'Islamabad' | 'Karachi'>('Lahore');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Lahore',
    service: 'Construction & Turnkey Contracting',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    if (onSubmitInquiry) {
      onSubmitInquiry({
        id: 'inq-contact-' + Date.now(),
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        service: formData.service,
        message: formData.message,
        createdAt: new Date().toISOString(),
        status: 'New',
      });
    }

    setSubmitted(true);
  };

  const currentOffice = officeLocations.find((o) => o.city === activeOfficeTab) || officeLocations[0];

  return (
    <section id="contact" className="py-20 sm:py-24 bg-navy-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400 mb-3">
            <Mail className="w-4 h-4" />
            <span>Connect With Us</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Schedule a Private Consultation
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Whether you want to construct your dream house, acquire verified land, or discuss high-yield commercial development, our directors and senior engineers are at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Office Locations & Fast Hotline */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <h3 className="font-serif text-xl font-bold text-white mb-4">
                Corporate Office Network
              </h3>

              {/* City Office Selector Tabs */}
              <div className="flex items-center gap-2 p-1 bg-navy-900 rounded-lg border border-slate-800 mb-6">
                {(['Islamabad', 'Lahore', 'Karachi'] as const).map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => setActiveOfficeTab(city)}
                    className={`flex-1 py-2 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      activeOfficeTab === city
                        ? 'bg-gold-500 text-navy-950 shadow-sm'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>

              {/* Active Office Details Card */}
              <div className="bg-navy-900/90 rounded-xl p-6 border border-gold-500/30 shadow-xl space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">{currentOffice.name}</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{currentOffice.address}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Office Line</span>
                    <a href={`tel:${currentOffice.phone}`} className="text-xs font-bold text-white hover:text-gold-400">
                      {currentOffice.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Direct Mobile / WhatsApp</span>
                    <a href={`tel:${currentOffice.mobile}`} className="text-xs font-bold text-white hover:text-gold-400">
                      {currentOffice.mobile}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Email Inquiries</span>
                    <a href={`mailto:${currentOffice.email}`} className="text-xs text-slate-200 hover:text-gold-400">
                      {currentOffice.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-gold-400 shrink-0" />
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Visiting Hours</span>
                    <span className="text-xs text-slate-300">{currentOffice.hours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Instant WhatsApp Banner */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-emerald-950 to-navy-900 border border-emerald-500/40">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Instant WhatsApp Hotline</h4>
                  <p className="text-xs text-emerald-300">Fast Response Under 15 Minutes</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Connect with our senior property consultants or structural engineers instantly on WhatsApp.
              </p>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappDirect}?text=Hello%20Khan%20Brothers%20Builders,%20I%20would%20like%20to%20inquire%20about%20your%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat On WhatsApp Now</span>
              </a>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-7 bg-navy-900/90 rounded-2xl p-7 sm:p-10 border border-slate-800 shadow-2xl">
            {submitted ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-gold-500/20 border border-gold-400 text-gold-400 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white mb-2">
                  Thank You, {formData.name}!
                </h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                  Your inquiry regarding <span className="text-gold-400 font-semibold">{formData.service}</span> in {formData.city} has been routed directly to our Managing Director. A dedicated consultant will contact you via phone or WhatsApp at <span className="text-white font-mono">{formData.phone}</span> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      phone: '',
                      email: '',
                      city: 'Islamabad',
                      service: 'Construction & Turnkey Contracting',
                      message: '',
                    });
                  }}
                  className="px-6 py-2.5 rounded bg-gold-500 text-navy-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-400 transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-slate-800 pb-4 mb-4">
                  <h3 className="font-serif text-xl font-bold text-white">Send Us An Inquiry</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Fill out the form below. We treat all inquiries with strict confidentiality.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Asad Khan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-navy-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400 transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-navy-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-navy-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400 transition-colors"
                    />
                  </div>

                  {/* Preferred City */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      Target City / Market
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-navy-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400 transition-colors"
                    >
                      <option value="Islamabad">Islamabad (DHA / CDA Sectors)</option>
                      <option value="Rawalpindi">Rawalpindi (Bahria Town / Chaklala)</option>
                      <option value="Lahore">Lahore (DHA / Gulberg)</option>
                      <option value="Karachi">Karachi (Clifton / DHA)</option>
                      <option value="Overseas">Overseas Investor (UK / US / UAE)</option>
                    </select>
                  </div>
                </div>

                {/* Service Interest */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    What Service Are You Interested In?
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400 transition-colors"
                  >
                    <option value="Construction & Turnkey Contracting">Turnkey Home / Plaza Construction</option>
                    <option value="Buy Luxury House / Villa">Buy Luxury House / Villa</option>
                    <option value="Commercial Plaza Investment">Commercial High-Yield Investment</option>
                    <option value="Residential / Commercial Plot Purchase">Plot Purchase & Verification</option>
                    <option value="Architectural & Interior Design">Architectural & 3D Interior Design</option>
                    <option value="Overseas Portfolio Management">Overseas Pakistani Portfolio Management</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Project Details / Requirements
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Specify plot size (e.g. 1 Kanal, 10 Marla), desired sector/location, budget range, or construction requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold py-3.5 px-6 rounded-lg text-xs uppercase tracking-wider shadow-xl transition-all duration-200 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Consultation Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
