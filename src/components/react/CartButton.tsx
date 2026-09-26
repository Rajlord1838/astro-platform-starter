import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart } from '../../utils/cart';

export const CartButton: React.FC = () => {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        const updateCount = () => {
            const cart = getCart();
            const count = cart.reduce((sum, item) => sum + item.quantity, 0);
            setItemCount(count);
        };

        updateCount();
        window.addEventListener('cart-updated', updateCount);
        return () => window.removeEventListener('cart-updated', updateCount);
    }, []);

    const toggleCart = () => {
        window.dispatchEvent(new CustomEvent('toggle-cart'));
    };

    return (
        <button onClick={toggleCart} className="relative p-2 text-white hover:text-primary transition-colors cursor-pointer">
            <ShoppingCart size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {itemCount}
                </span>
            )}
        </button>
    );
};
