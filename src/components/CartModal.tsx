import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import type { CartItem } from '../types';
import { getCart, updateQuantity, removeFromCart, clearCart } from '../utils/cart';

export default function CartModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const refreshCart = () => {
        setCartItems(getCart());
    };

    useEffect(() => {
        const handleOpen = () => {
            refreshCart();
            setIsOpen(true);
        };

        window.addEventListener('open-cart-modal', handleOpen);
        window.addEventListener('cart-updated', refreshCart);

        return () => {
            window.removeEventListener('open-cart-modal', handleOpen);
            window.removeEventListener('cart-updated', refreshCart);
        };
    }, []);

    const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
            <div className="w-full max-w-md h-full bg-white shadow-xl flex flex-col animate-in slide-in-from-right duration-300">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-semibold">Your Cart</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500">
                            <p className="mb-4">Your cart is empty.</p>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <ul className="space-y-6">
                            {cartItems.map((item) => (
                                <li key={item.product.id} className="flex gap-4">
                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="w-24 h-24 object-cover rounded-md"
                                    />
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between">
                                                <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                                                <p className="font-semibold text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                            <p className="text-sm text-gray-500">{item.product.category}</p>
                                        </div>

                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center border rounded-md">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="p-1 text-gray-500 hover:bg-gray-100"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-8 text-center text-sm font-medium">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="p-1 text-gray-500 hover:bg-gray-100"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="text-red-500 hover:text-red-700 transition-colors"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="p-4 border-t bg-gray-50">
                        <div className="flex justify-between mb-4">
                            <span className="font-semibold text-gray-900">Total</span>
                            <span className="font-bold text-xl text-gray-900">${total.toFixed(2)}</span>
                        </div>
                        <button
                            className="w-full py-3 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition-colors"
                            onClick={() => {
                                alert('Checkout process would start here!');
                                clearCart();
                                setIsOpen(false);
                            }}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
