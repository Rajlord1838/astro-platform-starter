import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { getCart, toggleCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function CartIcon() {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        const updateCount = (items: CartItem[]) => {
            const count = items.reduce((sum, item) => sum + item.quantity, 0);
            setItemCount(count);
        };

        // Initial load
        updateCount(getCart());

        // Listen for updates
        const handleCartUpdate = (e: CustomEvent<CartItem[]>) => {
            updateCount(e.detail);
        };

        window.addEventListener('cart-updated', handleCartUpdate as EventListener);
        return () => window.removeEventListener('cart-updated', handleCartUpdate as EventListener);
    }, []);

    return (
        <button
            onClick={() => toggleCart(true)}
            className="relative p-2 text-white hover:text-primary transition cursor-pointer"
            aria-label="Open cart"
        >
            <ShoppingBag size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-primary-content text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full transform translate-x-1 -translate-y-1">
                    {itemCount}
                </span>
            )}
        </button>
    );
}
