import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Search, User, Menu, X, Heart, MessageSquare } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    cartCount,
    setIsCartOpen,
    currentUser,
    setIsAuthModalOpen,
    wishlist,
    unreadChatCount,
    setIsChatOpen,
    searchQuery,
    setSearchQuery
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleNavClick = (page: any) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top slim announcement bar */}
      <div className="bg-stone-900 text-stone-300 text-xs py-2 px-4 text-center tracking-wide font-normal">
        Complimentary insured global courier dispatch on commissions above $150 · 5-Year Atelier Warranty
      </div>

      <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Zone 1: Single Brand Wordmark in Display Typography */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <span className="font-display text-2xl sm:text-3xl font-normal tracking-tight text-stone-950 group-hover:text-stone-700 transition-colors">
                ATELIER LUMEN
              </span>
            </button>
          </div>

          {/* Zone 2: 4-6 Clean Text Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-normal text-stone-700">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-stone-950 transition-colors cursor-pointer py-1 relative ${
                activePage === 'home' ? 'text-stone-950 font-semibold' : ''
              }`}
            >
              Home
              {activePage === 'home' && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-stone-900 rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('shop')}
              className={`hover:text-stone-950 transition-colors cursor-pointer py-1 relative ${
                activePage === 'shop' || activePage === 'product-detail' ? 'text-stone-950 font-semibold' : ''
              }`}
            >
              Catalog
              {(activePage === 'shop' || activePage === 'product-detail') && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-stone-900 rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`hover:text-stone-950 transition-colors cursor-pointer py-1 relative ${
                activePage === 'about' ? 'text-stone-950 font-semibold' : ''
              }`}
            >
              The Atelier
              {activePage === 'about' && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-stone-900 rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`hover:text-stone-950 transition-colors cursor-pointer py-1 relative ${
                activePage === 'contact' ? 'text-stone-950 font-semibold' : ''
              }`}
            >
              Showrooms
              {activePage === 'contact' && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-stone-900 rounded-full" />
              )}
            </button>

            {currentUser && (
              <button
                onClick={() => handleNavClick('account')}
                className={`hover:text-stone-950 transition-colors cursor-pointer py-1 relative ${
                  activePage === 'account' ? 'text-stone-950 font-semibold' : ''
                }`}
              >
                My Orders
                {activePage === 'account' && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-stone-900 rounded-full" />
                )}
              </button>
            )}
          </nav>

          {/* Zone 3: Interactive Affordance Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Inline search bar toggle */}
            <div className="relative">
              {showSearchInput ? (
                <div className="flex items-center bg-white border border-stone-300 rounded-md px-2.5 py-1.5 shadow-sm">
                  <Search className="w-4 h-4 text-stone-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    placeholder="Search objects..."
                    onChange={e => {
                      setSearchQuery(e.target.value);
                      if (activePage !== 'shop') {
                        setActivePage('shop');
                      }
                    }}
                    autoFocus
                    className="w-32 sm:w-48 text-xs bg-transparent focus:outline-none text-stone-900 placeholder:text-stone-400"
                  />
                  <button
                    onClick={() => {
                      setShowSearchInput(false);
                      setSearchQuery('');
                    }}
                    className="text-stone-400 hover:text-stone-700 ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearchInput(true)}
                  aria-label="Search collection"
                  className="p-2 text-stone-700 hover:text-stone-950 transition-colors rounded-md hover:bg-stone-100/80"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Seller Chat trigger */}
            <button
              onClick={() => setIsChatOpen(true)}
              aria-label="Message Seller"
              className="relative p-2 text-stone-700 hover:text-stone-950 transition-colors rounded-md hover:bg-stone-100/80 hidden sm:flex items-center gap-1.5 text-xs font-medium"
              title="Message Seller"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden lg:inline text-xs">Atelier Support</span>
              {unreadChatCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-amber-600 rounded-full" />
              )}
            </button>

            {/* Account / Auth trigger */}
            <button
              onClick={() => {
                if (currentUser) {
                  handleNavClick('account');
                } else {
                  setIsAuthModalOpen(true);
                }
              }}
              aria-label="Account"
              className="p-2 text-stone-700 hover:text-stone-950 transition-colors rounded-md hover:bg-stone-100/80 flex items-center gap-1.5 text-xs font-medium"
            >
              <User className="w-4 h-4" />
              <span className="hidden lg:inline">
                {currentUser ? currentUser.name.split(' ')[0] : 'Sign In'}
              </span>
            </button>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Bag"
              className="relative p-2.5 bg-stone-900 text-stone-100 hover:bg-stone-800 transition-colors rounded-md flex items-center gap-2 text-xs font-medium cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline font-mono tabular-nums">Bag ({cartCount})</span>
              <span className="sm:hidden font-mono tabular-nums">{cartCount}</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-stone-800 hover:text-stone-950 rounded-md"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 bg-[#FAF9F5] px-6 py-5 flex flex-col gap-4 text-base font-medium text-stone-800">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left py-2 hover:text-stone-950 border-b border-stone-100"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className="text-left py-2 hover:text-stone-950 border-b border-stone-100"
            >
              Catalog & Objects
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left py-2 hover:text-stone-950 border-b border-stone-100"
            >
              The Atelier Philosophy
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left py-2 hover:text-stone-950 border-b border-stone-100"
            >
              Showrooms & Inquiries
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsChatOpen(true);
              }}
              className="text-left py-2 hover:text-stone-950 border-b border-stone-100 flex items-center justify-between"
            >
              <span>Message Store Artisan</span>
              <span className="text-xs text-amber-700 font-mono">Live</span>
            </button>
            {currentUser ? (
              <button
                onClick={() => handleNavClick('account')}
                className="text-left py-2 hover:text-stone-950"
              >
                Client Account ({currentUser.name})
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="text-left py-2 text-stone-900 font-semibold"
              >
                Sign In / Join Atelier
              </button>
            )}
          </div>
        )}
      </header>
    </>
  );
};
