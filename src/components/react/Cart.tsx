import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import type { CartItem } from '../../types';
import { getCart, updateQuantity, removeFromCart } from '../../utils/cart';

export const Cart: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const dialogRef = useRef<HTMLDialogElement>(null);

    const updateCartState = () => {
        setCartItems(getCart());
    };

    useEffect(() => {
        // Initial load
        updateCartState();

        // Listen for custom events
        window.addEventListener('cart-updated', updateCartState);

        // Listen for storage events (from other tabs)
        window.addEventListener('storage', (e) => {
            if (e.key === 'fashion_store_cart') {
                updateCartState();
            }
        });

        return () => {
            window.removeEventListener('cart-updated', updateCartState);
            window.removeEventListener('storage', updateCartState);
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

    const toggleCart = () => {
        setIsOpen(!isOpen);
    };

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <>
            <button
                onClick={toggleCart}
                className="relative p-2 rounded-full hover:bg-gray-800 transition-colors cursor-pointer flex items-center"
                aria-label="Shopping Cart"
            >
                <ShoppingCart className="text-white" size={24} />
                {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-content text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {totalItems}
                    </span>
                )}
            </button>

            <dialog
                ref={dialogRef}
                onClose={handleClose}
                className="fixed inset-y-0 right-0 m-0 ml-auto h-full max-h-none w-full max-w-md bg-gray-900 text-white shadow-2xl backdrop:bg-black/50 p-0 border-l border-gray-800 open:animate-slide-in"
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-800">
                        <h2 className="text-2xl font-bold">Your Cart</h2>
                        <button
                            onClick={handleClose}
                            className="p-2 rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
                            aria-label="Close Cart"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {cartItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                <ShoppingCart size={64} className="mb-4 opacity-20" />
                                <p className="text-lg">Your cart is empty.</p>
                                <button
                                    onClick={handleClose}
                                    className="mt-6 text-primary hover:underline"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        ) : (
                            <ul className="space-y-6">
                                {cartItems.map((item) => (
                                    <li key={item.product.id} className="flex gap-4">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-800">
                                            <img
                                                src={item.product.imageUrl}
                                                alt={item.product.name}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>

                                        <div className="flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-white">
                                                    <h3>{item.product.name}</h3>
                                                    <p className="ml-4">${(item.product.price * item.quantity).toFixed(2)}</p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-400">{item.product.category}</p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <div className="flex items-center gap-2 border border-gray-700 rounded-md">
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                        className="p-1 text-gray-400 hover:text-white cursor-pointer"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className="w-6 text-center font-medium">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                        className="p-1 text-gray-400 hover:text-white cursor-pointer"
                                                        aria-label="Increase quantity"
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => removeFromCart(item.product.id)}
                                                    className="font-medium text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                                                >
                                                    <Trash2 size={16} />
                                                    <span>Remove</span>
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Footer */}
                    {cartItems.length > 0 && (
                        <div className="border-t border-gray-800 p-6 bg-gray-900">
                            <div className="flex justify-between text-lg font-bold text-white mb-4">
                                <p>Subtotal</p>
                                <p>${totalPrice.toFixed(2)}</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-400 mb-6">Shipping and taxes calculated at checkout.</p>
                            <button className="w-full btn btn-lg flex justify-center items-center">
                                Checkout
                            </button>
                        </div>
                    )}
                </div>
            </dialog>

            <style>{`
                @keyframes slide-in {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                .open\\:animate-slide-in[open] {
                    animation: slide-in 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
            `}</style>
        </>
    );
};
