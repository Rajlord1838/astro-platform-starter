import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { getCartItems, removeFromCart, updateQuantity } from '../../utils/cart';
import type { CartItem } from '../../types';

export function CartModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState<CartItem[]>([]);

    const updateItems = () => {
        setItems(getCartItems());
    };

    useEffect(() => {
        updateItems();
        const handleCartUpdated = () => updateItems();
        const handleToggleCart = () => setIsOpen(prev => !prev);

        window.addEventListener('cart-updated', handleCartUpdated);
        window.addEventListener('toggle-cart', handleToggleCart);

        return () => {
            window.removeEventListener('cart-updated', handleCartUpdated);
            window.removeEventListener('toggle-cart', handleToggleCart);
        };
    }, []);

    if (!isOpen) return null;

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
            <div className="bg-white w-full max-w-md h-full shadow-xl flex flex-col text-gray-900">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold">Shopping Cart</h2>
                    <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {items.length === 0 ? (
                        <p className="text-center text-gray-500 mt-8">Your cart is empty.</p>
                    ) : (
                        <ul className="space-y-4">
                            {items.map(item => (
                                <li key={item.id} className="flex gap-4 border-b border-gray-100 pb-4">
                                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                    <div className="flex-1 flex flex-col">
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <p className="text-gray-600">${item.price.toFixed(2)}</p>

                                        <div className="flex items-center gap-3 mt-auto pt-2">
                                            <div className="flex items-center border border-gray-300 rounded">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1 hover:bg-gray-100 cursor-pointer"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="px-2">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 hover:bg-gray-100 cursor-pointer"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="ml-auto text-red-500 hover:text-red-700 cursor-pointer"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="p-4 border-t border-gray-200">
                        <div className="flex justify-between items-center mb-4 text-xl font-bold">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <button className="w-full bg-primary hover:bg-primary/85 text-white font-bold py-3 px-4 rounded transition-colors cursor-pointer">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
