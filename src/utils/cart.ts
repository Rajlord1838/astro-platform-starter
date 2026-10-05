import type { Product, CartItem } from '../types';

const CART_STORAGE_KEY = 'fashion_store_cart';

export function getCartItems(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error('Error reading cart from local storage', e);
        return [];
    }
}

export function saveCartItems(items: CartItem[]): void {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        window.dispatchEvent(new CustomEvent('cart-updated', { detail: items }));
    } catch (e) {
        console.error('Error saving cart to local storage', e);
    }
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
}

export function removeFromCart(productId: string): void {
    const items = getCartItems();
    const updated = items.filter(item => item.product.id !== productId);
    saveCartItems(updated);
}

export function updateQuantity(productId: string, quantity: number): void {
    const items = getCartItems();
    const existing = items.find(item => item.product.id === productId);
    if (existing) {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        existing.quantity = quantity;
        saveCartItems(items);
    }
}

export function toggleCartModal(): void {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('toggle-cart'));
    }
}

export function getCartTotal(): number {
    return getCartItems().reduce((total, item) => total + (item.product.price * item.quantity), 0);
}

export function getCartCount(): number {
    return getCartItems().reduce((count, item) => count + item.quantity, 0);
}
