import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart, getCartCount, listenToCart } from '../utils/cart';

export default function CartButton() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const updateCount = () => {
            const cart = getCart();
            setCount(getCartCount(cart));
        };

        // Initial load
        updateCount();

        // Listen for updates
        const unsubscribe = listenToCart(updateCount);
        return unsubscribe;
    }, []);

    return (
        <a href="/cart" className="relative flex items-center justify-center p-2 rounded-full hover:bg-gray-800 transition-colors">
            <ShoppingCart className="w-6 h-6 text-white" aria-label="Shopping Cart" />
            {count > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                    {count}
                </span>
            )}
        </a>
    );
}
