import type { Product } from '../data/products';

const CART_KEY = 'fashion_store_cart';
const EVENT_NAME = 'cart-updated';

export interface CartItem extends Product {
  quantity: number;
}

export function getCartItems(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(CART_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function addToCart(product: Product) {
  const items = getCartItems();
  const existing = items.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    items.push({ ...product, quantity: 1 });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function subscribeToCart(callback: () => void) {
  if (typeof window === 'undefined') return () => {};

  window.addEventListener(EVENT_NAME, callback);
  return () => window.removeEventListener(EVENT_NAME, callback);
}
