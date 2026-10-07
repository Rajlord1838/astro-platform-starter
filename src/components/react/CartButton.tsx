import React, { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { getCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function CartButton() {
    const [itemCount, setItemCount] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const updateCount = () => {
            const cart = getCart();
            const count = cart.reduce((total: number, item: CartItem) => total + item.quantity, 0);
            setItemCount(count);
        };

        // Initial count
        updateCount();

        // Listen for custom event
        window.addEventListener('cart-updated', updateCount);

        return () => {
            window.removeEventListener('cart-updated', updateCount);
        };
    }, []);

    const handleOpenCart = () => {
        window.dispatchEvent(new CustomEvent('toggle-cart', { detail: { open: true } }));
    };

    if (!isMounted) {
        return (
            <button className="relative p-2 text-white hover:text-primary transition-colors">
                <ShoppingBag size={24} />
            </button>
        );
    }

    return (
        <button
            onClick={handleOpenCart}
            className="relative p-2 text-white hover:text-primary transition-colors group cart-button"
            aria-label="Open cart"
        >
            <ShoppingBag size={24} />
            {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-content text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform cart-badge">
                    {itemCount}
                </span>
            )}
        </button>
    );
}
