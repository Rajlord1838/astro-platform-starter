import type { Product, CartItem } from '../types';

const CART_KEY = 'fashion_store_cart';

export function getCartItems(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = window.localStorage.getItem(CART_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error('Error reading cart from localStorage', e);
        return [];
    }
}

export function saveCartItems(items: CartItem[]) {
    if (typeof window === 'undefined') return;
    try {
        window.localStorage.setItem(CART_KEY, JSON.stringify(items));
        window.dispatchEvent(new CustomEvent('cart-updated'));
    } catch (e) {
        console.error('Error saving cart to localStorage', e);
    }
}

export function addToCart(product: Product) {
    const items = getCartItems();
    const existing = items.find(item => item.product.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        items.push({ product, quantity: 1 });
    }
    saveCartItems(items);
    toggleCart(true); // Open modal automatically
}

export function removeFromCart(productId: string) {
    let items = getCartItems();
    items = items.filter(item => item.product.id !== productId);
    saveCartItems(items);
}

export function updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    const items = getCartItems();
    const item = items.find(item => item.product.id === productId);
    if (item) {
        item.quantity = quantity;
        saveCartItems(items);
    }
}

export function toggleCart(open?: boolean) {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new CustomEvent('toggle-cart', { detail: { open } }));
}
