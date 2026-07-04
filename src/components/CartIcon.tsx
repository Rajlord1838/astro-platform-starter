import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart, subscribeToCartChanges } from '../utils/cartUtils';

export default function CartIcon() {
    const [itemCount, setItemCount] = useState(0);

    const updateCount = () => {
        const cart = getCart();
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        setItemCount(count);
    };

    useEffect(() => {
        updateCount();
        const unsubscribe = subscribeToCartChanges(updateCount);
        return unsubscribe;
    }, []);

    return (
        <a href="/cart" className="relative inline-flex items-center p-2 text-white hover:text-gray-300">
            <ShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {itemCount}
                </span>
            )}
        </a>
    );
}
