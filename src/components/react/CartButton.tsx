import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart, getCartItemCount, toggleCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function CartButton() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(getCartItemCount(getCart()));

        const handleCartUpdated = (e: CustomEvent<CartItem[]>) => {
            setCount(getCartItemCount(e.detail));
        };

        window.addEventListener('cart-updated', handleCartUpdated as EventListener);
        return () => window.removeEventListener('cart-updated', handleCartUpdated as EventListener);
    }, []);

    return (
        <button
            onClick={() => toggleCart(true)}
            className="relative p-2 text-white hover:text-primary transition-colors flex items-center gap-2 font-medium"
            aria-label="Open cart"
        >
            <ShoppingCart size={24} />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 sm:static sm:mt-0 sm:mr-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-content">
                    {count}
                </span>
            )}
        </button>
    );
}
