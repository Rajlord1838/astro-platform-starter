import React, { useEffect, useState } from 'react';
import type { CartItem } from '../../types';
import { getCart, updateQuantity, removeFromCart, toggleCart, getCartTotal } from '../../utils/cart';
import { X, Minus, Plus, Trash2 } from 'lucide-react';

export default function CartModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        // Initialize cart from local storage on mount
        setCart(getCart());

        const handleCartUpdated = (e: CustomEvent<CartItem[]>) => {
            setCart(e.detail);
        };

        const handleToggleCart = (e: CustomEvent<boolean | undefined>) => {
            if (e.detail !== undefined) {
                setIsOpen(e.detail);
            } else {
                setIsOpen(prev => !prev);
            }
        };

        window.addEventListener('cart-updated', handleCartUpdated as EventListener);
        window.addEventListener('toggle-cart', handleToggleCart as EventListener);

        return () => {
            window.removeEventListener('cart-updated', handleCartUpdated as EventListener);
            window.removeEventListener('toggle-cart', handleToggleCart as EventListener);
        };
    }, []);

    if (!isOpen) return null;

    const total = getCartTotal(cart);

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-md bg-gray-950 h-full shadow-2xl flex flex-col animate-slide-in-right border-l border-gray-800">
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <h2 className="text-2xl font-bold text-white mb-0">Your Cart</h2>
                    <button
                        onClick={() => toggleCart(false)}
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="Close cart"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                            <p className="text-lg">Your cart is empty.</p>
                            <button
                                onClick={() => toggleCart(false)}
                                className="btn"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <ul className="space-y-6">
                            {cart.map((item) => (
                                <li key={item.product.id} className="flex gap-4">
                                    <div className="w-20 h-20 shrink-0 bg-gray-800 rounded-md overflow-hidden">
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col flex-1 justify-between">
                                        <div className="flex justify-between">
                                            <h3 className="font-medium text-white">{item.product.name}</h3>
                                            <p className="font-semibold text-primary">${(item.product.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center gap-3 bg-gray-800 rounded-lg px-2 py-1">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="text-gray-400 hover:text-white"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="text-white min-w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="text-gray-400 hover:text-white"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="text-gray-500 hover:text-red-500 transition-colors"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="p-6 border-t border-gray-800 bg-gray-900/50">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-lg text-gray-300">Total</span>
                            <span className="text-2xl font-bold text-white">${total.toFixed(2)}</span>
                        </div>
                        <button className="w-full btn btn-lg">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
