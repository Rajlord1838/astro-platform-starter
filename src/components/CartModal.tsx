import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { getCart, removeFromCart, updateQuantity } from '../utils/cart';
import type { CartItem } from '../types';

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        if (isOpen) {
            setCartItems(getCart());
        }

        const handleCartUpdate = () => {
            setCartItems(getCart());
        };

        window.addEventListener('cart-updated', handleCartUpdate);
        return () => window.removeEventListener('cart-updated', handleCartUpdate);
    }, [isOpen]);

    if (!isOpen) return null;

    const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Sidebar */}
            <div className="relative w-full max-w-md h-full bg-gray-900 shadow-2xl flex flex-col animate-slide-in-right">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <h2 className="text-2xl font-bold text-white">Your Cart</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-800 cursor-pointer"
                        aria-label="Close cart"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400">
                            <p className="text-lg">Your cart is empty.</p>
                            <button
                                onClick={onClose}
                                className="mt-4 text-primary hover:underline cursor-pointer"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <ul className="space-y-6">
                            {cartItems.map((item) => (
                                <li key={item.product.id} className="flex gap-4">
                                    <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-800">
                                        <img
                                            src={item.product.imageUrl}
                                            alt={item.product.name}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>

                                    <div className="flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-white">
                                                <h3 className="line-clamp-1 pr-4">{item.product.name}</h3>
                                                <p className="ml-4">${(item.product.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-400">{item.product.category}</p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <div className="flex items-center border border-gray-700 rounded-md">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="p-1 px-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="px-2 text-white font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="p-1 px-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="font-medium text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                                            >
                                                <Trash2 size={16} />
                                                Remove
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
                    <div className="border-t border-gray-800 p-6 bg-gray-900">
                        <div className="flex justify-between text-base font-medium text-white mb-4">
                            <p>Subtotal</p>
                            <p>${subtotal.toFixed(2)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-400 mb-6">
                            Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                            <button
                                className="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-primary-content shadow-sm hover:bg-primary/90 w-full cursor-pointer transition-colors"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
