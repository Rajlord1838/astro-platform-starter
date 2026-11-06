import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart, toggleCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function HeaderCartButton() {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        // Initial load
        const updateCount = (cart: CartItem[]) => {
            const count = cart.reduce((sum, item) => sum + item.quantity, 0);
            setItemCount(count);
        };

        updateCount(getCart());

        const handleCartUpdated = (e: Event) => {
            const customEvent = e as CustomEvent<CartItem[]>;
            updateCount(customEvent.detail);
        };

        window.addEventListener('cart-updated', handleCartUpdated);
        return () => window.removeEventListener('cart-updated', handleCartUpdated);
    }, []);

    return (
        <button
            onClick={() => toggleCart()}
            className="relative p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Open cart"
        >
            <ShoppingCart size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                    {itemCount}
                </span>
            )}
        </button>
    );
}
