import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart } from '../../utils/cart';

export const HeaderCart: React.FC = () => {
    const [itemCount, setItemCount] = useState(0);

    const updateCartCount = () => {
        const cart = getCart();
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        setItemCount(count);
    };

    useEffect(() => {
        updateCartCount();
        window.addEventListener('cart-updated', updateCartCount);
        return () => window.removeEventListener('cart-updated', updateCartCount);
    }, []);

    const toggleCart = () => {
        window.dispatchEvent(new Event('toggle-cart'));
    };

    return (
        <button
            onClick={toggleCart}
            className="relative p-2 text-gray-900 hover:text-gray-600 transition-colors"
            aria-label="Toggle Cart"
        >
            <ShoppingCart size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-black rounded-full -translate-y-1/4 translate-x-1/4">
                    {itemCount}
                </span>
            )}
        </button>
    );
};
