import type { CartItem, Product } from '../types';

export const CART_STORAGE_KEY = 'fashion_store_cart';
export const CART_UPDATED_EVENT = 'cart-updated';
export const TOGGLE_CART_EVENT = 'toggle-cart';

export function getCart(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
        const cartStr = localStorage.getItem(CART_STORAGE_KEY);
        return cartStr ? JSON.parse(cartStr) : [];
    } catch (e) {
        console.error('Failed to parse cart from local storage', e);
        return [];
    }
}

export function saveCart(cart: CartItem[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT));
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

export function updateQuantity(productId: string, quantity: number) {
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
}

export function removeFromCart(productId: string) {
    let cart = getCart();
    cart = cart.filter(item => item.product.id !== productId);
    saveCart(cart);
}

export function toggleCart() {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent(TOGGLE_CART_EVENT));
    }
}
