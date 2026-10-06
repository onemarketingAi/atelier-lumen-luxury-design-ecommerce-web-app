import React from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { HeroImageSlider } from '../components/HeroImageSlider';
import { ArrowRight, ShieldCheck, Clock, Sparkles, ShoppingBag, Eye, Star } from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    navigateToProduct,
    setActivePage,
    addToCart,
    buyNow,
    setSelectedCategory
  } = useStore();

  const featuredProducts = PRODUCTS.filter(p => p.isFeatured).slice(0, 6);

  return (
    <div className="space-y-16 pb-20">
      
      {/* Full Size Architectural Image Slider (No Text, Smooth Top-to-Bottom Transitions, Bottom-Right Swipe Controller) */}
      <HeroImageSlider />

      {/* Trust & Craftsmanship Highlights Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg border border-stone-200/90 p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-700">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-stone-100 rounded-md text-stone-900 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-stone-900">5-Year Atelier Guarantee</p>
              <p className="text-stone-500 text-[11px] mt-0.5">Comprehensive warranty with worldwide servicing</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-stone-100 rounded-md text-stone-900 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-stone-900">Numbered Studio Batches</p>
              <p className="text-stone-500 text-[11px] mt-0.5">Limited runs from titanium, brass, and Tuscan leather</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-stone-100 rounded-md text-stone-900 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-stone-900">30-Day In-Home Trial</p>
              <p className="text-stone-500 text-[11px] mt-0.5">Complimentary return shipping if not fully harmonious</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { id: 'audio', title: 'Audio & Acoustics', count: 'Planar & Turntable' },
            { id: 'lighting', title: 'Sculptural Lighting', count: 'Brass & Smoked Glass' },
            { id: 'horology', title: 'Horology', count: 'Titanium Calibres' },
            { id: 'leather', title: 'Leather Goods', count: 'Tuscan Vachetta' },
            { id: 'living', title: 'Artisanal Living', count: 'Ceramics & Tools' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setActivePage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-5 text-left bg-white rounded-lg border border-stone-200/80 hover:border-stone-400 hover:shadow-md transition-all group cursor-pointer"
            >
              <h3 className="font-display text-base text-stone-900 group-hover:text-stone-950 font-normal">
                {cat.title}
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                {cat.count}
              </p>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-900 mt-3 group-hover:translate-x-0.5 transition-transform">
                Explore <ArrowRight className="w-3 h-3" />
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Collection Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-stone-500">
              Curated Selection
            </span>
            <h2 className="font-display text-3xl font-normal text-stone-950 mt-1">
              Featured Studio Pieces
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setActivePage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-semibold uppercase tracking-wider text-stone-900 hover:text-stone-600 transition-colors inline-flex items-center gap-1.5"
          >
            <span>View Complete Catalog ({PRODUCTS.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Product Grid: 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map(product => (
            <div
              key={product.id}
              className="group bg-white rounded-lg border border-stone-200/90 overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300"
            >
              {/* Image Container with Badges */}
              <div
                onClick={() => navigateToProduct(product.id)}
                className="relative aspect-4/3 bg-stone-100 overflow-hidden cursor-pointer"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                />
                
                {/* Subtle Text Tag */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {product.isNew && (
                    <span className="bg-stone-900 text-stone-100 text-[10px] font-mono uppercase px-2 py-0.5 rounded tracking-wider">
                      New Release
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="bg-amber-800 text-white text-[10px] font-mono uppercase px-2 py-0.5 rounded tracking-wider">
                      Special Edition
                    </span>
                  )}
                </div>

                {/* Quick View Button on Hover */}
                <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <span className="px-4 py-2 bg-white/95 text-stone-900 rounded-md text-xs font-semibold shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Eye className="w-3.5 h-3.5" />
                    Inspect Piece
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                    <span className="uppercase tracking-wider font-mono text-[11px]">
                      {product.categoryLabel}
                    </span>
                    <div className="flex items-center gap-1 text-stone-700">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span className="font-mono tabular-nums text-xs">{product.rating}</span>
                      <span className="text-stone-400">({product.reviewsCount})</span>
                    </div>
                  </div>

                  <h3
                    onClick={() => navigateToProduct(product.id)}
                    className="font-display text-lg text-stone-900 group-hover:text-stone-700 transition-colors cursor-pointer leading-snug"
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs text-stone-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Price & Action Buttons */}
                <div className="pt-3 border-t border-stone-100">
                  <div className="flex items-baseline justify-between mb-3">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-base font-semibold text-stone-950 tabular-nums">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="font-mono text-xs text-stone-400 line-through tabular-nums">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-stone-500">
                      {product.stockCount} in stock
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>

                    <button
                      onClick={() => buyNow(product)}
                      className="w-full py-2 px-3 bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-semibold rounded-md transition-colors text-center cursor-pointer"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Craftsmanship & Editorial Feature Section */}
      <section className="bg-stone-100 border-y border-stone-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-800">
              The Philosophy
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-normal text-stone-950 leading-tight">
              Materials that breathe and tell the story of time.
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              We reject planned obsolescence. Every screw, resistor, and piece of Vachetta leather is selected so that with age, it gains character rather than degrading. Our workshops in Switzerland, Italy, and Japan adhere to small-batch discipline.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-stone-200/80">
              <div>
                <p className="font-mono text-2xl font-normal text-stone-950">100%</p>
                <p className="text-xs text-stone-600 mt-1">Sustainably sourced metals & certified vegetable tanning</p>
              </div>
              <div>
                <p className="font-mono text-2xl font-normal text-stone-950">5 Years</p>
                <p className="text-xs text-stone-600 mt-1">Full atelier guarantee & lifetime repair program</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setActivePage('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-semibold uppercase tracking-wider text-stone-900 hover:text-stone-700 inline-flex items-center gap-1.5"
              >
                <span>Read our craft manifesto</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden border border-stone-300/80 aspect-3/4">
                <img
                  src={PRODUCTS[3].images[0]}
                  alt="Leather weekender bag craftsmanship"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden border border-stone-300/80 aspect-3/4 mt-8">
                <img
                  src={PRODUCTS[4].images[0]}
                  alt="Artisanal ceramic vase"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Collector Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-stone-500">
            Collector Endorsements
          </span>
          <h2 className="font-display text-3xl font-normal text-stone-950 mt-1">
            Voices from the Studio
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: "The Acoustic Horizon S1 redefined headphone listening for me. The brass accents and planar fidelity elevate it beyond audio gear into a sculptural work.",
              author: "Julian Meier",
              role: "Sound Architect",
              city: "Zurich"
            },
            {
              quote: "Turning the brass dimmer dial on the Lumen Eclipse is the most tactile part of my evening routine. The light is warm, amber, and serene.",
              author: "Sophia Lindqvist",
              role: "Interior Designer",
              city: "Stockholm"
            },
            {
              quote: "The Chronos Calibre 04 has replaced my vintage chronographs. It is featherweight titanium with mathematical dial harmony.",
              author: "David Chen",
              role: "Product Strategist",
              city: "New York"
            }
          ].map((t, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-lg border border-stone-200/90 flex flex-col justify-between"
            >
              <p className="text-sm text-stone-700 italic leading-relaxed">
                "{t.quote}"
              </p>
              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-stone-900">{t.author}</p>
                  <p className="text-stone-500">{t.role}</p>
                </div>
                <span className="font-mono text-stone-400">{t.city}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
