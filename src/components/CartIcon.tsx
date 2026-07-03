import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../types';

export default function CartIcon() {
    const [itemCount, setItemCount] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const updateCount = () => {
            const cartString = localStorage.getItem('fashion_store_cart');
            if (cartString) {
                const cart: Product[] = JSON.parse(cartString);
                setItemCount(cart.length);
            } else {
                setItemCount(0);
            }
        };

        updateCount();

        window.addEventListener('cart-updated', updateCount);
        return () => window.removeEventListener('cart-updated', updateCount);
    }, []);

    return (
        <a href="/cart" className="relative flex items-center p-2 text-gray-900 transition-colors rounded-full hover:bg-gray-100">
            <ShoppingCart size={24} />
            {isMounted && itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full transform translate-x-1 -translate-y-1">
                    {itemCount}
                </span>
            )}
        </a>
    );
}
