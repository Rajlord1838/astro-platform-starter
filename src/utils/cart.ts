import type { Product, CartItem } from '../types';

export const CART_STORAGE_KEY = 'fashion_store_cart';
export const CART_UPDATED_EVENT = 'cart-updated';
export const TOGGLE_CART_EVENT = 'toggle-cart';

export function getCart(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
        const cart = localStorage.getItem(CART_STORAGE_KEY);
        return cart ? JSON.parse(cart) : [];
    } catch (error) {
        console.error('Error getting cart from local storage:', error);
        return [];
    }
}

export function saveCart(cart: CartItem[]): void {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT));
    } catch (error) {
        console.error('Error saving cart to local storage:', error);
    }
}

export function addToCart(product: Product): void {
    const cart = getCart();
    const existingItem = cart.find(item => item.product.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ product, quantity: 1 });
    }

    saveCart(cart);
}

export function removeFromCart(productId: string): void {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.product.id !== productId);
    saveCart(updatedCart);
}

export function updateQuantity(productId: string, quantity: number): void {
    if (quantity < 1) {
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

export function clearCart(): void {
    saveCart([]);
}

export function toggleCart(): void {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent(TOGGLE_CART_EVENT));
    }
}
