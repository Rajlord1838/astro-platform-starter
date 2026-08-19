import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCartItems } from '../../utils/cart';

export function CartButton() {
    const [itemCount, setItemCount] = useState(0);

    const updateItemCount = () => {
        const items = getCartItems();
        const count = items.reduce((total, item) => total + item.quantity, 0);
        setItemCount(count);
    };

    useEffect(() => {
        updateItemCount();
        window.addEventListener('cart-updated', updateItemCount);
        return () => window.removeEventListener('cart-updated', updateItemCount);
    }, []);

    const toggleCart = () => {
        const event = new CustomEvent('toggle-cart');
        window.dispatchEvent(event);
    };

    return (
        <button
            onClick={toggleCart}
            className="relative p-2 text-white hover:text-gray-200 transition-colors cursor-pointer"
            aria-label="Toggle cart"
        >
            <ShoppingCart size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/4 -translate-y-1/4">
                    {itemCount}
                </span>
            )}
        </button>
    );
}
