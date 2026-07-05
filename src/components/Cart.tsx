import React, { useState, useEffect } from 'react';
import type { CartItem } from '../types';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';

export default function Cart() {
    const [items, setItems] = useState<CartItem[]>([]);

    const loadCart = () => {
        try {
            const data = localStorage.getItem('fashion_store_cart');
            if (data) {
                setItems(JSON.parse(data));
            } else {
                setItems([]);
            }
        } catch (e) {
            console.error('Failed to load cart', e);
        }
    };

    useEffect(() => {
        loadCart();
        window.addEventListener('cart-updated', loadCart);
        return () => window.removeEventListener('cart-updated', loadCart);
    }, []);

    const saveCart = (newItems: CartItem[]) => {
        localStorage.setItem('fashion_store_cart', JSON.stringify(newItems));
        setItems(newItems);
        window.dispatchEvent(new Event('cart-updated'));
    };

    const updateQuantity = (id: string, delta: number) => {
        const newItems = items.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(0, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }).filter(item => item.quantity > 0);

        saveCart(newItems);
    };

    const removeItem = (id: string) => {
        const newItems = items.filter(item => item.id !== id);
        saveCart(newItems);
    };

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const closeCartModal = () => {
        const modal = document.getElementById('cart-modal') as HTMLDialogElement;
        if (modal) modal.close();
    };

    return (
        <div className="flex flex-col h-full bg-white max-w-md mx-auto rounded-lg shadow-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5" /> Shopping Cart
                </h2>
                <button
                    onClick={closeCartModal}
                    className="p-2 text-gray-400 hover:text-gray-500 transition-colors"
                    aria-label="Close cart"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
                        <ShoppingBag className="h-12 w-12 text-gray-300" />
                        <p>Your cart is empty</p>
                        <button
                            onClick={closeCartModal}
                            className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-500"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <ul className="space-y-6">
                        {items.map((item) => (
                            <li key={item.id} className="flex gap-4">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                                </div>

                                <div className="flex flex-1 flex-col">
                                    <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <h3>{item.name}</h3>
                                            <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                        <div className="flex items-center border rounded-md">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="p-1 hover:bg-gray-100"
                                            >
                                                <Minus className="h-4 w-4" />
                                            </button>
                                            <span className="px-2 font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="p-1 hover:bg-gray-100"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => removeItem(item.id)}
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
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                    <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                        <p>Subtotal</p>
                        <p>${total.toFixed(2)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500 mb-4">Shipping and taxes calculated at checkout.</p>
                    <button
                        className="w-full flex items-center justify-center rounded-md border border-transparent bg-gray-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800"
                        onClick={() => alert('Checkout is not implemented in this demo.')}
                    >
                        Checkout
                    </button>
                </div>
            )}
        </div>
    );
}
