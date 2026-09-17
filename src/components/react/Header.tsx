import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart, CART_UPDATED_EVENT, toggleCart } from '../../utils/cart';

export default function Header() {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        const updateCount = () => {
            const items = getCart();
            const count = items.reduce((total, item) => total + item.quantity, 0);
            setItemCount(count);
        };

        updateCount();
        window.addEventListener(CART_UPDATED_EVENT, updateCount);

        return () => {
            window.removeEventListener(CART_UPDATED_EVENT, updateCount);
        };
    }, []);

    return (
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <a href="/" className="text-2xl font-bold text-primary">
                            FashionStore
                        </a>
                    </div>

                    <nav className="hidden md:flex space-x-8">
                        <a href="#" className="text-gray-900 hover:text-primary px-3 py-2 font-medium">New Arrivals</a>
                        <a href="#" className="text-gray-900 hover:text-primary px-3 py-2 font-medium">Women</a>
                        <a href="#" className="text-gray-900 hover:text-primary px-3 py-2 font-medium">Men</a>
                        <a href="#" className="text-gray-900 hover:text-primary px-3 py-2 font-medium">Accessories</a>
                    </nav>

                    <div className="flex items-center">
                        <button
                            onClick={toggleCart}
                            className="relative p-2 text-gray-900 hover:text-primary transition-colors cursor-pointer"
                            aria-label="Open cart"
                        >
                            <ShoppingCart size={24} />
                            {itemCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
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
