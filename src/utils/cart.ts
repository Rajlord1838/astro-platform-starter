import type { CartItem, Product } from '../types';

const CART_KEY = 'fashion_store_cart';
const EVENT_NAME = 'cart-updated';

export const getCart = (): CartItem[] => {
    if (typeof window === 'undefined') return [];

    try {
        const cartStr = localStorage.getItem(CART_KEY);
        return cartStr ? JSON.parse(cartStr) : [];
    } catch (e) {
        console.error('Failed to parse cart from local storage', e);
        return [];
    }
};

export const saveCart = (cart: CartItem[]) => {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        window.dispatchEvent(new Event(EVENT_NAME));
    } catch (e) {
        console.error('Failed to save cart to local storage', e);
    }
};

export const addToCart = (product: Product, quantity: number = 1) => {
    const cart = getCart();
    const existingItemIndex = cart.findIndex(item => item.product.id === product.id);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }

    saveCart(cart);
};

export const removeFromCart = (productId: string) => {
    const cart = getCart();
    const newCart = cart.filter(item => item.product.id !== productId);
    saveCart(newCart);
};

export const clearCart = () => {
    saveCart([]);
};

export const subscribeToCartChanges = (callback: () => void) => {
    if (typeof window === 'undefined') return () => {};

    window.addEventListener(EVENT_NAME, callback);
    // Also listen to storage events to sync across tabs
    window.addEventListener('storage', (e) => {
        if (e.key === CART_KEY) {
            callback();
        }
    });

    return () => {
        window.removeEventListener(EVENT_NAME, callback);
        window.removeEventListener('storage', callback);
    };
};
