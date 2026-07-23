import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart } from '../utils/cart';
import { CartModal } from './CartModal';

export function CartIcon() {
    const [itemCount, setItemCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const updateCount = () => {
            const cart = getCart();
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            setItemCount(count);
        };

        // Initial count
        updateCount();

        // Listen for updates
        window.addEventListener('cart-updated', updateCount);

        return () => {
            window.removeEventListener('cart-updated', updateCount);
        };
    }, []);

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="relative p-2 text-white hover:text-primary transition-colors cursor-pointer"
                aria-label="Shopping Cart"
            >
                <ShoppingCart size={24} />
                {itemCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-primary-content bg-primary rounded-full transform translate-x-1/4 -translate-y-1/4">
                        {itemCount}
                    </span>
                )}
            </button>
            <CartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
