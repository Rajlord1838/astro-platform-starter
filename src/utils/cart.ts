import type { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

const CART_KEY = 'fashion_store_cart';

export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(CART_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveCart = (cart: CartItem[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent('cart-updated', { detail: cart }));
};

export const addToCart = (product: Product, quantity: number = 1) => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex((item) => item.product.id === product.id);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }

  saveCart(cart);
};

export const removeFromCart = (productId: string) => {
  const cart = getCart();
  const updatedCart = cart.filter((item) => item.product.id !== productId);
  saveCart(updatedCart);
};

export const updateQuantity = (productId: string, quantity: number) => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex((item) => item.product.id === productId);

  if (existingItemIndex > -1) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      cart[existingItemIndex].quantity = quantity;
      saveCart(cart);
    }
  }
};

export const clearCart = () => {
  saveCart([]);
};
