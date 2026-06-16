import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { getCart, subscribeToCart } from '../../utils/cart';

export const CartIcon: React.FC = () => {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        // Initialize count on client mount
        const initialCart = getCart();
        setItemCount(initialCart.reduce((total, item) => total + item.quantity, 0));

        // Subscribe to future updates
        const unsubscribe = subscribeToCart((cart) => {
            setItemCount(cart.reduce((total, item) => total + item.quantity, 0));
        });

        return unsubscribe;
    }, []);

    const openCartModal = () => {
        const modal = document.getElementById('cart-modal') as HTMLDialogElement;
        if (modal) {
            modal.showModal();
        }
    };

    return (
        <button
            onClick={openCartModal}
            className="relative p-2 text-white hover:text-gray-200 transition-colors"
            aria-label="Open Cart"
        >
            <ShoppingBag size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                    {itemCount}
                </span>
            )}
        </button>
    );
};