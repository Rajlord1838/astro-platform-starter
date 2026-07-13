import type { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export const CART_STORAGE_KEY = 'fashion_store_cart';
export const CART_UPDATED_EVENT = 'cart-updated';

export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveCart = (cart: CartItem[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
};

export const addToCart = (product: Product) => {
  const cart = getCart();
  const existing = cart.find(item => item.product.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }

  saveCart(cart);
};

export const removeFromCart = (productId: string) => {
  const cart = getCart().filter(item => item.product.id !== productId);
  saveCart(cart);
};

export const updateQuantity = (productId: string, quantity: number) => {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  const cart = getCart();
  const item = cart.find(i => i.product.id === productId);
  if (item) {
    item.quantity = quantity;
    saveCart(cart);
  }
};
