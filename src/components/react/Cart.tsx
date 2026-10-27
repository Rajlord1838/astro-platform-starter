import React, { useState, useEffect, useRef } from 'react';
import type { CartItem } from '../../types';
import { getCart, updateQuantity, removeFromCart, toggleCart as dispatchToggleCart } from '../../utils/cart';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';

export default function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState<CartItem[]>([]);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        // Initial load
        setItems(getCart());

        const handleCartUpdate = (e: Event) => {
            const customEvent = e as CustomEvent<CartItem[]>;
            setItems(customEvent.detail);
        };

        const handleToggleCart = (e: Event) => {
            const customEvent = e as CustomEvent<boolean | undefined>;
            setIsOpen(prev => customEvent.detail !== undefined ? customEvent.detail : !prev);
        };

        window.addEventListener('cart-updated', handleCartUpdate);
        window.addEventListener('toggle-cart', handleToggleCart);

        return () => {
            window.removeEventListener('cart-updated', handleCartUpdate);
            window.removeEventListener('toggle-cart', handleToggleCart);
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [isOpen]);

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleClose = () => {
        setIsOpen(false);
        dispatchToggleCart(false);
    };

    return (
        <dialog
            ref={dialogRef}
            className="m-0 ml-auto h-full max-h-none w-full max-w-md bg-white p-0 shadow-2xl backdrop:bg-black/50 open:animate-slide-in-right"
            onClose={handleClose}
        >
            <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b px-4 py-4 sm:px-6">
                    <h2 className="text-lg font-medium text-gray-900">Shopping cart</h2>
                    <button
                        type="button"
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        onClick={handleClose}
                        aria-label="Close cart"
                    >
                        <X size={24} aria-hidden="true" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    {items.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center text-gray-500 gap-4">
                            <ShoppingBag size={48} className="text-gray-300" />
                            <p>Your cart is empty</p>
                        </div>
                    ) : (
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {items.map((item) => (
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
                                                <p className="ml-4">${item.price * item.quantity}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <div className="flex items-center border border-gray-200 rounded">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1 text-gray-500 hover:bg-gray-100"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="px-3 py-1 font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 text-gray-500 hover:bg-gray-100"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>

                                            <div className="flex">
                                                <button
                                                    type="button"
                                                    onClick={() => removeFromCart(item.id)}
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

                {items.length > 0 && (
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>${total.toFixed(2)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6">
                            <button
                                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                onClick={() => alert('Checkout not implemented')}
                            >
                                Checkout
                            </button>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                                or{' '}
                                <button
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                    onClick={handleClose}
                                >
                                    Continue Shopping
                                    <span aria-hidden="true"> &rarr;</span>
                                </button>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </dialog>
    );
}
