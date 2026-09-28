import React, { useState } from 'react';
import { X, Lock, ShieldCheck, KeyRound, AlertCircle } from 'lucide-react';
import { Logo } from '../Logo';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN/password: admin123 or 1234 or direct login
    if (password === 'admin123' || password === '1234' || password === 'admin' || password.trim().length > 0) {
      setError(false);
      onSuccess();
    } else {
      setError(true);
    }
  };

  const handleQuickDemoLogin = () => {
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative bg-navy-900 border border-gold-500/40 w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-8 text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <Logo size="lg" showText={false} />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-950 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Executive Portal</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">
            Admin Panel Login
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Access Khan Brothers & Builders management console
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Admin Password / PIN
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter password (e.g. admin123)"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className="w-full bg-navy-950 border border-slate-700 rounded-lg px-3.5 py-2.5 pl-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
                autoFocus
              />
              <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            </div>
            {error && (
              <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Please enter the admin password.</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg shadow-gold-500/20"
          >
            Sign In to Admin Panel
          </button>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-3 text-[11px] text-slate-500 uppercase tracking-wider">or</span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-2.5 rounded-lg bg-navy-950 hover:bg-slate-800 text-gold-400 border border-gold-500/30 font-semibold text-xs transition-colors cursor-pointer"
          >
            Quick 1-Click Director Access
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-slate-800/80 text-center">
          <p className="text-[11px] text-slate-400">
            Head Office: Nishtar Colony, Ferozepur Road, Lahore
          </p>
        </div>
      </div>
    </div>
  );
};
