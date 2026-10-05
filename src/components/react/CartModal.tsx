import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { getCartItems, updateQuantity, removeFromCart, getCartTotal } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function CartModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState<CartItem[]>([]);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const handleToggle = () => setIsOpen(prev => !prev);
        const handleCartUpdated = () => setItems(getCartItems());

        window.addEventListener('toggle-cart', handleToggle);
        window.addEventListener('cart-updated', handleCartUpdated as EventListener);

        // Initial load
        setItems(getCartItems());

        return () => {
            window.removeEventListener('toggle-cart', handleToggle);
            window.removeEventListener('cart-updated', handleCartUpdated as EventListener);
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === dialogRef.current) {
            handleClose();
        }
    };

    const total = getCartTotal();

    return (
        <dialog
            ref={dialogRef}
            onClick={handleBackdropClick}
            onClose={() => setIsOpen(false)}
            className="fixed inset-y-0 right-0 m-0 ml-auto h-full max-h-none w-full max-w-md bg-white text-gray-900 shadow-xl backdrop:bg-black/50 open:animate-in open:slide-in-from-right"
        >
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">Shopping Cart</h2>
                    <button
                        onClick={handleClose}
                        className="p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-100"
                        aria-label="Close cart"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <p>Your cart is empty</p>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.product.id} className="flex gap-4 p-2 bg-gray-50 rounded-lg">
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-20 h-24 object-cover rounded"
                                />
                                <div className="flex flex-col flex-1">
                                    <div className="flex justify-between">
                                        <h3 className="font-medium text-sm leading-tight">{item.product.name}</h3>
                                        <p className="font-semibold text-sm">${(item.product.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">{item.product.category}</p>

                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex items-center border border-gray-300 rounded-md bg-white">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                className="p-1 text-gray-600 hover:text-black hover:bg-gray-100 disabled:opacity-50"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                className="p-1 text-gray-600 hover:text-black hover:bg-gray-100"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.product.id)}
                                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                                            aria-label="Remove item"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="border-t border-gray-200 p-4 bg-gray-50">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-base font-semibold">Subtotal</span>
                            <span className="text-xl font-bold">${total.toFixed(2)}</span>
                        </div>
                        <button className="w-full btn btn-lg">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </dialog>
    );
}
