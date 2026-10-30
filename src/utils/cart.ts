import type { Product, CartItem } from '../types';

const CART_KEY = 'fashion_store_cart';

export function getCart(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = window.localStorage.getItem(CART_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error('Failed to parse cart from local storage', e);
        return [];
    }
}

function saveCart(cart: CartItem[]) {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
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

export function updateCartItemQuantity(productId: string, quantity: number) {
    const cart = getCart();
    const item = cart.find(item => item.product.id === productId);
    if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
            removeCartItem(productId);
        } else {
            saveCart(cart);
        }
    }
}

export function removeCartItem(productId: string) {
    const cart = getCart();
    const updated = cart.filter(item => item.product.id !== productId);
    saveCart(updated);
}

export function clearCart() {
    saveCart([]);
}

export function toggleCart(open?: boolean) {
    if (typeof window !== 'undefined') {
        const event = new CustomEvent('toggle-cart', { detail: { open } });
        window.dispatchEvent(event);
    }
}
