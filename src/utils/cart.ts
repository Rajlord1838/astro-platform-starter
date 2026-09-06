import type { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

const CART_STORAGE_KEY = 'fashion_store_cart';

export function getCartItems(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const stored = window.localStorage.getItem(CART_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse cart items', e);
      return [];
    }
  }
  return [];
}

export function saveCartItems(items: CartItem[]) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('cart-updated'));
  }
}

export function addToCart(product: Product, quantity = 1) {
  const items = getCartItems();
  const existing = items.find(item => item.product.id === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    items.push({ product, quantity });
  }
  saveCartItems(items);
}

export function removeFromCart(productId: string) {
  const items = getCartItems();
  const updated = items.filter(item => item.product.id !== productId);
  saveCartItems(updated);
}

export function updateQuantity(productId: string, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  const items = getCartItems();
  const existing = items.find(item => item.product.id === productId);
  if (existing) {
    existing.quantity = quantity;
    saveCartItems(items);
  }
}

export function toggleCart() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('toggle-cart'));
  }
}
