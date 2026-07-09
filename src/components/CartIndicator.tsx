import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import type { CartItem } from '../types';

export default function CartIndicator() {
    const [itemCount, setItemCount] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    const loadCart = () => {
        const cartStr = localStorage.getItem('fashion_store_cart');
        if (cartStr) {
            const cart: CartItem[] = JSON.parse(cartStr);
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            setItemCount(count);
        } else {
            setItemCount(0);
        }
    };

    useEffect(() => {
        setIsMounted(true);
        loadCart();

        const handleCartUpdate = () => {
            loadCart();
        };

        window.addEventListener('cart-updated', handleCartUpdate);
        return () => window.removeEventListener('cart-updated', handleCartUpdate);
    }, []);

    if (!isMounted) return null;

    return (
        <a href="/cart" className="relative p-2 text-gray-300 hover:text-white transition-colors flex items-center gap-2">
            <ShoppingCart size={24} />
            <span className="hidden sm:inline font-medium">Cart</span>
            {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 sm:right-auto sm:left-6 bg-primary text-primary-content text-xs font-bold rounded-full h-5 min-w-5 flex items-center justify-center px-1">
                    {itemCount}
                </span>
            )}
        </a>
    );
}