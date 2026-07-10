import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { getCart } from '../utils/cart';

export default function CartIcon() {
    const [itemCount, setItemCount] = useState(0);

    const updateItemCount = () => {
        const cart = getCart();
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        setItemCount(count);
    };

    useEffect(() => {
        updateItemCount();
        window.addEventListener('cart-updated', updateItemCount);
        return () => window.removeEventListener('cart-updated', updateItemCount);
    }, []);

    const openCart = () => {
        const modal = document.getElementById('cart-modal') as HTMLDialogElement;
        if (modal) {
            modal.showModal();
        }
    };

    return (
        <button
            onClick={openCart}
            className="relative p-2 text-gray-900 hover:text-gray-600 transition-colors"
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
