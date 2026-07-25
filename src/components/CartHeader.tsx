import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart } from '../utils/cart';

export const CartHeader: React.FC = () => {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        const updateCount = () => {
            const cart = getCart();
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            setItemCount(count);
        };

        updateCount();

        window.addEventListener('cart-updated', updateCount);
        return () => window.removeEventListener('cart-updated', updateCount);
    }, []);

    const handleOpenCart = () => {
        const dialog = document.getElementById('cart-dialog') as HTMLDialogElement;
        if (dialog) {
            dialog.showModal();
        }
    };

    return (
        <button
            onClick={handleOpenCart}
            className="relative p-2 text-white hover:text-blue-200 transition-colors"
            aria-label="Open cart"
        >
            <ShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/4 -translate-y-1/4">
                    {itemCount}
                </span>
            )}
        </button>
    );
};
