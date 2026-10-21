import type { CartItem, Product } from '../types';

export const CART_STORAGE_KEY = 'fashion_store_cart';
export const CART_UPDATED_EVENT = 'cart-updated';
export const TOGGLE_CART_EVENT = 'toggle-cart';

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveCart(cart: CartItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT));
}

export function addToCart(product: Product) {
  const cart = getCart();
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
  toggleCart(true); // Open cart when adding item
}

export function removeFromCart(productId: string) {
  const cart = getCart();
  saveCart(cart.filter((item) => item.id !== productId));
}

export function updateQuantity(productId: string, quantity: number) {
  if (quantity < 1) return removeFromCart(productId);

  const cart = getCart();
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity = quantity;
    saveCart(cart);
  }
}

export function toggleCart(open?: boolean) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(TOGGLE_CART_EVENT, { detail: open }));
}

export function getCartTotal(cart: CartItem[]): number {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}
