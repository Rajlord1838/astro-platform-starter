import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart, getCartCount } from '../utils/cartStore';
import { CartModal } from './CartModal';

export const CartIcon: React.FC = () => {
    const [count, setCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const updateCount = () => {
            setCount(getCartCount(getCart()));
        };

        updateCount();
        window.addEventListener('cart-updated', updateCount);
        return () => window.removeEventListener('cart-updated', updateCount);
    }, []);

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="relative p-2 text-white hover:text-primary transition-colors flex items-center gap-2"
                aria-label="Open cart"
            >
                <ShoppingCart size={24} />
                {count > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-content">
                        {count}
                    </span>
                )}
            </button>

            <CartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};
