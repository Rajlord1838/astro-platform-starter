import type { Product, CartItem } from '../types';

const CART_STORAGE_KEY = 'fashion_store_cart';

export function getCartItems(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error('Failed to parse cart items', e);
        return [];
    }
}

export function saveCartItems(items: CartItem[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: items }));
}

export function addToCart(product: Product): void {
    const items = getCartItems();
    const existingItem = items.find(item => item.product.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        items.push({ product, quantity: 1 });
    }

    saveCartItems(items);
}

export function removeFromCart(productId: string): void {
    const items = getCartItems();
    const filteredItems = items.filter(item => item.product.id !== productId);
    saveCartItems(filteredItems);
}

export function clearCart(): void {
    saveCartItems([]);
}

export function toggleCart(): void {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('toggle-cart'));
    }
}
