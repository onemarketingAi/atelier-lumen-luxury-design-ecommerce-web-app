import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartCount,
    cartSubtotal,
    removeFromCart,
    updateQuantity,
    setActivePage
  } = useStore();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  if (!isCartOpen) return null;

  const freeShippingThreshold = 150;
  const progressToFreeShipping = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const discountAmount = promoApplied ? Math.round(cartSubtotal * 0.1) : 0;
  const shippingCost = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 25;
  const total = Math.max(0, cartSubtotal - discountAmount + shippingCost);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (promoCode.trim().toUpperCase() === 'WELCOME10') {
      setPromoApplied(true);
    } else {
      setPromoError('Invalid promotion code. Try "WELCOME10"');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F5] shadow-2xl flex flex-col border-l border-stone-200">
          
          {/* Header */}
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-normal text-stone-900">
                Your Selection
              </h2>
              <p className="text-xs text-stone-500 font-mono mt-0.5">
                {cartCount} {cartCount === 1 ? 'artifact' : 'artifacts'} in bag
              </p>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-stone-400 hover:text-stone-900 transition-colors rounded-full hover:bg-stone-100"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Shipping Meter */}
          <div className="px-6 py-3 bg-stone-100/70 border-b border-stone-200 text-xs text-stone-700">
            {remainingForFreeShipping > 0 ? (
              <p>
                Add <span className="font-semibold text-stone-900">${remainingForFreeShipping}</span> more for complimentary insured courier dispatch.
              </p>
            ) : (
              <p className="text-emerald-700 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                Qualified for complimentary global insured shipping.
              </p>
            )}
            <div className="mt-2 w-full h-1 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-stone-800 transition-all duration-300"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Bag Items list */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <p className="font-display text-lg text-stone-700 mb-2">Your bag is empty</p>
                <p className="text-xs text-stone-500 max-w-xs mb-6">
                  Explore our curated studio collection of acoustics, timepieces, and lighting objects.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActivePage('shop');
                  }}
                  className="px-5 py-2.5 bg-stone-900 text-stone-100 text-xs font-medium rounded-md hover:bg-stone-800 transition-colors"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              cart.map(item => {
                const unitPrice = item.product.price + (item.selectedVariant.priceModifier || 0);
                return (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-6 border-b border-stone-200/60 last:border-0"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-24 bg-stone-100 rounded-sm overflow-hidden shrink-0 border border-stone-200">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="text-sm font-medium text-stone-900 leading-snug">
                            {item.product.name}
                          </h3>
                          <span className="font-mono text-xs tabular-nums text-stone-900 font-semibold">
                            ${unitPrice * item.quantity}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 mt-1">
                          {item.selectedVariant.name}
                        </p>
                        <p className="text-xs text-stone-400 font-mono mt-0.5">
                          ${unitPrice} each
                        </p>
                      </div>

                      {/* Quantity Stepper & Remove */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-stone-300 rounded-md bg-white">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-stone-100 text-stone-600 transition-colors rounded-l-md"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-mono font-medium text-stone-900 tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-stone-100 text-stone-600 transition-colors rounded-r-md"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer with Calculations & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-white/70 space-y-4">
              
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code (e.g. WELCOME10)"
                  value={promoCode}
                  onChange={e => setPromoCode(e.target.value)}
                  disabled={promoApplied}
                  className="flex-1 bg-stone-50 border border-stone-200 rounded-md px-3 py-1.5 text-xs text-stone-900 uppercase focus:outline-none focus:border-stone-400"
                />
                <button
                  type="submit"
                  disabled={promoApplied || !promoCode}
                  className="px-3 py-1.5 bg-stone-200 hover:bg-stone-300 disabled:opacity-50 text-stone-800 text-xs font-medium rounded-md transition-colors"
                >
                  {promoApplied ? 'Applied' : 'Apply'}
                </button>
              </form>
              {promoError && (
                <p className="text-xs text-rose-600 -mt-2">{promoError}</p>
              )}
              {promoApplied && (
                <p className="text-xs text-emerald-600 -mt-2">10% Welcome Collector discount applied</p>
              )}

              {/* Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-100 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-stone-900">${cartSubtotal}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Atelier Welcome Promo (10%)</span>
                    <span className="font-mono tabular-nums">-${discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Courier Delivery</span>
                  <span className="font-mono tabular-nums text-stone-900">
                    {shippingCost === 0 ? 'Complimentary' : `$${shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-stone-950 text-sm pt-2 border-t border-stone-200">
                  <span>Estimated Total</span>
                  <span className="font-mono tabular-nums">${total}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs uppercase tracking-wider font-semibold rounded-md transition-colors flex items-center justify-center gap-2 group cursor-pointer shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <p className="text-[11px] text-center text-stone-400 tracking-normal">
                Taxes calculated at final checkout · 30-Day in-home trial
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
