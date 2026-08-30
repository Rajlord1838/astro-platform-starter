import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { getCart, removeFromCart, updateQuantity, clearCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const loadCart = () => {
        setItems(getCart());
    };

    useEffect(() => {
        const handleToggle = () => setIsOpen(prev => !prev);

        window.addEventListener('toggle-cart', handleToggle);
        window.addEventListener('cart-updated', loadCart);

        loadCart();

        return () => {
            window.removeEventListener('toggle-cart', handleToggle);
            window.removeEventListener('cart-updated', loadCart);
        };
    }, []);

    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    const handleCheckout = () => {
        setIsCheckingOut(true);
        setTimeout(() => {
            clearCart();
            setIsCheckingOut(false);
            setIsOpen(false);
            alert("Thank you for your purchase!");
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
            <div className="absolute inset-0 bg-black/60 transition-opacity" onClick={() => setIsOpen(false)}></div>
            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                <div className="w-screen max-w-md transform transition ease-in-out duration-500">
                    <div className="h-full flex flex-col bg-slate-900 shadow-xl border-l border-slate-700">
                        <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                            <div className="flex items-start justify-between">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-2" id="slide-over-title">
                                    <ShoppingBag /> Your Cart
                                </h2>
                                <div className="ml-3 h-7 flex items-center">
                                    <button
                                        type="button"
                                        className="-m-2 p-2 text-slate-400 hover:text-white"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <span className="sr-only">Close panel</span>
                                        <X size={24} aria-hidden="true" />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-8">
                                {items.length === 0 ? (
                                    <p className="text-slate-400 text-center py-10">Your cart is empty.</p>
                                ) : (
                                    <div className="flow-root">
                                        <ul role="list" className="-my-6 divide-y divide-slate-700">
                                            {items.map((item) => (
                                                <li key={item.product.id} className="py-6 flex">
                                                    <div className="flex-shrink-0 w-24 h-24 border border-slate-700 rounded-md overflow-hidden bg-slate-800">
                                                        <img
                                                            src={item.product.image}
                                                            alt={item.product.name}
                                                            className="w-full h-full object-center object-cover"
                                                        />
                                                    </div>

                                                    <div className="ml-4 flex-1 flex flex-col">
                                                        <div>
                                                            <div className="flex justify-between text-base font-medium text-white">
                                                                <h3>{item.product.name}</h3>
                                                                <p className="ml-4">${(item.product.price * item.quantity).toFixed(2)}</p>
                                                            </div>
                                                            <p className="mt-1 text-sm text-slate-400">{item.product.category}</p>
                                                        </div>
                                                        <div className="flex-1 flex items-end justify-between text-sm">
                                                            <div className="flex items-center border border-slate-600 rounded-md">
                                                                <button
                                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                                    className="p-1 text-slate-300 hover:text-white hover:bg-slate-700 rounded-l-md transition-colors"
                                                                >
                                                                    <Minus size={16} />
                                                                </button>
                                                                <span className="px-3 text-white font-medium">{item.quantity}</span>
                                                                <button
                                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                                    className="p-1 text-slate-300 hover:text-white hover:bg-slate-700 rounded-r-md transition-colors"
                                                                >
                                                                    <Plus size={16} />
                                                                </button>
                                                            </div>

                                                            <div className="flex">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeFromCart(item.product.id)}
                                                                    className="font-medium text-primary hover:text-primary/80 transition-colors"
                                                                >
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {items.length > 0 && (
                            <div className="border-t border-slate-700 py-6 px-4 sm:px-6 bg-slate-800/50">
                                <div className="flex justify-between text-lg font-bold text-white mb-4">
                                    <p>Subtotal</p>
                                    <p>${total.toFixed(2)}</p>
                                </div>
                                <div className="mt-6">
                                    <button
                                        onClick={handleCheckout}
                                        disabled={isCheckingOut}
                                        className="btn w-full btn-lg flex justify-center items-center"
                                    >
                                        {isCheckingOut ? 'Processing...' : 'Checkout'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
