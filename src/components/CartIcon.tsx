import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { getCart } from '../utils/cart';

export default function CartIcon() {
    const [itemCount, setItemCount] = useState(0);

    const updateCount = () => {
        const cart = getCart();
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        setItemCount(count);
    };

    useEffect(() => {
        updateCount();
        window.addEventListener('cart-updated', updateCount);
        return () => window.removeEventListener('cart-updated', updateCount);
    }, []);

    const openModal = () => {
        window.dispatchEvent(new Event('open-cart-modal'));
    };

    return (
        <button
            onClick={openModal}
            className="relative p-2 text-gray-600 transition-colors hover:text-gray-900 focus:outline-none"
            aria-label="Open cart"
        >
            <ShoppingBag className="w-6 h-6" />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-600 rounded-full">
                    {itemCount}
                </span>
            )}
        </button>
    );
}
