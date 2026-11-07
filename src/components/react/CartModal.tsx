import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { getCartItems, updateQuantity, removeFromCart, toggleCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function CartModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const updateItems = () => setItems(getCartItems());

        const handleToggle = (e: CustomEvent<{ open?: boolean }>) => {
            if (e.detail?.open !== undefined) {
                setIsOpen(e.detail.open);
            } else {
                setIsOpen(prev => !prev);
            }
        };

        // Initial items
        updateItems();

        // Listeners
        window.addEventListener('cart-updated', updateItems);
        window.addEventListener('toggle-cart', handleToggle as EventListener);

        return () => {
            window.removeEventListener('cart-updated', updateItems);
            window.removeEventListener('toggle-cart', handleToggle as EventListener);
        };
    }, []);

    if (!isOpen) return null;

    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
            />
            <div className="relative flex flex-col w-full max-w-md h-full bg-gray-950 shadow-2xl animate-in slide-in-from-right duration-300">
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <h2 className="text-2xl font-bold text-white mb-0">Shopping Cart</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 text-gray-400 transition-colors rounded-full hover:text-white hover:bg-gray-800"
                        aria-label="Close cart"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <ShoppingCart size={48} className="mb-4 opacity-50" />
                            <p className="text-lg">Your cart is empty</p>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.product.id} className="flex gap-4 p-4 bg-gray-900 rounded-lg">
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-20 h-24 object-cover rounded bg-gray-800"
                                />
                                <div className="flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-semibold text-white">{item.product.name}</h3>
                                        <button
                                            onClick={() => removeFromCart(item.product.id)}
                                            className="text-gray-500 hover:text-primary transition-colors"
                                            aria-label={`Remove ${item.product.name}`}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <div className="text-gray-400 text-sm mb-2">{item.product.category}</div>
                                    <div className="mt-auto flex items-center justify-between">
                                        <span className="font-bold text-primary">${item.product.price.toFixed(2)}</span>
                                        <div className="flex items-center gap-3 bg-gray-800 rounded-md p-1">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                className="p-1 text-gray-400 hover:text-white transition-colors"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-4 text-center text-sm font-semibold">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                className="p-1 text-gray-400 hover:text-white transition-colors"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="p-6 border-t border-gray-800 bg-gray-950">
                        <div className="flex justify-between items-center mb-4 text-lg font-bold text-white">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
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

// Needed because ShoppingCart is used in empty state but wasn't imported initially
import { ShoppingCart } from 'lucide-react';
