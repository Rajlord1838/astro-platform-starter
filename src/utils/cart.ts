import type { Product } from '../data/products';

export interface CartItem extends Product {
  quantity: number;
}

const CART_KEY = 'fashion_store_cart';
export const CART_UPDATED_EVENT = 'cart-updated';

export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(CART_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveCart = (cart: CartItem[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
};

export const addToCart = (product: Product): void => {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
};

export const removeFromCart = (productId: string): void => {
  const cart = getCart();
  const newCart = cart.filter((item) => item.id !== productId);
  saveCart(newCart);
};

export const updateQuantity = (productId: string, quantity: number): void => {
  if (quantity < 1) {
    removeFromCart(productId);
    return;
  }

  const cart = getCart();
  const item = cart.find((i) => i.id === productId);
  if (item) {
    item.quantity = quantity;
    saveCart(cart);
  }
};
