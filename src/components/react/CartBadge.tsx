import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart, toggleCart } from '../../utils/cart';

export default function CartBadge() {
    const [itemCount, setItemCount] = useState(0);

    const updateCount = () => {
        const cart = getCart();
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        setItemCount(count);
    };

    useEffect(() => {
        // Initial load
        updateCount();

        // Listen for custom cart-updated event
        window.addEventListener('cart-updated', updateCount);

        return () => {
            window.removeEventListener('cart-updated', updateCount);
        };
    }, []);

    return (
        <button
            onClick={toggleCart}
            className="relative flex items-center justify-center p-2 text-white transition-colors hover:text-primary rounded-full hover:bg-gray-800"
            aria-label="Toggle cart"
        >
            <ShoppingCart size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                    {itemCount}
                </span>
            )}
        </button>
    );
}
