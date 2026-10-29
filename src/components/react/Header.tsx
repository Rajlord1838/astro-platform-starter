import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCartItemsCount, toggleCart } from '../../utils/cart';

export default function Header() {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        // Initial load
        setCartCount(getCartItemsCount());

        // Update on event
        const handleCartUpdate = () => {
            setCartCount(getCartItemsCount());
        };

        window.addEventListener('cart-updated', handleCartUpdate);
        return () => window.removeEventListener('cart-updated', handleCartUpdate);
    }, []);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-gray-900 m-0">Fashion<span className="text-primary">Store</span></h1>
                </div>

                <nav className="hidden md:flex gap-6">
                    <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">New Arrivals</a>
                    <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Men</a>
                    <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Women</a>
                    <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Accessories</a>
                </nav>

                <div className="flex items-center">
                    <button
                        onClick={() => toggleCart(true)}
                        className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors bg-transparent border-none cursor-pointer"
                        aria-label="Open cart"
                    >
                        <ShoppingCart size={24} />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}
