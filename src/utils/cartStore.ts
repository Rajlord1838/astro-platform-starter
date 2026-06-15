import { useState, useEffect } from 'react';
import type { Product, CartItem } from '../types';

const CART_KEY = 'fashion_store_cart';

export function getCart(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
        const item = window.localStorage.getItem(CART_KEY);
        return item ? JSON.parse(item) : [];
    } catch (error) {
        console.error('Error reading cart from localStorage:', error);
        return [];
    }
}

export function saveCart(cart: CartItem[]) {
    if (typeof window === 'undefined') return;
    try {
        window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
        window.dispatchEvent(new CustomEvent('cart-updated'));
    } catch (error) {
        console.error('Error saving cart to localStorage:', error);
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

export function updateQuantity(productId: string, quantity: number) {
    const cart = getCart();
    if (quantity <= 0) {
        saveCart(cart.filter(item => item.product.id !== productId));
        return;
    }

    const item = cart.find(item => item.product.id === productId);
    if (item) {
        item.quantity = quantity;
        saveCart(cart);
    }
}

export function useCart() {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        // Read cart initially on the client
        setCart(getCart());

        const handleCartUpdate = () => {
            setCart(getCart());
        };

        window.addEventListener('cart-updated', handleCartUpdate);
        return () => window.removeEventListener('cart-updated', handleCartUpdate);
    }, []);

    return cart;
}
