import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { getCart, updateQuantity, removeFromCart, TOGGLE_CART_EVENT, CART_UPDATED_EVENT } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function CartModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const dialogRef = useRef<HTMLDialogElement>(null);

    const refreshCart = () => {
        setCartItems(getCart());
    };

    useEffect(() => {
        const handleToggle = (e: Event) => {
            const customEvent = e as CustomEvent;
            const shouldOpen = customEvent.detail?.open;

            if (shouldOpen !== undefined) {
                setIsOpen(shouldOpen);
            } else {
                setIsOpen(prev => !prev);
            }
        };

        window.addEventListener(TOGGLE_CART_EVENT, handleToggle);
        window.addEventListener(CART_UPDATED_EVENT, refreshCart);

        // Initial load
        refreshCart();

        return () => {
            window.removeEventListener(TOGGLE_CART_EVENT, handleToggle);
            window.removeEventListener(CART_UPDATED_EVENT, refreshCart);
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
    };

    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <dialog
            ref={dialogRef}
            onClose={handleClose}
            className="backdrop:bg-black/50 p-0 m-auto rounded-lg shadow-xl w-full max-w-md max-h-[90vh] bg-white text-gray-800"
        >
            <div className="flex flex-col h-full max-h-[90vh]">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-bold">Your Cart</h2>
                    <button
                        onClick={handleClose}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                        aria-label="Close cart"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {cartItems.length === 0 ? (
                        <div className="text-center text-gray-500 py-10">
                            Your cart is empty.
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {cartItems.map((item) => (
                                <li key={item.id} className="flex gap-4 p-2 border rounded-lg bg-gray-50">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        className="w-20 h-20 object-cover rounded-md"
                                    />
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                            <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center border rounded bg-white">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1 hover:bg-gray-100 cursor-pointer"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="px-3 font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 hover:bg-gray-100 cursor-pointer"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="p-4 border-t bg-gray-50">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-bold text-lg">Total</span>
                            <span className="font-bold text-xl text-primary">${cartTotal.toFixed(2)}</span>
                        </div>
                        <button
                            className="w-full btn btn-lg cursor-pointer"
                            onClick={() => alert('Checkout not implemented yet!')}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </dialog>
    );
}
