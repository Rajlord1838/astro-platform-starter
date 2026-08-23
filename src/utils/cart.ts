import type { CartItem, Product } from '../types';

const CART_STORAGE_KEY = 'fashion_store_cart';

export function getCart(): CartItem[] {
    if (typeof window === 'undefined') return [];

    try {
        const item = window.localStorage.getItem(CART_STORAGE_KEY);
        return item ? JSON.parse(item) : [];
    } catch (error) {
        console.error('Error parsing cart from local storage', error);
        return [];
    }
}

function saveCart(cart: CartItem[]) {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    dispatchCartUpdate();
}

export function addToCart(product: Product) {
    const cart = getCart();
    const existingItem = cart.find(item => item.product.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ product, quantity: 1 });
    }

    saveCart(cart);
}

export function removeFromCart(productId: string) {
    const cart = getCart();
    const newCart = cart.filter(item => item.product.id !== productId);
    saveCart(newCart);
}

export function updateQuantity(productId: string, quantity: number) {
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

export function dispatchCartUpdate() {
    if (typeof window !== 'undefined') {
        const event = new CustomEvent('cart-updated');
        window.dispatchEvent(event);
    }
}
