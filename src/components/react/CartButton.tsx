import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { getCart, toggleCartModal } from '../../utils/cart';

export const CartButton: React.FC = () => {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        const updateCount = () => {
            const cart = getCart();
            const count = cart.reduce((sum, item) => sum + item.quantity, 0);
            setItemCount(count);
        };

        updateCount(); // Initial count
        window.addEventListener('cart-updated', updateCount);

        return () => window.removeEventListener('cart-updated', updateCount);
    }, []);

    return (
        <button
            onClick={() => toggleCartModal(true)}
            className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors cursor-pointer group"
            aria-label="Open cart"
        >
            <ShoppingBag size={24} className="group-hover:scale-110 transition-transform" />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white shadow-sm">
                    {itemCount}
                </span>
            )}
        </button>
    );
};
