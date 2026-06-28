import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart } from '../utils/cart';

export default function CartIcon() {
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
        <a href="/cart" className="relative p-2 text-gray-700 hover:text-black transition-colors flex items-center">
            <ShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                    {itemCount}
                </span>
            )}
        </a>
    );
}
