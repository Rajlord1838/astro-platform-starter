import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart, CART_UPDATED_EVENT } from '../../utils/cart';

export const CartIcon: React.FC = () => {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        const updateCount = () => {
            const cart = getCart();
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            setItemCount(count);
        };

        // Initial load
        updateCount();

        // Listen for updates
        window.addEventListener(CART_UPDATED_EVENT, updateCount);

        return () => {
            window.removeEventListener(CART_UPDATED_EVENT, updateCount);
        };
    }, []);

    const handleClick = () => {
        window.dispatchEvent(new Event('open-cart-modal'));
    };

    return (
        <button
            onClick={handleClick}
            className="relative p-2 text-white hover:text-primary transition-colors cursor-pointer"
            aria-label="Open Cart"
        >
            <ShoppingCart size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-primary-content bg-primary rounded-full">
                    {itemCount}
                </span>
            )}
        </button>
    );
};
