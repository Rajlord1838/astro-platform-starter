import type { CartItem, Product } from '../types';

const CART_KEY = 'fashion_store_cart';
const EVENT_NAME = 'cart-updated';

export const getCart = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    try {
        const item = window.localStorage.getItem(CART_KEY);
        return item ? JSON.parse(item) : [];
    } catch (error) {
        console.error('Error reading cart from local storage', error);
        return [];
    }
};

export const saveCart = (cart: CartItem[]) => {
    if (typeof window === 'undefined') return;
    try {
        window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
        window.dispatchEvent(new Event(EVENT_NAME));
    } catch (error) {
        console.error('Error saving cart to local storage', error);
    }
};

export const addToCart = (product: Product, quantity: number = 1) => {
    const cart = getCart();
    const existingItem = cart.find((item) => item.product.id === product.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }

    saveCart(cart);
};

export const updateQuantity = (productId: string, quantity: number) => {
    let cart = getCart();
    const existingItem = cart.find((item) => item.product.id === productId);

    if (existingItem) {
        if (quantity <= 0) {
            cart = cart.filter((item) => item.product.id !== productId);
        } else {
            existingItem.quantity = quantity;
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

export const getCartTotal = () => {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
};

export const getCartCount = () => {
    const cart = getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
};

export const onCartUpdate = (callback: () => void) => {
    if (typeof window === 'undefined') return () => {};
    window.addEventListener(EVENT_NAME, callback);
    return () => window.removeEventListener(EVENT_NAME, callback);
};
