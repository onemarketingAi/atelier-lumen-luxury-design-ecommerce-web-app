import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  ShoppingBag,
  ArrowRight,
  Heart,
  MessageSquare,
  Minus,
  Plus,
  Check,
  Share2
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductId,
    addToCart,
    buyNow,
    navigateToProduct,
    setActivePage,
    startChatAboutProduct,
    wishlist,
    toggleWishlist,
    showToast
  } = useStore();

  const product = PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'materials' | 'reviews'>('overview');

  // Review submission state
  const [reviewsList, setReviewsList] = useState(product.reviews);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');

  const isWish = wishlist.includes(product.id);
  const unitPrice = product.price + (selectedVariant?.priceModifier || 0);

  const handleVariantSelect = (v: any) => {
    setSelectedVariant(v);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev = {
      id: 'rev-' + Date.now(),
      author: newReviewAuthor.trim(),
      rating: newReviewRating,
      date: 'Just now',
      title: newReviewTitle.trim() || 'Verified Impression',
      comment: newReviewComment.trim(),
      verified: true
    };

    setReviewsList([newRev, ...reviewsList]);
    setShowReviewForm(false);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
    showToast('Your impression has been submitted.');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard.');
    } else {
      showToast('Artifact catalog ID: ' + product.sku);
    }
  };

  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-mono text-stone-500">
        <button
          onClick={() => setActivePage('home')}
          className="hover:text-stone-900 transition-colors"
        >
          Home
        </button>
        <span aria-hidden="true">/</span>
        <button
          onClick={() => setActivePage('shop')}
          className="hover:text-stone-900 transition-colors"
        >
          Catalog
        </button>
        <span aria-hidden="true">/</span>
        <span className="text-stone-400 capitalize">{product.category}</span>
        <span aria-hidden="true">/</span>
        <span className="text-stone-900 font-medium truncate">{product.name}</span>
      </nav>

      {/* Main PDP Grid: Gallery (Left) & Contiguous Purchase Module (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Gallery & High-Res Viewports */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-4/3 bg-stone-100 rounded-lg overflow-hidden border border-stone-200/90 shadow-xs">
            <img
              src={product.images[activeImageIdx] || product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-300"
            />
            
            {/* Top action icons */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2.5 bg-white/90 hover:bg-white text-stone-700 hover:text-stone-950 rounded-full shadow-md backdrop-blur-xs transition-colors"
                title="Share piece"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-2.5 rounded-full shadow-md backdrop-blur-xs transition-colors ${
                  isWish
                    ? 'bg-rose-50 text-rose-600'
                    : 'bg-white/90 hover:bg-white text-stone-700 hover:text-stone-950'
                }`}
                title="Save to wishlist"
              >
                <Heart className={`w-4 h-4 ${isWish ? 'fill-rose-600' : ''}`} />
              </button>
            </div>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIdx === idx
                      ? 'border-stone-900 opacity-100 shadow-xs'
                      : 'border-stone-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} angle ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          
          {/* Header Metadata */}
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 font-mono mb-2">
              <span className="uppercase tracking-widest">{product.categoryLabel}</span>
              <span>SKU: {product.sku}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-normal text-stone-950 leading-tight">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-stone-600 mt-1.5 font-light">
              {product.subtitle}
            </p>

            {/* Ratings and reviews jump link */}
            <div className="flex items-center gap-3 mt-3 text-xs">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-500 text-amber-500'
                        : 'text-stone-300'
                    }`}
                  />
                ))}
              </div>
              <span className="font-mono tabular-nums text-stone-900 font-semibold">
                {product.rating}
              </span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <button
                onClick={() => setActiveTab('reviews')}
                className="text-stone-500 underline hover:text-stone-900"
              >
                {reviewsList.length} verified impressions
              </button>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 bg-stone-50 rounded-lg border border-stone-200/80 flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-2xl sm:text-3xl font-semibold text-stone-950 tabular-nums">
                  ${unitPrice}
                </span>
                {product.originalPrice && (
                  <span className="font-mono text-sm text-stone-400 line-through tabular-nums">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Complimentary insured courier delivery included
              </p>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                In Stock ({product.stockCount} left)
              </span>
              <p className="text-[11px] text-stone-400 font-mono">Dispatches in 24h</p>
            </div>
          </div>

          {/* Variant Selector */}
          {product.variants.length > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-stone-900">Finish / Material:</span>
                <span className="text-stone-600 font-medium">{selectedVariant.name}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.variants.map(v => (
                  <button
                    key={v.id}
                    onClick={() => handleVariantSelect(v)}
                    className={`p-3 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer ${
                      selectedVariant.id === v.id
                        ? 'border-stone-950 bg-white ring-1 ring-stone-950 shadow-xs'
                        : 'border-stone-200 bg-white/60 hover:border-stone-400'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {v.colorHex && (
                        <span
                          className="w-4 h-4 rounded-full border border-stone-300 shrink-0"
                          style={{ backgroundColor: v.colorHex }}
                        />
                      )}
                      <span className="text-xs font-medium text-stone-900">
                        {v.name}
                      </span>
                    </div>
                    {v.priceModifier && (
                      <span className="text-xs font-mono text-stone-500">
                        +${v.priceModifier}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector & Action CTAs */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-stone-900">Quantity:</span>
              <div className="flex items-center border border-stone-300 rounded-md bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-stone-100 text-stone-600 transition-colors rounded-l-md"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-mono font-medium text-stone-900 tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  className="p-2 hover:bg-stone-100 text-stone-600 transition-colors rounded-r-md"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => addToCart(product, selectedVariant, quantity)}
                className="w-full py-3.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-950 border border-stone-300 text-xs font-semibold uppercase tracking-wider rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>

              <button
                onClick={() => buyNow(product, selectedVariant, quantity)}
                className="w-full py-3.5 px-4 bg-stone-950 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Buy Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Direct Seller Chat CTA on Product Detail */}
            <button
              onClick={() => startChatAboutProduct(product)}
              className="w-full py-2.5 px-4 bg-amber-50 hover:bg-amber-100/80 text-amber-950 border border-amber-200 text-xs font-medium rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-amber-700" />
              <span>Inquire with Artisan about this piece</span>
            </button>
          </div>

          {/* Atelier Trust Promises */}
          <div className="p-4 bg-stone-100/70 rounded-lg border border-stone-200 space-y-2.5 text-xs text-stone-700">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-stone-800 shrink-0" />
              <span>White-Glove Insured Delivery with live courier tracking</span>
            </div>
            <div className="flex items-center gap-2.5">
              <RotateCcw className="w-4 h-4 text-stone-800 shrink-0" />
              <span>30-Day in-home acoustic and aesthetic trial</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-stone-800 shrink-0" />
              <span>{product.warranty}</span>
            </div>
          </div>

        </div>

      </div>

      {/* Structured Details Tabs */}
      <div className="border-t border-stone-200 pt-10">
        
        {/* Tab buttons */}
        <div className="flex items-center gap-6 border-b border-stone-200 pb-2 text-xs font-semibold uppercase tracking-wider overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2 transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'border-b-2 border-stone-950 text-stone-950'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            Overview & Architectural Notes
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-2 transition-colors cursor-pointer ${
              activeTab === 'specs'
                ? 'border-b-2 border-stone-950 text-stone-950'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('materials')}
            className={`pb-2 transition-colors cursor-pointer ${
              activeTab === 'materials'
                ? 'border-b-2 border-stone-950 text-stone-950'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            Materials & Care
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-2 transition-colors cursor-pointer ${
              activeTab === 'reviews'
                ? 'border-b-2 border-stone-950 text-stone-950'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            Collector Impressions ({reviewsList.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="py-8">
          
          {/* Overview */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <h3 className="font-display text-xl text-stone-900">
                  Concept & Execution
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {product.longDescription}
                </p>
                <div className="pt-2 text-xs text-stone-500 font-mono">
                  Dimensions: {product.dimensions}
                </div>
              </div>

              <div className="space-y-3 bg-white p-6 rounded-lg border border-stone-200/90">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                  Notable Characteristics
                </h4>
                <ul className="space-y-2 text-xs text-stone-700">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Specs */}
          {activeTab === 'specs' && (
            <div className="max-w-3xl bg-white rounded-lg border border-stone-200 overflow-hidden">
              <div className="divide-y divide-stone-100">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="grid grid-cols-3 p-4 text-xs">
                    <span className="font-semibold text-stone-800">{key}</span>
                    <span className="col-span-2 text-stone-600 font-mono">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Materials */}
          {activeTab === 'materials' && (
            <div className="max-w-3xl space-y-4 text-xs text-stone-700 leading-relaxed bg-white p-6 rounded-lg border border-stone-200">
              <h4 className="font-display text-base text-stone-900">
                Primary Mediums: {product.materials}
              </h4>
              <p>
                Each alloy, grain of leather, and glass element is left unmasked by synthetic polyurethane coatings. To maintain the tactile finish:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-stone-600">
                <li>Brass and bronze: Wipe with dry microfiber; natural patina will evolve with touch.</li>
                <li>Leather: Condition twice yearly with natural beeswax balm.</li>
                <li>Glass & ceramics: Clean with damp organic cotton cloth; avoid caustic detergents.</li>
              </ul>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-8 max-w-4xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-lg border border-stone-200">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-3xl font-semibold text-stone-950">
                      {product.rating}
                    </span>
                    <span className="text-xs text-stone-500">out of 5.0</span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    Based on {reviewsList.length} verified collector evaluations
                  </p>
                </div>

                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-semibold rounded-md transition-colors"
                >
                  {showReviewForm ? 'Close Review Form' : 'Submit Collector Impression'}
                </button>
              </div>

              {/* Review Submission Form */}
              {showReviewForm && (
                <form
                  onSubmit={handleReviewSubmit}
                  className="p-6 bg-white rounded-lg border border-stone-300 space-y-4 animate-fade-in"
                >
                  <h4 className="font-display text-base text-stone-900">
                    Share your experience with {product.name}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Your Name / Title
                      </label>
                      <input
                        type="text"
                        value={newReviewAuthor}
                        onChange={e => setNewReviewAuthor(e.target.value)}
                        placeholder="e.g. Liam Sterling, Collector"
                        required
                        className="w-full p-2 bg-stone-50 border border-stone-200 rounded-md text-xs focus:outline-none focus:border-stone-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Rating
                      </label>
                      <select
                        value={newReviewRating}
                        onChange={e => setNewReviewRating(Number(e.target.value))}
                        className="w-full p-2 bg-stone-50 border border-stone-200 rounded-md text-xs focus:outline-none focus:border-stone-400"
                      >
                        <option value={5}>5 Stars — Exceeds Expectations</option>
                        <option value={4}>4 Stars — Very Satisfied</option>
                        <option value={3}>3 Stars — Average Craft</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Impression Headline
                    </label>
                    <input
                      type="text"
                      value={newReviewTitle}
                      onChange={e => setNewReviewTitle(e.target.value)}
                      placeholder="e.g. Masterful acoustic balance"
                      className="w-full p-2 bg-stone-50 border border-stone-200 rounded-md text-xs focus:outline-none focus:border-stone-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Detailed Review
                    </label>
                    <textarea
                      rows={3}
                      value={newReviewComment}
                      onChange={e => setNewReviewComment(e.target.value)}
                      placeholder="Share notes on tactile quality, acoustic performance, or spatial impact..."
                      required
                      className="w-full p-2 bg-stone-50 border border-stone-200 rounded-md text-xs focus:outline-none focus:border-stone-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2 bg-stone-900 text-stone-100 text-xs font-semibold rounded-md hover:bg-stone-800 transition-colors"
                  >
                    Post Impression
                  </button>
                </form>
              )}

              {/* Review Cards list */}
              <div className="space-y-4">
                {reviewsList.map(rev => (
                  <div
                    key={rev.id}
                    className="p-6 bg-white rounded-lg border border-stone-200/90 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-stone-900">{rev.author}</span>
                        {rev.verified && (
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-mono">
                            Verified Collector
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-stone-400 font-mono">{rev.date}</span>
                    </div>

                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'fill-amber-500 text-amber-500' : 'text-stone-300'
                          }`}
                        />
                      ))}
                    </div>

                    <h5 className="font-semibold text-xs text-stone-900 pt-1">
                      {rev.title}
                    </h5>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Complementary Artifacts Grid */}
      <div className="border-t border-stone-200 pt-12 space-y-6">
        <div className="flex items-baseline justify-between">
          <h3 className="font-display text-2xl font-normal text-stone-950">
            Complementary Studio Pieces
          </h3>
          <button
            onClick={() => setActivePage('shop')}
            className="text-xs font-semibold uppercase tracking-wider text-stone-800 hover:text-stone-500 transition-colors inline-flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedProducts.map(p => (
            <div
              key={p.id}
              onClick={() => navigateToProduct(p.id)}
              className="bg-white rounded-lg border border-stone-200/90 overflow-hidden cursor-pointer group hover:shadow-md transition-all"
            >
              <div className="aspect-4/3 bg-stone-100 overflow-hidden">
                <img
                  src={p.images[0]}
                  alt={p.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-display text-sm font-normal text-stone-900 group-hover:text-stone-700">
                    {p.name}
                  </h4>
                  <p className="text-xs text-stone-500 font-mono mt-0.5">
                    ${p.price}
                  </p>
                </div>
                <span className="text-xs font-semibold text-stone-900">
                  Inspect →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
