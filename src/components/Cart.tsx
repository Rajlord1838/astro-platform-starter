import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import type { CartItem } from '../types';
import { getCart, removeFromCart, updateQuantity, clearCart } from '../utils/cart';

export default function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [itemCount, setItemCount] = useState(0);
    const dialogRef = useRef<HTMLDialogElement>(null);

    const updateCartState = () => {
        const items = getCart();
        setCartItems(items);
        setItemCount(items.reduce((acc, item) => acc + item.quantity, 0));
    };

    useEffect(() => {
        updateCartState();

        const handleCartUpdate = () => {
            updateCartState();
        };

        window.addEventListener('cart-updated', handleCartUpdate);
        return () => window.removeEventListener('cart-updated', handleCartUpdate);
    }, []);

    useEffect(() => {
        if (isOpen) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [isOpen]);

    const total = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

    const handleCheckout = () => {
        alert('Thank you for your purchase!');
        clearCart();
        setIsOpen(false);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 text-white hover:text-gray-300 transition-colors"
                aria-label="Open Cart"
            >
                <ShoppingCart size={24} />
                {itemCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full transform translate-x-1/4 -translate-y-1/4">
                        {itemCount}
                    </span>
                )}
            </button>

            <dialog
                ref={dialogRef}
                className="backdrop:bg-black/50 p-0 m-0 w-full max-w-md ml-auto h-full max-h-screen bg-gray-900 text-white fixed top-0 right-0 border-l border-gray-800"
                onClose={() => setIsOpen(false)}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-4 border-b border-gray-800">
                        <h2 className="text-xl font-bold">Shopping Cart</h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1 hover:text-gray-300"
                            aria-label="Close Cart"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {cartItems.length === 0 ? (
                            <div className="text-center text-gray-400 mt-10">
                                Your cart is empty.
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item.product.id} className="flex gap-4 p-2 border border-gray-800 rounded-lg">
                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-semibold text-sm line-clamp-1">{item.product.name}</h3>
                                            <p className="text-gray-400">${item.product.price.toFixed(2)}</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center gap-2 bg-gray-800 rounded-md">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="p-1 hover:bg-gray-700 rounded-l-md"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="text-sm w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="p-1 hover:bg-gray-700 rounded-r-md"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="text-red-500 hover:text-red-400 p-1"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="p-4 border-t border-gray-800 bg-gray-900">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-semibold text-lg">Total</span>
                            <span className="font-bold text-xl">${total.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            disabled={cartItems.length === 0}
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-lg font-semibold transition-colors"
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
}
