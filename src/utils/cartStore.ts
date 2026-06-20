import type { CartItem, Product } from '../types';

const CART_KEY = 'fashion_store_cart';
const EVENT_NAME = 'cart-updated';

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const savedCart = localStorage.getItem(CART_KEY);
  return savedCart ? JSON.parse(savedCart) : [];
}

function dispatchUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(EVENT_NAME));
  }
}

export function addToCart(product: Product) {
  const cart = getCart();
  const existingItem = cart.find((item) => item.product.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  dispatchUpdate();
}

export function updateQuantity(productId: string, quantity: number) {
  let cart = getCart();
  if (quantity <= 0) {
    cart = cart.filter((item) => item.product.id !== productId);
  } else {
    const item = cart.find((item) => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
    }
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  dispatchUpdate();
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
  dispatchUpdate();
}

export function subscribeToCart(callback: () => void) {
  if (typeof window !== 'undefined') {
    window.addEventListener(EVENT_NAME, callback);
    return () => window.removeEventListener(EVENT_NAME, callback);
  }
  return () => {};
}
