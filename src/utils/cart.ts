import type { CartItem, Product } from '../types';

export const CART_STORAGE_KEY = 'fashion_store_cart';
export const CART_UPDATE_EVENT = 'cart-updated';

export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(CART_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Failed to read cart from local storage', err);
    return [];
  }
};

export const saveCart = (cart: CartItem[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event(CART_UPDATE_EVENT));
  } catch (err) {
    console.error('Failed to save cart to local storage', err);
  }
};

export const addToCart = (product: Product) => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.id === product.id);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
};

export const removeFromCart = (productId: string) => {
  const cart = getCart();
  const newCart = cart.filter(item => item.id !== productId);
  saveCart(newCart);
};

export const updateQuantity = (productId: string, quantity: number) => {
  if (quantity < 1) {
    removeFromCart(productId);
    return;
  }

  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.id === productId);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity = quantity;
    saveCart(cart);
  }
};

export const clearCart = () => {
  saveCart([]);
};
