import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { getCart, updateQuantity, removeFromCart, toggleCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export const Cart: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        // Load initial state
        setCartItems(getCart());

        const handleCartUpdate = (e: CustomEvent<CartItem[]>) => {
            setCartItems(e.detail);
        };

        const handleToggleCart = (e: CustomEvent<boolean | undefined>) => {
            if (e.detail !== undefined) {
                setIsOpen(e.detail);
            } else {
                setIsOpen(prev => !prev);
            }
        };

        window.addEventListener('cart-updated', handleCartUpdate as EventListener);
        window.addEventListener('toggle-cart', handleToggleCart as EventListener);

        return () => {
            window.removeEventListener('cart-updated', handleCartUpdate as EventListener);
            window.removeEventListener('toggle-cart', handleToggleCart as EventListener);
        };
    }, []);

    useEffect(() => {
        if (isOpen && dialogRef.current) {
            dialogRef.current.showModal();
        } else if (!isOpen && dialogRef.current) {
            dialogRef.current.close();
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsOpen(false);
    };

    const subtotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

    return (
        <dialog
            ref={dialogRef}
            onClose={handleClose}
            className="backdrop:bg-black/50 m-0 ml-auto h-full max-h-screen w-full max-w-md bg-gray-900 text-white shadow-xl p-0 open:animate-slide-in-right border-l border-gray-800"
        >
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <h2 className="text-xl font-bold">Your Cart</h2>
                    <button
                        onClick={handleClose}
                        className="p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                        aria-label="Close cart"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400">
                            <p>Your cart is empty.</p>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {cartItems.map((item) => (
                                <li key={item.product.id} className="flex gap-4 p-3 bg-gray-800 rounded-lg">
                                    <div className="w-20 h-24 flex-shrink-0 bg-gray-700 rounded overflow-hidden">
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col flex-grow">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-semibold text-sm pr-2">{item.product.name}</h3>
                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="text-gray-400 hover:text-red-400 transition-colors"
                                                aria-label={`Remove ${item.product.name}`}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <p className="text-primary font-bold text-sm mt-1">${item.product.price.toFixed(2)}</p>

                                        <div className="flex items-center gap-3 mt-auto pt-2">
                                            <div className="flex items-center bg-gray-900 rounded-md border border-gray-700">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="p-1 text-gray-400 hover:text-white transition-colors"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="p-1 text-gray-400 hover:text-white transition-colors"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="p-4 border-t border-gray-800 bg-gray-900">
                        <div className="flex justify-between mb-4 text-lg font-bold">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-4">Shipping and taxes calculated at checkout.</p>
                        <button className="w-full btn btn-lg cursor-pointer">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </dialog>
    );
};
