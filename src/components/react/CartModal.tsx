import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import type { CartItem } from '../../types';
import { getCartItems, updateQuantity, removeFromCart, CART_UPDATED_EVENT } from '../../utils/cart';

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const fetchItems = () => setItems(getCartItems());

        if (isOpen) {
            fetchItems();
        }

        window.addEventListener(CART_UPDATED_EVENT, fetchItems);
        return () => window.removeEventListener(CART_UPDATED_EVENT, fetchItems);
    }, [isOpen]);

    if (!isOpen) return null;

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md h-full bg-white shadow-xl flex flex-col animate-slide-in-right text-black">

                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold">Your Cart</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Close Cart"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                            <ShoppingCart size={48} className="opacity-20" />
                            <p>Your cart is empty.</p>
                            <button onClick={onClose} className="text-black underline font-medium">
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {items.map(item => (
                                <li key={item.id} className="flex gap-4 py-2 border-b border-gray-100 last:border-0">
                                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-semibold text-sm line-clamp-2">{item.name}</h3>
                                            <p className="font-bold mt-1">${item.price.toFixed(2)}</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center border border-gray-300 rounded">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1 hover:bg-gray-100 transition-colors"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="px-3 text-sm font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 hover:bg-gray-100 transition-colors"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-500 p-1 hover:bg-red-50 rounded transition-colors"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                        <div className="flex justify-between items-center mb-4 text-lg font-bold">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
