import React, { useState, useEffect, useRef } from 'react';
import type { CartItem } from '../../types';
import { getCartItems, removeFromCart, updateQuantity, toggleCart } from '../../utils/cart';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';

export const Cart: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState<CartItem[]>([]);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        // Initial load
        setItems(getCartItems());

        const handleCartUpdated = (e: Event) => {
            const customEvent = e as CustomEvent<CartItem[]>;
            if (customEvent.detail) {
                setItems(customEvent.detail);
            } else {
                setItems(getCartItems());
            }
        };

        const handleToggleCart = () => {
            setIsOpen(prev => !prev);
        };

        window.addEventListener('cart-updated', handleCartUpdated);
        window.addEventListener('toggle-cart', handleToggleCart);

        return () => {
            window.removeEventListener('cart-updated', handleCartUpdated);
            window.removeEventListener('toggle-cart', handleToggleCart);
        };
    }, []);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen && !dialog.open) {
            dialog.showModal();
            // Prevent scrolling on body when cart is open
            document.body.style.overflow = 'hidden';
        } else if (!isOpen && dialog.open) {
            dialog.close();
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Handle closing when clicking backdrop
    const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const rect = dialog.getBoundingClientRect();
        // If click is outside the bounds of the dialog content (which is pushed to the right)
        // Note: With typical modal styling, this works well for clicking the backdrop
        if (
            e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY < rect.top ||
            e.clientY > rect.bottom
        ) {
            setIsOpen(false);
        }
    };

    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <dialog
            ref={dialogRef}
            onClick={handleDialogClick}
            className="backdrop:bg-black/50 fixed m-0 ml-auto h-full max-h-none w-full max-w-md bg-white p-0 shadow-xl open:animate-in open:slide-in-from-right-full transition-transform"
            onClose={() => setIsOpen(false)}
        >
            {/* Prevent clicks inside the dialog content from closing it */}
            <div className="flex h-full flex-col bg-white" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <h2 className="flex items-center gap-2 text-xl font-semibold">
                        <ShoppingBag size={24} />
                        Your Cart
                    </h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="rounded-full p-2 hover:bg-gray-100 transition-colors"
                        aria-label="Close cart"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {items.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center text-gray-500 space-y-4">
                            <ShoppingBag size={48} className="text-gray-300" />
                            <p>Your cart is empty</p>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-black font-medium hover:underline"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <ul className="space-y-6">
                            {items.map((item) => (
                                <li key={item.product.id} className="flex py-2">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3 className="line-clamp-2 pr-4">{item.product.name}</h3>
                                                <p className="ml-4 whitespace-nowrap">${(item.product.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">{item.product.category}</p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <div className="flex items-center border rounded-md">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="px-2 py-1 hover:bg-gray-100 text-gray-600"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="px-2 font-medium w-8 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="px-2 py-1 hover:bg-gray-100 text-gray-600"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="font-medium text-red-600 hover:text-red-500"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="border-t border-gray-200 px-6 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                            <p>Subtotal</p>
                            <p>${total.toFixed(2)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500 mb-6">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6">
                            <button
                                className="flex w-full items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800"
                                onClick={() => alert('Checkout not implemented in this demo')}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </dialog>
    );
};
