import type { Product, CartItem } from '../types';

const CART_KEY = 'fashion_store_cart';

export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart: CartItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
  }
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
  toggleCart(true); // Open cart when item added
};

export const removeFromCart = (productId: string) => {
  const cart = getCart();
  const updatedCart = cart.filter((item) => item.id !== productId);
  saveCart(updatedCart);
};

export const updateQuantity = (productId: string, quantity: number) => {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  const cart = getCart();
  const itemIndex = cart.findIndex((item) => item.id === productId);
  if (itemIndex >= 0) {
    cart[itemIndex].quantity = quantity;
    saveCart(cart);
  }
};

export const clearCart = () => {
  saveCart([]);
};

export const getCartTotal = () => {
  return getCart().reduce((total, item) => total + item.price * item.quantity, 0);
};

export const getCartCount = () => {
  return getCart().reduce((count, item) => count + item.quantity, 0);
};

export const toggleCart = (forceOpen?: boolean) => {
    if (typeof window !== 'undefined') {
        const detail = forceOpen !== undefined ? { forceOpen } : {};
        window.dispatchEvent(new CustomEvent('toggle-cart', { detail }));
    }
}
