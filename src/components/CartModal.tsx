import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem } from '../types';
import { getCart, updateQuantity, removeFromCart, getCartTotal } from '../utils/cartStore';

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const updateCart = () => {
            setCart(getCart());
        };

        if (isOpen) {
            updateCart();
        }

        window.addEventListener('cart-updated', updateCart);
        return () => window.removeEventListener('cart-updated', updateCart);
    }, [isOpen]);

    if (!isOpen) return null;

    const total = getCartTotal(cart);

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md h-full bg-complementary shadow-xl flex flex-col p-6 animate-in slide-in-from-right duration-300">
                <div className="flex items-center justify-between mb-6 border-b border-gray-700 pb-4">
                    <h2 className="text-2xl font-bold text-white">Your Cart</h2>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-white transition-colors" aria-label="Close cart">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <p className="text-lg">Your cart is empty.</p>
                            <button onClick={onClose} className="mt-4 text-primary hover:underline">
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {cart.map((item) => (
                                <div key={item.product.id} className="flex gap-4 p-4 rounded-lg bg-black/20 border border-gray-800">
                                    <div className="w-24 h-24 rounded-md overflow-hidden bg-gray-900 shrink-0">
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium text-white line-clamp-2">{item.product.name}</h3>
                                                <p className="text-gray-400 text-sm mt-1">${item.product.price.toFixed(2)}</p>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="text-gray-500 hover:text-red-400 transition-colors p-1"
                                                aria-label={`Remove ${item.product.name}`}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between mt-auto pt-4">
                                            <div className="flex items-center gap-3 bg-black/40 rounded-md px-2 py-1">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="text-gray-400 hover:text-white"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="text-gray-400 hover:text-white"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                            <p className="font-semibold text-white">
                                                ${(item.product.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="mt-6 border-t border-gray-700 pt-6">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-lg text-gray-300">Subtotal</span>
                            <span className="text-2xl font-bold text-white">${total.toFixed(2)}</span>
                        </div>
                        <button className="w-full py-4 bg-primary text-primary-content font-bold rounded-lg hover:bg-primary/90 transition-colors">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
