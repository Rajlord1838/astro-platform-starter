import React, { useEffect, useState } from 'react';
import type { CartItem } from '../../types';
import { getCartItems, removeFromCart, updateQuantity, clearCart } from '../../utils/cart';
import { X, Trash2, Plus, Minus } from 'lucide-react';

interface CartProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const loadCart = () => {
        setItems(getCartItems());
    };

    useEffect(() => {
        if (isOpen) {
            loadCart();
        }

        window.addEventListener('cart-updated', loadCart);
        return () => window.removeEventListener('cart-updated', loadCart);
    }, [isOpen]);

    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} aria-hidden="true"></div>

            <div className="fixed inset-y-0 right-0 max-w-full flex">
                <div className="w-screen max-w-md pointer-events-auto">
                    <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                        <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                            <div className="flex items-start justify-between">
                                <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                                <div className="ml-3 h-7 flex items-center">
                                    <button
                                        type="button"
                                        className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                        onClick={onClose}
                                    >
                                        <span className="sr-only">Close panel</span>
                                        <X className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-8">
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {items.length === 0 ? (
                                            <li className="py-6 flex justify-center">
                                                <p className="text-gray-500">Your cart is empty.</p>
                                            </li>
                                        ) : (
                                            items.map((item) => (
                                                <li key={item.product.id} className="py-6 flex">
                                                    <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                                        <img
                                                            src={item.product.image}
                                                            alt={item.product.name}
                                                            className="w-full h-full object-center object-cover"
                                                        />
                                                    </div>

                                                    <div className="ml-4 flex-1 flex flex-col">
                                                        <div>
                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                <h3>{item.product.name}</h3>
                                                                <p className="ml-4">${(item.product.price * item.quantity).toFixed(2)}</p>
                                                            </div>
                                                            <p className="mt-1 text-sm text-gray-500">{item.product.category}</p>
                                                        </div>
                                                        <div className="flex-1 flex items-end justify-between text-sm">
                                                            <div className="flex items-center border border-gray-300 rounded">
                                                                <button
                                                                    className="px-2 py-1 text-gray-600 hover:text-gray-900"
                                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                                >
                                                                    <Minus size={14} />
                                                                </button>
                                                                <span className="px-2 text-gray-700">{item.quantity}</span>
                                                                <button
                                                                    className="px-2 py-1 text-gray-600 hover:text-gray-900"
                                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                                >
                                                                    <Plus size={14} />
                                                                </button>
                                                            </div>

                                                            <div className="flex">
                                                                <button
                                                                    type="button"
                                                                    className="font-medium text-red-600 hover:text-red-500 flex items-center"
                                                                    onClick={() => removeFromCart(item.product.id)}
                                                                >
                                                                    <Trash2 size={16} className="mr-1" />
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {items.length > 0 && (
                            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>${total.toFixed(2)}</p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                <div className="mt-6 flex space-x-3">
                                    <button
                                        onClick={clearCart}
                                        className="flex-1 flex justify-center items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        Clear Cart
                                    </button>
                                    <button
                                        className="flex-1 flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                                    >
                                        Checkout
                                    </button>
                                </div>
                                <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                                    <p>
                                        or{' '}
                                        <button
                                            type="button"
                                            className="text-blue-600 font-medium hover:text-blue-500"
                                            onClick={onClose}
                                        >
                                            Continue Shopping<span aria-hidden="true"> &rarr;</span>
                                        </button>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
