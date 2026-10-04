import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';
import type { CartItem } from '../../types';
import { getCartItems, updateQuantity, removeFromCart, toggleCart } from '../../utils/cart';

export function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState<CartItem[]>([]);

    // Calculate totals
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Sync with local storage and listen for events
    useEffect(() => {
        // Initial load
        setItems(getCartItems());

        // Listen for custom events
        const handleCartUpdated = () => {
            setItems(getCartItems());
        };

        const handleToggleCart = () => {
            setIsOpen(prev => !prev);
        };

        window.addEventListener('cart-updated', handleCartUpdated);
        window.addEventListener('toggle-cart', handleToggleCart);

        return () => {
            window.removeEventListener('cart-updated', handleCartUpdated);
            window.removeEventListener('toggle-cart', handleToggleCart);
        };
    }, []);

    // Prevent body scrolling when cart is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={() => toggleCart()}
                aria-label="Close cart backdrop"
            />

            {/* Cart Panel */}
            <div className="relative w-full max-w-md bg-slate-900 shadow-2xl h-full flex flex-col transform transition-transform">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800">
                    <div className="flex items-center gap-2">
                        <ShoppingBag className="text-teal-400" />
                        <h2 className="text-xl font-bold text-white">Your Cart</h2>
                        <span className="bg-teal-500/20 text-teal-400 text-xs py-1 px-2 rounded-full font-semibold ml-2">
                            {totalItems} {totalItems === 1 ? 'item' : 'items'}
                        </span>
                    </div>
                    <button
                        onClick={() => toggleCart()}
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors"
                        aria-label="Close cart"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Cart Items List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
                            <ShoppingBag size={48} className="opacity-20" />
                            <p className="text-lg">Your cart is empty.</p>
                            <button
                                onClick={() => toggleCart()}
                                className="text-teal-400 hover:text-teal-300 font-semibold underline"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-4 bg-slate-800 p-3 rounded-lg border border-slate-700">
                                <div className="w-20 h-24 bg-slate-700 rounded overflow-hidden flex-shrink-0">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="flex justify-between items-start gap-2">
                                        <div>
                                            <h3 className="font-semibold text-white line-clamp-1">{item.name}</h3>
                                            <p className="text-slate-400 text-xs">{item.category}</p>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-slate-500 hover:text-red-400 transition-colors p-1"
                                            aria-label={`Remove ${item.name}`}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                    <div className="flex justify-between items-center mt-2">
                                        <div className="flex items-center gap-2 bg-slate-900 rounded-md border border-slate-700">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-1 text-slate-400 hover:text-white transition-colors"
                                                aria-label="Decrease quantity"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-1 text-slate-400 hover:text-white transition-colors"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <span className="font-bold text-white">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer / Checkout */}
                {items.length > 0 && (
                    <div className="p-4 border-t border-slate-700 bg-slate-800 space-y-4 shadow-[0_-10px_30px_rgba(0,0,0,0.3)]">
                        <div className="flex justify-between items-center text-slate-300">
                            <span>Subtotal</span>
                            <span className="font-bold text-white text-xl">${totalPrice.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-slate-500 text-center">
                            Shipping and taxes calculated at checkout.
                        </p>
                        <button className="w-full bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold py-3 px-4 rounded-lg transition-colors flex justify-center items-center gap-2">
                            <span>Proceed to Checkout</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
