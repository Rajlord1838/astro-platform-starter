import React, { useEffect, useState } from 'react';
import { getCart } from '../utils/cart';
import { ShoppingCart } from 'lucide-react';

export const CartIcon: React.FC = () => {
    const [itemCount, setItemCount] = useState(0);

    const updateCount = () => {
        const cart = getCart();
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        setItemCount(count);
    };

    useEffect(() => {
        updateCount();
        window.addEventListener('cart-updated', updateCount);
        return () => window.removeEventListener('cart-updated', updateCount);
    }, []);

    return (
        <a href="/cart" className="relative inline-flex items-center p-2 text-white hover:text-primary transition-colors" aria-label="Shopping Cart">
            <ShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
                    {itemCount}
                </span>
            )}
        </a>
    );
};
