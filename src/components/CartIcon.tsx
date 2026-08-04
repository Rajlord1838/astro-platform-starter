import React, { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { getCartCount, subscribeToCart } from '../utils/cart';

export const CartIcon: React.FC = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Initial load
        setCount(getCartCount());

        // Subscribe to changes
        const unsubscribe = subscribeToCart(() => {
            setCount(getCartCount());
        });

        return unsubscribe;
    }, []);

    return (
        <div className="relative cursor-pointer text-white flex items-center"
             onClick={() => document.getElementById('cart-modal')?.showModal()}
             aria-label="Open Cart"
             role="button">
            <ShoppingBag size={24} />
            {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-content text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {count}
                </span>
            )}
        </div>
    );
};
