import React, { useState, useEffect, useRef } from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { getCart, updateQuantity, removeFromCart, toggleCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function CartModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const updateCartData = () => setCart(getCart());

        const handleToggle = (e: Event) => {
            const customEvent = e as CustomEvent;
            const newState = customEvent.detail !== undefined ? customEvent.detail : !isOpen;
            setIsOpen(newState);
            if (newState) updateCartData();
        };

        window.addEventListener('cart-updated', updateCartData);
        window.addEventListener('toggle-cart', handleToggle);

        // Initial load
        updateCartData();

        return () => {
            window.removeEventListener('cart-updated', updateCartData);
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

    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <dialog
            ref={dialogRef}
            onClose={handleClose}
            className="backdrop:bg-black/50 p-0 rounded-lg shadow-xl w-full max-w-md bg-white text-gray-900 m-auto mt-20 sm:mr-4 sm:ml-auto"
        >
            <div className="flex flex-col h-full max-h-[80vh]">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold m-0">Your Cart</h2>
                    <button onClick={handleClose} className="p-1 rounded-full hover:bg-gray-100" aria-label="Close cart">
                        <X size={24} />
                    </button>
                </div>

                <div className="overflow-y-auto p-4 flex-grow">
                    {cart.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <p>Your cart is currently empty.</p>
                        </div>
                    ) : (
                        <ul className="space-y-4 m-0 p-0 list-none">
                            {cart.map((item) => (
                                <li key={item.product.id} className="flex gap-4 items-center border-b pb-4 last:border-0 last:pb-0 m-0">
                                    <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                                    <div className="flex-grow">
                                        <h3 className="font-semibold text-sm m-0">{item.product.name}</h3>
                                        <p className="text-primary font-medium text-sm m-0">${item.product.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                            className="p-1 bg-gray-100 rounded hover:bg-gray-200"
                                            aria-label={`Decrease quantity of ${item.product.name}`}
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="w-4 text-center text-sm">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                            className="p-1 bg-gray-100 rounded hover:bg-gray-200"
                                            aria-label={`Increase quantity of ${item.product.name}`}
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.product.id)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                                        aria-label={`Remove ${item.product.name} from cart`}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="p-4 border-t bg-gray-50">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-semibold">Total:</span>
                            <span className="font-bold text-xl">${total.toFixed(2)}</span>
                        </div>
                        <button className="btn w-full justify-center">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </dialog>
    );
}
