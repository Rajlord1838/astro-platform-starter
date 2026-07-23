import type { Product, CartItem } from '../types';

const CART_STORAGE_KEY = 'fashion_store_cart';

export function getCart(): CartItem[] {
    if (typeof window === 'undefined') return [];

    try {
        const cartStr = localStorage.getItem(CART_STORAGE_KEY);
        return cartStr ? JSON.parse(cartStr) : [];
    } catch (e) {
        console.error('Failed to parse cart from local storage', e);
        return [];
    }
}

export function saveCart(cart: CartItem[]): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        window.dispatchEvent(new Event('cart-updated'));
    } catch (e) {
        console.error('Failed to save cart to local storage', e);
    }
}

export function addToCart(product: Product): void {
    const cart = getCart();
    const existingItemIndex = cart.findIndex(item => item.product.id === product.id);

    if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({ product, quantity: 1 });
    }

    saveCart(cart);
}

export function removeFromCart(productId: string): void {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.product.id !== productId);
    saveCart(updatedCart);
}

export function updateQuantity(productId: string, quantity: number): void {
    const cart = getCart();
    const item = cart.find(i => i.product.id === productId);

    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        item.quantity = quantity;
        saveCart(cart);
    }
}

export function clearCart(): void {
    saveCart([]);
}
