import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Trash2 } from 'lucide-react';
import { getCart, removeFromCart, updateQuantity } from '../utils/cart';
import type { CartItem } from '../types';

export const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const updateCartState = () => {
        setCartItems(getCart());
    };

    useEffect(() => {
        updateCartState();
        window.addEventListener('cart-updated', updateCartState);
        return () => window.removeEventListener('cart-updated', updateCartState);
    }, []);

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-white transition hover:text-primary"
                aria-label="Shopping Cart"
            >
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                    <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded-full bg-primary">
                        {totalItems}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 z-50 w-80 p-4 mt-2 bg-white rounded-lg shadow-xl text-gray-900 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold">Your Cart</h3>
                        <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                            <X size={20} />
                        </button>
                    </div>

                    {cartItems.length === 0 ? (
                        <p className="py-4 text-center text-gray-500">Your cart is empty.</p>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-3 max-h-80 overflow-y-auto">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center gap-3 pb-3 border-b border-gray-100">
                                        <img src={item.image} alt={item.name} className="object-cover w-12 h-12 rounded" />
                                        <div className="flex-1">
                                            <h4 className="text-sm font-semibold truncate">{item.name}</h4>
                                            <p className="text-xs text-gray-500">${item.price.toFixed(2)}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-6 h-6 text-xs bg-gray-100 rounded hover:bg-gray-200"
                                                >-</button>
                                                <span className="text-xs w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-6 h-6 text-xs bg-gray-100 rounded hover:bg-gray-200"
                                                >+</button>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="p-1 text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="pt-2">
                                <div className="flex justify-between mb-4 text-lg font-bold">
                                    <span>Total:</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <button className="w-full btn">Checkout</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
