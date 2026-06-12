import React, { useState, useEffect } from 'react';
import { getCartCount } from '../utils/cart';
import Cart from './Cart';

export default function Header() {
    const [cartCount, setCartCount] = useState(0);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        // Initial load
        setCartCount(getCartCount());

        // Listen for updates
        const handleCartUpdate = () => {
            setCartCount(getCartCount());
        };

        window.addEventListener('cart-updated', handleCartUpdate);
        return () => window.removeEventListener('cart-updated', handleCartUpdate);
    }, []);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <a href="/" className="text-2xl font-bold text-gray-900">FashionStore</a>
                    </div>
                    <nav className="hidden md:flex space-x-8">
                        <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">New Arrivals</a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Men</a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Women</a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Accessories</a>
                    </nav>
                    <div className="flex items-center">
                        <button
                            type="button"
                            className="p-2 text-gray-400 hover:text-gray-500 relative"
                            onClick={() => setIsCartOpen(true)}
                            aria-label="Open Cart"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </header>
    );
}
