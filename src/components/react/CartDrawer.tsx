import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { getCart, updateQuantity, removeFromCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function CartDrawer() {
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const updateCartData = () => setCart(getCart());
        const handleToggle = () => setIsOpen((prev) => !prev);

        window.addEventListener('cart-updated', updateCartData);
        window.addEventListener('toggle-cart', handleToggle);

        updateCartData();

        return () => {
            window.removeEventListener('cart-updated', updateCartData);
            window.removeEventListener('toggle-cart', handleToggle);
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [isOpen]);

    const handleClose = () => setIsOpen(false);

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <dialog
            ref={dialogRef}
            className="m-0 ml-auto h-full max-h-none w-full max-w-md bg-white shadow-xl backdrop:bg-black/50 open:animate-slide-in-right p-0 border-0"
            onClose={handleClose}
        >
            <div className="flex flex-col h-full bg-white">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" />
                        Your Cart
                    </h2>
                    <button
                        onClick={handleClose}
                        className="p-2 -mr-2 text-slate-400 hover:text-slate-900 transition-colors"
                        aria-label="Close Cart"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
                            <ShoppingBag className="w-12 h-12 text-slate-300" />
                            <p>Your cart is empty.</p>
                            <button
                                onClick={handleClose}
                                className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-md font-medium hover:bg-slate-800 transition-colors"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="w-24 h-24 bg-slate-100 rounded-md overflow-hidden shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium text-slate-900 line-clamp-1">{item.name}</h3>
                                                <p className="text-sm text-slate-500 mt-1">{item.category}</p>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-slate-400 hover:text-destructive transition-colors p-1"
                                                aria-label={`Remove ${item.name}`}
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center border rounded-md">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors disabled:opacity-50"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus className="w-3.5 h-3.5" />
                                                </button>
                                                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                            <p className="font-semibold text-slate-900">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="border-t p-6 bg-slate-50">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-medium text-slate-900">Subtotal</span>
                            <span className="font-bold text-lg">${total.toFixed(2)}</span>
                        </div>
                        <p className="text-sm text-slate-500 mb-6">Shipping and taxes calculated at checkout.</p>
                        <button className="w-full bg-indigo-600 text-white font-medium py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </dialog>
    );
}
