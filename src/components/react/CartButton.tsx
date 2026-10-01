import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart, getCartCount, toggleCartModal } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function CartButton() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Initialize count on client mount
        setCount(getCartCount(getCart()));

        const handleCartUpdated = (e: Event) => {
            const customEvent = e as CustomEvent<CartItem[]>;
            setCount(getCartCount(customEvent.detail));
        };

        window.addEventListener('cart-updated', handleCartUpdated);
        return () => window.removeEventListener('cart-updated', handleCartUpdated);
    }, []);

    return (
        <button
            onClick={toggleCartModal}
            className="relative p-2 text-gray-700 hover:text-black transition-colors"
            aria-label="Open cart"
        >
            <ShoppingCart size={24} />
            {count > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                    {count}
                </span>
            )}
        </button>
    );
}
