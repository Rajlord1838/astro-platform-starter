import type { Product, CartItem } from '../types';

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

export function saveCart(cart: CartItem[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

export function addToCart(product: Product): void {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
    toggleCart(true); // Open cart when adding an item
}

export function removeFromCart(productId: string): void {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
}

export function updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const cart = getCart();
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity = quantity;
        saveCart(cart);
    }
}

export function clearCart(): void {
    saveCart([]);
}

export function toggleCart(open?: boolean): void {
    if (typeof window !== 'undefined') {
        const event = new CustomEvent(TOGGLE_CART_EVENT, { detail: { open } });
        window.dispatchEvent(event);
    }
}
