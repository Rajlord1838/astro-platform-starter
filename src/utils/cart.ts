import type { CartItem, Product } from '../types';

const CART_KEY = 'fashion_store_cart';

export function getCartItems(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(CART_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error('Error parsing cart items', e);
        return [];
    }
}

export function saveCartItems(items: CartItem[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: items }));
}

export function addToCart(product: Product): void {
    const items = getCartItems();
    const existing = items.find(item => item.product.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        items.push({ product, quantity: 1 });
    }
    saveCartItems(items);
    toggleCart(true); // Open modal on add
}

export function removeFromCart(productId: string): void {
    let items = getCartItems();
    items = items.filter(item => item.product.id !== productId);
    saveCartItems(items);
}

export function updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    const items = getCartItems();
    const existing = items.find(item => item.product.id === productId);
    if (existing) {
        existing.quantity = quantity;
        saveCartItems(items);
    }
}

export function toggleCart(open: boolean): void {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new CustomEvent('toggle-cart', { detail: open }));
}
