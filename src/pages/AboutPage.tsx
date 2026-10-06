import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Hammer, Sparkles, Shield, Compass } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setActivePage } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* Hero section */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-800">
          Atelier History & Ethos
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-normal text-stone-950 leading-tight">
          We reject transient fashion in favor of permanence.
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Founded in Zurich in 2021, Atelier Lumen was born from a singular frustration: modern design objects are built to be replaced every three years. We returned to the bench to create objects that develop patina, withstand daily rituals, and can be handed down across generations.
        </p>
      </div>

      {/* Visual Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 rounded-lg overflow-hidden border border-stone-200 aspect-16/10">
          <img
            src="/src/assets/images/hero_atelier_interior_1791272310771.jpg"
            alt="Atelier workspace and design philosophy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="lg:col-span-5 space-y-6">
          <h2 className="font-display text-2xl font-normal text-stone-900">
            The Three Principles
          </h2>

          <div className="space-y-4 text-xs text-stone-700 leading-relaxed">
            <div className="p-4 bg-white rounded-lg border border-stone-200/90 space-y-1">
              <h4 className="font-semibold text-stone-900 flex items-center gap-2">
                <Hammer className="w-4 h-4 text-amber-800" />
                <span>1. Material Truth</span>
              </h4>
              <p className="text-stone-600">
                If something looks like brass, it is solid brass. We never apply faux gold coatings or synthetic veneer laminates.
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg border border-stone-200/90 space-y-1">
              <h4 className="font-semibold text-stone-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-800" />
                <span>2. Mechanical Maintainability</span>
              </h4>
              <p className="text-stone-600">
                Every screw is standardized. Transducer drivers and watch calibres can be serviced by any certified watchmaker or sound technician worldwide.
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg border border-stone-200/90 space-y-1">
              <h4 className="font-semibold text-stone-900 flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-800" />
                <span>3. Zero Overproduction</span>
              </h4>
              <p className="text-stone-600">
                We manufacture in numbered batches of 100 to 250 units. We never produce excess stock or engage in artificial markdown cycles.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Artisans Section */}
      <div className="space-y-8">
        <div className="border-b border-stone-200 pb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-stone-500">
            The Master Crafts
          </span>
          <h2 className="font-display text-3xl font-normal text-stone-950 mt-1">
            Makers Behind the Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Marcus Vance',
              role: 'Master Metalsmith & Studio Keeper',
              location: 'Zurich / New York',
              bio: 'Trained in precision aerospace fabrication before dedicating fifteen years to horological casework and acoustic chassis tuning.'
            },
            {
              name: 'Kenjiro Sato',
              role: 'Third-Generation Potter',
              location: 'Shigaraki, Japan',
              bio: 'Fires high-iron clay vessels in ancient anagama kilns for 72 continuous hours, using wild mountain pine ash for organic crystallization.'
            },
            {
              name: 'Elena Rossi',
              role: 'Leather Artisan & Pattern Maker',
              location: 'Florence, Italy',
              bio: 'Specializes in vegetable-tanned Tuscan Vachetta cowhides, saddle-stitching every stress point with waxed Irish linen thread.'
            }
          ].map((artisan, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-lg border border-stone-200/90 space-y-3"
            >
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center font-display text-stone-800 text-lg font-semibold border border-stone-200">
                {artisan.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="font-display text-lg text-stone-900">{artisan.name}</h3>
                <p className="text-xs font-mono text-amber-800">{artisan.role}</p>
                <p className="text-[11px] text-stone-400 font-mono mt-0.5">{artisan.location}</p>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed pt-2 border-t border-stone-100">
                {artisan.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-10 bg-stone-900 text-stone-100 rounded-xl text-center space-y-4">
        <h3 className="font-display text-2xl sm:text-3xl font-normal text-white">
          Experience the collection in your own space.
        </h3>
        <p className="text-xs sm:text-sm text-stone-400 max-w-md mx-auto">
          Every piece includes our 30-day in-home trial and 5-year atelier warranty.
        </p>
        <button
          onClick={() => {
            setActivePage('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-6 py-3 bg-stone-100 text-stone-900 hover:bg-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors inline-flex items-center gap-2"
        >
          <span>Browse Available Artifacts</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
