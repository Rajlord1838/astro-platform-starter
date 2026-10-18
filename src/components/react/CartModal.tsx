import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { getCart, updateQuantity, removeFromCart, toggleCart, clearCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function CartModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState<CartItem[]>([]);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const updateItems = () => setItems(getCart());

        const handleToggle = (e: Event) => {
            const customEvent = e as CustomEvent<{ isOpen?: boolean }>;
            const shouldOpen = customEvent.detail?.isOpen ?? !isOpen;
            setIsOpen(shouldOpen);
        };

        updateItems();
        window.addEventListener('cart-updated', updateItems);
        window.addEventListener('toggle-cart', handleToggle);

        return () => {
            window.removeEventListener('cart-updated', updateItems);
            window.removeEventListener('toggle-cart', handleToggle);
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && dialogRef.current && !dialogRef.current.open) {
            dialogRef.current.showModal();
        } else if (!isOpen && dialogRef.current && dialogRef.current.open) {
            dialogRef.current.close();
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsOpen(false);
        toggleCart(false);
    };

    const handleCheckout = () => {
        alert('Thank you for your purchase!');
        clearCart();
        handleClose();
    };

    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <dialog
            ref={dialogRef}
            onClose={handleClose}
            className="backdrop:bg-black/50 p-0 m-0 w-full h-full max-w-none max-h-none bg-transparent sm:m-auto sm:w-full sm:h-auto sm:max-w-md sm:max-h-[80vh] sm:rounded-xl shadow-2xl"
        >
            <div className="flex flex-col h-full bg-white text-gray-900 sm:rounded-xl">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <ShoppingBag />
                        Your Cart
                    </h2>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                        aria-label="Close cart"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 py-12">
                            <ShoppingBag size={48} className="mb-4 opacity-20" />
                            <p>Your cart is empty.</p>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {items.map((item) => (
                                <li key={item.product.id} className="flex gap-4 p-2 border border-gray-100 rounded-lg shadow-sm">
                                    <img
                                        src={item.product.imageUrl}
                                        alt={item.product.name}
                                        className="w-20 h-24 object-cover rounded-md"
                                    />
                                    <div className="flex flex-col justify-between flex-1">
                                        <div>
                                            <h3 className="font-semibold line-clamp-1">{item.product.name}</h3>
                                            <p className="text-sm text-gray-500">${item.product.price.toFixed(2)}</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center border rounded-md">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="p-1 hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="w-8 text-center text-sm">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="p-1 hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="text-xs text-red-500 hover:text-red-700 underline cursor-pointer"
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
                    <div className="border-t p-4 bg-gray-50 sm:rounded-b-xl">
                        <div className="flex justify-between items-center mb-4 text-lg font-bold">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="w-full btn btn-lg cursor-pointer"
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </dialog>
    );
}
