import type { Product, CartItem } from '../types';

const CART_STORAGE_KEY = 'fashion_store_cart';

export function getCart(): CartItem[] {
    if (typeof window === 'undefined') return [];

    try {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY);
        return storedCart ? JSON.parse(storedCart) : [];
    } catch (e) {
        console.error('Error parsing cart from localStorage:', e);
        return [];
    }
}

function saveCart(cart: CartItem[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: cart }));
}

export function addToCart(product: Product) {
    const cart = getCart();
    const existingItemIndex = cart.findIndex((item) => item.product.id === product.id);

    if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({ product, quantity: 1 });
    }

    saveCart(cart);
}

export function removeFromCart(productId: string) {
    const cart = getCart();
    const newCart = cart.filter((item) => item.product.id !== productId);
    saveCart(newCart);
}

export function updateQuantity(productId: string, quantity: number) {
    const cart = getCart();
    const existingItemIndex = cart.findIndex((item) => item.product.id === productId);

    if (existingItemIndex >= 0) {
        if (quantity <= 0) {
            cart.splice(existingItemIndex, 1);
        } else {
            cart[existingItemIndex].quantity = quantity;
        }
        saveCart(cart);
    }
}

export function clearCart() {
    saveCart([]);
}
