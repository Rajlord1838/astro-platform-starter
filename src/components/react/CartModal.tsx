import React, { useEffect, useRef, useState } from 'react';
import type { CartItem } from '../../types';
import { getCartItems, removeFromCart, updateQuantity, toggleCart } from '../../utils/cart';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';

export default function CartModal() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setItems(getCartItems());

        const handleCartUpdate = (e: Event) => {
            const customEvent = e as CustomEvent<CartItem[]>;
            setItems(customEvent.detail);
        };

        const handleToggleCart = (e: Event) => {
            const customEvent = e as CustomEvent<boolean>;
            setIsOpen(customEvent.detail);
        };

        window.addEventListener('cart-updated', handleCartUpdate);
        window.addEventListener('toggle-cart', handleToggleCart);

        return () => {
            window.removeEventListener('cart-updated', handleCartUpdate);
            window.removeEventListener('toggle-cart', handleToggleCart);
        };
    }, []);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsOpen(false);
        toggleCart(false);
    };

    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <dialog
            ref={dialogRef}
            onClose={handleClose}
            className="backdrop:bg-black/60 bg-gray-900 text-white rounded-xl shadow-2xl p-0 w-full max-w-md m-auto border border-gray-700 open:animate-in open:fade-in open:zoom-in-95"
        >
            <div className="flex flex-col h-full max-h-[80vh]">
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <h2 className="text-xl font-bold flex items-center gap-2 m-0">
                        <ShoppingBag size={24} />
                        Your Cart
                    </h2>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-white"
                        aria-label="Close cart"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="overflow-y-auto p-4 flex-grow">
                    {items.length === 0 ? (
                        <div className="text-center py-12 text-gray-400">
                            <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
                            <p>Your cart is empty.</p>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {items.map((item) => (
                                <li key={item.product.id} className="flex gap-4 p-3 bg-gray-800/50 rounded-lg">
                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="w-20 h-20 object-cover rounded bg-gray-800"
                                    />
                                    <div className="flex-grow flex flex-col justify-between">
                                        <div className="flex justify-between items-start gap-2">
                                            <h3 className="font-semibold text-sm line-clamp-2">{item.product.name}</h3>
                                            <span className="font-bold text-primary">${(item.product.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center bg-gray-800 rounded-md border border-gray-700">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-l-md transition-colors"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-r-md transition-colors"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="text-red-400 hover:text-red-300 p-1.5 rounded transition-colors"
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

                {items.length > 0 && (
                    <div className="p-4 border-t border-gray-800 bg-gray-900/95 backdrop-blur">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-400">Total</span>
                            <span className="text-2xl font-bold">${total.toFixed(2)}</span>
                        </div>
                        <button className="w-full btn btn-lg">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </dialog>
    );
}
