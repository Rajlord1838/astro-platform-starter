import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { getCart, CART_UPDATED_EVENT } from '../utils/cart';

export default function CartButton() {
    const [itemCount, setItemCount] = useState(0);

    const updateCount = () => {
        const cart = getCart();
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        setItemCount(count);
    };

    useEffect(() => {
        updateCount();
        window.addEventListener(CART_UPDATED_EVENT, updateCount);
        return () => window.removeEventListener(CART_UPDATED_EVENT, updateCount);
    }, []);

    const openCartModal = () => {
        const modal = document.getElementById('cart-modal') as HTMLDialogElement;
        if (modal) modal.showModal();
    };

    return (
        <button
            onClick={openCartModal}
            className="relative flex items-center justify-center p-2 text-white transition-colors rounded-full hover:bg-white/10"
            aria-label="Open cart"
        >
            <ShoppingBag size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                    {itemCount}
                </span>
            )}
        </button>
    );
}
