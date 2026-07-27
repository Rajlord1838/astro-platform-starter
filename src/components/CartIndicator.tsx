import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart, getCartCount, subscribeToCart } from '../utils/cart';

export const CartIndicator = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const updateCount = () => {
            setCount(getCartCount(getCart()));
        };

        updateCount();
        const unsubscribe = subscribeToCart(updateCount);
        return () => unsubscribe();
    }, []);

    return (
        <div className="relative inline-flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-white" />
            {count > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    {count}
                </span>
            )}
        </div>
    );
};
