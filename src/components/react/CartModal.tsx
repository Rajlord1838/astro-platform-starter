import React, { useEffect, useState } from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem } from '../../types';
import { getCart, updateQuantity, removeFromCart } from '../../utils/cart';

export default function CartModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        setCartItems(getCart());

        const handleToggle = () => setIsOpen(prev => !prev);

        const handleCartUpdated = (event: CustomEvent) => {
            setCartItems(event.detail);
        };

        window.addEventListener('toggle-cart', handleToggle);
        window.addEventListener('cart-updated', handleCartUpdated as EventListener);

        return () => {
            window.removeEventListener('toggle-cart', handleToggle);
            window.removeEventListener('cart-updated', handleCartUpdated as EventListener);
        };
    }, []);

    if (!isOpen) return null;

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
            <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={() => setIsOpen(false)}></div>
            <div className="fixed inset-y-0 right-0 z-50 flex max-w-full pl-10">
                <div className="w-screen max-w-md transform transition-transform duration-300 ease-in-out">
                    <div className="flex h-full flex-col bg-white shadow-xl text-gray-900">
                        <div className="flex items-center justify-between px-4 py-6 sm:px-6">
                            <h2 className="text-xl font-medium" id="slide-over-title">Shopping Cart</h2>
                            <div className="ml-3 flex h-7 items-center">
                                <button
                                    type="button"
                                    className="relative -m-2 p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span className="sr-only">Close panel</span>
                                    <X size={24} />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                            {cartItems.length === 0 ? (
                                <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
                            ) : (
                                <div className="mt-8">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {cartItems.map((item) => (
                                            <li key={item.id} className="flex py-6">
                                                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>

                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>{item.name}</h3>
                                                            <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                                                    </div>
                                                    <div className="flex flex-1 items-end justify-between text-sm mt-4">
                                                        <div className="flex items-center border rounded">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className="px-2 py-1 hover:bg-gray-100"
                                                            >
                                                                <Minus size={16} />
                                                            </button>
                                                            <span className="px-2">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="px-2 py-1 hover:bg-gray-100"
                                                            >
                                                                <Plus size={16} />
                                                            </button>
                                                        </div>

                                                        <div className="flex">
                                                            <button
                                                                type="button"
                                                                onClick={() => removeFromCart(item.id)}
                                                                className="font-medium text-red-600 hover:text-red-500 flex items-center gap-1"
                                                            >
                                                                <Trash2 size={16} /> Remove
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

                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Subtotal</p>
                                <p>${total.toFixed(2)}</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                            <div className="mt-6">
                                <a
                                    href="#"
                                    className="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary/90"
                                >
                                    Checkout
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
