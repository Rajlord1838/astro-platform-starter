import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart } from '../../utils/cart';
import type { CartItem } from '../../utils/cart';

export default function CartBadge() {
    const [cartCount, setCartCount] = useState(0);

    const updateCount = () => {
        const cart = getCart();
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        setCartCount(count);
    };

    useEffect(() => {
        updateCount();

        const handleCartUpdated = () => {
            updateCount();
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
            className="relative p-2 text-white hover:text-primary transition-colors cursor-pointer"
            aria-label="Shopping Cart"
        >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full">
                    {cartCount}
                </span>
            )}
        </button>
    );
}
