import React, { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import { getCartItems, removeFromCart, toggleCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function CartModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState<CartItem[]>([]);

    useEffect(() => {
        // Initial load
        setItems(getCartItems());

        const handleToggle = () => setIsOpen(prev => !prev);
        const handleCartUpdate = (e: CustomEvent<CartItem[]>) => setItems(e.detail);

        window.addEventListener('toggle-cart', handleToggle);
        window.addEventListener('cart-updated', handleCartUpdate as EventListener);

        return () => {
            window.removeEventListener('toggle-cart', handleToggle);
            window.removeEventListener('cart-updated', handleCartUpdate as EventListener);
        };
    }, []);

    if (!isOpen) return null;

    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 transition-opacity">
            <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right text-gray-900">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold">Your Cart</h2>
                    <button onClick={toggleCart} className="p-2 text-gray-500 hover:text-black rounded-full hover:bg-gray-100 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <p className="mb-4">Your cart is empty.</p>
                            <button onClick={toggleCart} className="btn bg-black text-white hover:bg-gray-800">
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {items.map((item) => (
                                <li key={item.product.id} className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
                                    <img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-sm">{item.product.name}</h3>
                                        <p className="text-gray-500 text-sm">${item.product.price.toFixed(2)} x {item.quantity}</p>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.product.id)}
                                        className="text-red-500 hover:text-red-700 p-2"
                                        aria-label="Remove item"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="border-t border-gray-200 p-4 bg-gray-50">
                        <div className="flex justify-between items-center mb-4 text-lg font-bold">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <button className="w-full btn bg-black text-white hover:bg-gray-800 py-3 text-lg rounded-lg shadow-md transition-colors">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
