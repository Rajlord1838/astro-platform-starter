import type { Product, CartItem } from '../types';

const CART_KEY = 'fashion_store_cart';
const EVENT_NAME = 'cart-updated';

export const getCart = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    const cartStr = localStorage.getItem(CART_KEY);
    if (!cartStr) return [];
    try {
        return JSON.parse(cartStr);
    } catch {
        return [];
    }
};

export const saveCart = (cart: CartItem[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event(EVENT_NAME));
};

export const addToCart = (product: Product, quantity: number = 1) => {
    const cart = getCart();
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }
    saveCart(cart);
};

export const removeFromCart = (productId: string) => {
    let cart = getCart();
    cart = cart.filter(item => item.product.id !== productId);
    saveCart(cart);
};

export const clearCart = () => {
    saveCart([]);
};

export const subscribeToCart = (callback: () => void) => {
    if (typeof window === 'undefined') return () => {};
    window.addEventListener(EVENT_NAME, callback);
    return () => window.removeEventListener(EVENT_NAME, callback);
};