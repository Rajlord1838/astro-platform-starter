import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCartItems, toggleCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function CartBadge() {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        // Initial load
        const items = getCartItems();
        setItemCount(items.reduce((acc, item) => acc + item.quantity, 0));

        // Listen for updates
        const handleCartUpdate = (e: CustomEvent<CartItem[]>) => {
            const count = e.detail.reduce((acc, item) => acc + item.quantity, 0);
            setItemCount(count);
        };

        window.addEventListener('cart-updated', handleCartUpdate as EventListener);
        return () => {
            window.removeEventListener('cart-updated', handleCartUpdate as EventListener);
        };
    }, []);

    return (
        <button
            onClick={toggleCart}
            className="relative p-2 text-gray-800 hover:text-black transition-colors"
            aria-label="Shopping Cart"
        >
            <ShoppingCart size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                    {itemCount}
                </span>
            )}
        </button>
    );
}
