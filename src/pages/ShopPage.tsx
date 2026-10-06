import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { Search, SlidersHorizontal, Star, ShoppingBag, Eye, Heart, X } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    navigateToProduct,
    addToCart,
    buyNow,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    wishlist,
    toggleWishlist
  } = useStore();

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(1500);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesSub = product.subtitle.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCat = product.categoryLabel.toLowerCase().includes(query);
        if (!matchesName && !matchesSub && !matchesDesc && !matchesCat) {
          return false;
        }
      }
      // In stock filter
      if (onlyInStock && !product.inStock) {
        return false;
      }
      // Max price filter
      if (product.price > maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, onlyInStock, maxPrice, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setOnlyInStock(false);
    setMaxPrice(1500);
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title & Introduction */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-stone-500 uppercase">
          <span>Catalog</span>
          <span aria-hidden="true">/</span>
          <span>Permanent Collection</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-normal text-stone-950">
          Studio Artifacts & Objects
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
          Every piece is produced in small numbered series. Materials are selected for their tactile presence, acoustic isolation, or mechanical longevity.
        </p>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-lg border border-stone-200/90 shadow-xs space-y-4">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-stone-900 text-stone-100 shadow-xs'
                  : 'bg-stone-100/80 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search, Sort, and Refinements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 pt-3 border-t border-stone-100 items-center">
          
          {/* Search Input */}
          <div className="lg:col-span-5 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by name, material, or category..."
              className="w-full bg-stone-50 border border-stone-200 rounded-md pl-9 pr-8 py-2 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="lg:col-span-3 flex items-center gap-2">
            <span className="text-xs text-stone-500 whitespace-nowrap">Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="flex-1 bg-stone-50 border border-stone-200 rounded-md px-2.5 py-2 text-xs text-stone-800 focus:outline-none focus:border-stone-400 cursor-pointer"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* Price Range Slider */}
          <div className="lg:col-span-2 flex items-center gap-2">
            <span className="text-xs text-stone-500 whitespace-nowrap">Under:</span>
            <div className="flex items-center gap-1.5 flex-1">
              <input
                type="range"
                min="100"
                max="1500"
                step="50"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-stone-800 cursor-pointer"
              />
              <span className="font-mono text-xs tabular-nums text-stone-900 min-w-10 text-right">
                ${maxPrice}
              </span>
            </div>
          </div>

          {/* In Stock Toggle */}
          <div className="lg:col-span-2 flex items-center justify-end gap-2">
            <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={e => setOnlyInStock(e.target.checked)}
                className="rounded text-stone-900 accent-stone-900"
              />
              <span>In Stock Only</span>
            </label>
          </div>

        </div>

      </div>

      {/* Result Count and Active Filter Indicator */}
      <div className="flex items-center justify-between text-xs text-stone-500">
        <div className="flex items-center gap-2">
          <span>Showing <strong className="text-stone-900 font-mono">{filteredProducts.length}</strong> of {PRODUCTS.length} objects</span>
          {(searchQuery || selectedCategory !== 'all' || onlyInStock || maxPrice < 1500) && (
            <button
              onClick={clearAllFilters}
              className="text-amber-800 underline hover:text-amber-950 font-medium ml-2 cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>
        <span className="hidden sm:inline font-mono">Archive Series 2026</span>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-lg border border-stone-200">
          <p className="font-display text-xl text-stone-800 mb-2">No matching artifacts found</p>
          <p className="text-xs text-stone-500 max-w-sm mx-auto mb-6">
            Try adjusting your search keywords, price cap, or category filters.
          </p>
          <button
            onClick={clearAllFilters}
            className="px-5 py-2.5 bg-stone-900 text-stone-100 text-xs font-semibold rounded-md hover:bg-stone-800 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => {
            const isWish = wishlist.includes(product.id);

            return (
              <div
                key={product.id}
                className="group bg-white rounded-lg border border-stone-200/90 overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300"
              >
                {/* Image Container */}
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

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {product.isNew && (
                      <span className="bg-stone-900 text-stone-100 text-[10px] font-mono uppercase px-2 py-0.5 rounded tracking-wider">
                        New
                      </span>
                    )}
                    {product.originalPrice && (
                      <span className="bg-amber-800 text-white text-[10px] font-mono uppercase px-2 py-0.5 rounded tracking-wider">
                        Special
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xs transition-colors shadow-xs ${
                      isWish
                        ? 'bg-rose-50 text-rose-600'
                        : 'bg-white/90 text-stone-600 hover:text-stone-900'
                    }`}
                    aria-label="Add to wishlist"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWish ? 'fill-rose-600' : ''}`} />
                  </button>

                  {/* Hover Quick Inspect */}
                  <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <span className="px-4 py-2 bg-white/95 text-stone-900 rounded-md text-xs font-semibold shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Eye className="w-3.5 h-3.5" />
                      View Details
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
                        {product.stockCount > 0 ? `${product.stockCount} in batch` : 'Sold Out'}
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
            );
          })}
        </div>
      )}

    </div>
  );
};
