import React, { useState, useEffect } from 'react';
import { getCart, getCartItemCount, CART_UPDATED_EVENT } from '../utils/cart';

export const CartIcon: React.FC = () => {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        // Initialize count on mount (client-side only to avoid hydration mismatch)
        setItemCount(getCartItemCount(getCart()));

        const handleCartUpdate = () => {
            setItemCount(getCartItemCount(getCart()));
        };

        window.addEventListener(CART_UPDATED_EVENT, handleCartUpdate);
        return () => window.removeEventListener(CART_UPDATED_EVENT, handleCartUpdate);
    }, []);

    const openCart = () => {
        // Open the native HTML dialog
        const dialog = document.getElementById('cart-dialog') as HTMLDialogElement | null;
        if (dialog) {
            dialog.showModal();
        }
    };

    return (
        <button onClick={openCart} className="relative p-2 text-white hover:text-primary transition-colors cursor-pointer" aria-label="Open cart">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
            </svg>
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                    {itemCount}
                </span>
            )}
        </button>
    );
};
