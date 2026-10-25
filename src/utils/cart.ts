import type { Product, CartItem } from '../types';

const CART_STORAGE_KEY = 'fashion_store_cart';

export function getCart(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error('Failed to parse cart from local storage', e);
        return [];
    }
}

function saveCart(cart: CartItem[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: cart }));
}

export function addToCart(product: Product, quantity: number = 1) {
    const cart = getCart();
    const existing = cart.find(item => item.product.id === product.id);

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }

    saveCart(cart);
    toggleCart(true); // Open cart when adding an item
}

export function removeFromCart(productId: string) {
    const cart = getCart();
    const updated = cart.filter(item => item.product.id !== productId);
    saveCart(updated);
}

export function updateQuantity(productId: string, quantity: number) {
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
}

export function toggleCart(isOpen?: boolean) {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('toggle-cart', { detail: isOpen }));
    }
}

export function getCartTotal(cart: CartItem[]): number {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
}

export function getCartItemCount(cart: CartItem[]): number {
    return cart.reduce((count, item) => count + item.quantity, 0);
}
