import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { toggleCart, getCartItemCount } from '../../utils/cart';
import type { CartItem } from '../../types';

export const HeaderCartButton: React.FC = () => {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        // Initial load
        setItemCount(getCartItemCount());

        const handleCartUpdated = (e: Event) => {
            const customEvent = e as CustomEvent<CartItem[]>;
            if (customEvent.detail) {
                const count = customEvent.detail.reduce((sum, item) => sum + item.quantity, 0);
                setItemCount(count);
            } else {
                setItemCount(getCartItemCount());
            }
        };

        window.addEventListener('cart-updated', handleCartUpdated);
        return () => window.removeEventListener('cart-updated', handleCartUpdated);
    }, []);

    return (
        <button
            onClick={() => toggleCart()}
            className="relative p-2 text-gray-700 hover:text-black transition-colors"
            aria-label="Open cart"
        >
            <ShoppingBag size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-black rounded-full">
                    {itemCount}
                </span>
            )}
        </button>
    );
};
