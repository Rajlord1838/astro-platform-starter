import type { Product, CartItem } from '../types';

const CART_KEY = 'fashion_store_cart';

export function getCart(): CartItem[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
}

export function saveCart(cart: CartItem[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    // Dispatch a custom event to notify React islands
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: cart }));
}

export function addToCart(product: Product, quantity: number = 1) {
    const cart = getCart();
    const existingIndex = cart.findIndex(item => item.product.id === product.id);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }

    saveCart(cart);
    toggleCart(true); // Open cart when adding item
}

export function removeFromCart(productId: string) {
    let cart = getCart();
    cart = cart.filter(item => item.product.id !== productId);
    saveCart(cart);
}

export function updateQuantity(productId: string, quantity: number) {
    const cart = getCart();
    const existingIndex = cart.findIndex(item => item.product.id === productId);

    if (existingIndex > -1) {
        if (quantity <= 0) {
            cart.splice(existingIndex, 1);
        } else {
            cart[existingIndex].quantity = quantity;
        }
        saveCart(cart);
    }
}

export function toggleCart(isOpen: boolean) {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new CustomEvent('toggle-cart', { detail: isOpen }));
}
