import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { getCartItems, updateCartQuantity, removeFromCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState<CartItem[]>([]);
    const dialogRef = useRef<HTMLDialogElement>(null);

    const updateItems = () => {
        setItems(getCartItems());
    };

    useEffect(() => {
        updateItems();

        const handleToggle = (e: CustomEvent<boolean | undefined>) => {
            if (e.detail !== undefined) {
                setIsOpen(e.detail);
            } else {
                setIsOpen(prev => !prev);
            }
        };

        const handleUpdate = () => {
            updateItems();
        };

        window.addEventListener('toggle-cart', handleToggle as EventListener);
        window.addEventListener('cart-updated', handleUpdate);

        return () => {
            window.removeEventListener('toggle-cart', handleToggle as EventListener);
            window.removeEventListener('cart-updated', handleUpdate);
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

    // Close on backdrop click
    const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        if (e.target === dialogRef.current) {
            handleClose();
        }
    };

    const totalAmount = items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );

    return (
        <dialog
            ref={dialogRef}
            onClose={handleClose}
            onClick={handleDialogClick}
            className="m-0 h-full max-h-full w-full max-w-full bg-transparent p-0 backdrop:bg-black/50 backdrop:backdrop-blur-sm open:flex open:justify-end"
        >
            <div
                className="flex h-full w-full max-w-md flex-col bg-complementary shadow-xl animate-in slide-in-from-right duration-300 border-l border-white/10"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-6">
                    <h2 className="text-lg font-medium text-white flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" />
                        Shopping Cart
                    </h2>
                    <button
                        type="button"
                        className="relative -m-2 p-2 text-gray-400 hover:text-white transition-colors"
                        onClick={handleClose}
                        aria-label="Close cart"
                    >
                        <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
                            <ShoppingBag className="w-12 h-12 opacity-50" />
                            <p>Your cart is empty</p>
                            <button
                                onClick={handleClose}
                                className="mt-4 text-white hover:underline"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="mt-8">
                            <div className="flow-root">
                                <ul role="list" className="-my-6 divide-y divide-white/10">
                                    {items.map((item) => (
                                        <li key={item.product.id} className="flex py-6">
                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-white/10">
                                                <img
                                                    src={item.product.imageUrl}
                                                    alt={item.product.name}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-white">
                                                        <h3>{item.product.name}</h3>
                                                        <p className="ml-4">${(item.product.price * item.quantity).toFixed(2)}</p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-400">{item.product.category}</p>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <div className="flex items-center border border-white/20 rounded-md">
                                                        <button
                                                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                                                            className="p-1 text-gray-400 hover:text-white transition-colors"
                                                            aria-label={`Decrease quantity for ${item.product.name}`}
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        <span className="px-2 text-white font-medium w-8 text-center">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                                                            className="p-1 text-gray-400 hover:text-white transition-colors"
                                                            aria-label={`Increase quantity for ${item.product.name}`}
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>

                                                    <div className="flex">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeFromCart(item.product.id)}
                                                            className="font-medium text-red-400 hover:text-red-300 transition-colors"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="border-t border-white/10 px-4 py-6 sm:px-6 bg-white/5">
                        <div className="flex justify-between text-base font-medium text-white">
                            <p>Subtotal</p>
                            <p>${totalAmount.toFixed(2)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-400">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6">
                            <button
                                onClick={() => {
                                    alert('Checkout functionality would go here!');
                                }}
                                className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-6 py-3 text-base font-medium text-black shadow-sm hover:bg-gray-200 transition-colors"
                            >
                                Checkout
                            </button>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-400">
                            <p>
                                or{' '}
                                <button
                                    type="button"
                                    className="font-medium text-white hover:underline"
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
