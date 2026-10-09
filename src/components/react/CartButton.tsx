import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart } from '../../utils/cart';

export default function CartButton() {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        const updateCount = () => {
            const cart = getCart();
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            setItemCount(count);
        };

        updateCount();
        window.addEventListener('cart-updated', updateCount);

        return () => window.removeEventListener('cart-updated', updateCount);
    }, []);

    const handleClick = () => {
        window.dispatchEvent(new Event('toggle-cart'));
    };

    return (
        <button
            onClick={handleClick}
            className="relative p-2 rounded-full hover:bg-gray-800 transition-colors"
            aria-label="Shopping Cart"
        >
            <ShoppingCart className="text-white" size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                    {itemCount}
                </span>
            )}
        </button>
    );
}
