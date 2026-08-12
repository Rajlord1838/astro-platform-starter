import type { CartItem, Product } from '../types';

const CART_KEY = 'fashion_store_cart';
const EVENT_NAME = 'cart-updated';

export const getCart = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem(CART_KEY);
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error('Failed to parse cart:', e);
            return [];
        }
    }
    return [];
};

export const saveCart = (cart: CartItem[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event(EVENT_NAME));
};

export const addToCart = (product: Product) => {
    const cart = getCart();
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
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
    const existing = cart.find((item) => item.id === productId);
    if (existing) {
        existing.quantity = quantity;
        saveCart(cart);
    }
};

export const clearCart = () => {
    saveCart([]);
};
