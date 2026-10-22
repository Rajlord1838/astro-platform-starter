import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { getCart, toggleCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export const HeaderCartButton: React.FC = () => {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        // Initial load
        const cart = getCart();
        setItemCount(cart.reduce((total, item) => total + item.quantity, 0));

        // Listen for updates
        const handleCartUpdate = (e: CustomEvent<CartItem[]>) => {
            const count = e.detail.reduce((total, item) => total + item.quantity, 0);
            setItemCount(count);
        };

        window.addEventListener('cart-updated', handleCartUpdate as EventListener);
        return () => {
            window.removeEventListener('cart-updated', handleCartUpdate as EventListener);
        };
    }, []);

    return (
        <button
            onClick={() => toggleCart()}
            className="relative p-2 text-white hover:text-primary transition-colors cursor-pointer"
            aria-label="Open cart"
        >
            <ShoppingBag size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex items-center justify-center w-5 h-5 bg-primary text-primary-content text-xs font-bold rounded-full">
                    {itemCount}
                </span>
            )}
        </button>
    );
};
