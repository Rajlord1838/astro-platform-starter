import React, { useState, useEffect, useRef } from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { getCart, updateQuantity, removeFromCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export const CartModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        // Handle toggling modal
        const handleToggle = () => setIsOpen(prev => !prev);

        // Handle cart updates
        const handleCartUpdate = (e: Event) => {
            const customEvent = e as CustomEvent<CartItem[]>;
            setCart(customEvent.detail);
        };

        window.addEventListener('toggle-cart', handleToggle);
        window.addEventListener('cart-updated', handleCartUpdate);

        // Initial load
        setCart(getCart());

        return () => {
            window.removeEventListener('toggle-cart', handleToggle);
            window.removeEventListener('cart-updated', handleCartUpdate);
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsOpen(false);
    };

    const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <dialog
            ref={dialogRef}
            onClose={handleClose}
            className="backdrop:bg-black/50 p-0 m-0 ml-auto mr-0 h-full max-h-screen w-full sm:w-96 bg-white shadow-xl transition-transform open:animate-in open:slide-in-from-right"
        >
            <div className="flex flex-col h-full bg-white">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-bold">Shopping Cart</h2>
                    <button
                        onClick={handleClose}
                        className="p-2 text-gray-500 hover:text-black rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <p className="mb-4">Your cart is empty.</p>
                            <button
                                onClick={handleClose}
                                className="text-black underline font-medium hover:text-gray-700"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <ul className="space-y-6">
                            {cart.map(item => (
                                <li key={item.id} className="flex gap-4">
                                    <div className="w-20 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        <div className="flex justify-between">
                                            <h3 className="font-medium text-sm sm:text-base leading-tight text-gray-900">{item.name}</h3>
                                            <p className="font-bold ml-2">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">{item.category}</p>

                                        <div className="flex items-center justify-between mt-auto pt-2">
                                            <div className="flex items-center border rounded-md">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1 text-gray-500 hover:text-black hover:bg-gray-50 transition-colors focus:outline-none"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="w-8 text-center text-sm font-medium">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 text-gray-500 hover:text-black hover:bg-gray-50 transition-colors focus:outline-none"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-400 hover:text-red-500 p-1 transition-colors focus:outline-none"
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

                {cart.length > 0 && (
                    <div className="border-t p-4 bg-gray-50">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-medium text-gray-900">Subtotal</span>
                            <span className="text-xl font-bold text-gray-900">${totalAmount.toFixed(2)}</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">Shipping and taxes calculated at checkout.</p>
                        <button className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-md font-medium text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </dialog>
    );
};
