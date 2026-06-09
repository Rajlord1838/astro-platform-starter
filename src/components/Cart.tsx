import React, { useState, useEffect } from 'react';
import type { CartItem } from '../types';
import { getCart, removeFromCart } from '../utils/cart';

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const updateCart = () => {
        setCartItems(getCart());
    };

    useEffect(() => {
        updateCart();
        window.addEventListener('cart-updated', updateCart);
        return () => window.removeEventListener('cart-updated', updateCart);
    }, []);

    const toggleCart = () => setIsOpen(!isOpen);

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <div className="relative">
            <button
                onClick={toggleCart}
                className="text-gray-500 hover:text-gray-900 p-2 relative"
                aria-label="Cart"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalItems > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                        {totalItems}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-xl overflow-hidden z-50 border border-gray-100">
                    <div className="p-4 border-b border-gray-100">
                        <h3 className="text-lg font-medium text-gray-900">Shopping Cart</h3>
                    </div>
                    <div className="p-4 max-h-96 overflow-y-auto">
                        {cartItems.length === 0 ? (
                            <p className="text-gray-500 text-center py-4">Your cart is empty.</p>
                        ) : (
                            <ul className="space-y-4">
                                {cartItems.map((item) => (
                                    <li key={item.product.id} className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <img src={item.product.image} alt={item.product.name} className="h-12 w-12 rounded object-cover" />
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-900">{item.product.name}</p>
                                                <p className="text-sm text-gray-500">${item.product.price.toFixed(2)} x {item.quantity}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.product.id)}
                                            className="text-red-500 hover:text-red-700 p-1"
                                            aria-label="Remove item"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {cartItems.length > 0 && (
                        <div className="p-4 border-t border-gray-100 bg-gray-50">
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-medium text-gray-900">Total:</span>
                                <span className="font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
                            </div>
                            <button className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-200">
                                Checkout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Cart;
