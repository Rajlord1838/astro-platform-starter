import type { CartItem, Product } from '../types';

const CART_KEY = 'fashion_store_cart';
export const EVENT_NAME = 'cart-updated';

export const getCart = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    try {
        const cartStr = localStorage.getItem(CART_KEY);
        return cartStr ? JSON.parse(cartStr) : [];
    } catch (e) {
        console.error("Failed to parse cart from local storage", e);
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
    const existingItemIndex = cart.findIndex(item => item.product.id === product.id);

    if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }

    saveCart(cart);
};

export const updateQuantity = (productId: string, quantity: number) => {
    let cart = getCart();
    if (quantity <= 0) {
        cart = cart.filter(item => item.product.id !== productId);
    } else {
        const item = cart.find(item => item.product.id === productId);
        if (item) {
            item.quantity = quantity;
        }
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
