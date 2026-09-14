import type { CartItem, Product } from '../types';

const CART_KEY = 'fashion_store_cart';

export function getCart(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
        const cartStr = localStorage.getItem(CART_KEY);
        return cartStr ? JSON.parse(cartStr) : [];
    } catch (e) {
        return [];
    }
}

export function saveCart(cart: CartItem[]) {
    if (typeof window !== 'undefined') {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        window.dispatchEvent(new CustomEvent('cart-updated', { detail: cart }));
    }
}

export function addToCart(product: Product) {
    const cart = getCart();
    const existingItem = cart.find((item) => item.product.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ product, quantity: 1 });
    }

    saveCart(cart);
}

export function removeFromCart(productId: string) {
    let cart = getCart();
    cart = cart.filter((item) => item.product.id !== productId);
    saveCart(cart);
}

export function updateQuantity(productId: string, quantity: number) {
    const cart = getCart();
    const existingItem = cart.find((item) => item.product.id === productId);

    if (existingItem) {
        existingItem.quantity = quantity;
        if (existingItem.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        saveCart(cart);
    }
}

export function toggleCart() {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('toggle-cart'));
    }
}
