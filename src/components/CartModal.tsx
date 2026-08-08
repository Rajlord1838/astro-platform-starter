import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { getCart, removeFromCart, updateQuantity } from '../utils/cart';
import type { CartItem } from '../types';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const CartModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const refreshCart = () => {
        setCartItems(getCart());
    };

    useEffect(() => {
        if (isOpen) {
            refreshCart();
            // Prevent scrolling when modal is open
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        window.addEventListener('cart-updated', refreshCart);
        return () => {
            window.removeEventListener('cart-updated', refreshCart);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="relative w-full max-w-lg bg-white rounded-lg shadow-xl text-gray-900 flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
                    <button
                        onClick={onClose}
                        className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                        aria-label="Close cart"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="overflow-y-auto p-4 flex-grow">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            Your cart is empty.
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {cartItems.map((item) => (
                                <li key={item.id} className="flex items-center gap-4 py-2 border-b last:border-0">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="flex-grow">
                                        <h3 className="font-medium text-sm line-clamp-1">{item.title}</h3>
                                        <p className="text-sm font-bold">${item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center border rounded">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-1 hover:bg-gray-100"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-1 hover:bg-gray-100"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                                            aria-label="Remove item"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="p-4 border-t bg-gray-50 rounded-b-lg">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-bold text-lg text-gray-900">Total:</span>
                            <span className="font-bold text-xl text-gray-900">${total.toFixed(2)}</span>
                        </div>
                        <button className="w-full bg-[#f67280] text-white py-3 px-4 rounded-md font-bold text-lg hover:bg-opacity-90 transition-colors">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};