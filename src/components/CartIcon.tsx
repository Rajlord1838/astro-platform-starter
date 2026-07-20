import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart } from '../utils/cart';

interface CartIconProps {
    onClick: () => void;
}

export const CartIcon: React.FC<CartIconProps> = ({ onClick }) => {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        const updateCount = () => {
            const cart = getCart();
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            setItemCount(count);
        };

        // Initial count
        updateCount();

        // Listen for updates
        window.addEventListener('cart-updated', updateCount);
        return () => window.removeEventListener('cart-updated', updateCount);
    }, []);

    return (
        <button onClick={onClick} className="relative p-2 text-white hover:text-primary transition-colors cursor-pointer flex items-center justify-center">
            <ShoppingCart size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {itemCount}
                </span>
            )}
        </button>
    );
};
