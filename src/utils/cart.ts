import type { Product, CartItem } from '../types';

const CART_KEY = 'fashion_store_cart';

export function getCart(): CartItem[] {
    if (typeof window === 'undefined') return [];
    const cartJson = localStorage.getItem(CART_KEY);
    return cartJson ? JSON.parse(cartJson) : [];
}

export function saveCart(cart: CartItem[]) {
    if (typeof window !== 'undefined') {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        window.dispatchEvent(new Event('cart-updated'));
    }
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
    const updatedCart = cart.filter(item => item.product.id !== productId);
    saveCart(updatedCart);
}

export function updateQuantity(productId: string, quantity: number) {
    const cart = getCart();
    const existingItem = cart.find(item => item.product.id === productId);

    if (existingItem) {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        existingItem.quantity = quantity;
        saveCart(cart);
    }
}

export function getCartTotal(cart: CartItem[]): number {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
}

export function toggleCart() {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('toggle-cart'));
    }
}
