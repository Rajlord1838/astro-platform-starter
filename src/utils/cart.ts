import type { Product, CartItem } from '../types';

export const CART_KEY = 'fashion_store_cart';

export function getCart(): CartItem[] {
    if (typeof window === 'undefined') return [];
    const cartStr = localStorage.getItem(CART_KEY);
    if (!cartStr) return [];
    try {
        return JSON.parse(cartStr);
    } catch {
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
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart(cart);
}

export function removeFromCart(id: string) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
}

export function updateQuantity(id: string, quantity: number) {
    if (quantity <= 0) {
        removeFromCart(id);
        return;
    }
    const cart = getCart();
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity = quantity;
        saveCart(cart);
    }
}
