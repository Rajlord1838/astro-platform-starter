import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCartItems } from '../../utils/cart';

export function CartBadge() {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        const updateCount = () => {
            const items = getCartItems();
            const count = items.reduce((total, item) => total + item.quantity, 0);
            setItemCount(count);
        };

        updateCount();

        const handleCartUpdated = () => updateCount();
        window.addEventListener('cart-updated', handleCartUpdated);
        return () => window.removeEventListener('cart-updated', handleCartUpdated);
    }, []);

    const toggleCart = () => {
        window.dispatchEvent(new CustomEvent('toggle-cart'));
    };

    return (
        <button
            onClick={toggleCart}
            className="relative p-2 text-white hover:text-gray-300 transition-colors"
            aria-label="Open cart"
        >
            <ShoppingCart size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {itemCount}
                </span>
            )}
        </button>
    );
}
