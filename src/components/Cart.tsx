import React, { useState, useEffect } from 'react';
import type { Product } from '../utils/products';

export default function Cart() {
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const updateCart = () => {
        const existingCartRaw = localStorage.getItem('cart');
        if (existingCartRaw) {
            try {
                const parsed = JSON.parse(existingCartRaw);
                setCartItems(parsed);
            } catch (e) {
                console.error('Failed to parse cart', e);
                setCartItems([]);
            }
        } else {
            setCartItems([]);
        }
    };

    useEffect(() => {
        // Initial load
        updateCart();

        // Listen for updates
        window.addEventListener('cart-updated', updateCart);

        return () => {
            window.removeEventListener('cart-updated', updateCart);
        };
    }, []);

    const toggleCart = () => setIsOpen(!isOpen);

    const emptyCart = () => {
        localStorage.removeItem('cart');
        window.dispatchEvent(new Event('cart-updated'));
        setIsOpen(false);
    }

    const total = cartItems.reduce((acc, item) => acc + item.price, 0);

    return (
        <div className="relative z-50">
            <button
                onClick={toggleCart}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                <span className="font-bold">{cartItems.length}</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden">
                    <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                        <h3 className="font-bold text-lg">Your Cart</h3>
                        <button onClick={toggleCart} className="text-gray-400 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="max-h-60 overflow-y-auto p-4 flex flex-col gap-3">
                        {cartItems.length === 0 ? (
                            <p className="text-gray-400 text-center py-4">Your cart is empty.</p>
                        ) : (
                            cartItems.map((item, index) => (
                                <div key={`${item.id}-${index}`} className="flex justify-between items-center text-sm">
                                    <span className="truncate pr-2">{item.name}</span>
                                    <span className="font-semibold text-primary whitespace-nowrap">${item.price.toFixed(2)}</span>
                                </div>
                            ))
                        )}
                    </div>

                    {cartItems.length > 0 && (
                        <div className="p-4 bg-gray-800 border-t border-gray-700">
                            <div className="flex justify-between items-center mb-4 font-bold">
                                <span>Total:</span>
                                <span className="text-primary">${total.toFixed(2)}</span>
                            </div>
                            <button onClick={emptyCart} className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded transition-colors text-sm mb-2">
                                Empty Cart
                            </button>
                            <button className="w-full btn py-2 text-sm">
                                Checkout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
