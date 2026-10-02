import type { Product, CartItem } from '../types';

const CART_KEY = 'fashion_store_cart';

export const getCart = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(CART_KEY);
    if (!stored) return [];
    try {
        return JSON.parse(stored);
    } catch {
        return [];
    }
};

export const saveCart = (cart: CartItem[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
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
};

export const removeFromCart = (productId: string) => {
    const cart = getCart();
    const updated = cart.filter(item => item.product.id !== productId);
    saveCart(updated);
};

export const updateQuantity = (productId: string, quantity: number) => {
    const cart = getCart();
    const existing = cart.find(item => item.product.id === productId);
    if (existing) {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        existing.quantity = quantity;
        saveCart(cart);
    }
};

export const toggleCart = () => {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('toggle-cart'));
    }
};
