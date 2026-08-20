import React, { useEffect, useState } from 'react';
import { getCart, getCartItemCount } from '../../utils/cart';
import { ShoppingBag } from 'lucide-react';

interface CartBadgeProps {
    onClick: () => void;
}

export default function CartBadge({ onClick }: CartBadgeProps) {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        // Initial load
        setItemCount(getCartItemCount(getCart()));

        // Listen for updates
        const handleCartUpdate = () => {
            setItemCount(getCartItemCount(getCart()));
        };

        window.addEventListener('cart-updated', handleCartUpdate);
        return () => window.removeEventListener('cart-updated', handleCartUpdate);
    }, []);

    return (
        <button
            onClick={onClick}
            className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Shopping Cart"
        >
            <ShoppingBag size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-black rounded-full">
                    {itemCount}
                </span>
            )}
        </button>
    );
}
