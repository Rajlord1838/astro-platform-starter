import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { getCart, updateQuantity, removeFromCart, EVENT_NAME } from '../../utils/cart';
import type { CartItem } from '../../types';

export const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const loadCart = () => {
        setCartItems(getCart());
        setIsLoaded(true);
    };

    useEffect(() => {
        loadCart();
        window.addEventListener(EVENT_NAME, loadCart);
        return () => window.removeEventListener(EVENT_NAME, loadCart);
    }, []);

    if (!isLoaded) {
        return <div className="py-12 text-center text-gray-400 animate-pulse">Loading cart...</div>;
    }

    if (cartItems.length === 0) {
        return (
            <div className="py-16 text-center bg-gray-800/50 rounded-xl border border-gray-700">
                <div className="mx-auto w-16 h-16 mb-4 text-gray-500 bg-gray-800 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                <p className="text-gray-400 mb-6">Looks like you haven't added anything to your cart yet.</p>
                <a href="/" className="btn">
                    Continue Shopping
                </a>
            </div>
        );
    }

    const subtotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax example
    const total = subtotal + tax;

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <ShoppingBag className="w-6 h-6" />
                    Shopping Cart
                </h2>

                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                    <ul className="divide-y divide-gray-700">
                        {cartItems.map((item) => (
                            <li key={item.product.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
                                <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 bg-gray-900 rounded-md overflow-hidden relative">
                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex-grow flex flex-col gap-1 w-full">
                                    <div className="flex justify-between items-start gap-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-white leading-tight">
                                                {item.product.name}
                                            </h3>
                                            <p className="text-sm text-gray-400 mt-1">{item.product.category}</p>
                                        </div>
                                        <p className="font-bold text-lg text-primary whitespace-nowrap">
                                            ${(item.product.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-end mt-4">
                                        <div className="flex items-center bg-gray-900 rounded border border-gray-700">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-10 text-center font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.product.id)}
                                            className="text-red-400 hover:text-red-300 flex items-center gap-1 text-sm font-medium transition-colors p-2 -mr-2"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            <span className="hidden sm:inline">Remove</span>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="w-full lg:w-1/3">
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 sticky top-6">
                    <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                    <div className="space-y-3 text-sm text-gray-300 mb-6">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="font-medium text-white">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Estimated Tax (8%)</span>
                            <span className="font-medium text-white">${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span className="font-medium text-white">Free</span>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4 mb-6">
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-lg text-white">Total</span>
                            <span className="font-bold text-2xl text-primary">${total.toFixed(2)}</span>
                        </div>
                    </div>

                    <button className="btn w-full py-3 text-lg">
                        Checkout
                    </button>

                    <p className="text-xs text-center text-gray-500 mt-4">
                        Taxes and shipping calculated at checkout.
                    </p>
                </div>
            </div>
        </div>
    );
};
