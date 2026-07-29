import React, { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { getCart, CART_UPDATED_EVENT } from '../utils/cart';

export default function CartIcon() {
    const [itemCount, setItemCount] = useState(0);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        const updateCount = () => {
            const cart = getCart();
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            setItemCount(count);
        };

        // Initial load
        updateCount();

        // Listen for updates
        window.addEventListener(CART_UPDATED_EVENT, updateCount);
        return () => window.removeEventListener(CART_UPDATED_EVENT, updateCount);
    }, []);

    // Don't render count during SSR to avoid hydration mismatch
    return (
        <div className="relative inline-flex items-center text-white cursor-pointer" onClick={() => {
            const dialog = document.getElementById('cart-modal') as HTMLDialogElement;
            if (dialog) dialog.showModal();
        }}>
            <ShoppingBag size={24} />
            {isClient && itemCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-content">
                    {itemCount}
                </span>
            )}
        </div>
    );
}
