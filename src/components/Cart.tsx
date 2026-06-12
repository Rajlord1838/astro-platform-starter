import React, { useState, useEffect } from 'react';
import { getCartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } from '../utils/cart';
import type { CartItem } from '../types';

interface CartProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const updateCartState = () => {
            setItems(getCartItems());
            setTotal(getCartTotal());
        };

        if (isOpen) {
            updateCartState();
        }

        window.addEventListener('cart-updated', updateCartState);
        return () => window.removeEventListener('cart-updated', updateCartState);
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 overflow-hidden z-50">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
                <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                    <div className="w-screen max-w-md">
                        <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                            <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                                <div className="flex items-start justify-between">
                                    <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
                                        Shopping cart
                                    </h2>
                                    <div className="ml-3 h-7 flex items-center">
                                        <button
                                            type="button"
                                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                            onClick={onClose}
                                        >
                                            <span className="sr-only">Close panel</span>
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <div className="flow-root">
                                        {items.length === 0 ? (
                                            <p className="text-gray-500 text-center py-8">Your cart is empty.</p>
                                        ) : (
                                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                {items.map((item) => (
                                                    <li key={item.product.id} className="py-6 flex">
                                                        <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                                            <img
                                                                src={item.product.image}
                                                                alt={item.product.name}
                                                                className="w-full h-full object-center object-cover"
                                                            />
                                                        </div>

                                                        <div className="ml-4 flex-1 flex flex-col">
                                                            <div>
                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>{item.product.name}</h3>
                                                                    <p className="ml-4">${(item.product.price * item.quantity).toFixed(2)}</p>
                                                                </div>
                                                                <p className="mt-1 text-sm text-gray-500">{item.product.category}</p>
                                                            </div>
                                                            <div className="flex-1 flex items-end justify-between text-sm">
                                                                <div className="flex items-center">
                                                                    <label htmlFor={`quantity-${item.product.id}`} className="mr-2 text-gray-500">Qty</label>
                                                                    <select
                                                                        id={`quantity-${item.product.id}`}
                                                                        value={item.quantity}
                                                                        onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value))}
                                                                        className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                    >
                                                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                                                            <option key={num} value={num}>{num}</option>
                                                                        ))}
                                                                    </select>
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

                            {items.length > 0 && (
                                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Subtotal</p>
                                        <p>${total.toFixed(2)}</p>
                                    </div>
                                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                    <div className="mt-6">
                                        <button
                                            onClick={() => {
                                                alert('Checkout not implemented');
                                                clearCart();
                                                onClose();
                                            }}
                                            className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                        >
                                            Checkout
                                        </button>
                                    </div>
                                    <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                                        <p>
                                            or{' '}
                                            <button
                                                type="button"
                                                className="text-indigo-600 font-medium hover:text-indigo-500"
                                                onClick={onClose}
                                            >
                                                Continue Shopping<span aria-hidden="true"> &rarr;</span>
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
