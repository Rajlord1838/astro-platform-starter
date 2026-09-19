import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function CartBadge() {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        // Initialize from local storage on mount
        const updateCount = () => {
            const cart = getCart();
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            setItemCount(count);
        };

        updateCount();

        // Listen for custom 'cart-updated' events
        const handleCartUpdated = (e: Event) => {
            const customEvent = e as CustomEvent<CartItem[]>;
            const cart = customEvent.detail;
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            setItemCount(count);
        };

        window.addEventListener('cart-updated', handleCartUpdated);
        return () => window.removeEventListener('cart-updated', handleCartUpdated);
    }, []);

    const toggleCart = () => {
        window.dispatchEvent(new CustomEvent('toggle-cart'));
    };

    return (
        <button
            onClick={toggleCart}
            className="relative p-2 text-white hover:text-primary transition-colors cursor-pointer cart-button focus:outline-none"
            aria-label="Toggle Cart"
        >
            <ShoppingCart size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-primary-content bg-primary rounded-full transform translate-x-1/4 -translate-y-1/4">
                    {itemCount}
                </span>
            )}
        </button>
    );
}
