import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCartTotalItems } from '../utils/cart';

export default function CartIcon() {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        // Initialize count on client mount
        setItemCount(getCartTotalItems());

        const handleCartUpdate = () => {
            setItemCount(getCartTotalItems());
        };

        window.addEventListener('cart-updated', handleCartUpdate);
        return () => window.removeEventListener('cart-updated', handleCartUpdate);
    }, []);

    const openCartModal = () => {
        const dialog = document.getElementById('cart-modal') as HTMLDialogElement;
        if (dialog) {
            dialog.showModal();
        }
    };

    return (
        <button
            onClick={openCartModal}
            className="relative flex items-center p-2 text-white transition-colors hover:text-primary focus:outline-none"
            aria-label="Open cart"
        >
            <ShoppingCart size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded-full bg-primary">
                    {itemCount}
                </span>
            )}
        </button>
    );
}
