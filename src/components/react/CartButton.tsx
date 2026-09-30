import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart, toggleCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function CartButton() {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const updateCount = (cart: CartItem[]) => {
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            setCartCount(count);
        };

        // Initial load
        updateCount(getCart());

        const handleCartUpdate = (e: CustomEvent<CartItem[]>) => {
            updateCount(e.detail);
        };

        window.addEventListener('cart-updated', handleCartUpdate as EventListener);
        return () => {
            window.removeEventListener('cart-updated', handleCartUpdate as EventListener);
        };
    }, []);

    return (
        <button
            onClick={toggleCart}
            className="relative p-2 text-gray-700 hover:text-black transition-colors"
            aria-label="Toggle Shopping Cart"
        >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {cartCount}
                </span>
            )}
        </button>
    );
}
