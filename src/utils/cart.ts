import type { Product, CartItem } from '../types';

const CART_KEY = 'fashion_store_cart';
const EVENT_NAME = 'cart-updated';

export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(CART_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse cart', e);
      return [];
    }
  }
  return [];
};

export const saveCart = (cart: CartItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event(EVENT_NAME));
  }
};

export const addToCart = (product: Product) => {
  const cart = getCart();
  const existing = cart.find((item) => item.product.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }
  saveCart(cart);
};

export const removeFromCart = (productId: string) => {
  const cart = getCart();
  const updatedCart = cart.filter((item) => item.product.id !== productId);
  saveCart(updatedCart);
};

export const updateQuantity = (productId: string, quantity: number) => {
  const cart = getCart();
  const existing = cart.find((item) => item.product.id === productId);
  if (existing) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      existing.quantity = quantity;
      saveCart(cart);
    }
  }
};

export const clearCart = () => {
  saveCart([]);
};
