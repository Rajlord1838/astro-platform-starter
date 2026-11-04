import { type CartItem, type Product } from '../types';

const CART_KEY = 'fashion_store_cart';

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(CART_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveCart(cart: CartItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent('cart-updated', { detail: cart }));
}

export function addToCart(product: Product) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
  toggleCart(true);
}

export function removeFromCart(productId: string) {
  const cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
}

export function updateQuantity(productId: string, quantity: number) {
  if (quantity < 1) return removeFromCart(productId);

  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity = quantity;
    saveCart(cart);
  }
}

export function toggleCart(forceState?: boolean) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('toggle-cart', { detail: forceState }));
}
