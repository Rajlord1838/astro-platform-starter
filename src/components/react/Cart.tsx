import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem } from '../../types';
import {
    getCart,
    removeFromCart,
    updateQuantity,
    CART_UPDATED_EVENT,
    TOGGLE_CART_EVENT,
    toggleCart
} from '../../utils/cart';

export default function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState<CartItem[]>([]);

    useEffect(() => {
        // Initial load
        setItems(getCart());

        // Event listeners
        const handleCartUpdate = () => setItems(getCart());
        const handleToggleCart = () => setIsOpen(prev => !prev);

        window.addEventListener(CART_UPDATED_EVENT, handleCartUpdate);
        window.addEventListener(TOGGLE_CART_EVENT, handleToggleCart);

        return () => {
            window.removeEventListener(CART_UPDATED_EVENT, handleCartUpdate);
            window.removeEventListener(TOGGLE_CART_EVENT, handleToggleCart);
        };
    }, []);

    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                onClick={toggleCart}
            />

            {/* Cart Panel */}
            <div className="relative w-full max-w-md bg-white h-full shadow-xl flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900">
                        <ShoppingCart size={24} />
                        Your Cart
                    </h2>
                    <button
                        onClick={toggleCart}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-900 cursor-pointer"
                        aria-label="Close cart"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 text-gray-900">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500">
                            <ShoppingCart size={48} className="mb-4 opacity-20" />
                            <p className="text-lg">Your cart is empty</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {items.map((item) => (
                                <div key={item.product.id} className="flex gap-4 border-b border-gray-100 pb-4">
                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="w-20 h-24 object-cover rounded"
                                    />
                                    <div className="flex-1 flex flex-col">
                                        <div className="flex justify-between">
                                            <h3 className="font-semibold">{item.product.name}</h3>
                                            <p className="font-bold">${(item.product.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-2">{item.product.category}</p>

                                        <div className="mt-auto flex items-center justify-between">
                                            <div className="flex items-center gap-2 bg-gray-100 rounded p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="p-1 hover:bg-gray-200 rounded cursor-pointer"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="w-8 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="p-1 hover:bg-gray-200 rounded cursor-pointer"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="text-red-500 hover:text-red-700 p-2 cursor-pointer"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="p-4 border-t border-gray-200 bg-gray-50 text-gray-900">
                        <div className="flex justify-between items-center mb-4 text-lg font-bold">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <button className="w-full btn btn-lg">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
