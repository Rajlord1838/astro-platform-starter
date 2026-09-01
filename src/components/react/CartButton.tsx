import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart } from '../../utils/cart';

export const CartButton = () => {
    const [itemCount, setItemCount] = useState(0);

    const updateCount = () => {
        const cart = getCart();
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        setItemCount(count);
    };

    useEffect(() => {
        updateCount();

        const handleCartUpdate = () => {
            updateCount();
        };

        window.addEventListener('cart-updated', handleCartUpdate);

        return () => {
            window.removeEventListener('cart-updated', handleCartUpdate);
        };
    }, []);

    const toggleCart = () => {
        window.dispatchEvent(new CustomEvent('toggle-cart'));
    };

    return (
        <button
            onClick={toggleCart}
            className="relative p-2 text-gray-700 hover:text-primary transition-colors cursor-pointer"
            aria-label="Shopping Cart"
        >
            <ShoppingCart size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full">
                    {itemCount}
                </span>
            )}
        </button>
    );
};
