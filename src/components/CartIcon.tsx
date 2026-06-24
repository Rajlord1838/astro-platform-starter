import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import type { CartItem } from '../types';

export const CartIcon: React.FC = () => {
    const [itemCount, setItemCount] = useState(0);

    const updateCartCount = () => {
        try {
            const cartData = localStorage.getItem('fashion_store_cart');
            if (cartData) {
                const cart: CartItem[] = JSON.parse(cartData);
                const count = cart.reduce((total, item) => total + item.quantity, 0);
                setItemCount(count);
            } else {
                setItemCount(0);
            }
        } catch (error) {
            console.error("Failed to parse cart data", error);
        }
    };

    useEffect(() => {
        // Initial load
        updateCartCount();

        // Listen for updates
        window.addEventListener('cart-updated', updateCartCount);

        return () => {
            window.removeEventListener('cart-updated', updateCartCount);
        };
    }, []);

    return (
        <div className="relative inline-flex items-center p-2 cursor-pointer text-white hover:text-primary transition-colors">
            <ShoppingCart size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
                    {itemCount}
                </span>
            )}
        </div>
    );
};
