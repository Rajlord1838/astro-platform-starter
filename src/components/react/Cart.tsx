import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { getCart, removeFromCart, updateQuantity, toggleCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        setCart(getCart());

        const handleCartUpdate = (e: CustomEvent<CartItem[]>) => {
            setCart(e.detail);
        };

        const handleToggleCart = () => {
            setIsOpen(prev => !prev);
        };

        window.addEventListener('cart-updated', handleCartUpdate as EventListener);
        window.addEventListener('toggle-cart', handleToggleCart);

        return () => {
            window.removeEventListener('cart-updated', handleCartUpdate as EventListener);
            window.removeEventListener('toggle-cart', handleToggleCart);
        };
    }, []);

    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50" onClick={toggleCart}>
            <div
                className="w-full max-w-md bg-white h-full shadow-xl flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
                    <button onClick={toggleCart} className="p-2 text-gray-500 hover:text-black">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {cart.length === 0 ? (
                        <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
                    ) : (
                        <ul className="space-y-4">
                            {cart.map((item) => (
                                <li key={item.product.id} className="flex items-center gap-4 border-b pb-4">
                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                                        <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                className="p-1 text-gray-500 border rounded hover:bg-gray-100"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="w-8 text-center text-gray-800">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                className="p-1 text-gray-500 border rounded hover:bg-gray-100"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.product.id)}
                                        className="p-2 text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="p-4 border-t bg-gray-50">
                    <div className="flex justify-between items-center mb-4 text-lg font-bold text-gray-800">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <button
                        className="w-full py-3 bg-black text-white font-semibold rounded hover:bg-gray-800 disabled:opacity-50"
                        disabled={cart.length === 0}
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}
