import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle, Send } from 'lucide-react';
import { Property, Project } from '../types';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetItem?: Property | Project | null;
  defaultService?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  targetItem,
  defaultService,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    timeSlot: 'Morning (11:00 AM - 1:00 PM)',
    city: 'Islamabad',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-navy-900 text-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-gold-500/30 my-8">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-navy-950 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="py-10 text-center">
              <div className="w-14 h-14 rounded-full bg-gold-500/20 border border-gold-400 text-gold-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-2">
                Consultation Booked!
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Thank you, <span className="text-gold-400 font-semibold">{formData.name}</span>. Our relationship manager has recorded your appointment for{' '}
                <span className="text-white font-medium">{formData.date || 'the upcoming business day'} ({formData.timeSlot})</span>. You will receive an SMS and WhatsApp confirmation at <span className="font-mono text-white">{formData.phone}</span>.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="w-full py-3 rounded-lg bg-gold-500 text-navy-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-400 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block mb-1">
                  Private Session
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Schedule Consultation & Visit
                </h3>
                {targetItem && (
                  <p className="text-xs text-slate-300 mt-1">
                    Regarding: <span className="text-gold-300 font-semibold">{'title' in targetItem ? targetItem.title : targetItem.name}</span>
                  </p>
                )}
                {defaultService && !targetItem && (
                  <p className="text-xs text-slate-300 mt-1">
                    Service: <span className="text-gold-300 font-semibold">{defaultService}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-navy-950 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-gold-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+92 300 0000000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-gold-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">City / Office</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-gold-400"
                  >
                    <option value="Islamabad">Islamabad (Head Office)</option>
                    <option value="Lahore">Lahore (DHA Office)</option>
                    <option value="Karachi">Karachi (Clifton Office)</option>
                    <option value="Online">Online / Overseas Video Call</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Preferred Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-navy-950 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Preferred Time</label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-gold-400"
                  >
                    <option value="Morning (11:00 AM - 1:00 PM)">Morning (11:00 AM - 1:00 PM)</option>
                    <option value="Afternoon (2:00 PM - 4:00 PM)">Afternoon (2:00 PM - 4:00 PM)</option>
                    <option value="Evening (5:00 PM - 7:00 PM)">Evening (5:00 PM - 7:00 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Special Requirements / Notes</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your plot size, budget, or specific properties you would like to inspect..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-navy-950 border border-slate-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-gold-400"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-navy-950 font-bold py-3.5 rounded-lg text-xs uppercase tracking-wider shadow-lg hover:from-gold-400 hover:to-gold-500 transition-all cursor-pointer mt-2"
              >
                <Send className="w-4 h-4" />
                <span>Confirm Appointment</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
