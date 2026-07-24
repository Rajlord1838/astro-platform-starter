import type { Product } from '../types';

export interface CartItem extends Product {
    quantity: number;
}

export function getCart(): CartItem[] {
    if (typeof window === 'undefined') return [];
    const cart = localStorage.getItem('fashion_store_cart');
    return cart ? JSON.parse(cart) : [];
}

export function addToCart(product: Product) {
    if (typeof window === 'undefined') return;
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('fashion_store_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
}

export function removeFromCart(productId: string) {
    if (typeof window === 'undefined') return;
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('fashion_store_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
}

export function updateQuantity(productId: string, quantity: number) {
    if (typeof window === 'undefined') return;
    let cart = getCart();
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== productId);
        }
    }
    localStorage.setItem('fashion_store_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
}
