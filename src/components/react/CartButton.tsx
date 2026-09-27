import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCartItems, toggleCart } from '../../utils/cart';

export default function CartButton() {
    const [itemCount, setItemCount] = useState(0);

    const updateCount = () => {
        const items = getCartItems();
        const count = items.reduce((total, item) => total + item.quantity, 0);
        setItemCount(count);
    };

    useEffect(() => {
        updateCount();
        window.addEventListener('cart-updated', updateCount);
        return () => window.removeEventListener('cart-updated', updateCount);
    }, []);

    return (
        <button
            onClick={toggleCart}
            className="relative p-2 text-white hover:text-primary transition-colors cursor-pointer flex items-center justify-center"
            aria-label="Open cart"
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
