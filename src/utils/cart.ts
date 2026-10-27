import type { CartItem, Product } from '../types';

const CART_KEY = 'fashion_store_cart';

export function getCart(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
        const cartStr = localStorage.getItem(CART_KEY);
        return cartStr ? JSON.parse(cartStr) : [];
    } catch (e) {
        console.error('Error parsing cart data', e);
        return [];
    }
}

export function saveCart(cart: CartItem[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: cart }));
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
    toggleCart(true);
}

export function updateQuantity(id: string, quantity: number) {
    const cart = getCart();
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            saveCart(cart);
        }
    }
}

export function removeFromCart(id: string) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
}

export function clearCart() {
    saveCart([]);
}

export function toggleCart(isOpen?: boolean) {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new CustomEvent('toggle-cart', { detail: isOpen }));
}
