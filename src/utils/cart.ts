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

export const addToCart = (product: Product, quantity: number = 1) => {
    const cart = getCart();
    const existing = cart.find(item => item.product.id === product.id);

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }

    saveCart(cart);
    toggleCart(true); // Automatically open cart when adding
};

export const removeFromCart = (productId: string) => {
    const cart = getCart();
    const filtered = cart.filter(item => item.product.id !== productId);
    saveCart(filtered);
};

export const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const cart = getCart();
    const item = cart.find(item => item.product.id === productId);
    if (item) {
        item.quantity = quantity;
        saveCart(cart);
    }
};

export const clearCart = () => {
    saveCart([]);
};

export const toggleCart = (isOpen?: boolean) => {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('toggle-cart', { detail: { isOpen } }));
    }
};
