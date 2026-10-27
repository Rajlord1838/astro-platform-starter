import React, { useState, useEffect } from 'react';
import type { CartItem } from '../../types';
import { getCart, toggleCart } from '../../utils/cart';
import { ShoppingCart } from 'lucide-react';

export default function Header() {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        // Initial load
        const cart = getCart();
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        setItemCount(count);

        // Listen for updates
        const handleCartUpdate = (e: Event) => {
            const customEvent = e as CustomEvent<CartItem[]>;
            const newCount = customEvent.detail.reduce((sum, item) => sum + item.quantity, 0);
            setItemCount(newCount);
        };

        window.addEventListener('cart-updated', handleCartUpdate);
        return () => window.removeEventListener('cart-updated', handleCartUpdate);
    }, []);

    return (
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <a href="/" className="text-xl font-bold text-gray-900 tracking-tight">
                            LUMIÈRE
                        </a>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">New Arrivals</a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Women</a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Men</a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Accessories</a>
                    </nav>

                    {/* Cart Button */}
                    <div className="flex items-center">
                        <button
                            onClick={() => toggleCart()}
                            className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-full"
                            aria-label="Shopping cart"
                        >
                            <ShoppingCart size={24} />
                            {itemCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-indigo-600 rounded-full">
                                    {itemCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
