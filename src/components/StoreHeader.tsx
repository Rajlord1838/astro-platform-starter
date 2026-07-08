import React from 'react';
import { Cart } from './Cart';

export const StoreHeader: React.FC = () => {
    return (
        <header className="py-6 flex justify-between items-center border-b border-white/10 mb-8">
            <div className="flex items-center gap-2">
                <a href="/" className="text-2xl font-bold tracking-tight text-white hover:text-neutral-200 transition-colors">
                    FASHION<span className="font-light">STORE</span>
                </a>
            </div>
            <nav className="hidden sm:flex gap-6 text-sm font-medium text-neutral-300">
                <a href="#" className="hover:text-white transition-colors">New Arrivals</a>
                <a href="#" className="hover:text-white transition-colors">Men</a>
                <a href="#" className="hover:text-white transition-colors">Women</a>
                <a href="#" className="hover:text-white transition-colors">Accessories</a>
            </nav>
            <div className="flex items-center">
                <Cart />
            </div>
        </header>
    );
};
