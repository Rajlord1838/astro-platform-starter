import type { Product, CartItem } from '../types';

const CART_KEY = 'fashion_store_cart';
const EVENT_NAME = 'cart-updated';

export function getCartItems(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const items = localStorage.getItem(CART_KEY);
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error('Failed to parse cart items from localStorage:', error);
    return [];
  }
}

export function saveCartItems(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
}

export function addToCart(product: Product) {
  const items = getCartItems();
  const existingItemIndex = items.findIndex(item => item.id === product.id);

  if (existingItemIndex >= 0) {
    items[existingItemIndex].quantity += 1;
  } else {
    items.push({ ...product, quantity: 1 });
  }

  saveCartItems(items);
}

export function removeFromCart(productId: string) {
  const items = getCartItems();
  const updatedItems = items.filter(item => item.id !== productId);
  saveCartItems(updatedItems);
}

export function updateQuantity(productId: string, quantity: number) {
  if (quantity < 1) return;
  const items = getCartItems();
  const existingItemIndex = items.findIndex(item => item.id === productId);

  if (existingItemIndex >= 0) {
    items[existingItemIndex].quantity = quantity;
    saveCartItems(items);
  }
}

export function clearCart() {
  saveCartItems([]);
}
