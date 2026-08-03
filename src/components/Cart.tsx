import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import type { CartItem } from '../types';
import { getCart, getCartTotalPrice, removeFromCart, updateQuantity } from '../utils/cart';

export default function Cart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const updateState = () => {
        setCartItems(getCart());
        setTotalPrice(getCartTotalPrice());
    };

    useEffect(() => {
        updateState(); // Initial load

        const handleCartUpdate = () => {
            updateState();
        };

        window.addEventListener('cart-updated', handleCartUpdate);
        return () => window.removeEventListener('cart-updated', handleCartUpdate);
    }, []);

    const closeDialog = () => {
        const dialog = document.getElementById('cart-modal') as HTMLDialogElement;
        if (dialog) {
            dialog.close();
        }
    };

    return (
        <div className="flex flex-col h-full bg-complementary text-white max-w-md w-full ml-auto overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h2 className="text-xl font-bold m-0">Your Cart</h2>
                <button onClick={closeDialog} className="p-1 hover:text-primary transition-colors focus:outline-none" aria-label="Close cart">
                    <X size={24} />
                </button>
            </div>

            <div className="flex-grow overflow-y-auto p-4">
                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <p>Your cart is empty.</p>
                        <button onClick={closeDialog} className="mt-4 text-primary hover:underline">
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <ul className="space-y-4">
                        {cartItems.map((item) => (
                            <li key={item.product.id} className="flex gap-4 items-center bg-gray-800 p-3 rounded-lg">
                                <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-gray-700">
                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-sm font-semibold m-0">{item.product.name}</h3>
                                    <p className="text-primary font-bold text-sm m-0">${item.product.price.toFixed(2)}</p>

                                    <div className="flex items-center gap-3 mt-2">
                                        <div className="flex items-center bg-gray-700 rounded-md">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                className="p-1 hover:text-primary transition-colors focus:outline-none"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="text-xs px-2 min-w-[20px] text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                className="p-1 hover:text-primary transition-colors focus:outline-none"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.product.id)}
                                    className="p-2 text-gray-400 hover:text-red-400 transition-colors focus:outline-none self-start"
                                    aria-label="Remove item"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {cartItems.length > 0 && (
                <div className="p-4 border-t border-gray-700 bg-gray-900">
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold">Subtotal</span>
                        <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-4 text-center">Shipping and taxes calculated at checkout.</p>
                    <button className="w-full py-3 bg-primary text-primary-content font-bold rounded-lg hover:bg-primary/90 transition-colors">
                        Checkout
                    </button>
                </div>
            )}
        </div>
    );
}
