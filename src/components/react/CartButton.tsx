import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart, toggleCart, CART_UPDATED_EVENT } from '../../utils/cart';

export default function CartButton() {
    const [itemCount, setItemCount] = useState(0);

    const updateItemCount = () => {
        const cart = getCart();
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        setItemCount(count);
    };

    useEffect(() => {
        updateItemCount();

        window.addEventListener(CART_UPDATED_EVENT, updateItemCount);
        return () => window.removeEventListener(CART_UPDATED_EVENT, updateItemCount);
    }, []);

    return (
        <button
            onClick={() => toggleCart()}
            className="relative p-2 text-gray-700 hover:text-primary transition-colors cursor-pointer"
            aria-label="Open cart"
        >
            <ShoppingCart size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
                    {itemCount}
                </span>
            )}
        </button>
    );
}
