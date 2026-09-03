import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { CART_UPDATED_EVENT, TOGGLE_CART_EVENT, getCart, updateQuantity, removeFromCart, toggleCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const updateCart = () => {
            setCartItems(getCart());
        };

        const handleToggle = () => {
            setIsOpen(prev => !prev);
        };

        updateCart(); // Initial load

        window.addEventListener(CART_UPDATED_EVENT, updateCart as EventListener);
        window.addEventListener(TOGGLE_CART_EVENT, handleToggle as EventListener);

        return () => {
            window.removeEventListener(CART_UPDATED_EVENT, updateCart as EventListener);
            window.removeEventListener(TOGGLE_CART_EVENT, handleToggle as EventListener);
        };
    }, []);

    const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gray-900/75 transition-opacity" aria-hidden="true" onClick={toggleCart}></div>

                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                    <div className="pointer-events-auto w-screen max-w-md transform transition-transform duration-500 ease-in-out">
                        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                <div className="flex items-start justify-between">
                                    <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                                    <div className="ml-3 flex h-7 items-center">
                                        <button
                                            type="button"
                                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                            onClick={toggleCart}
                                        >
                                            <span className="absolute -inset-0.5"></span>
                                            <span className="sr-only">Close panel</span>
                                            <X size={24} />
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <div className="flow-root">
                                        {cartItems.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center h-full text-gray-500 mt-20">
                                                <ShoppingBag size={48} className="mb-4 text-gray-400" />
                                                <p>Your cart is empty.</p>
                                            </div>
                                        ) : (
                                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                {cartItems.map((item) => (
                                                    <li key={item.product.id} className="flex py-6">
                                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img
                                                                src={item.product.imageUrl}
                                                                alt={item.product.name}
                                                                className="h-full w-full object-cover object-center"
                                                            />
                                                        </div>

                                                        <div className="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>{item.product.name}</h3>
                                                                    <p className="ml-4">${(item.product.price * item.quantity).toFixed(2)}</p>
                                                                </div>
                                                                <p className="mt-1 text-sm text-gray-500">{item.product.category}</p>
                                                            </div>
                                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                                <div className="flex items-center border rounded">
                                                                    <button
                                                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                                        className="p-1 text-gray-600 hover:bg-gray-100"
                                                                    >
                                                                        <Minus size={16} />
                                                                    </button>
                                                                    <span className="px-3 text-gray-900">{item.quantity}</span>
                                                                    <button
                                                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                                        className="p-1 text-gray-600 hover:bg-gray-100"
                                                                    >
                                                                        <Plus size={16} />
                                                                    </button>
                                                                </div>

                                                                <div className="flex">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => removeFromCart(item.product.id)}
                                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                    >
                                                                        Remove
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
                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Subtotal</p>
                                        <p>${total.toFixed(2)}</p>
                                    </div>
                                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                    <div className="mt-6">
                                        <a href="#" className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                                            Checkout
                                        </a>
                                    </div>
                                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                        <p>
                                            or{' '}
                                            <button
                                                type="button"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                onClick={toggleCart}
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
    );
}
