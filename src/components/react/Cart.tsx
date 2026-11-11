import React, { useState, useEffect, useRef } from 'react';
import { getCart, removeFromCart, updateQuantity, getCartTotal, toggleCart } from '../../utils/cart';
import type { CartItem } from '../../types';
import { X, Minus, Plus, Trash2 } from 'lucide-react';

export default function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const updateCart = () => {
            setCartItems(getCart());
        };

        const handleToggleCart = (e: Event) => {
            const customEvent = e as CustomEvent;
            if (customEvent.detail && customEvent.detail.forceOpen !== undefined) {
                setIsOpen(customEvent.detail.forceOpen);
            } else {
                setIsOpen((prev) => !prev);
            }
        };

        // Initial setup
        updateCart();

        // Listen for events
        window.addEventListener('cart-updated', updateCart);
        window.addEventListener('toggle-cart', handleToggleCart);

        return () => {
            window.removeEventListener('cart-updated', updateCart);
            window.removeEventListener('toggle-cart', handleToggleCart);
        };
    }, []);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (isOpen && dialog) {
            dialog.showModal();
        } else if (dialog) {
            dialog.close();
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <dialog
            ref={dialogRef}
            onClose={handleClose}
            className="w-full max-w-md p-0 ml-auto mr-0 h-full max-h-screen text-white bg-complementary backdrop:bg-black/50 open:animate-in open:slide-in-from-right open:fade-in-90 m-0 border-l border-white/10"
            style={{
                height: '100dvh',
                margin: 0,
                position: 'fixed',
                right: 0,
                top: 0
            }}
        >
            <div className="flex flex-col h-full bg-[#101828]">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <h2 className="text-xl font-bold m-0">Your Cart</h2>
                    <button
                        onClick={handleClose}
                        className="p-2 transition-colors rounded-full hover:bg-white/10"
                        aria-label="Close cart"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 p-4 overflow-y-auto">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <p>Your cart is empty.</p>
                            <button
                                onClick={handleClose}
                                className="mt-4 underline hover:text-white"
                            >
                                Continue shopping
                            </button>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {cartItems.map((item) => (
                                <li key={item.id} className="flex gap-4 p-2 rounded bg-white/5">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="object-cover w-20 h-20 rounded"
                                    />
                                    <div className="flex flex-col flex-1">
                                        <div className="flex justify-between">
                                            <h3 className="font-semibold">{item.name}</h3>
                                            <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                        <p className="text-sm text-gray-400">{item.category}</p>

                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="flex items-center gap-2 bg-white/10 rounded">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1 hover:bg-white/20 rounded-l"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="w-8 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 hover:bg-white/20 rounded-r"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="p-2 text-red-400 transition-colors rounded hover:bg-white/10 hover:text-red-300"
                                                aria-label={`Remove ${item.name}`}
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

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="p-4 border-t border-white/10 bg-[#152033]">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-lg font-semibold">Total:</span>
                            <span className="text-xl font-bold">${getCartTotal().toFixed(2)}</span>
                        </div>
                        <button className="w-full py-3 font-bold text-white transition-colors rounded bg-primary hover:bg-primary/90">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </dialog>
    );
}
