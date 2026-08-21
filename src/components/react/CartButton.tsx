import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCartItems, CART_UPDATED_EVENT } from '../../utils/cart';

interface CartButtonProps {
    onClick: () => void;
}

export const CartButton: React.FC<CartButtonProps> = ({ onClick }) => {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        const updateCount = () => {
            const items = getCartItems();
            const count = items.reduce((total, item) => total + item.quantity, 0);
            setItemCount(count);
        };

        // Initial update
        updateCount();

        // Listen for changes
        window.addEventListener(CART_UPDATED_EVENT, updateCount);
        return () => window.removeEventListener(CART_UPDATED_EVENT, updateCount);
    }, []);

    return (
        <button
            onClick={onClick}
            className="relative p-2 text-white hover:text-gray-300 transition-colors"
            aria-label="Open Cart"
        >
            <ShoppingCart size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                    {itemCount}
                </span>
            )}
        </button>
    );
};
