import React, { useEffect, useState } from 'react';
import { getCart, removeFromCart, clearCart, CART_EVENT } from '../utils/cart';
import type { CartItem } from '../utils/cart';

export default function Cart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const updateCart = () => {
            setCartItems(getCart());
        };

        // Initial fetch
        updateCart();

        // Listen for updates
        window.addEventListener(CART_EVENT, updateCart);
        return () => window.removeEventListener(CART_EVENT, updateCart);
    }, []);

    const closeCart = () => {
        const modal = document.getElementById('cart-modal') as HTMLDialogElement | null;
        if (modal) {
            modal.close();
        }
    };

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="bg-white text-black p-6 w-full max-w-md mx-auto rounded-lg shadow-xl">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Your Cart</h2>
                <button onClick={closeCart} className="text-gray-500 hover:text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty.</p>
            ) : (
                <div className="flex flex-col gap-4">
                    <ul className="divide-y divide-gray-200">
                        {cartItems.map(item => (
                            <li key={item.id} className="py-4 flex gap-4">
                                <img src={item.imageUrl} alt={item.title} className="w-16 h-16 object-cover rounded" />
                                <div className="flex-1">
                                    <h3 className="font-semibold">{item.title}</h3>
                                    <p className="text-sm text-gray-500">${item.price} x {item.quantity}</p>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 hover:text-red-700 text-sm font-semibold"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="border-t pt-4 mt-2">
                        <div className="flex justify-between font-bold text-lg mb-4">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <button
                            className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors mb-2"
                            onClick={() => {
                                alert('Checkout not implemented in this demo.');
                                clearCart();
                                closeCart();
                            }}
                        >
                            Checkout
                        </button>
                        <button
                            className="w-full border border-gray-300 text-gray-700 py-2 rounded-md font-semibold hover:bg-gray-50 transition-colors"
                            onClick={clearCart}
                        >
                            Clear Cart
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
