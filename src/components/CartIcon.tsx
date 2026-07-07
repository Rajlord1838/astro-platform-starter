import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import type { CartItem } from '../types';

export default function CartIcon() {
    const [itemCount, setItemCount] = useState(0);

    const updateCount = () => {
        try {
            const storedCart = localStorage.getItem('fashion_store_cart');
            if (storedCart) {
                const cart: CartItem[] = JSON.parse(storedCart);
                const count = cart.reduce((total, item) => total + item.quantity, 0);
                setItemCount(count);
            } else {
                setItemCount(0);
            }
        } catch (e) {
            console.error('Failed to parse cart', e);
        }
    };

    useEffect(() => {
        updateCount();

        const handleCartUpdate = () => {
            updateCount();
        };

        window.addEventListener('cart-updated', handleCartUpdate);
        return () => window.removeEventListener('cart-updated', handleCartUpdate);
    }, []);

    return (
        <button
            className="relative p-2 text-white transition hover:text-primary"
            onClick={() => {
                const modal = document.getElementById('cart-modal') as HTMLDialogElement | null;
                if (modal) {
                    modal.showModal();
                }
            }}
            aria-label="Open Cart"
        >
            <ShoppingCart size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full">
                    {itemCount}
                </span>
            )}
        </button>
    );
}
