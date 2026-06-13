import type { CartItem, Product } from '../types';

export const CART_STORAGE_KEY = 'fashion_store_cart';
export const CART_UPDATED_EVENT = 'cart-updated';

export function getCartItems(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const items = localStorage.getItem(CART_STORAGE_KEY);
  return items ? JSON.parse(items) : [];
}

export function addToCart(product: Product) {
  const items = getCartItems();
  const existingItem = items.find(item => item.product.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    items.push({ product, quantity: 1 });
  }

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

export function removeFromCart(productId: string) {
  const items = getCartItems();
  const updatedItems = items.filter(item => item.product.id !== productId);
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedItems));
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

export function updateQuantity(productId: string, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  const items = getCartItems();
  const item = items.find(item => item.product.id === productId);
  if (item) {
    item.quantity = quantity;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event(CART_UPDATED_EVENT));
  }
}

export function clearCart() {
  localStorage.removeItem(CART_STORAGE_KEY);
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

export function getCartTotal(): number {
  const items = getCartItems();
  return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
}

export function getCartItemCount(): number {
  const items = getCartItems();
  return items.reduce((count, item) => count + item.quantity, 0);
}
