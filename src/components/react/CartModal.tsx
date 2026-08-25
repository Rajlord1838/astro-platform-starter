import React, { useEffect, useState } from 'react';
import { X, Trash2 } from 'lucide-react';
import type { CartItem } from '../../types';
import { getCart, removeFromCart, clearCart, CART_UPDATED_EVENT } from '../../utils/cart';

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const updateCart = () => {
            setCartItems(getCart());
        };

        if (isOpen) {
            updateCart();
        }

        window.addEventListener(CART_UPDATED_EVENT, updateCart);
        return () => window.removeEventListener(CART_UPDATED_EVENT, updateCart);
    }, [isOpen]);

    if (!isOpen) return null;

    const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-lg max-h-[85vh] bg-gray-900 border border-gray-700 rounded-xl shadow-2xl flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-800">
                    <h2 className="text-xl font-bold text-white">Your Cart</h2>
                    <button
                        onClick={onClose}
                        className="p-1 text-gray-400 hover:text-white transition-colors cursor-pointer"
                        aria-label="Close modal"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-5">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-12 text-gray-400">
                            <p>Your cart is empty.</p>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {cartItems.map((item) => (
                                <li key={item.product.id} className="flex gap-4 p-3 bg-gray-800/50 rounded-lg">
                                    <img
                                        src={item.product.imageUrl}
                                        alt={item.product.name}
                                        className="w-20 h-20 object-cover rounded-md"
                                    />
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h4 className="font-semibold text-white">{item.product.name}</h4>
                                            <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="font-bold text-primary">
                                            ${(item.product.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => removeFromCart(item.product.id)}
                                            className="p-2 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                                            aria-label={`Remove ${item.product.name}`}
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="p-5 border-t border-gray-800 bg-gray-900/90 rounded-b-xl">
                        <div className="flex justify-between items-center mb-4 text-lg font-bold">
                            <span>Total:</span>
                            <span className="text-primary">${total.toFixed(2)}</span>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={clearCart}
                                className="px-4 py-2 text-gray-300 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors font-medium"
                            >
                                Clear Cart
                            </button>
                            <button
                                onClick={() => alert('Checkout functionality not implemented.')}
                                className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-content rounded-lg transition-colors font-bold"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
