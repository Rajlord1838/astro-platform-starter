import type { CartItem, Product } from '../types';

const CART_KEY = 'fashion_store_cart';

export function getCartItems(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = window.localStorage.getItem(CART_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error('Failed to parse cart items from local storage', e);
        return [];
    }
}

export function saveCartItems(items: CartItem[]) {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: items }));
}

export function addToCart(product: Product) {
    const items = getCartItems();
    const existing = items.find((item) => item.product.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        items.push({ product, quantity: 1 });
    }
    saveCartItems(items);
}

export function removeFromCart(productId: string) {
    const items = getCartItems();
    const filtered = items.filter((item) => item.product.id !== productId);
    saveCartItems(filtered);
}

export function updateQuantity(productId: string, quantity: number) {
    const items = getCartItems();
    const existing = items.find((item) => item.product.id === productId);
    if (existing) {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        existing.quantity = quantity;
        saveCartItems(items);
    }
}
