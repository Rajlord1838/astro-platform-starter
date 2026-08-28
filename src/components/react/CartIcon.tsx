import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCartCount, CART_UPDATED_EVENT } from '../../utils/cart';

interface CartIconProps {
    onClick: () => void;
}

export const CartIcon: React.FC<CartIconProps> = ({ onClick }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Initial load
        setCount(getCartCount());

        // Listen for updates
        const handleCartUpdate = () => {
            setCount(getCartCount());
        };

        window.addEventListener(CART_UPDATED_EVENT, handleCartUpdate);
        return () => window.removeEventListener(CART_UPDATED_EVENT, handleCartUpdate);
    }, []);

    return (
        <button
            onClick={onClick}
            className="relative p-2 text-white hover:text-primary transition-colors cursor-pointer"
            aria-label="Open Cart"
        >
            <ShoppingCart size={24} />
            {count > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
                    {count}
                </span>
            )}
        </button>
    );
};
