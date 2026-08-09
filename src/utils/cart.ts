import type { CartItem, Product } from '../types';

const CART_KEY = 'fashion_store_cart';
const EVENT_NAME = 'cart-updated';

export const getCart = (): CartItem[] => {
    if (typeof window === 'undefined') return [];

    try {
        const cartStr = localStorage.getItem(CART_KEY);
        return cartStr ? JSON.parse(cartStr) : [];
    } catch (e) {
        console.error('Error parsing cart from localStorage:', e);
        return [];
    }
};

export const saveCart = (cart: CartItem[]): void => {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        // Dispatch custom event to notify React components
        window.dispatchEvent(new CustomEvent(EVENT_NAME));
    } catch (e) {
        console.error('Error saving cart to localStorage:', e);
    }
};

export const addToCart = (product: Product): void => {
    const cart = getCart();
    const existingItem = cart.find(item => item.product.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ product, quantity: 1 });
    }

    saveCart(cart);
};

export const removeFromCart = (productId: string): void => {
    const cart = getCart();
    const newCart = cart.filter(item => item.product.id !== productId);
    saveCart(newCart);
};

export const updateQuantity = (productId: string, quantity: number): void => {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const cart = getCart();
    const item = cart.find(i => i.product.id === productId);

    if (item) {
        item.quantity = quantity;
        saveCart(cart);
    }
};

export const clearCart = (): void => {
    saveCart([]);
};
