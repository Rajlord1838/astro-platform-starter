import React, { useState, useEffect } from 'react';
import { getCart, updateQuantity, removeFromCart } from '../utils/cart';
import type { CartItem } from '../types';
import { X, Plus, Minus, Trash2 } from 'lucide-react';

export const CartDialog: React.FC = () => {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const updateCart = () => {
            setCart(getCart());
        };

        updateCart();

        window.addEventListener('cart-updated', updateCart);
        return () => window.removeEventListener('cart-updated', updateCart);
    }, []);

    const closeDialog = () => {
        const dialog = document.getElementById('cart-dialog') as HTMLDialogElement;
        if (dialog) {
            dialog.close();
        }
    };

    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <dialog id="cart-dialog" className="p-0 rounded-lg shadow-xl backdrop:bg-gray-900/50 open:animate-in open:fade-in-90 open:zoom-in-90 max-w-md w-full bg-white text-gray-900">
            <div className="flex flex-col h-full max-h-[80vh]">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-bold">Shopping Cart</h2>
                    <button onClick={closeDialog} className="p-1 hover:bg-gray-100 rounded-full transition-colors" aria-label="Close cart">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {cart.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            Your cart is empty.
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {cart.map((item) => (
                                <li key={item.product.id} className="flex gap-4">
                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="w-20 h-20 object-cover rounded-md"
                                    />
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-semibold text-sm line-clamp-1">{item.product.name}</h3>
                                            <p className="text-sm text-gray-500">${item.product.price.toFixed(2)}</p>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                className="p-1 border rounded-md hover:bg-gray-50"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                className="p-1 border rounded-md hover:bg-gray-50"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                            <div className="flex-1"></div>
                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="text-red-500 hover:text-red-700 p-1"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="p-4 border-t bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold">Total</span>
                        <span className="font-bold text-lg">${total.toFixed(2)}</span>
                    </div>
                    <button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
                        disabled={cart.length === 0}
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </dialog>
    );
};
