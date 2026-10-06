import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Eye, EyeOff, ShieldCheck, Sparkles } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, signup, demoSignIn } = useStore();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    if (mode === 'signup' && !name.trim()) {
      setError('Please provide your full name.');
      return;
    }

    if (mode === 'login') {
      login(email, name);
    } else {
      signup(name, email);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsAuthModalOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-[#FAF9F5] rounded-xl shadow-2xl border border-stone-200 overflow-hidden z-10 animate-fade-in">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-900 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <span className="font-display text-2xl font-normal text-stone-950">
              ATELIER LUMEN
            </span>
            <p className="text-xs text-stone-500 mt-1">
              {mode === 'login'
                ? 'Sign in to access your saved pieces and orders'
                : 'Create an account to join our collector registry'}
            </p>
          </div>

          {/* Quick Demo Sign In Box */}
          <div className="mb-6 p-3 bg-amber-50/70 border border-amber-200/80 rounded-lg text-xs text-amber-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Explore as test customer:</span>
            </div>
            <button
              type="button"
              onClick={demoSignIn}
              className="px-3 py-1 bg-amber-800 text-amber-50 hover:bg-amber-900 rounded font-medium transition-colors text-xs"
            >
              Demo Sign In
            </button>
          </div>

          {/* Tabs: Sign In / Create Account */}
          <div className="flex border-b border-stone-200 mb-6">
            <button
              onClick={() => {
                setMode('login');
                setError('');
              }}
              className={`flex-1 pb-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
                mode === 'login'
                  ? 'border-b-2 border-stone-950 text-stone-950'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMode('signup');
                setError('');
              }}
              className={`flex-1 pb-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
                mode === 'signup'
                  ? 'border-b-2 border-stone-950 text-stone-950'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              Create Account
            </button>
          </div>

          {error && (
            <div className="mb-4 p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-md">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-md text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-800 focus:border-stone-800"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-md text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-800 focus:border-stone-800"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-md text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-800 focus:border-stone-800 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {mode === 'login' && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => alert('Password reset link sent to registered email.')}
                  className="text-[11px] text-stone-500 hover:text-stone-900 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors mt-2"
            >
              {mode === 'login' ? 'Sign In to Account' : 'Register Account'}
            </button>
          </form>

          {/* Trust badge */}
          <div className="mt-6 pt-4 border-t border-stone-200/80 flex items-center justify-center gap-2 text-stone-500 text-[11px]">
            <ShieldCheck className="w-4 h-4 text-stone-400" />
            <span>256-Bit SSL Encrypted & Private Client Registry</span>
          </div>
        </div>
      </div>
    </div>
  );
};
