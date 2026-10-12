import React, { useEffect, useState, useRef } from 'react';
import { getCart, removeFromCart, updateQuantity, toggleCart } from '../../utils/cart';
import type { CartItem } from '../../types';
import { X, Minus, Plus, Trash2 } from 'lucide-react';

export const CartModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const dialogRef = useRef<HTMLDialogElement>(null);

    const updateCartState = () => {
        setCartItems(getCart());
    };

    useEffect(() => {
        // Initial load
        updateCartState();

        const handleCartUpdated = () => {
            updateCartState();
        };

        const handleToggleCart = (e: Event) => {
            const customEvent = e as CustomEvent;
            const shouldOpen = customEvent.detail?.isOpen ?? !isOpen;
            setIsOpen(shouldOpen);
        };

        window.addEventListener('cart-updated', handleCartUpdated);
        window.addEventListener('toggle-cart', handleToggleCart);

        return () => {
            window.removeEventListener('cart-updated', handleCartUpdated);
            window.removeEventListener('toggle-cart', handleToggleCart);
        };
    }, [isOpen]);

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

    const cartTotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

    return (
        <dialog
            ref={dialogRef}
            onClose={handleClose}
            className="backdrop:bg-black/50 fixed top-0 right-0 h-full w-full max-w-md m-0 ml-auto bg-white text-gray-800 shadow-2xl p-0 open:animate-slide-in-right rounded-l-xl"
        >
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-bold">Your Cart</h2>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Close cart"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto p-4">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <p className="mb-4">Your cart is empty.</p>
                            <button
                                onClick={handleClose}
                                className="px-6 py-2 bg-primary text-primary-content rounded-md hover:bg-primary/90 transition-colors"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {cartItems.map((item) => (
                                <li key={item.product.id} className="flex gap-4 border-b pb-4 last:border-b-0">
                                    <div className="w-20 h-24 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-grow flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-semibold text-sm line-clamp-2 pr-2">{item.product.name}</h3>
                                            <span className="font-bold whitespace-nowrap">
                                                ${(item.product.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center border rounded">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="px-2 py-1 hover:bg-gray-100 transition-colors"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="px-3 text-sm font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="px-2 py-1 hover:bg-gray-100 transition-colors"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="text-red-500 hover:text-red-700 p-1"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="border-t p-4 bg-gray-50 mt-auto">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-semibold text-gray-600">Total</span>
                            <span className="text-xl font-bold">${cartTotal.toFixed(2)}</span>
                        </div>
                        <button className="w-full py-3 bg-primary text-primary-content font-bold rounded-lg hover:bg-primary/90 transition-colors">
                            Checkout
                        </button>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes slideInRight {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                .animate-slide-in-right {
                    animation: slideInRight 0.3s ease-out forwards;
                }
            `}</style>
        </dialog>
    );
};
