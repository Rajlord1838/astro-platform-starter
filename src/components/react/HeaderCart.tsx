import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart, toggleCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export function HeaderCart() {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        // Initial load
        const cart = getCart();
        const count = cart.reduce((acc, item) => acc + item.quantity, 0);
        setItemCount(count);

        // Listen for updates
        const handleCartUpdate = (e: Event) => {
            const customEvent = e as CustomEvent<CartItem[]>;
            const newCart = customEvent.detail;
            const newCount = newCart.reduce((acc, item) => acc + item.quantity, 0);
            setItemCount(newCount);
        };

        window.addEventListener('cart-updated', handleCartUpdate);
        return () => window.removeEventListener('cart-updated', handleCartUpdate);
    }, []);

    return (
        <button
            onClick={toggleCart}
            className="relative p-2 text-white transition-colors hover:text-primary rounded-full hover:bg-gray-800"
            aria-label="Toggle shopping cart"
        >
            <ShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full transform translate-x-1/4 -translate-y-1/4">
                    {itemCount}
                </span>
            )}
        </button>
    );
}
