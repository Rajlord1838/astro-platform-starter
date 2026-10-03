import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart, getCartCount, toggleCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function CartButton() {
    const [cartCount, setCartCount] = useState(0);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
        const updateCount = () => {
            const currentCart = getCart();
            setCartCount(getCartCount(currentCart));
        };

        updateCount();
        window.addEventListener('cart-updated', updateCount);

        return () => {
            window.removeEventListener('cart-updated', updateCount);
        };
    }, []);

    if (!isHydrated) {
        return (
            <button className="relative p-2 text-primary-content hover:text-primary transition-colors">
                <ShoppingCart size={24} />
            </button>
        );
    }

    return (
        <button
            onClick={toggleCart}
            className="relative p-2 text-primary-content hover:text-primary transition-colors"
            aria-label={`Cart with ${cartCount} items`}
        >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
                    {cartCount}
                </span>
            )}
        </button>
    );
}
