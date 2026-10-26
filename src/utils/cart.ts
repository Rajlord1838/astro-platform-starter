import type { CartItem, Product } from '../types';

const CART_KEY = 'fashion_store_cart';

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
}

export function saveCart(cart: CartItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event('cart-updated'));
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
  toggleCart(true); // Open cart when adding an item
}

export function removeFromCart(productId: string): void {
  const cart = getCart();
  const newCart = cart.filter(item => item.product.id !== productId);
  saveCart(newCart);
}

export function updateQuantity(productId: string, quantity: number): void {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  const cart = getCart();
  const existingItem = cart.find(item => item.product.id === productId);
  if (existingItem) {
    existingItem.quantity = quantity;
    saveCart(cart);
  }
}

export function toggleCart(isOpen?: boolean): void {
  if (typeof window === 'undefined') return;
  const event = new CustomEvent('toggle-cart', { detail: isOpen });
  window.dispatchEvent(event);
}

export function getCartTotal(): number {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
}

export function getCartItemCount(): number {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
}
