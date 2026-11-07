import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCartItems, toggleCart } from '../../utils/cart';

export default function CartButton() {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        const updateCount = () => {
            const items = getCartItems();
            const count = items.reduce((sum, item) => sum + item.quantity, 0);
            setItemCount(count);
        };

        // Initial count
        updateCount();

        // Listen for updates
        window.addEventListener('cart-updated', updateCount);
        return () => window.removeEventListener('cart-updated', updateCount);
    }, []);

    return (
        <button
            onClick={() => toggleCart()}
            className="relative p-2 text-white transition-colors rounded-full hover:bg-gray-800"
            aria-label="Open cart"
        >
            <ShoppingCart size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded-full bg-primary -translate-y-1/4 translate-x-1/4">
                    {itemCount}
                </span>
            )}
        </button>
    );
}
