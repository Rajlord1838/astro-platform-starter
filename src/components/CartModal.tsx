import React, { useState, useEffect } from 'react';
import type { CartItem } from '../types';
import { getCart, removeFromCart, CART_UPDATED_EVENT } from '../utils/cart';

export const CartModal: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const updateCart = () => {
            setCartItems(getCart());
        };

        updateCart();
        window.addEventListener(CART_UPDATED_EVENT, updateCart);
        return () => window.removeEventListener(CART_UPDATED_EVENT, updateCart);
    }, []);

    const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    const closeModal = () => {
        const modal = document.getElementById('cart-modal') as HTMLDialogElement;
        if (modal) modal.close();
    };

    return (
        <dialog id="cart-modal" className="modal bg-transparent p-0 m-auto backdrop:bg-black/50 backdrop:backdrop-blur-sm w-full max-w-lg rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-primary-content text-white p-6 relative">
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

                {cartItems.length === 0 ? (
                    <p className="text-gray-400 py-8 text-center">Your cart is empty.</p>
                ) : (
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                        {cartItems.map((item) => (
                            <div key={item.product.id} className="flex gap-4 items-center bg-gray-800/50 p-4 rounded-lg">
                                <img
                                    src={item.product.imageUrl}
                                    alt={item.product.name}
                                    className="w-20 h-20 object-cover rounded bg-gray-900"
                                />
                                <div className="flex-grow">
                                    <h3 className="font-semibold text-lg">{item.product.name}</h3>
                                    <p className="text-gray-400 text-sm">{item.product.category}</p>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-primary font-medium">${item.product.price.toFixed(2)} x {item.quantity}</span>
                                        <button
                                            onClick={() => removeFromCart(item.product.id)}
                                            className="text-red-400 hover:text-red-300 text-sm underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {cartItems.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-700">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-xl font-bold">Total:</span>
                            <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                        </div>
                        <button className="w-full bg-primary text-primary-content font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </dialog>
    );
};
