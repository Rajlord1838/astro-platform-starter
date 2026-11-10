import type { Product, CartItem } from '../types';

const CART_KEY = 'fashion_store_cart';

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const savedCart = localStorage.getItem(CART_KEY);
  return savedCart ? JSON.parse(savedCart) : [];
}

export function saveCart(cart: CartItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent('cart-updated', { detail: cart }));
}

export function addToCart(product: Product): void {
  const cart = getCart();
  const existingItemIndex = cart.findIndex((item) => item.product.id === product.id);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }

  saveCart(cart);
  toggleCart(true); // Open the cart when adding an item
}

export function updateQuantity(productId: string, quantity: number): void {
  let cart = getCart();
  if (quantity <= 0) {
    cart = cart.filter((item) => item.product.id !== productId);
  } else {
    const itemIndex = cart.findIndex((item) => item.product.id === productId);
    if (itemIndex > -1) {
      cart[itemIndex].quantity = quantity;
    }
  }
  saveCart(cart);
}

export function toggleCart(isOpen: boolean): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('toggle-cart', { detail: isOpen }));
  }
}
