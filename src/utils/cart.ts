import type { Product, CartItem } from '../types';

const CART_KEY = 'fashion_store_cart';

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(CART_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function addToCart(product: Product) {
  if (typeof window === 'undefined') return;
  const cart = getCart();
  const existing = cart.find(item => item.product.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event('cart-updated'));
}

export function updateQuantity(productId: string, quantity: number) {
  if (typeof window === 'undefined') return;
  let cart = getCart();

  if (quantity <= 0) {
    cart = cart.filter(item => item.product.id !== productId);
  } else {
    const item = cart.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
    }
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event('cart-updated'));
}

export function removeFromCart(productId: string) {
  if (typeof window === 'undefined') return;
  let cart = getCart();
  cart = cart.filter(item => item.product.id !== productId);

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event('cart-updated'));
}

export function clearCart() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event('cart-updated'));
}
