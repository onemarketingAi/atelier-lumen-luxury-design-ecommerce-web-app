import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setSubscribed(true);
    showToast('Subscribed to the Atelier Lumen journal.');
  };

  const handleNav = (page: any) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-stone-800">
          
          {/* Column 1: Brand & Philosophy */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-display text-2xl text-stone-100 tracking-tight block">
              ATELIER LUMEN
            </span>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              An independent studio dedicated to the slow craft of heirloom objects. We engineer acoustic monitors, timepieces, architectural lighting, and leather goods designed to outlive trends.
            </p>
            <div className="pt-2 text-xs text-stone-400 font-mono">
              <p>Studio Hours: Mon–Sat 10:00 – 19:00 EST</p>
              <p className="mt-0.5">Concierge: +1 (212) 555-0198</p>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold text-stone-100 uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-stone-200 transition-colors">
                  All Artifacts
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-stone-200 transition-colors">
                  Acoustic Hardware
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-stone-200 transition-colors">
                  Sculptural Lighting
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-stone-200 transition-colors">
                  Horology & Watches
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-stone-200 transition-colors">
                  Leather Goods
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Atelier & Care */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold text-stone-100 uppercase tracking-wider">
              Client Care
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-stone-200 transition-colors">
                  The Atelier Story
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-stone-200 transition-colors">
                  Studio Showrooms
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-stone-200 transition-colors">
                  5-Year Guarantee
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-stone-200 transition-colors">
                  Global Shipping & Returns
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('account')} className="hover:text-stone-200 transition-colors">
                  Order Tracking
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Journal & Collector Newsletter */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold text-stone-100 uppercase tracking-wider">
              The Atelier Journal
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Receive limited production batch announcements, material essays, and invitations to private showroom previews.
            </p>
            {subscribed ? (
              <div className="p-3 bg-stone-900 border border-stone-800 rounded-md text-xs text-stone-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>You have been added to the collector circle.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="flex-1 bg-stone-900 border border-stone-800 rounded-md px-3 py-2 text-xs text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-stone-600"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-100 text-stone-900 hover:bg-white text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            <p className="text-[11px] text-stone-500">
              No promotions. Published strictly twice per month.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 Atelier Lumen Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Zurich</span>
            <span aria-hidden="true">·</span>
            <span>New York</span>
            <span aria-hidden="true">·</span>
            <span>Kyoto</span>
            <span aria-hidden="true">·</span>
            <span>Copenhagen</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
