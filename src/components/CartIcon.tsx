import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../utils/cartStore';

export default function CartIcon() {
    const cart = useCart();
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

    const openCart = () => {
        const dialog = document.getElementById('cart-modal') as HTMLDialogElement;
        if (dialog) {
            dialog.showModal();
        }
    };

    return (
        <button
            onClick={openCart}
            className="relative p-2 text-gray-800 transition-colors hover:text-primary cursor-pointer"
            aria-label="Open cart"
        >
            <ShoppingBag size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
                    {itemCount}
                </span>
            )}
        </button>
    );
}
