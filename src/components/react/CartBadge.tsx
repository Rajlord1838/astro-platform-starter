import React, { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { getCart, getCartItemCount, subscribeToCartUpdates } from '../../utils/cart';

export function CartBadge() {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        // Initial load
        setItemCount(getCartItemCount(getCart()));

        // Subscribe to updates
        const unsubscribe = subscribeToCartUpdates(() => {
            setItemCount(getCartItemCount(getCart()));
        });

        return unsubscribe;
    }, []);

    const toggleCart = () => {
        window.dispatchEvent(new Event('toggle-cart'));
    };

    return (
        <button
            onClick={toggleCart}
            className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
            aria-label="Shopping Cart"
        >
            <ShoppingBag size={24} />
            {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    {itemCount}
                </span>
            )}
        </button>
    );
}
