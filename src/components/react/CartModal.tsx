import React, { useEffect, useRef, useState } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { getCart, updateQuantity, removeFromCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function CartModal() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        // Initial load
        setCart(getCart());

        const handleCartUpdated = (e: CustomEvent<CartItem[]>) => {
            setCart(e.detail);
        };

        const handleToggleCart = (e: CustomEvent<boolean | undefined>) => {
            const newState = e.detail !== undefined ? e.detail : !isOpen;
            setIsOpen(newState);
            if (newState) {
                dialogRef.current?.showModal();
            } else {
                dialogRef.current?.close();
            }
        };

        window.addEventListener('cart-updated', handleCartUpdated as EventListener);
        window.addEventListener('toggle-cart', handleToggleCart as EventListener);

        return () => {
            window.removeEventListener('cart-updated', handleCartUpdated as EventListener);
            window.removeEventListener('toggle-cart', handleToggleCart as EventListener);
        };
    }, [isOpen]);

    const handleClose = () => {
        setIsOpen(false);
        dialogRef.current?.close();
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <dialog
            ref={dialogRef}
            onClose={handleClose}
            className="fixed inset-0 m-0 w-full h-full max-w-none max-h-none bg-black/50 backdrop:bg-black/50 opacity-0 transition-opacity duration-300 open:opacity-100 p-0"
        >
            <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-xl flex flex-col transform transition-transform duration-300 translate-x-full open:translate-x-0" style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}>
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" />
                        Your Cart
                    </h2>
                    <button
                        onClick={handleClose}
                        className="p-2 text-gray-500 hover:text-black rounded-full hover:bg-gray-100"
                        aria-label="Close cart"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <ShoppingBag className="w-12 h-12 mb-4 opacity-20" />
                            <p>Your cart is empty</p>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {cart.map((item) => (
                                <li key={item.id} className="flex gap-4 p-2 bg-gray-50 rounded-lg">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-medium text-sm line-clamp-1">{item.name}</h3>
                                            <p className="text-gray-500 text-sm">${item.price.toFixed(2)}</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center border rounded bg-white">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1 hover:bg-gray-100"
                                                    aria-label={`Decrease quantity of ${item.name}`}
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="px-2 text-sm w-8 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 hover:bg-gray-100"
                                                    aria-label={`Increase quantity of ${item.name}`}
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-500 text-sm hover:underline"
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

                {cart.length > 0 && (
                    <div className="border-t p-4 bg-gray-50">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-semibold">Total</span>
                            <span className="font-bold text-lg">${total.toFixed(2)}</span>
                        </div>
                        <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </dialog>
    );
}
