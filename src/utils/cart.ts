import type { CartItem, Product } from '../types';

const CART_KEY = 'fashion_store_cart';

export function getCart(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(CART_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error('Failed to parse cart from local storage', e);
        return [];
    }
}

export function saveCart(cart: CartItem[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
}

export function addToCart(product: Product, quantity: number = 1): void {
    const cart = getCart();
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }
    saveCart(cart);
    toggleCart(true); // Open cart when adding an item
}

export function removeFromCart(productId: string): void {
    const cart = getCart();
    const updated = cart.filter(item => item.product.id !== productId);
    saveCart(updated);
}

export function updateQuantity(productId: string, quantity: number): void {
    const cart = getCart();
    const existing = cart.find(item => item.product.id === productId);
    if (existing) {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        existing.quantity = quantity;
        saveCart(cart);
    }
}

export function clearCart(): void {
    saveCart([]);
}

export function getCartTotal(): number {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
}

export function getCartItemsCount(): number {
    const cart = getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
}

export function toggleCart(open: boolean): void {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new CustomEvent('toggle-cart', { detail: open }));
}
