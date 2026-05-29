import type { CartItem, Product } from '../types';

const CART_KEY = 'fashion_store_cart';
const CART_UPDATE_EVENT = 'cart-updated';

export const getCart = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    try {
        const cartStr = localStorage.getItem(CART_KEY);
        return cartStr ? JSON.parse(cartStr) : [];
    } catch (e) {
        console.error('Failed to parse cart', e);
        return [];
    }
};

export const saveCart = (cart: CartItem[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event(CART_UPDATE_EVENT));
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

    if (quantity <= 0) {
        cart = cart.filter((item) => item.product.id !== productId);
    } else {
        const item = cart.find((item) => item.product.id === productId);
        if (item) {
            item.quantity = quantity;
        }
    }

    saveCart(cart);
};

export const removeFromCart = (productId: string) => {
    const cart = getCart();
    const newCart = cart.filter((item) => item.product.id !== productId);
    saveCart(newCart);
};

export const clearCart = () => {
    saveCart([]);
};

export const getCartTotal = (): number => {
    return getCart().reduce((total, item) => total + item.product.price * item.quantity, 0);
};

export const getCartItemCount = (): number => {
    return getCart().reduce((count, item) => count + item.quantity, 0);
};

export const subscribeToCartChanges = (callback: () => void) => {
    if (typeof window === 'undefined') return () => {};
    window.addEventListener(CART_UPDATE_EVENT, callback);
    // Also listen to storage events for cross-tab synchronization
    window.addEventListener('storage', (e) => {
        if (e.key === CART_KEY) {
            callback();
        }
    });

    return () => {
        window.removeEventListener(CART_UPDATE_EVENT, callback);
        window.removeEventListener('storage', callback);
    };
};
