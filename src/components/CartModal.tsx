import React, { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import type { CartItem } from '../types';

export default function CartModal() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const loadCart = () => {
        const cartStr = localStorage.getItem('fashion_store_cart');
        if (cartStr) {
            setCartItems(JSON.parse(cartStr));
        } else {
            setCartItems([]);
        }
    };

    useEffect(() => {
        loadCart();
        window.addEventListener('cart-updated', loadCart);
        return () => window.removeEventListener('cart-updated', loadCart);
    }, []);

    const updateQuantity = (id: string, delta: number) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(updatedCart);
        localStorage.setItem('fashion_store_cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('cart-updated'));
    };

    const removeItem = (id: string) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('fashion_store_cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('cart-updated'));
    };

    const closeCart = () => {
        const dialog = document.getElementById('cart-modal') as HTMLDialogElement;
        if (dialog) {
            dialog.close();
        }
    };

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="flex flex-col h-full text-neutral-900 bg-white">
            <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-bold">Your Cart</h2>
                <button onClick={closeCart} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
                    <X size={24} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                        <p>Your cart is empty.</p>
                    </div>
                ) : (
                    <ul className="space-y-4">
                        {cartItems.map(item => (
                            <li key={item.id} className="flex gap-4 border-b pb-4">
                                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-medium line-clamp-1">{item.title}</h3>
                                        <p className="text-gray-600">${item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center border rounded">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                                            >-</button>
                                            <span className="px-3 py-1 border-x">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                                            >+</button>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
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
                <div className="p-4 border-t bg-gray-50">
                    <div className="flex items-center justify-between mb-4">
                        <span className="font-semibold text-lg">Total</span>
                        <span className="font-bold text-xl">${total.toFixed(2)}</span>
                    </div>
                    <button className="w-full bg-neutral-900 text-white py-3 rounded-lg font-medium hover:bg-neutral-800 transition-colors cursor-pointer">
                        Checkout
                    </button>
                </div>
            )}
        </div>
    );
}
