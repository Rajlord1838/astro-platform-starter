import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { getCart, updateQuantity, removeFromCart } from '../utils/cart';
import type { CartItem } from '../types';

export default function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        // Load initial cart
        setCartItems(getCart());

        // Listen for updates
        const handleCartUpdate = () => setCartItems(getCart());
        window.addEventListener('cart-updated', handleCartUpdate);

        return () => window.removeEventListener('cart-updated', handleCartUpdate);
    }, []);

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 text-white hover:text-primary transition-colors cursor-pointer"
                aria-label="Open cart"
            >
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full transform translate-x-1 -translate-y-1">
                        {totalItems}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/50 backdrop-blur-sm">
                    <div className="w-full max-w-md h-full bg-complementary shadow-2xl p-6 overflow-y-auto border-l border-gray-700/50">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-white">Your Cart</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                                aria-label="Close cart"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {cartItems.length === 0 ? (
                            <div className="text-center text-gray-400 mt-12">
                                <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
                                <p>Your cart is empty</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-6">
                                <ul className="flex flex-col gap-4">
                                    {cartItems.map((item) => (
                                        <li key={item.product.id} className="flex gap-4 p-4 bg-black/20 rounded-lg">
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="w-20 h-20 object-cover rounded bg-gray-800"
                                            />
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="font-medium text-white">{item.product.name}</h3>
                                                    <p className="text-primary">${item.product.price.toFixed(2)}</p>
                                                </div>
                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="flex items-center gap-2 bg-black/30 rounded px-2 py-1">
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                            className="text-gray-400 hover:text-white cursor-pointer"
                                                            aria-label="Decrease quantity"
                                                        >
                                                            <Minus size={16} />
                                                        </button>
                                                        <span className="w-6 text-center text-sm">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                            className="text-gray-400 hover:text-white cursor-pointer"
                                                            aria-label="Increase quantity"
                                                        >
                                                            <Plus size={16} />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.product.id)}
                                                        className="text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                                                        aria-label="Remove item"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                <div className="border-t border-gray-700 pt-6 mt-2">
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-lg font-medium text-gray-300">Total</span>
                                        <span className="text-2xl font-bold text-white">${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <button className="w-full bg-primary text-primary-content hover:bg-primary/85 transition-colors py-3 px-4 rounded-lg font-bold text-lg cursor-pointer">
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
