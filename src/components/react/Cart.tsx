import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import type { CartItem } from '../../types';
import { getCart, updateCartItemQuantity, removeCartItem, clearCart } from '../../utils/cart';

export const Cart: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const dialogRef = useRef<HTMLDialogElement>(null);

    const updateCart = () => {
        setCartItems(getCart());
    };

    useEffect(() => {
        const handleToggle = (e: Event) => {
            const customEvent = e as CustomEvent;
            const newState = customEvent.detail?.open !== undefined ? customEvent.detail.open : !isOpen;
            setIsOpen(newState);
        };

        window.addEventListener('cart-updated', updateCart);
        window.addEventListener('toggle-cart', handleToggle);

        updateCart(); // Initial load

        return () => {
            window.removeEventListener('cart-updated', updateCart);
            window.removeEventListener('toggle-cart', handleToggle);
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

    const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <dialog
            ref={dialogRef}
            onClose={handleClose}
            className="fixed inset-y-0 right-0 max-w-md w-full h-full m-0 ml-auto bg-gray-900 text-white shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm p-0 transition-[display,overlay] allow-discrete"
        >
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <ShoppingBag /> Your Cart
                    </h2>
                    <button
                        onClick={handleClose}
                        className="p-2 transition-colors rounded-full hover:bg-gray-800"
                        aria-label="Close cart"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-grow p-4 overflow-y-auto">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
                            <ShoppingBag size={48} className="opacity-50" />
                            <p className="text-lg">Your cart is empty.</p>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {cartItems.map((item) => (
                                <li key={item.product.id} className="flex gap-4 p-4 bg-gray-800 rounded-lg">
                                    <img
                                        src={item.product.imageUrl}
                                        alt={item.product.name}
                                        className="object-cover w-20 h-20 rounded-md"
                                    />
                                    <div className="flex flex-col flex-grow">
                                        <div className="flex justify-between">
                                            <h3 className="font-semibold">{item.product.name}</h3>
                                            <span className="font-bold text-primary">
                                                ${(item.product.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-400">{item.product.category}</p>

                                        <div className="flex items-center justify-between mt-auto pt-2">
                                            <div className="flex items-center gap-3 bg-gray-900 rounded-md p-1">
                                                <button
                                                    onClick={() => updateCartItemQuantity(item.product.id, item.quantity - 1)}
                                                    className="p-1 rounded hover:bg-gray-700"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateCartItemQuantity(item.product.id, item.quantity + 1)}
                                                    className="p-1 rounded hover:bg-gray-700"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeCartItem(item.product.id)}
                                                className="p-2 text-gray-400 transition-colors rounded-md hover:text-red-400 hover:bg-gray-900"
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

                {cartItems.length > 0 && (
                    <div className="p-4 border-t border-gray-800 bg-gray-900">
                        <div className="flex justify-between mb-4 text-lg font-bold">
                            <span>Total</span>
                            <span className="text-primary">${total.toFixed(2)}</span>
                        </div>
                        <button className="w-full py-3 text-lg font-semibold rounded-lg bg-primary text-primary-content hover:bg-primary/90 transition-colors">
                            Checkout
                        </button>
                        <button
                            onClick={() => clearCart()}
                            className="w-full mt-2 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            Clear Cart
                        </button>
                    </div>
                )}
            </div>
        </dialog>
    );
};
