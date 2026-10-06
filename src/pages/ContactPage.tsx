import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Phone, MapPin, Clock, MessageSquare, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { setIsChatOpen, showToast } = useStore();

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('specifications');
  const [formMessage, setFormMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) return;

    setSubmitted(true);
    showToast('Inquiry received. An atelier keeper will respond within 4 hours.');
  };

  const faqs = [
    {
      q: 'How does global insured shipping work?',
      a: 'All orders above $150 qualify for complimentary insured global dispatch via DHL Express or FedEx Priority. Parcels are packed in custom die-cut archival foam boxes and require adult signature upon receipt.'
    },
    {
      q: 'What is the 30-day in-home trial?',
      a: 'We understand that acoustics and lighting must harmonize with your specific room geometry. You have 30 calendar days to experience any artifact in your home. If you wish to return it in original condition, we provide a prepaid insured return label.'
    },
    {
      q: 'Can pieces be customized with bespoke finishes or engraving?',
      a: 'Yes. Our Zurich and New York benches accommodate custom laser engraving, bespoke cable lengths, and custom cord wattages. Reach out to Marcus via our live chat or the inquiry form below.'
    },
    {
      q: 'Are the lamps compatible with 220V and 110V international electricity?',
      a: 'All Lumen luminaires feature universal auto-switching drivers supporting 100V through 240V, 50/60Hz. We ship with region-specific solid brass plug adaptors for your destination country.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Title */}
      <div className="max-w-2xl space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-stone-500">
          Studio Concierge
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-normal text-stone-950">
          Showrooms & Direct Inquiries
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          Whether you require bespoke acoustic calibration, private showroom viewings, or dispatch assistance, our artisans are at your service.
        </p>
      </div>

      {/* Main Grid: Form (Left) & Showrooms / Live Chat (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 rounded-lg border border-stone-200/90 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <div>
              <h2 className="font-display text-xl text-stone-900">
                Send an Atelier Inquiry
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Typical reply turnaround is under 4 studio hours
              </p>
            </div>
            <button
              onClick={() => setIsChatOpen(true)}
              className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1.5 underline"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Or start live chat</span>
            </button>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-display text-xl text-stone-900">Inquiry Logged</h3>
              <p className="text-xs text-stone-600 max-w-sm mx-auto">
                Thank you, {formName}. A studio keeper has received your request and will contact {formEmail} shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 bg-stone-900 text-stone-100 text-xs font-medium rounded-md hover:bg-stone-800"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    required
                    placeholder="e.g. Christian Ward"
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-md text-xs focus:outline-none focus:border-stone-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={e => setFormEmail(e.target.value)}
                    required
                    placeholder="name@organization.com"
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-md text-xs focus:outline-none focus:border-stone-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Inquiry Nature
                </label>
                <select
                  value={formSubject}
                  onChange={e => setFormSubject(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-md text-xs focus:outline-none focus:border-stone-400 cursor-pointer"
                >
                  <option value="specifications">Product Specifications & Dimensions</option>
                  <option value="bespoke">Bespoke Architectural Commission / Monogram</option>
                  <option value="order">Order Tracking & Shipping Inquiry</option>
                  <option value="press">Press, Architecture & Editorial Loan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Message Details *
                </label>
                <textarea
                  rows={4}
                  value={formMessage}
                  onChange={e => setFormMessage(e.target.value)}
                  required
                  placeholder="Detail your request, project timeline, or questions for our master craftsmen..."
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-md text-xs focus:outline-none focus:border-stone-400"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
              >
                Transmit Inquiry
              </button>
            </form>
          )}

        </div>

        {/* Right: Studio Locations & Quick Connect */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Live Chat Banner */}
          <div className="p-6 bg-stone-900 text-stone-100 rounded-lg space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Studio Desk Active</span>
            </div>
            <h3 className="font-display text-xl text-white">
              Instant Seller & Artisan Chat
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Have an urgent sizing question or need high-resolution material closeups? Marcus Vance is available in our direct messaging lounge.
            </p>
            <button
              onClick={() => setIsChatOpen(true)}
              className="mt-2 px-4 py-2.5 bg-stone-100 text-stone-950 hover:bg-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-amber-700" />
              <span>Open Chat Window</span>
            </button>
          </div>

          {/* Showroom Addresses */}
          <div className="space-y-4">
            <h3 className="font-display text-lg text-stone-900">
              Physical Showrooms
            </h3>

            <div className="space-y-3 text-xs text-stone-600">
              <div className="p-4 bg-white rounded-lg border border-stone-200/90 space-y-1">
                <p className="font-semibold text-stone-900">SoHo Flagship Atelier — New York</p>
                <p>94 Crosby Street, Floor 3, New York, NY 10012</p>
                <p className="text-stone-400 font-mono text-[11px]">Tue–Sat 11:00 – 19:00 · Walk-ins & private auditions</p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-stone-200/90 space-y-1">
                <p className="font-semibold text-stone-900">Zurich Engineering Bench</p>
                <p>Limmatquai 42, 8001 Zürich, Switzerland</p>
                <p className="text-stone-400 font-mono text-[11px]">Mon–Fri 09:00 – 18:00 CET · By appointment</p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-stone-200/90 space-y-1">
                <p className="font-semibold text-stone-900">Gion Studio — Kyoto</p>
                <p>Higashiyama Ward, Kyoto 605-0074, Japan</p>
                <p className="text-stone-400 font-mono text-[11px]">Wed–Sun 12:00 – 18:00 JST · Ceramic exhibitions</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* FAQ Section */}
      <div className="border-t border-stone-200 pt-12 space-y-6 max-w-4xl">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-stone-500">
            Frequently Asked Questions
          </span>
          <h2 className="font-display text-2xl font-normal text-stone-950 mt-1">
            Care, Policies & Worldwide Dispatch
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;

            return (
              <div
                key={idx}
                className="bg-white rounded-lg border border-stone-200/90 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-semibold text-stone-900 hover:bg-stone-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-stone-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
