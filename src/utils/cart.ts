import type { Product, CartItem } from '../types';

const CART_KEY = 'fashion_store_cart';

export const getCart = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const saveCart = (cart: CartItem[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        window.dispatchEvent(new CustomEvent('cart-updated'));
    }
};

export const addToCart = (product: Product) => {
    const cart = getCart();
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ product, quantity: 1 });
    }
    saveCart(cart);
    window.dispatchEvent(new CustomEvent('toggle-cart', { detail: true }));
};

export const updateQuantity = (productId: string, delta: number) => {
    let cart = getCart();
    const item = cart.find(item => item.product.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.product.id !== productId);
        }
        saveCart(cart);
    }
};

export const removeFromCart = (productId: string) => {
    let cart = getCart();
    cart = cart.filter(item => item.product.id !== productId);
    saveCart(cart);
};
