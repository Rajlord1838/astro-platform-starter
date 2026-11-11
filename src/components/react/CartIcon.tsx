import React, { useState, useEffect } from 'react';
import { getCartCount, toggleCart } from '../../utils/cart';
import { ShoppingBag } from 'lucide-react';

export default function CartIcon() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const updateCount = () => {
            setCount(getCartCount());
        };

        // Initial count
        updateCount();

        // Listen for cart updates
        window.addEventListener('cart-updated', updateCount);

        return () => {
            window.removeEventListener('cart-updated', updateCount);
        };
    }, []);

    return (
        <button
            onClick={() => toggleCart()}
            className="relative flex items-center justify-center p-2 text-white transition-colors rounded-full hover:bg-white/10"
            aria-label="Toggle cart"
        >
            <ShoppingBag size={24} />
            {count > 0 && (
                <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded-full -top-1 -right-1 bg-primary">
                    {count}
                </span>
            )}
        </button>
    );
}
