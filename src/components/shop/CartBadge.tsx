import React, { useEffect, useState } from 'react';
import { getCart, getCartCount, CART_EVENT } from '../../utils/cart';

export const CartBadge: React.FC = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Initialize count on client-side
        setCount(getCartCount(getCart()));

        const handleCartUpdate = () => {
            setCount(getCartCount(getCart()));
        };

        window.addEventListener(CART_EVENT, handleCartUpdate);
        return () => window.removeEventListener(CART_EVENT, handleCartUpdate);
    }, []);

    return (
        <a href="/cart" className="relative flex items-center p-2 text-white hover:text-gray-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {count > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                    {count}
                </span>
            )}
        </a>
    );
};
