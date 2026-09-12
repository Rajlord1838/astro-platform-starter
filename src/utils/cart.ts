import type { Product, CartItem } from '../types';

const CART_KEY = 'fashion_store_cart';
const CART_UPDATE_EVENT = 'cart-updated';

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

export const saveCart = (cart: CartItem[]) => {
    if (typeof window === 'undefined') return;
    try {
        window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
        window.dispatchEvent(new Event(CART_UPDATE_EVENT));
    } catch (error) {
        console.error('Error saving cart to localStorage', error);
    }
};

export const addToCart = (product: Product) => {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
};

export const removeFromCart = (productId: string) => {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== productId);
    saveCart(updatedCart);
};

export const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity = quantity;
        saveCart(cart);
    }
};

export const getCartTotal = (cart: CartItem[]) => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const getCartItemCount = (cart: CartItem[]) => {
    return cart.reduce((count, item) => count + item.quantity, 0);
};

export const subscribeToCartUpdates = (callback: () => void) => {
    if (typeof window === 'undefined') return () => {};
    window.addEventListener(CART_UPDATE_EVENT, callback);
    return () => window.removeEventListener(CART_UPDATE_EVENT, callback);
};
