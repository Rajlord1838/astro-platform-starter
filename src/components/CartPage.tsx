import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import type { CartItem } from '../types';
import { getCart, updateQuantity, removeFromCart, getCartTotal, listenToCart } from '../utils/cart';

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const loadCart = () => {
            setCartItems(getCart());
            setIsLoaded(true);
        };

        loadCart();
        const unsubscribe = listenToCart(loadCart);
        return unsubscribe;
    }, []);

    if (!isLoaded) {
        return <div className="text-center py-12">Loading cart...</div>;
    }

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-16 px-4">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <p className="text-gray-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
                <a href="/" className="btn btn-lg">Start Shopping</a>
            </div>
        );
    }

    const total = getCartTotal(cartItems);

    return (
        <div className="max-w-4xl mx-auto w-full">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-grow">
                    <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 overflow-hidden">
                        <ul className="divide-y divide-gray-800">
                            {cartItems.map((item) => (
                                <li key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center">
                                    <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 bg-gray-800 rounded-md overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="flex-grow flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold text-white">{item.name}</h3>
                                            <p className="text-sm text-gray-400">{item.category}</p>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex items-center border border-gray-700 rounded-md">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="px-4 py-2 text-white font-medium min-w-[3rem] text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <span className="font-bold text-lg text-primary">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </span>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                                    aria-label={`Remove ${item.name} from cart`}
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="w-full lg:w-80 flex-shrink-0">
                    <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 p-6 sticky top-6">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                        <div className="flex justify-between mb-2 text-gray-300">
                            <span>Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-4 text-gray-300">
                            <span>Shipping</span>
                            <span>Calculated at checkout</span>
                        </div>

                        <div className="border-t border-gray-800 pt-4 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold">Total</span>
                                <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button className="w-full btn btn-lg">
                            Proceed to Checkout
                        </button>

                        <div className="mt-4 text-center">
                            <a href="/" className="text-sm text-gray-400 hover:text-white underline">
                                Continue Shopping
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
