import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { getCart, subscribeToCart } from '../utils/cart';

export default function CartIcon() {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        const updateCount = () => {
            const cart = getCart();
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            setItemCount(count);
        };

        // Initial update
        updateCount();

        // Subscribe to changes
        const unsubscribe = subscribeToCart(updateCount);
        return unsubscribe;
    }, []);

    const openCart = () => {
        const dialog = document.getElementById('cart-modal') as HTMLDialogElement;
        if (dialog) {
            dialog.showModal();
        }
    };

    return (
        <button
            onClick={openCart}
            className="relative p-2 text-white hover:text-gray-300 transition-colors"
            aria-label="Open cart"
        >
            <ShoppingBag size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                    {itemCount}
                </span>
            )}
        </button>
    );
}
