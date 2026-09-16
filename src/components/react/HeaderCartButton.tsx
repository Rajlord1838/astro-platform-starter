import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart, toggleCart } from '../../utils/cart';

export default function HeaderCartButton() {
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
        window.addEventListener('cart-updated', updateCount);
        return () => window.removeEventListener('cart-updated', updateCount);
    }, []);

    return (
        <button
            onClick={toggleCart}
            className="relative p-2 text-slate-600 hover:text-slate-900 transition-colors"
            aria-label="Toggle Cart"
        >
            <ShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-indigo-600 rounded-full border-2 border-white -translate-y-1/4 translate-x-1/4">
                    {itemCount}
                </span>
            )}
        </button>
    );
}
