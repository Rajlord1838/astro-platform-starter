import type { Product } from '../data/products';

export interface CartItem extends Product {
  quantity: number;
}

const CART_STORAGE_KEY = 'fashion_store_cart';

export function getCartItems(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse cart from local storage', e);
      return [];
    }
  }
  return [];
}

export function addToCart(product: Product) {
  const cart = getCartItems();
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
}

export function updateQuantity(productId: string, quantity: number) {
  let cart = getCartItems();
  if (quantity <= 0) {
    cart = cart.filter(item => item.id !== productId);
  } else {
    const item = cart.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
    }
  }
  saveCart(cart);
}

export function removeFromCart(productId: string) {
  let cart = getCartItems();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
}

function saveCart(cart: CartItem[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
  }
}
