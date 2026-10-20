import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart, toggleCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export const CartButton: React.FC = () => {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        // Initialize count
        const updateCount = (cart: CartItem[]) => {
            const count = cart.reduce((sum, item) => sum + item.quantity, 0);
            setItemCount(count);
        };

        updateCount(getCart());

        // Listen for updates
        const handleCartUpdate = (e: Event) => {
            const customEvent = e as CustomEvent<CartItem[]>;
            updateCount(customEvent.detail);
        };

        window.addEventListener('cart-updated', handleCartUpdate);
        return () => window.removeEventListener('cart-updated', handleCartUpdate);
    }, []);

    return (
        <button
            className="relative p-2 text-white hover:text-primary transition-colors"
            onClick={() => toggleCart()}
            aria-label="Toggle cart"
        >
            <ShoppingCart size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-primary-content transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
                    {itemCount}
                </span>
            )}
        </button>
    );
};
