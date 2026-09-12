import React, { useEffect, useState } from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { getCart, subscribeToCartUpdates, updateQuantity, removeFromCart, getCartTotal } from '../../utils/cart';
import type { CartItem } from '../../types';

export function CartDrawer() {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        // Initial load
        setCartItems(getCart());

        // Subscriptions
        const unsubscribeCart = subscribeToCartUpdates(() => {
            setCartItems(getCart());
        });

        const handleToggleCart = () => setIsOpen(prev => !prev);
        window.addEventListener('toggle-cart', handleToggleCart);

        return () => {
            unsubscribeCart();
            window.removeEventListener('toggle-cart', handleToggleCart);
        };
    }, []);

    const total = getCartTotal(cartItems);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={() => setIsOpen(false)} />

            <div className="absolute inset-y-0 right-0 flex max-w-full">
                <div className="w-screen max-w-md transform transition-transform duration-300 ease-in-out">
                    <div className="flex h-full flex-col bg-white shadow-xl">
                        <div className="flex items-center justify-between px-4 py-6 sm:px-6 border-b">
                            <h2 className="text-lg font-medium text-gray-900">Shopping cart</h2>
                            <button
                                type="button"
                                className="text-gray-400 hover:text-gray-500"
                                onClick={() => setIsOpen(false)}
                            >
                                <span className="sr-only">Close panel</span>
                                <X size={24} aria-hidden="true" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                            {cartItems.length === 0 ? (
                                <div className="flex h-full flex-col items-center justify-center text-gray-500">
                                    <p>Your cart is empty</p>
                                </div>
                            ) : (
                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                    {cartItems.map((item) => (
                                        <li key={item.id} className="flex py-6">
                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
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
                                                    <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <div className="flex items-center border rounded">
                                                        <button
                                                            className="px-2 py-1 hover:bg-gray-100"
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="px-2">{item.quantity}</span>
                                                        <button
                                                            className="px-2 py-1 hover:bg-gray-100"
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="font-medium text-primary hover:text-primary/80 flex items-center gap-1"
                                                    >
                                                        <Trash2 size={16} />
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>${total.toFixed(2)}</p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                <div className="mt-6">
                                    <a
                                        href="#"
                                        className="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary/85"
                                        onClick={(e) => { e.preventDefault(); alert('Checkout functionality would go here!'); }}
                                    >
                                        Checkout
                                    </a>
                                </div>
                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                    <p>
                                        or{' '}
                                        <button
                                            type="button"
                                            className="font-medium text-primary hover:text-primary/80"
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
    );
}
