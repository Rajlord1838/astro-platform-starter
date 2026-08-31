import type { CartItem, Product } from '../types';

const CART_STORAGE_KEY = 'fashion_store_cart';

export function getCartItems(): CartItem[] {
    if (typeof window === 'undefined') return [];

    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error('Error parsing cart data', e);
        return [];
    }
}

export function saveCartItems(items: CartItem[]): void {
    if (typeof window === 'undefined') return;

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));

    // Dispatch a custom event so other components (like Header) can update
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

export function updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const items = getCartItems();
    const item = items.find(i => i.product.id === productId);

    if (item) {
        item.quantity = quantity;
        saveCartItems(items);
    }
}

export function removeFromCart(productId: string): void {
    const items = getCartItems();
    const updatedItems = items.filter(i => i.product.id !== productId);
    saveCartItems(updatedItems);
}

export function toggleCart(): void {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('toggle-cart'));
    }
}

export function getCartTotal(): number {
    return getCartItems().reduce((total, item) => total + (item.product.price * item.quantity), 0);
}

export function getCartItemCount(): number {
    return getCartItems().reduce((count, item) => count + item.quantity, 0);
}
