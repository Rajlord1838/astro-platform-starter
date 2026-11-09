import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart, toggleCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function CartButton() {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const updateCount = () => {
            const cart = getCart();
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            setCartCount(count);
        };

        updateCount();

        window.addEventListener('cart-updated', updateCount);
        return () => window.removeEventListener('cart-updated', updateCount);
    }, []);

    return (
        <button
            onClick={() => toggleCart()}
            className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Open cart"
        >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                </span>
            )}
        </button>
    );
}
