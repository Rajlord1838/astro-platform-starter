import React, { useEffect, useState } from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import type { CartItem } from '../types';
import { getCart, subscribeToCart, updateQuantity, removeFromCart, getCartTotal } from '../utils/cart';

export const CartContent = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const updateCartState = () => {
            const currentCart = getCart();
            setCart(currentCart);
            setTotal(getCartTotal(currentCart));
        };

        updateCartState();
        const unsubscribe = subscribeToCart(updateCartState);
        return () => unsubscribe();
    }, []);

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <p className="text-xl font-medium">Your cart is empty</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-4">
                    {cart.map((item) => (
                        <li key={item.product.id} className="flex gap-4 border-b border-gray-200 pb-4">
                            <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="h-24 w-24 rounded-md object-cover flex-none"
                            />
                            <div className="flex flex-col flex-1">
                                <div className="flex justify-between font-medium text-gray-900">
                                    <h3 className="line-clamp-2">{item.product.name}</h3>
                                    <p className="ml-4">${(item.product.price * item.quantity).toFixed(2)}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">{item.product.category}</p>

                                <div className="flex items-center justify-between mt-auto pt-2">
                                    <div className="flex items-center border border-gray-300 rounded-md">
                                        <button
                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                            className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-l-md"
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="px-4 py-1 text-gray-900 font-medium">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                            className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-r-md"
                                            aria-label="Increase quantity"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.product.id)}
                                        className="text-red-500 hover:text-red-700"
                                        aria-label="Remove item"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-auto">
                <div className="flex justify-between text-lg font-bold text-gray-900 mb-4">
                    <p>Total</p>
                    <p>${total.toFixed(2)}</p>
                </div>
                <button
                    className="w-full btn btn-lg bg-primary text-white hover:bg-primary/90"
                    onClick={() => alert("Checkout not implemented in this demo")}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};
