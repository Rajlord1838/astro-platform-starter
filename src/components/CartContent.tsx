import React, { useEffect, useState } from 'react';
import type { CartItem } from '../types';
import { getCart, CART_UPDATED_EVENT, updateQuantity, removeFromCart } from '../utils/cart';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function CartContent() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        // Load initial cart data
        setCartItems(getCart());

        // Listen for updates
        const handleCartUpdate = () => {
            setCartItems(getCart());
        };

        window.addEventListener(CART_UPDATED_EVENT, handleCartUpdate);
        return () => window.removeEventListener(CART_UPDATED_EVENT, handleCartUpdate);
    }, []);

    const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    if (cartItems.length === 0) {
        return (
            <div className="py-8 text-center text-gray-500">
                Your cart is empty.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                    <li key={item.product.id} className="flex py-4">
                        <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="h-20 w-20 flex-shrink-0 rounded-md object-cover object-center"
                        />
                        <div className="ml-4 flex flex-1 flex-col">
                            <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3 className="text-gray-900">{item.product.name}</h3>
                                    <p className="ml-4">${(item.product.price * item.quantity).toFixed(2)}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">${item.product.price.toFixed(2)} each</p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="flex items-center gap-2 border border-gray-300 rounded text-gray-700">
                                    <button
                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                        className="p-1 hover:bg-gray-100"
                                        aria-label="Decrease quantity"
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="font-medium min-w-[20px] text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                        className="p-1 hover:bg-gray-100"
                                        aria-label="Increase quantity"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => removeFromCart(item.product.id)}
                                    className="font-medium text-red-500 hover:text-red-400 flex items-center gap-1"
                                >
                                    <Trash2 size={16} />
                                    <span>Remove</span>
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${total.toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                <div className="mt-6">
                    <button
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-primary-content shadow-sm hover:bg-primary/80"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}
