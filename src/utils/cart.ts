import type { CartItem, Product } from '../types';

const CART_STORAGE_KEY = 'fashion_store_cart';

export function getCartItems(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const items = localStorage.getItem(CART_STORAGE_KEY);
  return items ? JSON.parse(items) : [];
}

export function addToCart(product: Product) {
  if (typeof window === 'undefined') return;
  const items = getCartItems();
  const existingItemIndex = items.findIndex(item => item.product.id === product.id);

  if (existingItemIndex > -1) {
    items[existingItemIndex].quantity += 1;
  } else {
    items.push({ product, quantity: 1 });
  }

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event('cart-updated'));
  toggleCart(true); // Open the cart when adding an item
}

export function removeFromCart(productId: string) {
  if (typeof window === 'undefined') return;
  let items = getCartItems();
  items = items.filter(item => item.product.id !== productId);
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event('cart-updated'));
}

export function updateQuantity(productId: string, quantity: number) {
  if (typeof window === 'undefined') return;
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  const items = getCartItems();
  const itemIndex = items.findIndex(item => item.product.id === productId);
  if (itemIndex > -1) {
    items[itemIndex].quantity = quantity;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('cart-updated'));
  }
}

export function toggleCart(isOpen: boolean) {
  if (typeof window === 'undefined') return;
  const event = new CustomEvent('toggle-cart', { detail: { isOpen } });
  window.dispatchEvent(event);
}
