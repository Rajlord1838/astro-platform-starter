import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { getCart, toggleCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function Navbar() {
    const [cartCount, setCartCount] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const updateCartCount = () => {
            const cart = getCart();
            const count = cart.reduce((total: number, item: CartItem) => total + item.quantity, 0);
            setCartCount(count);
        };

        updateCartCount();

        window.addEventListener('cart-updated', updateCartCount);
        return () => window.removeEventListener('cart-updated', updateCartCount);
    }, []);

    return (
        <nav className="sticky top-0 z-40 bg-primary-content text-white shadow-md border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <a href="/" className="flex-shrink-0 font-bold text-xl tracking-tight flex items-center gap-2 text-primary">
                            <span>Fashion Store</span>
                        </a>
                        <div className="hidden md:block ml-10">
                            <div className="flex items-baseline space-x-4">
                                <a href="#" className="hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Men</a>
                                <a href="#" className="hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Women</a>
                                <a href="#" className="hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Accessories</a>
                                <a href="#" className="hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Sale</a>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button
                            onClick={toggleCart}
                            className="p-2 rounded-full hover:bg-gray-800 transition-colors relative"
                            aria-label="Toggle cart"
                        >
                            <ShoppingCart className="h-6 w-6" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <div className="-mr-2 flex md:hidden ml-2">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md hover:text-white hover:bg-gray-800 focus:outline-none"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {isMobileMenuOpen ? (
                                    <X className="block h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <Menu className="block h-6 w-6" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary-content">
                        <a href="#" className="hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Men</a>
                        <a href="#" className="hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Women</a>
                        <a href="#" className="hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Accessories</a>
                        <a href="#" className="hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Sale</a>
                    </div>
                </div>
            )}
        </nav>
    );
}
