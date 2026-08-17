import type { CartItem, Product } from '../types';

const CART_STORAGE_KEY = 'fashion_store_cart';
const CART_UPDATED_EVENT = 'cart-updated';

export const getCart = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error('Error parsing cart from local storage', e);
        return [];
    }
};

export const saveCart = (cart: CartItem[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        window.dispatchEvent(new Event(CART_UPDATED_EVENT));
    }
};

export const addToCart = (product: Product, quantity: number = 1) => {
    const cart = getCart();
    const existingIndex = cart.findIndex((item) => item.product.id === product.id);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }

    saveCart(cart);
};

export const updateCartItemQuantity = (productId: string, quantity: number) => {
    const cart = getCart();
    const existingIndex = cart.findIndex((item) => item.product.id === productId);

    if (existingIndex > -1) {
        if (quantity <= 0) {
            cart.splice(existingIndex, 1);
        } else {
            cart[existingIndex].quantity = quantity;
        }
        saveCart(cart);
    }
};

export const removeFromCart = (productId: string) => {
    const cart = getCart();
    const newCart = cart.filter((item) => item.product.id !== productId);
    saveCart(newCart);
};

export const clearCart = () => {
    saveCart([]);
};

export const subscribeToCartChanges = (callback: () => void) => {
    if (typeof window !== 'undefined') {
        window.addEventListener(CART_UPDATED_EVENT, callback);

        // Also listen for storage events to sync across tabs
        const handleStorage = (e: StorageEvent) => {
            if (e.key === CART_STORAGE_KEY) {
                callback();
            }
        };
        window.addEventListener('storage', handleStorage);

        return () => {
            window.removeEventListener(CART_UPDATED_EVENT, callback);
            window.removeEventListener('storage', handleStorage);
        };
    }
    return () => {};
};
