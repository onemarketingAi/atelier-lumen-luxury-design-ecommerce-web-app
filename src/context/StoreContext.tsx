import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductVariant, CartItem, Order, OrderItem, User, ChatMessage, PageView, ShippingAddress } from '../types';
import { PRODUCTS } from '../data/products';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface StoreContextType {
  // Navigation & Page State
  activePage: PageView;
  setActivePage: (page: PageView) => void;
  selectedProductId: string;
  setSelectedProductId: (id: string) => void;
  navigateToProduct: (productId: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Cart
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  buyNow: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => void;

  // Authentication
  currentUser: User | null;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  login: (email: string, name?: string) => void;
  demoSignIn: () => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
  updateShippingAddress: (address: ShippingAddress) => void;

  // Orders
  orders: Order[];
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;
  placeOrder: (shippingDetails: ShippingAddress, paymentMethod: string, discountAmount?: number) => Order;

  // Seller Chat
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  chatMessages: ChatMessage[];
  unreadChatCount: number;
  sendChatMessage: (text: string, productAttachment?: Product) => void;
  startChatAboutProduct: (product: Product) => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const INITIAL_DEMO_USER: User = {
  id: 'usr-892',
  name: 'Alexandria Vance',
  email: 'alex.vance@atelier-lumen.com',
  phone: '+1 (212) 555-0198',
  address: {
    fullName: 'Alexandria Vance',
    email: 'alex.vance@atelier-lumen.com',
    phone: '+1 (212) 555-0198',
    addressLine1: '742 Evergreen Terrace, Apt 4B',
    city: 'New York',
    state: 'NY',
    postalCode: '10012',
    country: 'United States'
  }
};

const SEED_ORDERS: Order[] = [
  {
    id: 'LUM-94821',
    date: '2026-09-28',
    items: [
      {
        productId: 'lumen-eclipse-lamp',
        name: 'Lumen Eclipse Table Lamp',
        price: 380,
        quantity: 1,
        variantName: 'Brushed Satin Brass',
        image: '/src/assets/images/product_sculptural_lamp_1791272342338.jpg'
      }
    ],
    subtotal: 380,
    shippingCost: 0,
    discount: 38,
    tax: 30.78,
    total: 372.78,
    status: 'Delivered',
    shippingAddress: {
      fullName: 'Alexandria Vance',
      email: 'alex.vance@atelier-lumen.com',
      phone: '+1 (212) 555-0198',
      addressLine1: '742 Evergreen Terrace, Apt 4B',
      city: 'New York',
      state: 'NY',
      postalCode: '10012',
      country: 'United States'
    },
    paymentMethod: 'Mastercard •••• 4289',
    trackingNumber: '1Z9999999298372',
    estimatedDelivery: 'Delivered Oct 2, 2026'
  }
];

const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-welcome-1',
    sender: 'seller',
    text: 'Greetings. I am Marcus, atelier keeper and master artisan at Lumen. How may I assist you with our craft, materials, or custom orders today?',
    timestamp: '10:00 AM'
  }
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation state
  const [activePage, setActivePage] = useState<PageView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('acoustic-horizon-s1');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart state with localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_cart');
      return saved ? JSON.parse(saved) : [
        {
          id: 'acoustic-horizon-s1-obsidian-brass',
          product: PRODUCTS[0],
          selectedVariant: PRODUCTS[0].variants[0],
          quantity: 1
        }
      ];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_wishlist');
      return saved ? JSON.parse(saved) : ['lumen-eclipse-lamp'];
    } catch {
      return [];
    }
  });

  // User state
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('atelier_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_orders');
      return saved ? JSON.parse(saved) : SEED_ORDERS;
    } catch {
      return SEED_ORDERS;
    }
  });
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  // Chat
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_chat');
      return saved ? JSON.parse(saved) : INITIAL_CHAT_MESSAGES;
    } catch {
      return INITIAL_CHAT_MESSAGES;
    }
  });
  const [unreadChatCount, setUnreadChatCount] = useState(0);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('atelier_cart', JSON.stringify(cart));
    } catch { /* ignore */ }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('atelier_wishlist', JSON.stringify(wishlist));
    } catch { /* ignore */ }
  }, [wishlist]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('atelier_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('atelier_user');
      }
    } catch { /* ignore */ }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('atelier_orders', JSON.stringify(orders));
    } catch { /* ignore */ }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('atelier_chat', JSON.stringify(chatMessages));
    } catch { /* ignore */ }
  }, [chatMessages]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const navigateToProduct = (productId: string) => {
    setSelectedProductId(productId);
    setActivePage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (product: Product, variant?: ProductVariant, quantity: number = 1) => {
    const activeVariant = variant || product.variants[0];
    const itemId = `${product.id}-${activeVariant.id}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: itemId, product, selectedVariant: activeVariant, quantity }];
    });

    showToast(`Added ${product.name} to shopping bag.`);
    setIsCartOpen(true);
  };

  const buyNow = (product: Product, variant?: ProductVariant, quantity: number = 1) => {
    const activeVariant = variant || product.variants[0];
    const itemId = `${product.id}-${activeVariant.id}`;

    // Add or set item in cart
    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: itemId, product, selectedVariant: activeVariant, quantity }];
    });

    // Close drawer and navigate immediately to checkout
    setIsCartOpen(false);
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    showToast('Item removed from shopping bag.', 'info');
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartSubtotal = cart.reduce((total, item) => {
    const unitPrice = item.product.price + (item.selectedVariant.priceModifier || 0);
    return total + unitPrice * item.quantity;
  }, 0);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed item from your wishlist.', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved item to your wishlist.');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // Auth operations
  const login = (email: string, name?: string) => {
    const user: User = {
      id: 'usr-' + Date.now().toString().slice(-4),
      name: name || email.split('@')[0].replace(/[._]/g, ' '),
      email,
      address: currentUser?.address || {
        fullName: name || 'Valued Collector',
        email,
        phone: '+1 (555) 019-2834',
        addressLine1: '450 West 33rd Street',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'United States'
      }
    };
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${user.name}`);
  };

  const demoSignIn = () => {
    setCurrentUser(INITIAL_DEMO_USER);
    setIsAuthModalOpen(false);
    showToast(`Signed in as ${INITIAL_DEMO_USER.name}`);
  };

  const signup = (name: string, email: string) => {
    const user: User = {
      id: 'usr-' + Date.now().toString().slice(-4),
      name,
      email,
      address: {
        fullName: name,
        email,
        phone: '',
        addressLine1: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'United States'
      }
    };
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    showToast(`Account created. Welcome to Atelier Lumen, ${name}.`);
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Signed out successfully.', 'info');
  };

  const updateShippingAddress = (address: ShippingAddress) => {
    if (currentUser) {
      setCurrentUser(prev => prev ? { ...prev, address } : null);
    }
  };

  // Place Order
  const placeOrder = (
    shippingDetails: ShippingAddress,
    paymentMethod: string,
    discountAmount: number = 0
  ): Order => {
    const orderItems: OrderItem[] = cart.map(item => ({
      productId: item.product.id,
      name: item.product.name,
      price: item.product.price + (item.selectedVariant.priceModifier || 0),
      quantity: item.quantity,
      variantName: item.selectedVariant.name,
      image: item.product.images[0]
    }));

    const subtotal = cartSubtotal;
    const shippingCost = subtotal > 150 ? 0 : 25;
    const tax = Math.round((subtotal - discountAmount) * 0.0825 * 100) / 100;
    const total = Math.max(0, subtotal - discountAmount + shippingCost + tax);

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      id: `LUM-${randomSuffix}`,
      date: new Date().toISOString().split('T')[0],
      items: orderItems,
      subtotal,
      shippingCost,
      discount: discountAmount,
      tax,
      total,
      status: 'Processing',
      shippingAddress: shippingDetails,
      paymentMethod,
      trackingNumber: `1Z999999${randomSuffix}`,
      estimatedDelivery: 'Estimated arrival in 3–5 business days'
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    clearCart();
    setActivePage('order-confirmed');
    showToast(`Order #${newOrder.id} successfully placed!`);

    // Notify seller chat of order
    const autoOrderNotice: ChatMessage = {
      id: 'msg-order-' + Date.now(),
      sender: 'seller',
      text: `Thank you for your order #${newOrder.id}! Our artisans have received your commission and are preparing your pieces with white-glove packaging.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      orderAttachment: {
        id: newOrder.id,
        total: newOrder.total,
        status: newOrder.status
      }
    };
    setChatMessages(prev => [...prev, autoOrderNotice]);

    return newOrder;
  };

  // Chat functions
  const sendChatMessage = (text: string, productAttachment?: Product) => {
    const userMsg: ChatMessage = {
      id: 'msg-user-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      productAttachment: productAttachment ? {
        id: productAttachment.id,
        name: productAttachment.name,
        price: productAttachment.price,
        image: productAttachment.images[0]
      } : undefined
    };

    setChatMessages(prev => [...prev, userMsg]);

    // Intelligent auto-response simulation by Marcus the seller
    setTimeout(() => {
      let replyText = "Thank you for inquiring. I am personally monitoring all requests and will assist with your exact specifications.";

      const lower = text.toLowerCase();
      if (lower.includes('shipping') || lower.includes('delivery') || lower.includes('time')) {
        replyText = "We offer complimentary insured courier dispatch on all commissions over $150. Domestic orders reach clients within 3 to 5 business days, packaged in archival-grade foam.";
      } else if (lower.includes('stock') || lower.includes('available')) {
        replyText = "Our batch items in the catalog are currently in our studio inventory. Once a batch sells out, lead time for our artisans to re-cast or assemble is typically 3 weeks.";
      } else if (lower.includes('discount') || lower.includes('coupon') || lower.includes('promo') || lower.includes('code')) {
        replyText = "For first-time collectors, you may apply code 'WELCOME10' at checkout to receive 10% off your initial order.";
      } else if (lower.includes('warranty') || lower.includes('return') || lower.includes('guarantee')) {
        replyText = "Every piece carries our 5-year structural guarantee, plus a 30-day in-home trial period. If a piece does not harmonize with your space, return shipping is fully accommodated.";
      } else if (lower.includes('watch') || lower.includes('chronos') || lower.includes('calibre')) {
        replyText = "The Chronos Calibre 04 uses a modified Swiss automatic movement with 68 hours of reserve, regulated in five positions before leaving our bench.";
      } else if (lower.includes('lamp') || lower.includes('lumen eclipse')) {
        replyText = "The Lumen Eclipse is hand-cast in solid virgin brass with mouth-blown Murano smoked glass. The rotary dimmer allows seamless transition down to a warm 2200K ember glow.";
      } else if (productAttachment) {
        replyText = `Regarding the ${productAttachment.name}: It is one of our masterworks. Would you like specifics on the custom finishes or international voltage compatibility?`;
      }

      const sellerMsg: ChatMessage = {
        id: 'msg-seller-' + Date.now(),
        sender: 'seller',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, sellerMsg]);
      if (!isChatOpen) {
        setUnreadChatCount(prev => prev + 1);
      }
    }, 900);
  };

  const startChatAboutProduct = (product: Product) => {
    setIsChatOpen(true);
    setUnreadChatCount(0);
    sendChatMessage(`Hello Marcus, I have a question about the ${product.name}. Is this piece available for immediate dispatch or custom engraving?`, product);
  };

  return (
    <StoreContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedProductId,
        setSelectedProductId,
        navigateToProduct,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        cart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        buyNow,
        removeFromCart,
        updateQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        isWishlisted,
        currentUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        login,
        demoSignIn,
        signup,
        logout,
        updateShippingAddress,
        orders,
        activeOrder,
        setActiveOrder,
        placeOrder,
        isChatOpen,
        setIsChatOpen,
        chatMessages,
        unreadChatCount,
        sendChatMessage,
        startChatAboutProduct,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
