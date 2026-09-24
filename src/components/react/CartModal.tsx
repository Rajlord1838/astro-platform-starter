import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { getCart, updateQuantity, removeFromCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export const CartModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const dialogRef = useRef<HTMLDialogElement>(null);

    const loadCart = () => {
        setCartItems(getCart());
    };

    useEffect(() => {
        const handleToggle = () => setIsOpen(prev => !prev);
        const handleCartUpdate = () => loadCart();

        window.addEventListener('toggle-cart', handleToggle);
        window.addEventListener('cart-updated', handleCartUpdate);

        loadCart();

        return () => {
            window.removeEventListener('toggle-cart', handleToggle);
            window.removeEventListener('cart-updated', handleCartUpdate);
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [isOpen]);

    const closeCart = () => setIsOpen(false);

    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <dialog
            ref={dialogRef}
            className="fixed inset-y-0 right-0 m-0 w-full max-w-md h-full max-h-full bg-white shadow-2xl backdrop:bg-black/50 open:animate-in open:slide-in-from-right-full transition-all duration-300"
            onClose={() => setIsOpen(false)}
        >
            <div className="flex flex-col h-full bg-white text-gray-900">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold">Your Cart</h2>
                    <button onClick={closeCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500">
                            <p>Your cart is empty.</p>
                            <button onClick={closeCart} className="mt-4 text-black underline">Continue Shopping</button>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4 border border-gray-100 rounded-lg p-2 bg-gray-50">
                                <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded" />
                                <div className="flex flex-col flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-semibold text-sm">{item.name}</h3>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-400 hover:text-red-500 p-1"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <p className="text-sm font-medium mt-1">${item.price.toFixed(2)}</p>

                                    <div className="flex items-center gap-3 mt-auto">
                                        <div className="flex items-center border border-gray-300 rounded bg-white">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="px-2 text-sm font-medium w-8 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                        <div className="flex justify-between items-center mb-4 text-lg font-bold">
                            <span>Total</span>
                            <span>${totalAmount.toFixed(2)}</span>
                        </div>
                        <button className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </dialog>
    );
};
