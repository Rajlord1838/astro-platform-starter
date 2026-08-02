import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart, getCartItemCount } from '../utils/cart';
import { Cart } from './Cart';

export const HeaderCartButton: React.FC = () => {
    const [itemCount, setItemCount] = useState(0);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        // Load initial count
        setItemCount(getCartItemCount(getCart()));

        // Listen for updates
        const handleCartUpdate = () => {
            setItemCount(getCartItemCount(getCart()));
        };

        window.addEventListener('cart-updated', handleCartUpdate);
        return () => window.removeEventListener('cart-updated', handleCartUpdate);
    }, []);

    return (
        <>
            <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center"
                aria-label="Open cart"
            >
                <ShoppingCart className="w-6 h-6" />
                {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                        {itemCount}
                    </span>
                )}
            </button>
            <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
};
