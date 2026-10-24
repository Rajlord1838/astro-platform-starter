import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import type { CartItem } from '../../types';
import { getCartItems, toggleCart } from '../../utils/cart';

export default function HeaderCartButton() {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        const updateCount = (items: CartItem[]) => {
            const count = items.reduce((sum, item) => sum + item.quantity, 0);
            setItemCount(count);
        };

        updateCount(getCartItems());

        const handleCartUpdate = (e: Event) => {
            const customEvent = e as CustomEvent<CartItem[]>;
            updateCount(customEvent.detail);
        };

        window.addEventListener('cart-updated', handleCartUpdate);

        return () => {
            window.removeEventListener('cart-updated', handleCartUpdate);
        };
    }, []);

    return (
        <button
            onClick={() => toggleCart(true)}
            className="relative p-2 text-gray-300 hover:text-white transition-colors"
            aria-label="Open cart"
        >
            <ShoppingCart size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                    {itemCount}
                </span>
            )}
        </button>
    );
}
