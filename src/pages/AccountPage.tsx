import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Package, User, MapPin, LogOut, Copy, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';

export const AccountPage: React.FC = () => {
  const {
    currentUser,
    orders,
    logout,
    setIsAuthModalOpen,
    demoSignIn,
    setIsChatOpen,
    sendChatMessage,
    setActivePage,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');

  const handleCopyTracking = (tracking: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(tracking);
      showToast('Tracking number copied to clipboard.');
    }
  };

  const handleInquireAboutOrder = (orderId: string) => {
    setIsChatOpen(true);
    sendChatMessage(`Hello Marcus, I would like to inquire about the status of my order #${orderId}.`);
  };

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-12 h-12 bg-stone-200 rounded-full flex items-center justify-center mx-auto text-stone-700">
          <User className="w-6 h-6" />
        </div>
        <h2 className="font-display text-2xl text-stone-900">
          Client Account Required
        </h2>
        <p className="text-xs text-stone-500 leading-relaxed">
          Please sign in to inspect your order history, manage saved addresses, or connect with your personal atelier concierge.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 pt-2 justify-center">
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="px-5 py-2.5 bg-stone-900 text-stone-100 text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-stone-800 transition-colors"
          >
            Sign In / Register
          </button>
          <button
            onClick={demoSignIn}
            className="px-5 py-2.5 bg-amber-50 text-amber-900 border border-amber-300 text-xs font-semibold rounded-md hover:bg-amber-100 transition-colors"
          >
            1-Click Demo Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Account Header */}
      <div className="bg-white p-6 sm:p-8 rounded-lg border border-stone-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-stone-900 text-amber-200 rounded-full flex items-center justify-center font-display text-xl font-normal border border-stone-800">
            {currentUser.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h1 className="font-display text-2xl text-stone-950 font-normal">
              {currentUser.name}
            </h1>
            <p className="text-xs text-stone-500 font-mono mt-0.5">
              {currentUser.email} · Tier: Atelier Collector
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsChatOpen(true)}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat with Concierge</span>
          </button>

          <button
            onClick={logout}
            className="px-4 py-2 bg-stone-50 hover:bg-rose-50 text-stone-600 hover:text-rose-700 border border-stone-200 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 text-xs font-semibold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 px-2 transition-colors cursor-pointer ${
            activeTab === 'orders'
              ? 'border-b-2 border-stone-950 text-stone-950'
              : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          Order History ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 px-6 transition-colors cursor-pointer ${
            activeTab === 'profile'
              ? 'border-b-2 border-stone-950 text-stone-950'
              : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          Client Profile & Address
        </button>
      </div>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-lg border border-stone-200">
              <Package className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              <p className="font-display text-lg text-stone-800">No commissions on file</p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto mb-4">
                Explore our current batch releases in audio, horology, and lighting.
              </p>
              <button
                onClick={() => setActivePage('shop')}
                className="px-4 py-2 bg-stone-900 text-stone-100 text-xs font-medium rounded-md hover:bg-stone-800"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            orders.map(order => (
              <div
                key={order.id}
                className="bg-white rounded-lg border border-stone-200/90 shadow-xs overflow-hidden"
              >
                {/* Order Top Bar */}
                <div className="p-4 sm:p-6 bg-stone-50/70 border-b border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="text-stone-400 font-mono">Commission ID</span>
                    <p className="font-mono font-semibold text-stone-900 mt-0.5">#{order.id}</p>
                  </div>

                  <div>
                    <span className="text-stone-400 font-mono">Order Date</span>
                    <p className="font-mono text-stone-800 mt-0.5">{order.date}</p>
                  </div>

                  <div>
                    <span className="text-stone-400 font-mono">Total Paid</span>
                    <p className="font-mono font-semibold text-stone-950 mt-0.5">${order.total}</p>
                  </div>

                  <div>
                    <span className="text-stone-400 font-mono">Current Status</span>
                    <p className="mt-0.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {order.status}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyTracking(order.trackingNumber)}
                      className="px-3 py-1.5 bg-white border border-stone-200 rounded text-stone-700 hover:text-stone-900 hover:border-stone-400 transition-colors flex items-center gap-1 font-mono text-[11px]"
                      title="Copy Tracking Number"
                    >
                      <span>Track {order.trackingNumber.slice(0, 10)}...</span>
                      <Copy className="w-3 h-3" />
                    </button>

                    <button
                      onClick={() => handleInquireAboutOrder(order.id)}
                      className="px-3 py-1.5 bg-stone-900 text-stone-100 rounded hover:bg-stone-800 transition-colors flex items-center gap-1 text-[11px]"
                      title="Message Seller about this order"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>Inquire</span>
                    </button>
                  </div>
                </div>

                {/* Items in order */}
                <div className="p-4 sm:p-6 divide-y divide-stone-100">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-14 bg-stone-100 rounded-sm overflow-hidden shrink-0 border border-stone-200">
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
                          <p className="text-[11px] text-stone-400 font-mono">
                            Qty: {item.quantity} · ${item.price} each
                          </p>
                        </div>
                      </div>

                      <span className="font-mono text-xs tabular-nums text-stone-900 font-semibold">
                        ${item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            ))
          )}
        </div>
      )}

      {/* Profile & Address Tab */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-stone-200/90 shadow-xs space-y-4">
            <h3 className="font-display text-lg text-stone-900 flex items-center gap-2">
              <User className="w-4 h-4 text-stone-600" />
              <span>Contact Credentials</span>
            </h3>
            <div className="space-y-2 text-xs text-stone-700">
              <p><strong>Name:</strong> {currentUser.name}</p>
              <p><strong>Email:</strong> {currentUser.email}</p>
              <p><strong>Phone:</strong> {currentUser.phone || '+1 (212) 555-0198'}</p>
            </div>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Collector Account</span>
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-stone-200/90 shadow-xs space-y-4">
            <h3 className="font-display text-lg text-stone-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-stone-600" />
              <span>Primary Shipping Address</span>
            </h3>
            {currentUser.address ? (
              <div className="space-y-1 text-xs text-stone-700">
                <p className="font-medium">{currentUser.address.fullName}</p>
                <p>{currentUser.address.addressLine1}</p>
                <p>{currentUser.address.city}, {currentUser.address.state} {currentUser.address.postalCode}</p>
                <p>{currentUser.address.country}</p>
              </div>
            ) : (
              <p className="text-xs text-stone-400">No address saved yet.</p>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
