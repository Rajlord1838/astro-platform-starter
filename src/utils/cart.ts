import type { Product, CartItem } from '../types';

const CART_KEY = 'fashion_store_cart';
const EVENT_KEY = 'cart-updated';

export function getCart(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(CART_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error('Failed to parse cart data', e);
        return [];
    }
}

export function saveCart(cart: CartItem[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event(EVENT_KEY));
}

export function addToCart(product: Product) {
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
        saveCart(cart);
    } else {
        saveCart([...cart, { ...product, quantity: 1 }]);
    }
}

export function removeFromCart(productId: string) {
    const cart = getCart();
    const newCart = cart.filter(item => item.id !== productId);
    saveCart(newCart);
}

export function updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    const cart = getCart();
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity = quantity;
        saveCart(cart);
    }
}

export function clearCart() {
    saveCart([]);
}
