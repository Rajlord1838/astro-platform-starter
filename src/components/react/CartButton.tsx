import React, { useEffect, useState } from 'react';
import { getCart, toggleCart } from '../../utils/cart';
import { ShoppingBag } from 'lucide-react';

export const CartButton: React.FC = () => {
    const [itemCount, setItemCount] = useState(0);

    const updateItemCount = () => {
        const cart = getCart();
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        setItemCount(count);
    };

    useEffect(() => {
        // Initial count
        updateItemCount();

        // Listen for updates
        window.addEventListener('cart-updated', updateItemCount);

        return () => {
            window.removeEventListener('cart-updated', updateItemCount);
        };
    }, []);

    return (
        <button
            onClick={() => toggleCart()}
            className="relative p-2 text-white hover:text-primary transition-colors flex items-center justify-center"
            aria-label={`Shopping cart with ${itemCount} items`}
        >
            <ShoppingBag size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-primary-content bg-primary rounded-full transform translate-x-1/4 -translate-y-1/4">
                    {itemCount}
                </span>
            )}
        </button>
    );
};
