import React, { useEffect, useState } from 'react';
import { getCart, removeFromCart, updateQuantity, clearCart } from '../utils/cart';
import type { CartItem } from '../types';
import { Trash2, Plus, Minus } from 'lucide-react';

export const CartPage: React.FC = () => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const updateCartState = () => {
        setCart(getCart());
    };

    useEffect(() => {
        updateCartState();
        window.addEventListener('cart-updated', updateCartState);
        return () => window.removeEventListener('cart-updated', updateCartState);
    }, []);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <a href="/" className="btn">Continue Shopping</a>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
            <div className="divide-y divide-gray-700">
                {cart.map((item) => (
                    <div key={item.id} className="py-6 flex items-center">
                        <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                        <div className="ml-4 flex-1">
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                            <p className="text-primary">${item.price.toFixed(2)}</p>

                            <div className="mt-2 flex items-center gap-4">
                                <div className="flex items-center border border-gray-600 rounded-md">
                                    <button
                                        className="p-1 hover:text-primary disabled:opacity-50"
                                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                        disabled={item.quantity <= 1}
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="px-4 font-medium">{item.quantity}</span>
                                    <button
                                        className="p-1 hover:text-primary"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-400 hover:text-red-300 flex items-center gap-1"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span className="text-sm">Remove</span>
                                </button>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 border-t border-gray-700 pt-6">
                <div className="flex justify-between text-xl font-bold mb-6">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex gap-4 justify-end">
                    <button onClick={clearCart} className="px-4 py-2 border border-gray-600 rounded hover:bg-gray-800 transition-colors">
                        Clear Cart
                    </button>
                    <button className="btn">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};
