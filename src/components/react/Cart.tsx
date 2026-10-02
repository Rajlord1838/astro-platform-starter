import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { getCart, removeFromCart, updateQuantity } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const loadCart = () => {
        setCartItems(getCart());
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

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen]);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const cartTotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

    if (!isOpen) return null;

    return (
        <div className="relative z-50" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-75 transition-opacity backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
            ></div>

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <div className="pointer-events-auto w-screen max-w-md transform transition ease-in-out duration-500 sm:duration-700">
                            <div className="flex h-full flex-col overflow-y-scroll bg-gray-900 shadow-xl border-l border-gray-800">
                                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <h2 className="text-xl font-bold text-white flex items-center gap-2" id="slide-over-title">
                                            <ShoppingBag className="h-6 w-6 text-primary" />
                                            Shopping Cart
                                        </h2>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button
                                                type="button"
                                                className="relative -m-2 p-2 text-gray-400 hover:text-white transition-colors"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                <span className="absolute -inset-0.5"></span>
                                                <span className="sr-only">Close panel</span>
                                                <X className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <div className="flow-root">
                                            {cartItems.length === 0 ? (
                                                <div className="text-center py-12">
                                                    <ShoppingBag className="mx-auto h-12 w-12 text-gray-500 mb-4" />
                                                    <p className="text-gray-400 text-lg">Your cart is empty</p>
                                                    <button
                                                        onClick={() => setIsOpen(false)}
                                                        className="mt-6 text-primary hover:text-primary/80 font-medium"
                                                    >
                                                        Continue Shopping &rarr;
                                                    </button>
                                                </div>
                                            ) : (
                                                <ul role="list" className="-my-6 divide-y divide-gray-800">
                                                    {cartItems.map((item) => (
                                                        <li key={item.product.id} className="flex py-6">
                                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-800 bg-gray-800">
                                                                <img
                                                                    src={item.product.image}
                                                                    alt={item.product.name}
                                                                    className="h-full w-full object-cover object-center"
                                                                />
                                                            </div>

                                                            <div className="ml-4 flex flex-1 flex-col justify-between">
                                                                <div>
                                                                    <div className="flex justify-between text-base font-medium text-white">
                                                                        <h3 className="line-clamp-2">
                                                                            <a href="#">{item.product.name}</a>
                                                                        </h3>
                                                                        <p className="ml-4 text-primary whitespace-nowrap">${(item.product.price * item.quantity).toFixed(2)}</p>
                                                                    </div>
                                                                    <p className="mt-1 text-sm text-gray-400">${item.product.price.toFixed(2)} each</p>
                                                                </div>
                                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                                    <div className="flex items-center border border-gray-700 rounded-md bg-gray-800">
                                                                        <button
                                                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                                            className="p-1 hover:bg-gray-700 text-gray-300 rounded-l-md transition-colors"
                                                                            aria-label="Decrease quantity"
                                                                        >
                                                                            <Minus className="h-4 w-4" />
                                                                        </button>
                                                                        <span className="px-3 font-medium text-white">{item.quantity}</span>
                                                                        <button
                                                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                                            className="p-1 hover:bg-gray-700 text-gray-300 rounded-r-md transition-colors"
                                                                            aria-label="Increase quantity"
                                                                        >
                                                                            <Plus className="h-4 w-4" />
                                                                        </button>
                                                                    </div>

                                                                    <div className="flex">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => removeFromCart(item.product.id)}
                                                                            className="font-medium text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors p-1"
                                                                        >
                                                                            <Trash2 className="h-4 w-4" />
                                                                            <span className="sr-only">Remove</span>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {cartItems.length > 0 && (
                                    <div className="border-t border-gray-800 px-4 py-6 sm:px-6 bg-gray-900">
                                        <div className="flex justify-between text-lg font-bold text-white mb-4">
                                            <p>Subtotal</p>
                                            <p>${cartTotal.toFixed(2)}</p>
                                        </div>
                                        <p className="mt-0.5 text-sm text-gray-400 mb-6">Shipping and taxes calculated at checkout.</p>
                                        <div className="mt-6">
                                            <a
                                                href="#"
                                                className="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-4 text-base font-medium text-primary-content shadow-sm hover:bg-primary/90 transition-colors w-full"
                                            >
                                                Checkout
                                            </a>
                                        </div>
                                        <div className="mt-6 flex justify-center text-center text-sm text-gray-400">
                                            <p>
                                                or{' '}
                                                <button
                                                    type="button"
                                                    className="font-medium text-primary hover:text-primary/80 transition-colors"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    Continue Shopping
                                                    <span aria-hidden="true"> &rarr;</span>
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
