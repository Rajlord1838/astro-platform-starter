import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCartItems, toggleCart } from '../../utils/cart';

export default function Header() {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const updateCount = () => {
            const items = getCartItems();
            const count = items.reduce((total, item) => total + item.quantity, 0);
            setCartCount(count);
        };

        // Initial count
        updateCount();

        // Listen for changes
        window.addEventListener('cart-updated', updateCount);
        return () => window.removeEventListener('cart-updated', updateCount);
    }, []);

    return (
        <header className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-white/10 bg-complementary/90">
            <div className="max-w-5xl mx-auto">
                <div className="py-4 border-b border-white/10 lg:px-8 lg:border-0 mx-4 lg:mx-0">
                    <div className="relative flex items-center justify-between">
                        <a href="/" className="text-xl font-bold flex items-center gap-2">
                            <span>FashionStore</span>
                        </a>
                        <div className="flex items-center">
                            <button
                                onClick={() => toggleCart(true)}
                                className="relative p-2 text-white hover:text-gray-300 transition-colors"
                                aria-label="Open cart"
                            >
                                <ShoppingCart className="w-6 h-6" />
                                {cartCount > 0 && (
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-complementary">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
