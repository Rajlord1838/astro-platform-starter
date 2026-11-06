import React, { useState, useEffect, useRef } from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { getCart, updateQuantity, removeFromCart, toggleCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        // Load initial state
        setCartItems(getCart());

        const handleCartUpdated = (e: Event) => {
            const customEvent = e as CustomEvent<CartItem[]>;
            setCartItems(customEvent.detail);
        };

        const handleToggleCart = (e: Event) => {
            const customEvent = e as CustomEvent<boolean | undefined>;
            if (customEvent.detail !== undefined) {
                setIsOpen(customEvent.detail);
            } else {
                setIsOpen(prev => !prev);
            }
        };

        window.addEventListener('cart-updated', handleCartUpdated);
        window.addEventListener('toggle-cart', handleToggleCart);

        return () => {
            window.removeEventListener('cart-updated', handleCartUpdated);
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

    const handleClose = () => {
        setIsOpen(false);
        toggleCart(false);
    };

    const cartTotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

    return (
        <dialog
            ref={dialogRef}
            onClose={handleClose}
            className="fixed m-0 ml-auto h-full w-full max-w-md bg-white shadow-xl backdrop:bg-black/50 transition-all open:animate-in open:slide-in-from-right"
        >
            <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b p-4">
                    <h2 className="text-xl font-semibold">Shopping Cart</h2>
                    <button
                        onClick={handleClose}
                        className="rounded-full p-2 hover:bg-gray-100"
                        aria-label="Close cart"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {cartItems.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center text-gray-500">
                            <p>Your cart is empty.</p>
                            <button
                                onClick={handleClose}
                                className="mt-4 text-primary hover:underline"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {cartItems.map((item) => (
                                <li key={item.product.id} className="flex gap-4 border-b pb-4">
                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="h-24 w-20 rounded object-cover"
                                    />
                                    <div className="flex flex-1 flex-col justify-between">
                                        <div>
                                            <h3 className="font-medium">{item.product.name}</h3>
                                            <p className="text-gray-500">${item.product.price.toFixed(2)}</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center rounded border">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="px-2 py-1 hover:bg-gray-100"
                                                    aria-label={`Decrease quantity of ${item.product.name}`}
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="px-4 py-1 text-sm">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="px-2 py-1 hover:bg-gray-100"
                                                    aria-label={`Increase quantity of ${item.product.name}`}
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="text-red-500 hover:text-red-700"
                                                aria-label={`Remove ${item.product.name} from cart`}
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
                    <div className="border-t p-4">
                        <div className="mb-4 flex items-center justify-between text-lg font-semibold">
                            <span>Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <button className="w-full rounded bg-primary py-3 text-white hover:bg-primary/90 transition-colors">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </dialog>
    );
}
