import type { Product, CartItem } from '../types';

const CART_KEY = 'fashion_store_cart';

export function getCart(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
        const storedCart = localStorage.getItem(CART_KEY);
        return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
        console.error('Error reading cart from local storage:', error);
        return [];
    }
}

export function saveCart(cart: CartItem[]): void {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        window.dispatchEvent(new Event('cart-updated'));
    } catch (error) {
        console.error('Error saving cart to local storage:', error);
    }
}

export function addToCart(product: Product): void {
    const cart = getCart();
    const existingItem = cart.find(item => item.product.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ product, quantity: 1 });
    }

    saveCart(cart);
    toggleCart(true); // Open cart modal when an item is added
}

export function removeFromCart(productId: string): void {
    let cart = getCart();
    cart = cart.filter(item => item.product.id !== productId);
    saveCart(cart);
}

export function updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const cart = getCart();
    const item = cart.find(item => item.product.id === productId);
    if (item) {
        item.quantity = quantity;
        saveCart(cart);
    }
}

export function toggleCart(open?: boolean): void {
    if (typeof window !== 'undefined') {
        const event = new CustomEvent('toggle-cart', { detail: { open } });
        window.dispatchEvent(event);
    }
}

export function clearCart(): void {
    saveCart([]);
}
