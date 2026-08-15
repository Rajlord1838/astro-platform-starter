import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import type { CartItem } from '../types';
import { getCart, updateQuantity, removeFromCart } from '../utils/cart';

export const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Initial load
        setCartItems(getCart());

        // Event listener for updates
        const handleCartUpdate = () => {
            setCartItems(getCart());
        };

        window.addEventListener('cart-updated', handleCartUpdate);
        return () => window.removeEventListener('cart-updated', handleCartUpdate);
    }, []);

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="relative z-50">
            {/* Cart Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 text-gray-700 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black rounded-full"
                aria-label="Open cart"
            >
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                        {totalItems}
                    </span>
                )}
            </button>

            {/* Cart Modal Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Cart Sidebar/Modal */}
            <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        Your Cart
                    </h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-4">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <ShoppingCart className="w-12 h-12 mb-4 opacity-20" />
                            <p>Your cart is empty</p>
                        </div>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id} className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                                <div className="flex-grow flex flex-col">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-medium text-gray-900 text-sm leading-tight">{item.name}</h3>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                            aria-label="Remove item"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <span className="text-gray-600 font-medium mb-2">${item.price.toFixed(2)}</span>
                                    <div className="flex items-center gap-3 mt-auto">
                                        <div className="flex items-center border border-gray-200 rounded-md">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-1 hover:bg-gray-100 text-gray-600 transition-colors"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-1 hover:bg-gray-100 text-gray-600 transition-colors"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600 font-medium">Subtotal</span>
                            <span className="text-xl font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">Shipping and taxes calculated at checkout.</p>
                        <button className="w-full py-3 px-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
