import type { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

const CART_STORAGE_KEY = 'fashion_store_cart';

export function getCartItems(): CartItem[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to parse cart items:', error);
    return [];
  }
}

function saveCartItems(items: CartItem[]): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));

  // Dispatch custom event to notify components that the cart has been updated
  window.dispatchEvent(new CustomEvent('cart-updated'));
}

export function addToCart(product: Product): void {
  const items = getCartItems();
  const existingItemIndex = items.findIndex(item => item.product.id === product.id);

  if (existingItemIndex > -1) {
    items[existingItemIndex].quantity += 1;
  } else {
    items.push({ product, quantity: 1 });
  }

  saveCartItems(items);

  // Also optionally open the cart when an item is added
  toggleCart(true);
}

export function removeFromCart(productId: string): void {
  const items = getCartItems();
  const updatedItems = items.filter(item => item.product.id !== productId);
  saveCartItems(updatedItems);
}

export function updateQuantity(productId: string, quantity: number): void {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  const items = getCartItems();
  const existingItemIndex = items.findIndex(item => item.product.id === productId);

  if (existingItemIndex > -1) {
    items[existingItemIndex].quantity = quantity;
    saveCartItems(items);
  }
}

export function clearCart(): void {
  saveCartItems([]);
}

export function toggleCart(forceOpen?: boolean): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('toggle-cart', { detail: { forceOpen } }));
  }
}
