
import React, { useEffect, useState, useRef } from 'react';
import { X, Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { getCartItems, removeFromCart, updateQuantity } from '../../utils/cart';
import type { CartItem } from '../../types';

export function CartModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState<CartItem[]>([]);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const handleToggle = () => setIsOpen((prev) => !prev);
        const handleUpdate = () => setItems(getCartItems());

        window.addEventListener('toggle-cart', handleToggle);
        window.addEventListener('cart-updated', handleUpdate);

        // Initial load
        setItems(getCartItems());

        return () => {
            window.removeEventListener('toggle-cart', handleToggle);
            window.removeEventListener('cart-updated', handleUpdate);
        };
    }, []);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen) {
            dialog.showModal();
            // Prevent scrolling on body when modal is open
            document.body.style.overflow = 'hidden';
        } else {
            dialog.close();
            document.body.style.overflow = '';
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsOpen(false);
    };

    // Close on click outside
    const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        if (e.target === dialogRef.current) {
            handleClose();
        }
    };

    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <dialog
            ref={dialogRef}
            onClick={handleDialogClick}
            onClose={handleClose}
            className="backdrop:bg-black/50 m-0 ml-auto h-full max-h-screen w-full max-w-md bg-neutral-900 text-white shadow-xl transition-all open:animate-in open:slide-in-from-right closed:animate-out closed:slide-out-to-right"
        >
            <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-neutral-800 p-4">
                    <h2 className="text-xl font-semibold">Your Cart</h2>
                    <button onClick={handleClose} className="p-2 hover:text-gray-300" aria-label="Close cart">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {items.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center text-neutral-400">
                            <ShoppingCart size={48} className="mb-4 opacity-50" />
                            <p>Your cart is empty</p>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {items.map((item) => (
                                <li key={item.product.id} className="flex gap-4 border-b border-neutral-800 pb-4">
                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="h-24 w-24 rounded object-cover bg-neutral-800"
                                    />
                                    <div className="flex flex-1 flex-col">
                                        <div className="flex justify-between">
                                            <h3 className="font-medium text-sm line-clamp-2">{item.product.name}</h3>
                                            <p className="font-semibold ml-2">${(item.product.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                        <p className="text-sm text-neutral-400 mb-2">{item.product.category}</p>

                                        <div className="mt-auto flex items-center justify-between">
                                            <div className="flex items-center gap-2 rounded-md border border-neutral-700 p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="p-1 hover:text-blue-400 disabled:opacity-50"
                                                    aria-label="Decrease quantity"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-6 text-center text-sm">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="p-1 hover:text-blue-400"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="p-2 text-neutral-400 hover:text-red-400 transition-colors"
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

                {items.length > 0 && (
                    <div className="border-t border-neutral-800 p-4">
                        <div className="mb-4 flex justify-between text-lg font-semibold">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <button className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition-colors">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </dialog>
    );
}
