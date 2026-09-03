import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { CART_UPDATED_EVENT, getCart, toggleCart } from '../../utils/cart';

export function CartButton() {
    const [itemCount, setItemCount] = useState(0);

    const updateCount = () => {
        const cart = getCart();
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        setItemCount(count);
    };

    useEffect(() => {
        updateCount();
        window.addEventListener(CART_UPDATED_EVENT, updateCount as EventListener);
        return () => window.removeEventListener(CART_UPDATED_EVENT, updateCount as EventListener);
    }, []);

    return (
        <button
            onClick={toggleCart}
            className="relative p-2 text-white hover:text-gray-300 transition-colors"
            aria-label="Shopping Cart"
        >
            <ShoppingCart size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                    {itemCount}
                </span>
            )}
        </button>
    );
}
