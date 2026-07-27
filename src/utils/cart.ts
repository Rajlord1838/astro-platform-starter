import type { Product, CartItem } from '../types';

const CART_KEY = 'fashion_store_cart';
const EVENT_NAME = 'cart-updated';

export const getCart = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    try {
        const item = window.localStorage.getItem(CART_KEY);
        return item ? JSON.parse(item) : [];
    } catch (error) {
        console.error('Error reading cart from localStorage', error);
        return [];
    }
};

const saveCart = (cart: CartItem[]) => {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
        window.dispatchEvent(new Event(EVENT_NAME));
    }
};

export const addToCart = (product: Product, quantity: number = 1) => {
    const cart = getCart();
    const existingItemIndex = cart.findIndex(item => item.product.id === product.id);

    if (existingItemIndex >= 0) {
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

export const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    const cart = getCart();
    const itemIndex = cart.findIndex(item => item.product.id === productId);

    if (itemIndex >= 0) {
        cart[itemIndex].quantity = quantity;
        saveCart(cart);
    }
};

export const clearCart = () => {
    saveCart([]);
};

export const getCartTotal = (cart: CartItem[]): number => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
};

export const getCartCount = (cart: CartItem[]): number => {
    return cart.reduce((count, item) => count + item.quantity, 0);
};

export const subscribeToCart = (callback: () => void) => {
    if (typeof window !== 'undefined') {
        window.addEventListener(EVENT_NAME, callback);
        return () => window.removeEventListener(EVENT_NAME, callback);
    }
    return () => {};
};
