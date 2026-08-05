import type { Product, CartItem } from '../types';

const CART_KEY = 'fashion_store_cart';

export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const cartJson = localStorage.getItem(CART_KEY);
  return cartJson ? JSON.parse(cartJson) : [];
};

export const saveCart = (cart: CartItem[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event('cart-updated'));
};

export const addToCart = (product: Product) => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.product.id === product.id);

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }

  saveCart(cart);
};

export const updateQuantity = (productId: string, quantity: number) => {
  const cart = getCart();
  const updatedCart = cart.map(item => {
    if (item.product.id === productId) {
      return { ...item, quantity: Math.max(0, quantity) };
    }
    return item;
  }).filter(item => item.quantity > 0);

  saveCart(updatedCart);
};

export const removeFromCart = (productId: string) => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.product.id !== productId);
  saveCart(updatedCart);
};

export const clearCart = () => {
  saveCart([]);
};