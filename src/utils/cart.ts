import type { Product } from '../data/products';

export interface CartItem extends Product {
  quantity: number;
}

const CART_KEY = 'fashion_store_cart';
const CART_EVENT = 'cart-updated';

export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const cartJson = localStorage.getItem(CART_KEY);
  return cartJson ? JSON.parse(cartJson) : [];
};

export const saveCart = (cart: CartItem[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event(CART_EVENT));
};

export const addToCart = (product: Product) => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex((item) => item.id === product.id);

  if (existingItemIndex >= 0) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
};

export const removeFromCart = (productId: string) => {
  const cart = getCart();
  const newCart = cart.filter((item) => item.id !== productId);
  saveCart(newCart);
};

export const updateQuantity = (productId: string, quantity: number) => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex((item) => item.id === productId);

  if (existingItemIndex >= 0) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      cart[existingItemIndex].quantity = quantity;
      saveCart(cart);
    }
  }
};

export const getCartTotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const getCartCount = () => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};

export const subscribeToCart = (callback: () => void) => {
  if (typeof window !== 'undefined') {
    window.addEventListener(CART_EVENT, callback);
    return () => window.removeEventListener(CART_EVENT, callback);
  }
  return () => {};
};
