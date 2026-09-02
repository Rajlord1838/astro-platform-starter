import type { CartItem, Product } from '../types';

export const CART_STORAGE_KEY = 'fashion_store_cart';
export const CART_UPDATED_EVENT = 'cart-updated';
export const TOGGLE_CART_EVENT = 'toggle-cart';

export function getCartItems(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveCartItems(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

export function addToCart(product: Product) {
  const items = getCartItems();
  const existingItem = items.find((item) => item.product.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    items.push({ product, quantity: 1 });
  }

  saveCartItems(items);
}

export function removeFromCart(productId: string) {
  const items = getCartItems();
  const newItems = items.filter((item) => item.product.id !== productId);
  saveCartItems(newItems);
}

export function updateQuantity(productId: string, quantity: number) {
  if (quantity < 1) {
    removeFromCart(productId);
    return;
  }
  const items = getCartItems();
  const item = items.find((item) => item.product.id === productId);
  if (item) {
    item.quantity = quantity;
    saveCartItems(items);
  }
}

export function clearCart() {
  saveCartItems([]);
}

export function toggleCart() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(TOGGLE_CART_EVENT));
  }
}
