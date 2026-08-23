import React, { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { getCart } from '../../utils/cart';

export default function CartBadge() {
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

    const openCartModal = () => {
        const modal = document.getElementById('cart-modal') as HTMLDialogElement | null;
        if (modal) {
            modal.showModal();
        }
    };

    return (
        <button
            onClick={openCartModal}
            className="relative p-2 text-white hover:text-primary transition-colors cursor-pointer"
            aria-label="Open cart"
        >
            <ShoppingBag size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full border-2 border-complementary">
                    {itemCount}
                </span>
            )}
        </button>
    );
}
