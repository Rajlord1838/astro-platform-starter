import type { Product } from '../types';

export const CART_STORAGE_KEY = 'fashion_store_cart';
export const CART_UPDATED_EVENT = 'cart-updated';

export interface CartItem {
    product: Product;
    quantity: number;
}

export function getCart(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = window.localStorage.getItem(CART_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error('Failed to parse cart from local storage', e);
        return [];
    }
}

export function saveCart(cart: CartItem[]) {
    if (typeof window === 'undefined') return;
    try {
        window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        window.dispatchEvent(new Event(CART_UPDATED_EVENT));
    } catch (e) {
        console.error('Failed to save cart to local storage', e);
    }
}

export function addToCart(product: Product) {
    const cart = getCart();
    const existingItem = cart.find(item => item.product.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ product, quantity: 1 });
    }

    saveCart(cart);
}

export function removeFromCart(productId: string) {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.product.id !== productId);
    saveCart(updatedCart);
}

export function getCartTotal(): number {
    return getCart().reduce((total, item) => total + (item.product.price * item.quantity), 0);
}

export function getCartCount(): number {
    return getCart().reduce((count, item) => count + item.quantity, 0);
}
