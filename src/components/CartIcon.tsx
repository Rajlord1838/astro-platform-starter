import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import type { CartItem } from '../types';

export default function CartIcon() {
    const [itemCount, setItemCount] = useState(0);

    const updateCartCount = () => {
        const cartString = localStorage.getItem('fashion_store_cart');
        if (cartString) {
            const cart: CartItem[] = JSON.parse(cartString);
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            setItemCount(count);
        } else {
            setItemCount(0);
        }
    };

    useEffect(() => {
        updateCartCount();
        window.addEventListener('cart-updated', updateCartCount);
        return () => window.removeEventListener('cart-updated', updateCartCount);
    }, []);

    return (
        <a href="/cart" className="relative p-2 text-gray-900 hover:text-gray-600 transition-colors">
            <ShoppingCart size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                    {itemCount}
                </span>
            )}
        </a>
    );
}
