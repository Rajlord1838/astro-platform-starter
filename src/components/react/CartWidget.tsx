import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import type { CartItem } from '../../types';
import { getCart, CART_EVENT, updateQuantity, removeFromCart, clearCart } from '../../utils/cart';

export default function CartWidget() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Initialize cart from local storage on mount
        setCart(getCart());

        // Listen for cart updates
        const handleCartUpdate = () => {
            setCart(getCart());
        };

        window.addEventListener(CART_EVENT, handleCartUpdate);
        return () => window.removeEventListener(CART_EVENT, handleCartUpdate);
    }, []);

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-white hover:text-primary transition-colors"
                aria-label="Toggle cart"
            >
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full">
                        {totalItems}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 z-50 w-80 sm:w-96 mt-2 bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-hidden">
                    <div className="flex items-center justify-between p-4 border-b border-gray-800">
                        <h3 className="text-lg font-semibold text-white">Your Cart</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-4 max-h-[60vh] overflow-y-auto">
                        {cart.length === 0 ? (
                            <p className="text-center text-gray-400 py-6">Your cart is empty.</p>
                        ) : (
                            <ul className="space-y-4">
                                {cart.map((item) => (
                                    <li key={item.id} className="flex gap-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded-md"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-medium text-white truncate">{item.name}</h4>
                                            <p className="text-sm text-gray-400">${item.price}</p>

                                            <div className="flex items-center gap-2 mt-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1 text-gray-400 hover:text-white bg-gray-800 rounded"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="text-sm text-white w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 text-gray-400 hover:text-white bg-gray-800 rounded"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="p-1 text-red-400 hover:text-red-300 ml-auto"
                                                    aria-label="Remove item"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {cart.length > 0 && (
                        <div className="p-4 bg-gray-800 border-t border-gray-700">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-300">Total:</span>
                                <span className="text-lg font-bold text-white">${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => clearCart()}
                                    className="flex-1 py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors text-sm font-medium"
                                >
                                    Clear Cart
                                </button>
                                <button
                                    onClick={() => {
                                        alert('Checkout functionality would go here!');
                                        setIsOpen(false);
                                    }}
                                    className="flex-1 py-2 px-4 bg-primary hover:bg-primary/90 text-primary-content rounded-md transition-colors text-sm font-bold"
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
