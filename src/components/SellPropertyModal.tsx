import React, { useState } from 'react';
import { X, CheckCircle, Tag, Building, MapPin, DollarSign, Phone, Send, MessageCircle, AlertCircle, Shield } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import { SellPropertySubmission } from '../types';

interface SellPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultAction?: 'Sell' | 'Direct Cash Buyout' | 'Rent';
  onSubmit?: (data: SellPropertySubmission) => void;
}

export const SellPropertyModal: React.FC<SellPropertyModalProps> = ({
  isOpen,
  onClose,
  defaultAction = 'Sell',
  onSubmit,
}) => {
  const [form, setForm] = useState<{
    propertyType: string;
    purpose: 'Sell' | 'Direct Cash Buyout' | 'Rent';
    city: string;
    society: string;
    size: string;
    demandPrice: string;
    ownerName: string;
    phone: string;
    isUrgent: boolean;
    notes: string;
  }>({
    propertyType: 'Residential Plot',
    purpose: defaultAction,
    city: 'Islamabad',
    society: '',
    size: '10 Marla',
    demandPrice: '',
    ownerName: '',
    phone: '',
    isUrgent: false,
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.ownerName || !form.phone || !form.society) return;
    
    if (onSubmit) {
      onSubmit({
        id: 'sub-' + Date.now(),
        propertyType: form.propertyType,
        purpose: form.purpose,
        city: form.city,
        society: form.society,
        size: form.size,
        demandPrice: form.demandPrice || 'Market Demand',
        ownerName: form.ownerName,
        phone: form.phone,
        isUrgent: form.isUrgent,
        notes: form.notes,
        createdAt: new Date().toISOString(),
        status: 'New',
      });
    }
    
    setSubmitted(true);
  };

  const generateWhatsAppUrl = () => {
    const text = `*New Property Listing Submission for Sale:*
• *Property:* ${form.propertyType} (${form.size})
• *Sale Type:* ${form.purpose} ${form.isUrgent ? '(URGENT SALE)' : ''}
• *City & Society:* ${form.society}, ${form.city}
• *Demand Price:* ${form.demandPrice || 'Market Demand'}
• *Owner:* ${form.ownerName}
• *Phone:* ${form.phone}
• *Details:* ${form.notes || 'Please contact for valuation & verified buyers.'}`;

    return `https://wa.me/${COMPANY_INFO.whatsappDirect}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-gold-500/40 my-8 text-slate-900">
        {/* Modal Header */}
        <div className="bg-navy-950 text-white p-6 sm:p-7 relative border-b border-gold-500/30">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-navy-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Tag className="w-3.5 h-3.5" />
            <span>پراپرٹی فروخت کریں · List Property to Sell</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Sell Your Property with Khan Brothers
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg">
            Connect with 10,000+ verified cash buyers in Pakistan & overseas. We ensure safe biometric transfer and maximum market price.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {submitted ? (
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-500">
                <CheckCircle className="w-9 h-9" />
              </div>

              <div>
                <h4 className="font-serif text-2xl font-bold text-navy-950">
                  Property Received Successfully!
                </h4>
                <p className="text-slate-600 text-sm max-w-md mx-auto mt-2 leading-relaxed">
                  Thank you, <span className="font-bold text-navy-950">{form.ownerName}</span>. Your {form.size} {form.propertyType} in <span className="font-semibold text-gold-700">{form.society}, {form.city}</span> has been logged with our senior sales directors.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-left max-w-md mx-auto space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Target Demand:</span>
                  <span className="font-bold text-navy-950">{form.demandPrice || 'To be appraised'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Contact Number:</span>
                  <span className="font-mono font-semibold text-navy-950">{form.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Buyer Pool:</span>
                  <span className="text-emerald-700 font-semibold">Active cash investors notified</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Photos & Docs on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="py-3 px-6 rounded-lg bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Sale Type Pills */}
              <div>
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                  1. How would you like to sell?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, purpose: 'Sell' })}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold border transition-all text-center cursor-pointer ${
                      form.purpose === 'Sell'
                        ? 'bg-navy-950 text-gold-400 border-gold-500 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Regular Sale (Best Price)
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, purpose: 'Direct Cash Buyout', isUrgent: true })}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold border transition-all text-center cursor-pointer ${
                      form.purpose === 'Direct Cash Buyout'
                        ? 'bg-gold-500 text-navy-950 border-gold-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    ⚡ Urgent Cash Buyout
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, purpose: 'Rent' })}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold border transition-all text-center cursor-pointer ${
                      form.purpose === 'Rent'
                        ? 'bg-navy-950 text-gold-400 border-gold-500 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Put on Rent / Lease
                  </button>
                </div>
              </div>

              {/* Property Category & Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Property Type *
                  </label>
                  <select
                    value={form.propertyType}
                    onChange={(e) => setForm({ ...form, propertyType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  >
                    <option value="Residential Plot">Residential Plot (رہائشی پلاٹ)</option>
                    <option value="Commercial Plot">Commercial Plot (کمرشل پلاٹ)</option>
                    <option value="House / Villa">Complete House / Villa (گھر)</option>
                    <option value="Commercial Plaza / Shop">Commercial Plaza / Shop (شاپ / پلازہ)</option>
                    <option value="Apartment / Flat">Apartment / Penthouse (فلیٹ)</option>
                    <option value="Farmhouse / Land">Farmhouse / Land (فارم ہاؤس)</option>
                    <option value="File / Allocation">File / Allocation (پراپرٹی فائل)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Size / Dimension *
                  </label>
                  <select
                    value={form.size}
                    onChange={(e) => setForm({ ...form, size: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  >
                    <option value="5 Marla">5 Marla (125 Sq Yds)</option>
                    <option value="7 Marla">7 Marla (175 Sq Yds)</option>
                    <option value="10 Marla">10 Marla (250 Sq Yds)</option>
                    <option value="1 Kanal">1 Kanal (500 Sq Yds)</option>
                    <option value="2 Kanal">2 Kanal (1,000 Sq Yds)</option>
                    <option value="Commercial (4 to 8 Marla)">Commercial (4 to 8 Marla)</option>
                    <option value="4 Kanal+ Farmhouse">4 Kanal+ Farmhouse</option>
                  </select>
                </div>
              </div>

              {/* Location Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    City *
                  </label>
                  <select
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  >
                    <option value="Islamabad">Islamabad (اسلام آباد)</option>
                    <option value="Rawalpindi">Rawalpindi (راولپنڈی)</option>
                    <option value="Lahore">Lahore (لاہور)</option>
                    <option value="Karachi">Karachi (کراچی)</option>
                    <option value="Peshawar">Peshawar (پشاور)</option>
                    <option value="Other">Other City</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Society / Sector / Area *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DHA Phase 2, Bahria Phase 8, F-10"
                    value={form.society}
                    onChange={(e) => setForm({ ...form, society: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>
              </div>

              {/* Expected Demand */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Your Asking Demand / Expected Price (PKR)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Rs 1 Crore 85 Lacs OR Rs 95 Lakh"
                    value={form.demandPrice}
                    onChange={(e) => setForm({ ...form, demandPrice: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">
                    Negotiable
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Leave empty if you would like Khan Brothers to provide a free valuation.
                </p>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Property Owner Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    value={form.ownerName}
                    onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+92 300 1234567"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>
              </div>

              {/* Additional Details */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Property Highlights (Plot No, Road Width, Facing, Possession Status)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Plot # 45, 50ft road, park facing, ready for possession, direct owner deal."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900">
                <Shield className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  <strong>100% Privacy Protected:</strong> We never share your plot number or documents publicly without your explicit written approval.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 px-6 rounded-lg bg-navy-950 hover:bg-navy-900 text-gold-400 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer border border-gold-500/40"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Property for Sale</span>
                </button>

                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappDirect}?text=Hello%20Khan%20Brothers,%20I%20want%20to%20sell%20my%20property%20in%20${encodeURIComponent(form.city)}.%20Please%20guide%20me%20on%20rates.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Direct WhatsApp</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
