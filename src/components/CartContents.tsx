import React, { useEffect, useState } from 'react';
import type { CartItem } from '../types';
import { getCart, getCartTotal, removeFromCart, subscribeToCartChanges, updateQuantity } from '../utils/cart';

export const CartContents: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const updateState = () => {
            setCartItems(getCart());
            setTotal(getCartTotal());
        };

        // Initial load
        updateState();

        // Subscribe to changes
        const unsubscribe = subscribeToCartChanges(updateState);

        return unsubscribe;
    }, []);

    const closeCartModal = () => {
        const dialog = document.getElementById('cart-modal') as HTMLDialogElement;
        if (dialog) {
            dialog.close();
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-8">
                <p className="text-gray-500 mb-4 text-center">Your cart is empty</p>
                <button
                    onClick={closeCartModal}
                    className="btn bg-primary text-primary-content"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow overflow-y-auto pr-2">
                <ul className="space-y-4">
                    {cartItems.map((item) => (
                        <li key={item.product.id} className="flex gap-4 border-b border-gray-200 pb-4 last:border-0 text-black">
                            <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-20 h-20 object-cover rounded"
                            />
                            <div className="flex-grow">
                                <h3 className="font-semibold text-black">{item.product.name}</h3>
                                <p className="text-gray-600">${item.product.price.toFixed(2)}</p>

                                <div className="flex items-center gap-2 mt-2">
                                    <button
                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                        className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center text-black">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                        className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col items-end justify-between">
                                <p className="font-bold text-black">${(item.product.price * item.quantity).toFixed(2)}</p>
                                <button
                                    onClick={() => removeFromCart(item.product.id)}
                                    className="text-red-500 hover:text-red-700 text-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-6 border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-black">Total</span>
                    <span className="text-xl font-bold text-black">${total.toFixed(2)}</span>
                </div>
                <button
                    className="w-full btn btn-lg bg-green-600 text-white hover:bg-green-700"
                    onClick={() => alert('Checkout functionality would go here!')}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};
