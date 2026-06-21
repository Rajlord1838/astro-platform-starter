import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import type { CartItem } from '../types';

export default function CartIcon() {
    const [itemCount, setItemCount] = useState(0);

    const updateCartCount = () => {
        const cartStr = localStorage.getItem('fashion_store_cart');
        const cart: CartItem[] = cartStr ? JSON.parse(cartStr) : [];
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        setItemCount(count);
    };

    useEffect(() => {
        updateCartCount();
        window.addEventListener('cart-updated', updateCartCount);
        return () => window.removeEventListener('cart-updated', updateCartCount);
    }, []);

    const toggleCart = () => {
        const dialog = document.getElementById('cart-modal') as HTMLDialogElement;
        if (dialog) {
            if (dialog.open) {
                dialog.close();
            } else {
                dialog.showModal();
            }
        }
    };

    return (
        <button
            onClick={toggleCart}
            className="relative p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer flex items-center"
            aria-label="Toggle Shopping Cart"
        >
            <ShoppingCart size={24} />
            {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                </span>
            )}
        </button>
    );
}
