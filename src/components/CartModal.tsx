import React, { useEffect, useState } from 'react';
import { CART_UPDATED_EVENT, getCart, removeFromCart, type CartItem, clearCart } from './CartState';

export default function CartModal() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const updateCart = () => {
            setCartItems(getCart());
        };

        // Initial load
        updateCart();

        // Listen for updates
        window.addEventListener(CART_UPDATED_EVENT, updateCart);
        return () => window.removeEventListener(CART_UPDATED_EVENT, updateCart);
    }, []);

    const closeCart = () => {
        const modal = document.getElementById('cart-modal') as HTMLDialogElement;
        if (modal) {
            modal.close();
        }
    };

    const handleCheckout = () => {
        alert('Thank you for your purchase!');
        clearCart();
        closeCart();
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <dialog id="cart-modal" className="fixed inset-0 m-auto w-full max-w-md rounded-xl bg-white p-6 shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm open:animate-in open:fade-in open:zoom-in-95">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
                <button onClick={closeCart} className="text-gray-400 transition-colors hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="my-6 max-h-[60vh] overflow-y-auto">
                {cartItems.length === 0 ? (
                    <p className="text-center text-gray-500">Your cart is empty.</p>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {cartItems.map((item) => (
                            <li key={item.id} className="flex py-4">
                                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <h3>{item.name}</h3>
                                            <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                        <p className="text-gray-500">Qty {item.quantity}</p>
                                        <button
                                            type="button"
                                            onClick={() => removeFromCart(item.id)}
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

            {cartItems.length > 0 && (
                <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                        <p>Total</p>
                        <p>${totalPrice.toFixed(2)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                        <button
                            onClick={handleCheckout}
                            className="flex w-full items-center justify-center rounded-md bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800"
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </dialog>
    );
}
