import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart, toggleCart } from '../../utils/cart';

export const CartButton: React.FC = () => {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        // Initial load
        const updateCount = () => {
            const cart = getCart();
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            setItemCount(count);
        };

        updateCount();

        // Listen for updates
        window.addEventListener('cart-updated', updateCount);
        return () => window.removeEventListener('cart-updated', updateCount);
    }, []);

    return (
        <button
            onClick={() => toggleCart()}
            className="relative p-2 text-white hover:text-primary transition-colors"
            aria-label="Open cart"
        >
            <ShoppingCart size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full translate-x-1/4 -translate-y-1/4">
                    {itemCount}
                </span>
            )}
        </button>
    );
};
