import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import type { CartItem } from '../types';
import { getCart, removeFromCart, updateQuantity, getCartTotal } from '../utils/cart';

interface CartProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        // Load initial cart
        setCartItems(getCart());

        // Listen for updates
        const handleCartUpdate = () => {
            setCartItems(getCart());
        };

        window.addEventListener('cart-updated', handleCartUpdate);
        return () => window.removeEventListener('cart-updated', handleCartUpdate);
    }, []);

    if (!isOpen) return null;

    const total = getCartTotal(cartItems);

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Cart drawer */}
            <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col transform transition-transform text-gray-800">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <ShoppingBag /> Your Cart
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Close cart"
                    >
                        <X />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <ShoppingBag size={48} className="mb-4 opacity-20" />
                            <p>Your cart is empty.</p>
                            <button
                                onClick={onClose}
                                className="mt-4 text-primary font-semibold hover:underline"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {cartItems.map((item) => (
                                <li key={item.product.id} className="flex gap-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="w-20 h-20 rounded bg-gray-200 overflow-hidden flex-shrink-0">
                                        <img
                                            src={item.product.image}
                                            alt={item.product.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-semibold text-sm line-clamp-2">{item.product.title}</h3>
                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <div className="text-primary font-bold text-sm mt-1">
                                            ${item.product.price.toFixed(2)}
                                        </div>
                                        <div className="flex items-center gap-2 mt-auto">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                className="p-1 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-100"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="text-sm font-medium w-6 text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                className="p-1 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-100"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="p-4 border-t bg-gray-50">
                        <div className="flex justify-between mb-4 font-bold text-lg">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};
