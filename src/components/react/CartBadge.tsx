import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart, listenToCartUpdates, getCartItemCount } from '../../utils/cart';

interface CartBadgeProps {
    onClick: () => void;
}

export const CartBadge: React.FC<CartBadgeProps> = ({ onClick }) => {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        // Initial load
        setItemCount(getCartItemCount(getCart()));

        // Listen for updates
        const unsubscribe = listenToCartUpdates(() => {
            setItemCount(getCartItemCount(getCart()));
        });

        return unsubscribe;
    }, []);

    return (
        <button
            onClick={onClick}
            className="relative p-2 text-white hover:text-primary transition-colors flex items-center justify-center"
            aria-label="Open cart"
        >
            <ShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary rounded-full transform translate-x-1/4 -translate-y-1/4">
                    {itemCount}
                </span>
            )}
        </button>
    );
};
