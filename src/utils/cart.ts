import type { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

const CART_STORAGE_KEY = 'fashion-store-cart';

export function getCartItems(): CartItem[] {
  if (typeof window === 'undefined') return [];

  try {
    const items = localStorage.getItem(CART_STORAGE_KEY);
    return items ? JSON.parse(items) : [];
  } catch (e) {
    console.error('Failed to parse cart items', e);
    return [];
  }
}

export function saveCartItems(items: CartItem[]) {
  if (typeof window === 'undefined') return;

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));

  // Dispatch custom event to notify other components (e.g., CartIcon)
  window.dispatchEvent(new CustomEvent('cart-updated', {
    detail: { items }
  }));
}

export function addToCart(product: Product) {
  const items = getCartItems();
  const existingItemIndex = items.findIndex(item => item.product.id === product.id);

  if (existingItemIndex >= 0) {
    items[existingItemIndex].quantity += 1;
  } else {
    items.push({ product, quantity: 1 });
  }

  saveCartItems(items);
}

export function removeFromCart(productId: string) {
  const items = getCartItems();
  const filteredItems = items.filter(item => item.product.id !== productId);
  saveCartItems(filteredItems);
}

export function updateQuantity(productId: string, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  const items = getCartItems();
  const existingItemIndex = items.findIndex(item => item.product.id === productId);

  if (existingItemIndex >= 0) {
    items[existingItemIndex].quantity = quantity;
    saveCartItems(items);
  }
}

export function getCartTotal(): number {
  const items = getCartItems();
  return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
}

export function getCartItemCount(): number {
  const items = getCartItems();
  return items.reduce((count, item) => count + item.quantity, 0);
}
