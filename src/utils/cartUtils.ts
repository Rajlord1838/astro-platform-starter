import type { CartItem, Product } from '../types';

const CART_STORAGE_KEY = 'fashion_store_cart';
const CART_UPDATED_EVENT = 'cart-updated';

export const getCart = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    try {
        const cart = localStorage.getItem(CART_STORAGE_KEY);
        return cart ? JSON.parse(cart) : [];
    } catch (error) {
        console.error('Error reading cart from local storage:', error);
        return [];
    }
};

export const saveCart = (cart: CartItem[]): void => {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        window.dispatchEvent(new Event(CART_UPDATED_EVENT));
    } catch (error) {
        console.error('Error saving cart to local storage:', error);
    }
};

export const addToCart = (product: Product): void => {
    const cart = getCart();
    const existingItem = cart.find((item) => item.product.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ product, quantity: 1 });
    }

    saveCart(cart);
};

export const removeFromCart = (productId: string): void => {
    const cart = getCart();
    const updatedCart = cart.filter((item) => item.product.id !== productId);
    saveCart(updatedCart);
};

export const updateQuantity = (productId: string, quantity: number): void => {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const cart = getCart();
    const existingItem = cart.find((item) => item.product.id === productId);

    if (existingItem) {
        existingItem.quantity = quantity;
        saveCart(cart);
    }
};

export const clearCart = (): void => {
    saveCart([]);
};

export const subscribeToCartChanges = (callback: () => void): (() => void) => {
    if (typeof window === 'undefined') return () => {};
    window.addEventListener(CART_UPDATED_EVENT, callback);
    // Also listen for storage events from other tabs
    window.addEventListener('storage', (e) => {
        if (e.key === CART_STORAGE_KEY) {
            callback();
        }
    });

    return () => {
        window.removeEventListener(CART_UPDATED_EVENT, callback);
        window.removeEventListener('storage', callback);
    };
};
