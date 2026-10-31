import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart, toggleCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function CartButton() {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        const updateCount = (cart: CartItem[]) => {
            setItemCount(cart.reduce((total, item) => total + item.quantity, 0));
        };

        // Initial load
        updateCount(getCart());

        // Listen for updates
        const handleCartUpdated = (e: CustomEvent<CartItem[]>) => {
            updateCount(e.detail);
        };

        window.addEventListener('cart-updated', handleCartUpdated as EventListener);
        return () => window.removeEventListener('cart-updated', handleCartUpdated as EventListener);
    }, []);

    return (
        <button
            onClick={() => toggleCart(true)}
            className="relative p-2 text-gray-700 hover:text-black transition-colors"
            aria-label="Open cart"
        >
            <ShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                    {itemCount}
                </span>
            )}
        </button>
    );
}
