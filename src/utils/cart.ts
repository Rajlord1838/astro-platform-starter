import type { CartItem, Product } from '../types';

const CART_STORAGE_KEY = 'fashion_store_cart';

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveCart(cart: CartItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent('cart-updated', { detail: cart }));
}

export function addToCart(product: Product): void {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.product.id === product.id);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }

  saveCart(cart);
  toggleCart(true); // Open cart when item is added
}

export function removeFromCart(productId: string): void {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.product.id !== productId);
  saveCart(updatedCart);
}

export function updateQuantity(productId: string, quantity: number): void {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.product.id === productId);

  if (existingItemIndex > -1) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      cart[existingItemIndex].quantity = quantity;
      saveCart(cart);
    }
  }
}

export function toggleCart(isOpen?: boolean): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('toggle-cart', { detail: isOpen }));
}

export function clearCart(): void {
  saveCart([]);
}
