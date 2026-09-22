import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { getCart, toggleCart } from '../../utils/cart';

export default function CartButton() {
    const [itemCount, setItemCount] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const updateCount = () => {
            const cart = getCart();
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            setItemCount(count);
        };

        updateCount();
        window.addEventListener('cart-updated', updateCount);

        return () => {
            window.removeEventListener('cart-updated', updateCount);
        };
    }, []);

    if (!isMounted) {
        return (
            <button className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <ShoppingBag className="w-6 h-6" />
            </button>
        );
    }

    return (
        <button
            onClick={toggleCart}
            className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
            aria-label="Toggle cart"
        >
            <ShoppingBag className="w-6 h-6" />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                    {itemCount}
                </span>
            )}
        </button>
    );
}
