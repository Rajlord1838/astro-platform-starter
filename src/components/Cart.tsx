import React, { useState, useEffect } from 'react';
import type { CartItem } from '../types';
import { getCart, getCartTotal, updateQuantity, removeFromCart, CART_UPDATED_EVENT } from '../utils/cart';

export const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [total, setTotal] = useState(0);

    const updateCartState = () => {
        const currentCart = getCart();
        setCartItems(currentCart);
        setTotal(getCartTotal(currentCart));
    };

    useEffect(() => {
        // Initialize state
        updateCartState();

        // Listen for custom cart-updated event to stay in sync across components
        window.addEventListener(CART_UPDATED_EVENT, updateCartState);
        return () => window.removeEventListener(CART_UPDATED_EVENT, updateCartState);
    }, []);

    const closeDialog = () => {
        const dialog = document.getElementById('cart-dialog') as HTMLDialogElement | null;
        if (dialog) {
            dialog.close();
        }
    };

    return (
        <div className="p-6 bg-gray-900 text-white w-full max-w-md mx-auto rounded-lg shadow-xl h-full max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Your Cart</h2>
                <button onClick={closeDialog} className="text-gray-400 hover:text-white cursor-pointer p-2" aria-label="Close cart">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            <div className="flex-grow overflow-y-auto pr-2">
                {cartItems.length === 0 ? (
                    <div className="text-center text-gray-400 mt-10">
                        <p>Your cart is empty.</p>
                        <button onClick={closeDialog} className="mt-4 text-primary hover:underline cursor-pointer">
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <ul className="space-y-4">
                        {cartItems.map((item) => (
                            <li key={item.product.id} className="flex gap-4 border-b border-gray-700 pb-4">
                                <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded" />
                                <div className="flex-grow">
                                    <h3 className="font-semibold">{item.product.name}</h3>
                                    <p className="text-gray-400">${item.product.price.toFixed(2)}</p>
                                    <div className="flex items-center gap-3 mt-2">
                                        <div className="flex items-center border border-gray-600 rounded">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                className="px-2 py-1 hover:bg-gray-700 cursor-pointer text-gray-300"
                                                aria-label="Decrease quantity"
                                            >
                                                -
                                            </button>
                                            <span className="px-2 text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                className="px-2 py-1 hover:bg-gray-700 cursor-pointer text-gray-300"
                                                aria-label="Increase quantity"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.product.id)}
                                            className="text-red-400 hover:text-red-300 text-sm cursor-pointer ml-auto"
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

            {cartItems.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-700">
                    <div className="flex justify-between items-center mb-4 text-lg font-bold">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <button className="w-full bg-primary text-primary-content hover:bg-primary/90 font-bold py-3 rounded transition-colors cursor-pointer" onClick={() => alert('Checkout flow is not implemented in this demo.')}>
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
};
