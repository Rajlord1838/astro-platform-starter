import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { getCart, updateQuantity, removeFromCart } from '../utils/cart';
import type { CartItem } from '../types';

export default function Cart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const refreshCart = () => {
        setCartItems(getCart());
    };

    useEffect(() => {
        refreshCart();
        window.addEventListener('cart-updated', refreshCart);
        return () => window.removeEventListener('cart-updated', refreshCart);
    }, []);

    const closeCart = () => {
        const modal = document.getElementById('cart-modal') as HTMLDialogElement;
        if (modal) {
            modal.close();
        }
    };

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="bg-white text-gray-900 flex flex-col h-full max-h-[80vh] w-full md:w-[400px] sm:rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold m-0">Your Cart</h2>
                <button onClick={closeCart} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={24} />
                </button>
            </div>

            <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-4">
                {cartItems.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                        Your cart is empty.
                    </div>
                ) : (
                    cartItems.map((item) => (
                        <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-4">
                            <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-md bg-gray-100" />
                            <div className="flex flex-col flex-grow">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-semibold text-sm leading-tight">{item.name}</h3>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                        aria-label="Remove item"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <div className="text-sm text-gray-500 mb-2">{item.category}</div>
                                <div className="mt-auto flex items-center justify-between">
                                    <div className="font-bold">${item.price.toFixed(2)}</div>
                                    <div className="flex items-center border border-gray-200 rounded">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="px-2 py-1 hover:bg-gray-100 transition-colors"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="px-2 text-sm font-medium w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="px-2 py-1 hover:bg-gray-100 transition-colors"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center mb-4 text-lg font-bold">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <button
                    className="w-full btn btn-lg bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={cartItems.length === 0}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
}
