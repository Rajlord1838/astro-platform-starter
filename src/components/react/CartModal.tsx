import React, { useState, useEffect, useRef } from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import type { CartItem } from '../../types';
import { getCart, removeFromCart, updateQuantity, toggleCart } from '../../utils/cart';

export default function CartModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        // Initial load
        setCartItems(getCart());

        const handleCartUpdate = (e: Event) => {
            const customEvent = e as CustomEvent<CartItem[]>;
            setCartItems(customEvent.detail || getCart());
        };

        const handleToggleCart = (e: Event) => {
            const customEvent = e as CustomEvent<boolean>;
            setIsOpen(customEvent.detail);
        };

        window.addEventListener('cart-updated', handleCartUpdate);
        window.addEventListener('toggle-cart', handleToggleCart);

        return () => {
            window.removeEventListener('cart-updated', handleCartUpdate);
            window.removeEventListener('toggle-cart', handleToggleCart);
        };
    }, []);

    useEffect(() => {
        if (isOpen && dialogRef.current && !dialogRef.current.open) {
            dialogRef.current.showModal();
        } else if (!isOpen && dialogRef.current && dialogRef.current.open) {
            dialogRef.current.close();
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsOpen(false);
        toggleCart(false);
    };

    const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <dialog
            ref={dialogRef}
            onClose={handleClose}
            className="backdrop:bg-gray-900/50 m-0 max-w-full md:m-auto h-full max-h-none w-full md:h-[80vh] md:max-h-[800px] md:w-[500px] md:rounded-xl shadow-2xl p-0 open:flex flex-col bg-white overflow-hidden left-auto right-0 md:left-0 md:right-0 fixed top-0"
        >
            <div className="flex items-center justify-between border-b p-4">
                <h2 className="text-xl font-bold">Your Cart</h2>
                <button
                    onClick={handleClose}
                    className="rounded-full p-2 hover:bg-gray-100 transition-colors"
                    aria-label="Close cart"
                >
                    <X size={24} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                {cartItems.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center text-center text-gray-500">
                        <p>Your cart is empty.</p>
                        <button
                            onClick={handleClose}
                            className="mt-4 text-pink-500 hover:underline"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <ul className="space-y-4">
                        {cartItems.map((item) => (
                            <li key={item.product.id} className="flex gap-4 py-2">
                                <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                        src={item.product.imageUrl}
                                        alt={item.product.name}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <h3>{item.product.name}</h3>
                                            <p className="ml-4">${(item.product.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center border rounded">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                className="px-2 py-1 hover:bg-gray-100"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="px-2">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                className="px-2 py-1 hover:bg-gray-100"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeFromCart(item.product.id)}
                                            className="font-medium text-pink-500 hover:text-pink-600 flex items-center gap-1"
                                        >
                                            <Trash2 size={16} /> Remove
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {cartItems.length > 0 && (
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6 bg-gray-50">
                    <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                        <p>Subtotal</p>
                        <p>${total.toFixed(2)}</p>
                    </div>
                    <div className="mt-6">
                        <button
                            onClick={() => alert('Checkout not implemented')}
                            className="flex w-full items-center justify-center rounded-md border border-transparent bg-pink-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-pink-700"
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </dialog>
    );
}
