import type { Product, CartItem } from '../types';

const CART_KEY = 'fashion_store_cart';

export function getCart(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
        const cartStr = localStorage.getItem(CART_KEY);
        return cartStr ? JSON.parse(cartStr) : [];
    } catch (e) {
        console.error('Error parsing cart from localStorage:', e);
        return [];
    }
}

export function saveCart(cart: CartItem[]) {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        window.dispatchEvent(new Event('cart-updated'));
    } catch (e) {
        console.error('Error saving cart to localStorage:', e);
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
    const item = cart.find(item => item.product.id === productId);
    if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        saveCart(cart);
    }
}

export function toggleCart() {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('toggle-cart'));
    }
}
