import React, { useState, useEffect } from 'react';
import { getCart, addToCart, removeFromCart, updateQuantity, CART_EVENT } from '../utils/cart';
import type { CartItem } from '../utils/cart';
import type { Product } from '../utils/products';

export const AddToCartButton: React.FC<{ product: Product }> = ({ product }) => {
    return (
        <button
            onClick={() => addToCart(product)}
            className="mt-4 w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors"
        >
            Add to Cart
        </button>
    );
};

export const CartIcon: React.FC = () => {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        // Only run on client
        const updateCount = () => {
            const cart = getCart();
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            setItemCount(count);
        };

        // Initial update
        updateCount();

        // Listen for updates
        window.addEventListener(CART_EVENT, updateCount);

        // Listen for standard storage events from other tabs
        const handleStorage = (e: StorageEvent) => {
            if (e.key === 'fashion_store_cart') {
                updateCount();
            }
        };
        window.addEventListener('storage', handleStorage);

        return () => {
            window.removeEventListener(CART_EVENT, updateCount);
            window.removeEventListener('storage', handleStorage);
        };
    }, []);

    return (
        <div
            className="relative inline-block cursor-pointer"
            onClick={() => alert('Checkout flow coming soon!')}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                </span>
            )}
        </div>
    );
};
