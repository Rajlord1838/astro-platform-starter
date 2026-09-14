import React, { useEffect, useState } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { getCart, removeFromCart, updateQuantity, toggleCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        // Load initial state
        setCartItems(getCart());

        // Listen for open/close toggle
        const handleToggle = () => setIsOpen((prev) => !prev);

        // Listen for data updates
        const handleCartUpdate = (e: Event) => {
            const customEvent = e as CustomEvent<CartItem[]>;
            setCartItems(customEvent.detail);
        };

        window.addEventListener('toggle-cart', handleToggle);
        window.addEventListener('cart-updated', handleCartUpdate);

        return () => {
            window.removeEventListener('toggle-cart', handleToggle);
            window.removeEventListener('cart-updated', handleCartUpdate);
        };
    }, []);

    if (!isOpen) return null;

    const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <div className="relative w-full max-w-md bg-gray-900 shadow-2xl flex flex-col h-full overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-primary" />
                        Your Cart
                    </h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors"
                        aria-label="Close cart"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <ShoppingBag className="w-12 h-12 mb-4 opacity-50" />
                            <p>Your cart is empty.</p>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="mt-4 text-primary hover:underline"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.product.id} className="flex gap-4 p-3 bg-gray-800 rounded-lg">
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-20 h-24 object-cover rounded-md"
                                />
                                <div className="flex flex-col flex-1">
                                    <div className="flex justify-between">
                                        <h3 className="font-semibold text-sm pr-4">{item.product.name}</h3>
                                        <button
                                            onClick={() => removeFromCart(item.product.id)}
                                            className="text-gray-400 hover:text-red-400 transition-colors"
                                            aria-label={`Remove ${item.product.name} from cart`}
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <span className="text-primary font-bold mt-1">
                                        ${item.product.price.toFixed(2)}
                                    </span>
                                    <div className="flex items-center gap-3 mt-auto pt-2">
                                        <button
                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                            className="p-1 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus className="w-3 h-3" />
                                        </button>
                                        <span className="text-sm font-medium w-4 text-center">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                            className="p-1 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                                            aria-label="Increase quantity"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="p-4 border-t border-gray-800 bg-gray-900">
                        <div className="flex justify-between items-center mb-4 text-lg font-bold">
                            <span>Total</span>
                            <span className="text-primary">${total.toFixed(2)}</span>
                        </div>
                        <button className="w-full btn btn-lg py-3">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
