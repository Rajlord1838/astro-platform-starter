import type { Product, CartItem } from '../types';

const CART_KEY = 'fashion_store_cart';
export const CART_EVENT = 'cart-updated';

export function getCart(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
        const cart = localStorage.getItem(CART_KEY);
        return cart ? JSON.parse(cart) : [];
    } catch (e) {
        console.error('Error reading cart from local storage', e);
        return [];
    }
}

export function saveCart(cart: CartItem[]) {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        window.dispatchEvent(new CustomEvent(CART_EVENT));
    } catch (e) {
        console.error('Error saving cart to local storage', e);
    }
}

export function addToCart(product: Product) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
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
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = quantity;
        saveCart(cart);
    }
}

export function clearCart() {
    saveCart([]);
}
