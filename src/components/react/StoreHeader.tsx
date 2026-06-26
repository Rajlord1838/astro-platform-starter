import React, { useEffect, useState } from 'react';
import { ShoppingBag, Menu } from 'lucide-react';
import { getCartItems } from '../../utils/cart';
import { Cart } from './Cart';

export const StoreHeader: React.FC = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [itemCount, setItemCount] = useState(0);

    const updateItemCount = () => {
        const items = getCartItems();
        const count = items.reduce((total, item) => total + item.quantity, 0);
        setItemCount(count);
    };

    useEffect(() => {
        updateItemCount();
        window.addEventListener('cart-updated', updateItemCount);
        return () => window.removeEventListener('cart-updated', updateItemCount);
    }, []);

    return (
        <>
            <header className="bg-white shadow-sm sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center">
                            <button type="button" className="p-2 -ml-2 mr-2 text-gray-400 hover:text-gray-500 sm:hidden">
                                <span className="sr-only">Open menu</span>
                                <Menu className="h-6 w-6" aria-hidden="true" />
                            </button>
                            <a href="/" className="flex items-center">
                                <span className="text-2xl font-extrabold text-blue-600 tracking-tight">FashionStore</span>
                            </a>
                        </div>

                        <nav className="hidden sm:flex space-x-8">
                            <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">New Arrivals</a>
                            <a href="#" className="text-gray-900 px-3 py-2 text-sm font-medium border-b-2 border-blue-500">Clothing</a>
                            <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Accessories</a>
                        </nav>

                        <div className="flex items-center">
                            <button
                                className="relative p-2 text-gray-400 hover:text-gray-500"
                                onClick={() => setIsCartOpen(true)}
                            >
                                <span className="sr-only">Open cart</span>
                                <ShoppingBag className="h-6 w-6" aria-hidden="true" />
                                {itemCount > 0 && (
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                                        {itemCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
};
