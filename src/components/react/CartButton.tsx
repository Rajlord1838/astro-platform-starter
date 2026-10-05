import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCartCount, toggleCartModal } from '../../utils/cart';

export default function CartButton() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(getCartCount());

        const handleCartUpdated = () => {
            setCount(getCartCount());
        };

        window.addEventListener('cart-updated', handleCartUpdated as EventListener);
        return () => window.removeEventListener('cart-updated', handleCartUpdated as EventListener);
    }, []);

    return (
        <button
            onClick={toggleCartModal}
            className="relative p-2 text-white hover:text-primary transition-colors focus:outline-none"
            aria-label="Open cart"
        >
            <ShoppingCart className="w-6 h-6" />
            {count > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white bg-primary rounded-full transform translate-x-1/4 -translate-y-1/4">
                    {count}
                </span>
            )}
        </button>
    );
}
