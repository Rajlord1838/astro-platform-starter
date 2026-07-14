import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { getCart, subscribeToCartChanges } from '../utils/cart';

export const CartIcon: React.FC = () => {
    const [itemCount, setItemCount] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const updateCount = () => {
            const cart = getCart();
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            setItemCount(count);
        };

        // Initial load
        updateCount();

        // Subscribe to changes
        const unsubscribe = subscribeToCartChanges(updateCount);

        return () => unsubscribe();
    }, []);

    const openCart = () => {
        const dialog = document.getElementById('cart-modal') as HTMLDialogElement;
        if (dialog) {
            dialog.showModal();
        }
    };

    if (!isMounted) {
        return (
            <button className="relative p-2 text-gray-300 hover:text-white transition-colors">
                <ShoppingBag size={24} />
            </button>
        );
    }

    return (
        <button
            onClick={openCart}
            className="relative p-2 text-gray-300 hover:text-white transition-colors"
            aria-label={`Shopping cart with ${itemCount} items`}
        >
            <ShoppingBag size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full transform translate-x-1 -translate-y-1">
                    {itemCount}
                </span>
            )}
        </button>
    );
};
