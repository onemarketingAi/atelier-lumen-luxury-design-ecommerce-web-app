import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { MessageSquare, X, Send, Sparkles, UserCheck, Minimize2 } from 'lucide-react';

export const SellerChat: React.FC = () => {
  const {
    isChatOpen,
    setIsChatOpen,
    chatMessages,
    unreadChatCount,
    sendChatMessage
  } = useStore();

  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [chatMessages, isChatOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText.trim());
    setInputText('');
  };

  const handleQuickPrompt = (prompt: string) => {
    sendChatMessage(prompt);
  };

  return (
    <>
      {/* Floating launcher button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 left-6 sm:bottom-8 sm:left-auto sm:right-8 z-40 flex items-center gap-3 px-4 py-3 bg-stone-900 text-stone-100 rounded-full shadow-xl hover:bg-stone-800 transition-all transform hover:-translate-y-0.5 border border-stone-800 group"
          aria-label="Message Seller"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-amber-200" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-stone-900" />
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-semibold leading-tight">Inquire with Seller</p>
            <p className="text-[10px] text-stone-400">Marcus · Active in studio</p>
          </div>
          {unreadChatCount > 0 && (
            <span className="w-5 h-5 bg-amber-600 text-[10px] font-bold text-white rounded-full flex items-center justify-center">
              {unreadChatCount}
            </span>
          )}
        </button>
      )}

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[580px] h-[85vh] bg-[#FAF9F5] rounded-2xl shadow-2xl border border-stone-300/80 flex flex-col overflow-hidden animate-fade-in">
          
          {/* Header */}
          <div className="p-4 bg-stone-900 text-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center font-display text-amber-200 font-semibold text-sm">
                  MV
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-stone-900" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-semibold text-white">Marcus Vance</h3>
                  <span className="text-[10px] bg-stone-800 px-1.5 py-0.5 rounded text-amber-300 font-mono">
                    Artisan & Concierge
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-emerald-400" />
                  <span>Online · Typically replies in seconds</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors"
                aria-label="Minimize chat"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-stone-100/80 border-b border-stone-200 overflow-x-auto flex gap-1.5 no-scrollbar">
            <button
              onClick={() => handleQuickPrompt('Are all catalog pieces in stock right now?')}
              className="px-2.5 py-1 bg-white hover:bg-stone-200 text-stone-700 rounded-full text-[11px] whitespace-nowrap border border-stone-200 shadow-xs transition-colors shrink-0"
            >
              Stock status?
            </button>
            <button
              onClick={() => handleQuickPrompt('What is your return & guarantee policy?')}
              className="px-2.5 py-1 bg-white hover:bg-stone-200 text-stone-700 rounded-full text-[11px] whitespace-nowrap border border-stone-200 shadow-xs transition-colors shrink-0"
            >
              30-Day trial?
            </button>
            <button
              onClick={() => handleQuickPrompt('Do you offer promo discounts for first orders?')}
              className="px-2.5 py-1 bg-white hover:bg-stone-200 text-stone-700 rounded-full text-[11px] whitespace-nowrap border border-stone-200 shadow-xs transition-colors shrink-0"
            >
              Promo codes?
            </button>
            <button
              onClick={() => handleQuickPrompt('How does insured global delivery work?')}
              className="px-2.5 py-1 bg-white hover:bg-stone-200 text-stone-700 rounded-full text-[11px] whitespace-nowrap border border-stone-200 shadow-xs transition-colors shrink-0"
            >
              Shipping times?
            </button>
          </div>

          {/* Message Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {chatMessages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                {/* Product attachment preview */}
                {msg.productAttachment && (
                  <div className="mb-1.5 p-2 bg-stone-100 rounded-lg border border-stone-200 flex items-center gap-2 max-w-[85%]">
                    <img
                      src={msg.productAttachment.image}
                      alt={msg.productAttachment.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 object-cover rounded shrink-0 border border-stone-200"
                    />
                    <div className="truncate">
                      <p className="font-semibold text-stone-900 truncate">
                        {msg.productAttachment.name}
                      </p>
                      <p className="text-[11px] text-stone-500 font-mono">
                        ${msg.productAttachment.price}
                      </p>
                    </div>
                  </div>
                )}

                {/* Order attachment preview */}
                {msg.orderAttachment && (
                  <div className="mb-1.5 p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-900 max-w-[85%]">
                    <p className="font-semibold text-[11px]">
                      Order #{msg.orderAttachment.id}
                    </p>
                    <p className="text-[10px] text-emerald-700 font-mono">
                      Status: {msg.orderAttachment.status} · Total: ${msg.orderAttachment.total}
                    </p>
                  </div>
                )}

                {/* Bubble */}
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-stone-900 text-stone-100 rounded-br-xs'
                      : 'bg-white text-stone-800 border border-stone-200 shadow-xs rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                </div>

                <span className="text-[10px] text-stone-400 mt-1 px-1 font-mono">
                  {msg.timestamp}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-stone-200 flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Ask Marcus about objects, materials, shipping..."
              className="flex-1 bg-stone-100/80 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-stone-400"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2 bg-stone-900 text-stone-100 rounded-lg hover:bg-stone-800 disabled:opacity-40 transition-colors shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
