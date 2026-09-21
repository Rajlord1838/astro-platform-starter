import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem } from '../../types';
import { getCart, getCartTotal, updateQuantity, removeFromCart } from '../../utils/cart';

export default function CartModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const updateCartState = () => {
        setCartItems(getCart());
    };

    useEffect(() => {
        // Initial state
        updateCartState();

        const handleToggle = () => setIsOpen(prev => !prev);

        window.addEventListener('toggle-cart', handleToggle);
        window.addEventListener('cart-updated', updateCartState);

        return () => {
            window.removeEventListener('toggle-cart', handleToggle);
            window.removeEventListener('cart-updated', updateCartState);
        };
    }, []);

    if (!isOpen) return null;

    const total = getCartTotal(cartItems);

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md h-full bg-gray-900 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <h2 className="text-xl font-bold text-white">Your Cart</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 text-gray-400 transition-colors rounded-full hover:text-white hover:bg-gray-800"
                        aria-label="Close cart"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 p-4 overflow-y-auto">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <p className="mb-4">Your cart is empty.</p>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="btn"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {cartItems.map((item) => (
                                <li key={item.product.id} className="flex gap-4 p-3 bg-gray-800 rounded-lg">
                                    <img
                                        src={item.product.imageUrl}
                                        alt={item.product.title}
                                        className="object-cover w-20 h-24 rounded-md"
                                    />
                                    <div className="flex flex-col flex-1">
                                        <div className="flex justify-between">
                                            <h3 className="font-semibold text-white">{item.product.title}</h3>
                                            <p className="font-bold text-white">${(item.product.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                        <p className="text-sm text-gray-400 mb-2">{item.product.category}</p>

                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="flex items-center gap-3 px-2 py-1 bg-gray-900 rounded-md">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="text-gray-400 hover:text-white"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="text-sm font-medium text-white w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="text-gray-400 hover:text-white"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="p-2 text-red-400 transition-colors rounded-full hover:bg-gray-700 hover:text-red-300"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="p-4 border-t border-gray-800 bg-gray-900">
                        <div className="flex justify-between mb-4">
                            <span className="text-lg text-gray-300">Subtotal</span>
                            <span className="text-xl font-bold text-white">${total.toFixed(2)}</span>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">Shipping and taxes calculated at checkout.</p>
                        <button className="w-full btn btn-lg bg-white text-gray-900 hover:bg-gray-200">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
