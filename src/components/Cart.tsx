import React, { useState, useEffect } from 'react';
import { getCartItemCount } from '../utils/cartUtils';

export const Cart: React.FC = () => {
    const [itemCount, setItemCount] = useState<number>(0);
    // Use an isMounted state to prevent SSR hydration mismatches
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        setItemCount(getCartItemCount());

        const handleCartUpdated = () => {
            setItemCount(getCartItemCount());
        };

        window.addEventListener('cart-updated', handleCartUpdated);

        return () => {
            window.removeEventListener('cart-updated', handleCartUpdated);
        };
    }, []);

    if (!isMounted) {
        return (
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded shadow">
                <span>Cart (0)</span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded shadow">
            <span>Cart ({itemCount})</span>
        </div>
    );
};
