import type { Product, CartItem } from '../types';

const CART_KEY = 'fashion_store_cart';
const EVENT_NAME = 'cart-updated';

export function getCartItems(): CartItem[] {
    if (typeof window === 'undefined') return [];

    try {
        const item = window.localStorage.getItem(CART_KEY);
        return item ? JSON.parse(item) : [];
    } catch (error) {
        console.error('Failed to parse cart from local storage:', error);
        return [];
    }
}

export function saveCartItems(items: CartItem[]): void {
    if (typeof window === 'undefined') return;

    try {
        window.localStorage.setItem(CART_KEY, JSON.stringify(items));
        window.dispatchEvent(new CustomEvent(EVENT_NAME));
    } catch (error) {
        console.error('Failed to save cart to local storage:', error);
    }
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
    const updatedItems = items.filter(item => item.product.id !== productId);
    saveCartItems(updatedItems);
}

export function updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const items = getCartItems();
    const existingItem = items.find(item => item.product.id === productId);

    if (existingItem) {
        existingItem.quantity = quantity;
        saveCartItems(items);
    }
}

export function clearCart(): void {
    saveCartItems([]);
}

export function getCartTotal(): number {
    return getCartItems().reduce((total, item) => total + (item.product.price * item.quantity), 0);
}

export function getCartCount(): number {
    return getCartItems().reduce((count, item) => count + item.quantity, 0);
}
