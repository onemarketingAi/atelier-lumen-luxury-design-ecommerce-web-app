export interface ProductVariant {
  id: string;
  name: string;
  inStock: boolean;
  colorHex?: string;
  priceModifier?: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'audio' | 'lighting' | 'horology' | 'leather' | 'living';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  isNew?: boolean;
  isFeatured?: boolean;
  images: string[];
  variants: ProductVariant[];
  description: string;
  longDescription: string;
  features: string[];
  specs: Record<string, string>;
  materials: string;
  dimensions: string;
  warranty: string;
  sku: string;
  reviews: Review[];
}

export interface CartItem {
  id: string; // unique item id (productId + variantId)
  product: Product;
  selectedVariant: ProductVariant;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  variantName: string;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  tax: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: ShippingAddress;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'seller';
  text: string;
  timestamp: string;
  productAttachment?: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  orderAttachment?: {
    id: string;
    total: number;
    status: string;
  };
}

export type PageView =
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'about'
  | 'contact'
  | 'checkout'
  | 'account'
  | 'order-confirmed';
