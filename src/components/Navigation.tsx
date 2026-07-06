import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import type { CartItem } from '../types';
import { Cart } from './Cart';

export const Navigation: React.FC = () => {
    const [cartCount, setCartCount] = useState(0);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const updateCartCount = () => {
        const cartStr = window.localStorage.getItem('fashion_store_cart');
        if (cartStr) {
            try {
                const cart: CartItem[] = JSON.parse(cartStr);
                const count = cart.reduce((total, item) => total + item.quantity, 0);
                setCartCount(count);
            } catch (e) {
                console.error(e);
            }
        } else {
            setCartCount(0);
        }
    };

    useEffect(() => {
        updateCartCount();
        window.addEventListener('cart-updated', updateCartCount);
        return () => window.removeEventListener('cart-updated', updateCartCount);
    }, []);

    return (
        <>
            <header className="bg-white shadow-sm sticky top-0 z-40">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <a href="/" className="text-2xl font-bold text-gray-900 tracking-tight">Fashion Store</a>
                    <button
                        className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                        onClick={() => setIsCartOpen(true)}
                    >
                        <ShoppingCart size={24} className="text-gray-700" />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 bg-black text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-bold">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </header>
            <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
};
