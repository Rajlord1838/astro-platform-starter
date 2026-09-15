import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCartItems } from '../../utils/cart';

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

    const toggleCart = () => {
        window.dispatchEvent(new Event('toggle-cart'));
    };

    return (
        <button
            onClick={toggleCart}
            className="relative p-2 text-primary-content hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors cursor-pointer"
            aria-label="Toggle Shopping Cart"
        >
            <ShoppingCart size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full transform translate-x-1/4 -translate-y-1/4">
                    {itemCount}
                </span>
            )}
        </button>
    );
}
