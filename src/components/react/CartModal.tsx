import React, { useEffect, useState } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import type { CartItem } from '../../types';
import { getCart, listenToCartUpdates, removeFromCart, updateQuantity, getCartTotal } from '../../utils/cart';

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        if (isOpen) {
             setCartItems(getCart());
        }
    }, [isOpen]);

    useEffect(() => {
        const unsubscribe = listenToCartUpdates(() => {
            setCartItems(getCart());
        });
        return unsubscribe;
    }, []);

    if (!isOpen) return null;

    const total = getCartTotal(cartItems);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" role="dialog" aria-modal="true">
            <div className="bg-color-primary-content w-full max-w-md rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-primary" />
                        Your Cart
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:text-primary transition-colors"
                        aria-label="Close cart"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                            <ShoppingBag className="w-12 h-12 mb-4 opacity-50" />
                            <p>Your cart is empty.</p>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {cartItems.map((item) => (
                                <li key={item.id} className="flex gap-4 p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                                    <div className="w-20 h-20 shrink-0 overflow-hidden rounded-md bg-gray-200">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col">
                                        <div className="flex justify-between text-base font-medium text-white">
                                            <h3>{item.name}</h3>
                                            <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-400">${item.price.toFixed(2)} each</p>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <div className="flex items-center border border-gray-600 rounded-md">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="px-2 py-1 hover:text-primary transition-colors"
                                                    aria-label={`Decrease quantity of ${item.name}`}
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="px-2 py-1 border-x border-gray-600 min-w-[2rem] text-center font-medium">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="px-2 py-1 hover:text-primary transition-colors"
                                                    aria-label={`Increase quantity of ${item.name}`}
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="flex">
                                                <button
                                                    type="button"
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="font-medium text-primary hover:text-primary/80 transition-colors"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="border-t border-gray-700 p-4 bg-gray-900">
                        <div className="flex justify-between text-lg font-medium text-white mb-4">
                            <p>Subtotal</p>
                            <p>${total.toFixed(2)}</p>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">Shipping and taxes calculated at checkout.</p>
                        <button className="btn w-full btn-lg">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
