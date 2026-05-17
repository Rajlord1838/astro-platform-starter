import { useState, useEffect } from 'react';

export interface CartItem {
    id: string;
    quantity: number;
}

export function getCart(): CartItem[] {
    if (typeof window !== 'undefined') {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    }
    return [];
}

export function addToCart(id: string) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    // Dispatch a custom event to notify other components (if needed)
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('cart-updated'));
    }
}

export function removeFromCart(id: string) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('cart-updated'));
    }
}

export function updateCartQuantity(id: string, quantity: number) {
    if (quantity <= 0) {
        removeFromCart(id);
        return;
    }
    const cart = getCart();
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('cart-updated'));
        }
    }
}

export function clearCart() {
    localStorage.removeItem('cart');
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('cart-updated'));
    }
}

// React hook for using cart state
export function useCart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        // Initial load
        setCartItems(getCart());

        // Listen for updates
        const handleCartUpdate = () => {
            setCartItems(getCart());
        };

        window.addEventListener('cart-updated', handleCartUpdate);
        return () => {
            window.removeEventListener('cart-updated', handleCartUpdate);
        };
    }, []);

    return cartItems;
}
