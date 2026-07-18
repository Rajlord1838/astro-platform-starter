import type { CartItem, Product } from '../types';

const CART_KEY = 'fashion_store_cart';

export function getCart(): CartItem[] {
    if (typeof window === 'undefined') return [];

    try {
        const item = window.localStorage.getItem(CART_KEY);
        return item ? JSON.parse(item) : [];
    } catch (error) {
        console.error('Error reading cart from local storage:', error);
        return [];
    }
}

export function saveCart(cart: CartItem[]): void {
    if (typeof window === 'undefined') return;

    try {
        window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
        // Dispatch custom event to sync state across islands
        window.dispatchEvent(new Event('cart-updated'));
    } catch (error) {
        console.error('Error saving cart to local storage:', error);
    }
}

export function addToCart(product: Product, quantity: number = 1): void {
    const cart = getCart();
    const existingItemIndex = cart.findIndex(item => item.product.id === product.id);

    if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }

    saveCart(cart);
}

export function removeFromCart(productId: string): void {
    const cart = getCart();
    const newCart = cart.filter(item => item.product.id !== productId);
    saveCart(newCart);
}

export function clearCart(): void {
    saveCart([]);
}
