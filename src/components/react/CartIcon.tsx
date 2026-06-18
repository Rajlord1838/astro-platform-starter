import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart, EVENT_NAME } from '../../utils/cart';

export const CartIcon: React.FC = () => {
    const [itemCount, setItemCount] = useState(0);

    const updateCount = () => {
        const cart = getCart();
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        setItemCount(count);
    };

    useEffect(() => {
        updateCount();
        window.addEventListener(EVENT_NAME, updateCount);
        return () => window.removeEventListener(EVENT_NAME, updateCount);
    }, []);

    return (
        <a href="/cart" className="relative inline-flex items-center p-2 rounded hover:bg-gray-800 transition-colors">
            <ShoppingCart className="w-6 h-6 text-white" />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-complementary -mt-1 -mr-1">
                    {itemCount}
                </span>
            )}
            <span className="sr-only">Cart</span>
        </a>
    );
};
