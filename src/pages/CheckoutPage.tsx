import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShippingAddress } from '../types';
import { ShieldCheck, Truck, CreditCard, Lock, ArrowLeft, CheckCircle2, ChevronRight } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    currentUser,
    placeOrder,
    setActivePage
  } = useStore();

  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: currentUser?.name || 'Alexandria Vance',
    email: currentUser?.email || 'alex.vance@atelier-lumen.com',
    phone: currentUser?.phone || '+1 (212) 555-0198',
    addressLine1: currentUser?.address?.addressLine1 || '742 Evergreen Terrace, Apt 4B',
    addressLine2: '',
    city: currentUser?.address?.city || 'New York',
    state: currentUser?.address?.state || 'NY',
    postalCode: currentUser?.address?.postalCode || '10012',
    country: 'United States'
  });

  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'white-glove'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple-pay' | 'cod'>('card');
  
  // Card mock state
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvc, setCardCvc] = useState('884');

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="font-display text-2xl text-stone-900 mb-2">No items to checkout</h2>
        <p className="text-xs text-stone-500 mb-6">Your shopping bag is currently empty.</p>
        <button
          onClick={() => setActivePage('shop')}
          className="px-5 py-2.5 bg-stone-900 text-stone-100 text-xs font-semibold rounded-md hover:bg-stone-800 transition-colors"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  const freeShipping = cartSubtotal >= 150;
  const baseShippingCost = freeShipping ? 0 : 25;
  const deliverySurcharge = deliveryMethod === 'white-glove' ? 45 : 0;
  const totalShipping = baseShippingCost + deliverySurcharge;

  const discountAmount = promoApplied ? Math.round(cartSubtotal * 0.1) : 0;
  const tax = Math.round((cartSubtotal - discountAmount) * 0.0825 * 100) / 100;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + totalShipping + tax);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!formData.fullName || !formData.email || !formData.addressLine1 || !formData.city || !formData.postalCode) {
      setValidationError('Please complete all required shipping fields.');
      return;
    }

    setIsSubmitting(true);

    let paymentLabel = 'Credit Card ending in 4242';
    if (paymentMethod === 'apple-pay') paymentLabel = 'Apple Pay / Express';
    if (paymentMethod === 'cod') paymentLabel = 'Cash on Delivery / Studio Wire';

    setTimeout(() => {
      placeOrder(formData, paymentLabel, discountAmount);
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Return to shop */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <button
          onClick={() => setActivePage('shop')}
          className="text-xs font-medium text-stone-600 hover:text-stone-900 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Catalog</span>
        </button>
        <span className="font-mono text-xs text-stone-400">
          Secure 256-Bit SSL Checkout
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Checkout Forms */}
        <div className="lg:col-span-7 space-y-8">
          
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Step 1: Destination Address */}
            <div className="bg-white p-6 rounded-lg border border-stone-200/90 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h3 className="font-display text-lg text-stone-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-stone-900 text-stone-100 text-xs flex items-center justify-center font-mono">
                    1
                  </span>
                  <span>Shipping & Client Details</span>
                </h3>
                {currentUser && (
                  <span className="text-xs text-stone-500">
                    Auto-filled from account
                  </span>
                )}
              </div>

              {validationError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-md">
                  {validationError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    required
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-md text-xs focus:outline-none focus:border-stone-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-md text-xs focus:outline-none focus:border-stone-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-md text-xs focus:outline-none focus:border-stone-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Country / Territory *
                  </label>
                  <select
                    value={formData.country}
                    onChange={e => setFormData({ ...formData, country: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-md text-xs focus:outline-none focus:border-stone-400 cursor-pointer"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Germany">Germany</option>
                    <option value="Japan">Japan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  value={formData.addressLine1}
                  onChange={e => setFormData({ ...formData, addressLine1: e.target.value })}
                  placeholder="Street name, suite or apartment"
                  required
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-md text-xs focus:outline-none focus:border-stone-400"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    required
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-md text-xs focus:outline-none focus:border-stone-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    State / Province *
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                    required
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-md text-xs focus:outline-none focus:border-stone-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={e => setFormData({ ...formData, postalCode: e.target.value })}
                    required
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-md text-xs focus:outline-none focus:border-stone-400"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Courier Method */}
            <div className="bg-white p-6 rounded-lg border border-stone-200/90 shadow-xs space-y-3">
              <div className="pb-3 border-b border-stone-100">
                <h3 className="font-display text-lg text-stone-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-stone-900 text-stone-100 text-xs flex items-center justify-center font-mono">
                    2
                  </span>
                  <span>Delivery Method</span>
                </h3>
              </div>

              <div className="space-y-2">
                <label
                  onClick={() => setDeliveryMethod('standard')}
                  className={`p-3.5 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                    deliveryMethod === 'standard'
                      ? 'border-stone-950 bg-stone-50/60 ring-1 ring-stone-950'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === 'standard'}
                      onChange={() => setDeliveryMethod('standard')}
                      className="accent-stone-900"
                    />
                    <div>
                      <p className="text-xs font-semibold text-stone-900">
                        Insured Express Courier (3–5 Business Days)
                      </p>
                      <p className="text-[11px] text-stone-500">
                        Tracked via DHL / FedEx Priority with signature required
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs tabular-nums text-stone-900 font-semibold">
                    {freeShipping ? 'Complimentary' : '$25'}
                  </span>
                </label>

                <label
                  onClick={() => setDeliveryMethod('white-glove')}
                  className={`p-3.5 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                    deliveryMethod === 'white-glove'
                      ? 'border-stone-950 bg-stone-50/60 ring-1 ring-stone-950'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === 'white-glove'}
                      onChange={() => setDeliveryMethod('white-glove')}
                      className="accent-stone-900"
                    />
                    <div>
                      <p className="text-xs font-semibold text-stone-900">
                        White-Glove Atelier Courier (Scheduled Window)
                      </p>
                      <p className="text-[11px] text-stone-500">
                        Direct courier delivery with room placement & archival unboxing
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs tabular-nums text-stone-900 font-semibold">
                    +$45
                  </span>
                </label>
              </div>
            </div>

            {/* Step 3: Payment Options */}
            <div className="bg-white p-6 rounded-lg border border-stone-200/90 shadow-xs space-y-4">
              <div className="pb-3 border-b border-stone-100 flex items-center justify-between">
                <h3 className="font-display text-lg text-stone-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-stone-900 text-stone-100 text-xs flex items-center justify-center font-mono">
                    3
                  </span>
                  <span>Payment Method</span>
                </h3>
                <div className="flex items-center gap-1.5 text-stone-400 text-xs">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Encrypted</span>
                </div>
              </div>

              {/* Payment selector tabs */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-2.5 px-2 rounded-md text-xs font-medium border text-center transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-stone-900 bg-stone-900 text-stone-100'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                  }`}
                >
                  Credit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple-pay')}
                  className={`py-2.5 px-2 rounded-md text-xs font-medium border text-center transition-all cursor-pointer ${
                    paymentMethod === 'apple-pay'
                      ? 'border-stone-900 bg-stone-900 text-stone-100'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                  }`}
                >
                  Apple Pay
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`py-2.5 px-2 rounded-md text-xs font-medium border text-center transition-all cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-stone-900 bg-stone-900 text-stone-100'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                  }`}
                >
                  Pay on Delivery
                </button>
              </div>

              {/* Card input mock */}
              {paymentMethod === 'card' && (
                <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 space-y-3">
                  <div>
                    <label className="block text-[11px] font-medium text-stone-600 mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                        className="w-full p-2.5 bg-white border border-stone-300 rounded-md text-xs font-mono text-stone-900 pl-9"
                      />
                      <CreditCard className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-stone-600 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={e => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full p-2.5 bg-white border border-stone-300 rounded-md text-xs font-mono text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-stone-600 mb-1">
                        CVC Security Code
                      </label>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={e => setCardCvc(e.target.value)}
                        placeholder="CVC"
                        className="w-full p-2.5 bg-white border border-stone-300 rounded-md text-xs font-mono text-stone-900"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'apple-pay' && (
                <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-700 text-center">
                  <p className="font-semibold text-stone-900 mb-1">Express Biometric Checkout</p>
                  <p>Your default payment card and shipping profile will be securely authorized.</p>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-700 space-y-1">
                  <p className="font-semibold text-stone-900">Cash on Delivery / Studio Wire Transfer</p>
                  <p>You may settle the balance upon parcel inspection by certified courier, or via SEPA / ACH wire.</p>
                </div>
              )}
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-stone-950 hover:bg-stone-800 disabled:opacity-60 text-stone-100 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-stone-300 border-t-white rounded-full animate-spin" />
                  <span>Securing Studio Commission...</span>
                </>
              ) : (
                <>
                  <span>Place Commission Order (${finalTotal})</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

        </div>

        {/* Right Column: Sticky Order Summary */}
        <div className="lg:col-span-5 bg-white p-6 rounded-lg border border-stone-200/90 shadow-xs space-y-6 lg:sticky lg:top-28">
          
          <h3 className="font-display text-lg text-stone-900 pb-3 border-b border-stone-100">
            Commission Summary
          </h3>

          {/* Itemized List */}
          <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
            {cart.map(item => {
              const unitPrice = item.product.price + (item.selectedVariant.priceModifier || 0);

              return (
                <div key={item.id} className="flex gap-3">
                  <div className="w-16 h-18 bg-stone-100 rounded-sm overflow-hidden shrink-0 border border-stone-200">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-xs">
                    <p className="font-medium text-stone-900">{item.product.name}</p>
                    <p className="text-stone-500 text-[11px]">{item.selectedVariant.name}</p>
                    <div className="flex items-center justify-between mt-1 text-stone-500 font-mono">
                      <span>Qty: {item.quantity}</span>
                      <span className="font-semibold text-stone-900">${unitPrice * item.quantity}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Promo code */}
          <div className="pt-4 border-t border-stone-100">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Discount Code"
                value={promoCode}
                onChange={e => setPromoCode(e.target.value)}
                disabled={promoApplied}
                className="flex-1 bg-stone-50 border border-stone-200 rounded-md px-3 py-1.5 text-xs text-stone-900 uppercase focus:outline-none focus:border-stone-400"
              />
              <button
                type="button"
                onClick={() => {
                  if (promoCode.trim().toUpperCase() === 'WELCOME10') {
                    setPromoApplied(true);
                  }
                }}
                disabled={promoApplied || !promoCode}
                className="px-3 py-1.5 bg-stone-200 hover:bg-stone-300 disabled:opacity-50 text-stone-800 text-xs font-medium rounded-md transition-colors"
              >
                {promoApplied ? 'Applied' : 'Apply'}
              </button>
            </div>
            {promoApplied && (
              <p className="text-[11px] text-emerald-700 mt-1">10% Welcome discount applied</p>
            )}
          </div>

          {/* Cost breakdown */}
          <div className="space-y-2 text-xs text-stone-600 border-t border-stone-100 pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-mono tabular-nums text-stone-900">${cartSubtotal}</span>
            </div>

            {promoApplied && (
              <div className="flex justify-between text-emerald-700">
                <span>Collector Promo (10%)</span>
                <span className="font-mono tabular-nums">-${discountAmount}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="font-mono tabular-nums text-stone-900">
                {totalShipping === 0 ? 'Complimentary' : `$${totalShipping}`}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Estimated Sales Tax (8.25%)</span>
              <span className="font-mono tabular-nums text-stone-900">${tax}</span>
            </div>

            <div className="flex justify-between font-semibold text-stone-950 text-base pt-3 border-t border-stone-200">
              <span>Total Amount</span>
              <span className="font-mono tabular-nums">${finalTotal}</span>
            </div>
          </div>

          {/* Trust assurances */}
          <div className="p-3 bg-stone-50 rounded-md border border-stone-200/60 text-[11px] text-stone-500 space-y-1">
            <p className="flex items-center gap-1.5 text-stone-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Full 5-Year Atelier Guarantee included</span>
            </p>
            <p>Every piece is individually inspected and stamped prior to dispatch.</p>
          </div>

        </div>

      </div>

    </div>
  );
};
