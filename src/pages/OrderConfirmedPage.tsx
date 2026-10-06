import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, Package, Copy, ArrowRight, MessageSquare, Clock, ShieldCheck } from 'lucide-react';

export const OrderConfirmedPage: React.FC = () => {
  const {
    activeOrder,
    setActivePage,
    setIsChatOpen,
    sendChatMessage,
    showToast
  } = useStore();

  const handleCopyTracking = () => {
    if (activeOrder?.trackingNumber && navigator.clipboard) {
      navigator.clipboard.writeText(activeOrder.trackingNumber);
      showToast('Tracking number copied to clipboard.');
    }
  };

  const handleMessageSellerAboutOrder = () => {
    if (!activeOrder) return;
    setIsChatOpen(true);
    sendChatMessage(`Hello Marcus, I am inquiring regarding the dispatch status of my new order #${activeOrder.id}.`);
  };

  if (!activeOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="font-display text-xl text-stone-800 mb-2">No active order found</p>
        <button
          onClick={() => setActivePage('shop')}
          className="px-5 py-2.5 bg-stone-900 text-stone-100 text-xs font-semibold rounded-md hover:bg-stone-800 transition-colors"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Success Banner */}
      <div className="text-center space-y-3 pb-8 border-b border-stone-200">
        <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-800">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-semibold">
          Commission Confirmed
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-normal text-stone-950">
          Thank you for your patronage.
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
          Your order <strong className="font-mono text-stone-900">#{activeOrder.id}</strong> has been received by our studio keepers. A confirmation receipt has been dispatched to {activeOrder.shippingAddress.email}.
        </p>
      </div>

      {/* Progress Timeline */}
      <div className="bg-white p-6 sm:p-8 rounded-lg border border-stone-200/90 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div>
            <span className="text-xs text-stone-500 font-mono">Fulfillment Status</span>
            <p className="font-display text-lg text-stone-900 mt-0.5">Atelier Inspection & Packing</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-stone-500 font-mono">Courier ID</span>
            <button
              onClick={handleCopyTracking}
              className="flex items-center gap-1.5 font-mono text-xs text-stone-900 hover:text-amber-800 font-medium cursor-pointer"
            >
              <span>{activeOrder.trackingNumber}</span>
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Milestone Steps */}
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center mx-auto font-mono text-xs font-bold">
              ✓
            </div>
            <p className="font-semibold text-stone-900">Order Placed</p>
            <p className="text-[10px] text-stone-400 font-mono">Recorded</p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center mx-auto font-mono text-xs font-bold animate-pulse">
              2
            </div>
            <p className="font-semibold text-stone-900">Artisan Inspection</p>
            <p className="text-[10px] text-stone-400 font-mono">In Progress</p>
          </div>

          <div className="space-y-2 opacity-50">
            <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center mx-auto font-mono text-xs font-bold">
              3
            </div>
            <p className="font-semibold text-stone-900">Courier Hand-off</p>
            <p className="text-[10px] text-stone-400 font-mono">Pending</p>
          </div>

          <div className="space-y-2 opacity-50">
            <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center mx-auto font-mono text-xs font-bold">
              4
            </div>
            <p className="font-semibold text-stone-900">Delivered</p>
            <p className="text-[10px] text-stone-400 font-mono">3–5 Days</p>
          </div>
        </div>

        <div className="p-3 bg-stone-50 rounded-md border border-stone-200/80 flex items-center justify-between text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-stone-500" />
            <span>Estimated delivery: <strong>{activeOrder.estimatedDelivery}</strong></span>
          </div>
          <button
            onClick={handleMessageSellerAboutOrder}
            className="text-amber-800 hover:text-amber-950 font-medium underline flex items-center gap-1"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Message Marcus about this parcel</span>
          </button>
        </div>
      </div>

      {/* Itemized Order Summary */}
      <div className="bg-white p-6 sm:p-8 rounded-lg border border-stone-200/90 shadow-xs space-y-6">
        <h3 className="font-display text-lg text-stone-900 pb-3 border-b border-stone-100">
          Receipt Breakdown
        </h3>

        <div className="divide-y divide-stone-100">
          {activeOrder.items.map((item, idx) => (
            <div key={idx} className="py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-16 bg-stone-100 rounded-sm overflow-hidden shrink-0 border border-stone-200">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-medium text-stone-900">{item.name}</p>
                  <p className="text-[11px] text-stone-500">{item.variantName}</p>
                  <p className="text-[11px] text-stone-400 font-mono mt-0.5">
                    Qty: {item.quantity} × ${item.price}
                  </p>
                </div>
              </div>

              <span className="font-mono text-xs tabular-nums text-stone-900 font-semibold">
                ${item.price * item.quantity}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-stone-200 space-y-2 text-xs text-stone-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-mono tabular-nums text-stone-900">${activeOrder.subtotal}</span>
          </div>
          {activeOrder.discount > 0 && (
            <div className="flex justify-between text-emerald-700">
              <span>Collector Discount</span>
              <span className="font-mono tabular-nums">-${activeOrder.discount}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Courier Dispatch</span>
            <span className="font-mono tabular-nums text-stone-900">
              {activeOrder.shippingCost === 0 ? 'Complimentary' : `$${activeOrder.shippingCost}`}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Sales Tax</span>
            <span className="font-mono tabular-nums text-stone-900">${activeOrder.tax}</span>
          </div>
          <div className="flex justify-between text-base font-semibold text-stone-950 pt-2 border-t border-stone-200">
            <span>Total Paid</span>
            <span className="font-mono tabular-nums">${activeOrder.total}</span>
          </div>
        </div>

        {/* Shipping Destination */}
        <div className="pt-4 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600">
          <div>
            <span className="font-semibold text-stone-900 block mb-1">Shipping Destination</span>
            <p>{activeOrder.shippingAddress.fullName}</p>
            <p>{activeOrder.shippingAddress.addressLine1}</p>
            <p>{activeOrder.shippingAddress.city}, {activeOrder.shippingAddress.state} {activeOrder.shippingAddress.postalCode}</p>
            <p>{activeOrder.shippingAddress.country}</p>
          </div>

          <div>
            <span className="font-semibold text-stone-900 block mb-1">Payment Authorized</span>
            <p>{activeOrder.paymentMethod}</p>
            <p className="text-stone-400 mt-1">Processed securely under PCI-DSS standard</p>
          </div>
        </div>

      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <button
          onClick={() => setActivePage('shop')}
          className="w-full sm:w-auto px-6 py-3 bg-stone-900 text-stone-100 hover:bg-stone-800 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2"
        >
          <span>Continue Exploring Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={handleMessageSellerAboutOrder}
          className="w-full sm:w-auto px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Live Chat with Seller</span>
        </button>
      </div>

    </div>
  );
};
