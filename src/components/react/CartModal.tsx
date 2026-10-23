import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { getCart, updateQuantity, removeFromCart, toggleCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function CartModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const handleToggle = (e: CustomEvent<boolean>) => {
            setIsOpen(e.detail);
        };
        const handleUpdate = (e: CustomEvent<CartItem[]>) => {
            setCart(e.detail);
        };

        setCart(getCart());

        window.addEventListener('toggle-cart', handleToggle as EventListener);
        window.addEventListener('cart-updated', handleUpdate as EventListener);

        return () => {
            window.removeEventListener('toggle-cart', handleToggle as EventListener);
            window.removeEventListener('cart-updated', handleUpdate as EventListener);
        };
    }, []);

    useEffect(() => {
        if (isOpen && dialogRef.current && !dialogRef.current.open) {
            dialogRef.current.showModal();
        } else if (!isOpen && dialogRef.current && dialogRef.current.open) {
            dialogRef.current.close();
        }
    }, [isOpen]);

    const closeCart = () => toggleCart(false);

    const handleNativeClose = () => {
        setIsOpen(false);
    };

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <dialog
            ref={dialogRef}
            onClose={handleNativeClose}
            className="fixed inset-y-0 right-0 left-auto m-0 h-full max-h-none w-full max-w-md bg-gray-900 text-white backdrop:bg-black/50 shadow-2xl overflow-hidden sm:w-[400px]"
        >
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <ShoppingBag size={20} />
                        Your Cart
                    </h2>
                    <button
                        onClick={closeCart}
                        className="p-2 hover:bg-gray-800 rounded-full transition cursor-pointer"
                        aria-label="Close cart"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-4">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                            <ShoppingBag size={48} className="opacity-20" />
                            <p>Your cart is empty.</p>
                            <button
                                onClick={closeCart}
                                className="btn mt-4"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {cart.map(item => (
                                <li key={item.id} className="flex gap-4 p-3 bg-gray-800/50 rounded-lg">
                                    <div className="w-20 h-20 bg-gray-800 rounded overflow-hidden shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-semibold text-sm line-clamp-2">{item.name}</h3>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-500 hover:text-red-400 p-1 cursor-pointer"
                                                aria-label={`Remove ${item.name}`}
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                        <p className="text-primary font-bold text-sm mt-1">${item.price.toFixed(2)}</p>

                                        <div className="mt-auto flex items-center gap-3 pt-2">
                                            <div className="flex items-center bg-gray-900 rounded-md border border-gray-700">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1 hover:text-primary disabled:opacity-50 cursor-pointer"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 hover:text-primary cursor-pointer"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="p-4 border-t border-gray-800 bg-gray-900/95">
                        <div className="flex justify-between items-center mb-4 text-lg font-bold">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <button className="btn w-full btn-lg">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </dialog>
    );
}
