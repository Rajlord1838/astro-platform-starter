import type { Product } from '../types';

export interface CartItem {
  product: Product;
  quantity: number;
}

const CART_KEY = 'fashion_store_cart';

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
}

export function saveCart(cart: CartItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event('cart-updated'));
}

export function addToCart(product: Product) {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.product.id === product.id);

  if (existingItemIndex >= 0) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }

  saveCart(cart);
}

export function removeFromCart(productId: string) {
  const cart = getCart();
  const newCart = cart.filter(item => item.product.id !== productId);
  saveCart(newCart);
}

export function updateQuantity(productId: string, quantity: number) {
  const cart = getCart();
  const itemIndex = cart.findIndex(item => item.product.id === productId);

  if (itemIndex >= 0) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      cart[itemIndex].quantity = quantity;
      saveCart(cart);
    }
  }
}
