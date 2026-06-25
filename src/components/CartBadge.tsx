import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import type { CartItem } from '../types';

export default function CartBadge() {
    const [itemCount, setItemCount] = useState(0);

    const updateCount = () => {
        try {
            const stored = localStorage.getItem('fashion_store_cart');
            if (stored) {
                const cartItems: CartItem[] = JSON.parse(stored);
                const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);
                setItemCount(count);
            } else {
                setItemCount(0);
            }
        } catch (e) {
            console.error('Failed to parse cart', e);
        }
    };

    useEffect(() => {
        updateCount();
        window.addEventListener('cart-updated', updateCount);
        return () => window.removeEventListener('cart-updated', updateCount);
    }, []);

    return (
        <a href="/cart" className="relative inline-flex items-center p-2 hover:bg-gray-800 rounded-full transition-colors">
            <ShoppingCart className="w-6 h-6 text-white" />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
                    {itemCount}
                </span>
            )}
        </a>
    );
}
