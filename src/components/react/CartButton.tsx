import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCartItems, toggleCart } from '../../utils/cart';

export function CartButton() {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        // Initial load
        const updateCount = () => {
            const items = getCartItems();
            const count = items.reduce((sum, item) => sum + item.quantity, 0);
            setItemCount(count);
        };

        updateCount();

        // Listen for updates
        window.addEventListener('cart-updated', updateCount);

        return () => {
            window.removeEventListener('cart-updated', updateCount);
        };
    }, []);

    return (
        <button
            onClick={() => toggleCart()}
            className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full transition-colors flex items-center gap-2"
            aria-label="Open shopping cart"
        >
            <ShoppingCart />
            {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-teal-500 text-slate-900 text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-slate-900">
                    {itemCount > 99 ? '99+' : itemCount}
                </span>
            )}
        </button>
    );
}
