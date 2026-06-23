import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Minus, Plus } from 'lucide-react';
import type { CartItem } from '../types';

const CART_STORAGE_KEY = 'fashion_store_cart';

export default function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const loadCart = () => {
        try {
            const stored = localStorage.getItem(CART_STORAGE_KEY);
            if (stored) {
                setCartItems(JSON.parse(stored));
            }
        } catch (e) {
            console.error('Error loading cart', e);
        }
    };

    useEffect(() => {
        loadCart();
        const handleCartUpdated = () => loadCart();
        window.addEventListener('cart-updated', handleCartUpdated);
        return () => window.removeEventListener('cart-updated', handleCartUpdated);
    }, []);

    const saveCart = (items: CartItem[]) => {
        setCartItems(items);
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        window.dispatchEvent(new Event('cart-updated'));
    };

    const updateQuantity = (productId: string, delta: number) => {
        const newItems = cartItems.map(item => {
            if (item.product.id === productId) {
                return { ...item, quantity: Math.max(0, item.quantity + delta) };
            }
            return item;
        }).filter(item => item.quantity > 0);
        saveCart(newItems);
    };

    const removeItem = (productId: string) => {
        const newItems = cartItems.filter(item => item.product.id !== productId);
        saveCart(newItems);
    };

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-white hover:text-gray-300 transition-colors"
                aria-label="Toggle cart"
            >
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/4 -translate-y-1/4">
                        {totalItems}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 overflow-hidden border border-gray-200">
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 text-gray-900">
                        <h3 className="text-lg font-semibold">Shopping Cart</h3>
                        <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="max-h-96 overflow-y-auto p-4 text-gray-900">
                        {cartItems.length === 0 ? (
                            <p className="text-center text-gray-500 my-4">Your cart is empty.</p>
                        ) : (
                            <ul className="space-y-4">
                                {cartItems.map((item) => (
                                    <li key={item.product.id} className="flex gap-4 items-center">
                                        <img
                                            src={item.product.imageUrl}
                                            alt={item.product.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-medium text-sm line-clamp-1">{item.product.name}</h4>
                                            <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, -1)}
                                                    className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="text-sm w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, 1)}
                                                    className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.product.id)}
                                            className="text-red-500 hover:text-red-700 p-2"
                                            aria-label="Remove item"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {cartItems.length > 0 && (
                        <div className="p-4 border-t border-gray-200 bg-gray-50 text-gray-900">
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-semibold">Total:</span>
                                <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span>
                            </div>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
                                Checkout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
