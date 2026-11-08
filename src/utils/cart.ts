import type { Product, CartItem } from '../types';

const CART_KEY = 'fashion_store_cart';

export function getCart(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(CART_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error('Error parsing cart from localStorage:', e);
        return [];
    }
}

export function saveCart(cart: CartItem[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
}

export function addToCart(product: Product) {
    const cart = getCart();
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ product, quantity: 1 });
    }
    saveCart(cart);
    toggleCart(true);
}

export function removeFromCart(productId: string) {
    const cart = getCart();
    const updated = cart.filter(item => item.product.id !== productId);
    saveCart(updated);
}

export function updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    const cart = getCart();
    const existing = cart.find(item => item.product.id === productId);
    if (existing) {
        existing.quantity = quantity;
        saveCart(cart);
    }
}

export function toggleCart(open?: boolean) {
    if (typeof window === 'undefined') return;
    const event = new CustomEvent('toggle-cart', { detail: open });
    window.dispatchEvent(event);
}

export function getCartTotal(cart: CartItem[]): number {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
}
