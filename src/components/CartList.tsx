import React, { useEffect, useState } from 'react';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import type { CartItem } from '../types';
import { getCart, subscribeToCartChanges, updateQuantity, removeFromCart, clearCart } from '../utils/cartUtils';

export default function CartList() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const loadCart = () => {
        setCartItems(getCart());
        setIsLoaded(true);
    };

    useEffect(() => {
        loadCart();
        const unsubscribe = subscribeToCartChanges(loadCart);
        return unsubscribe;
    }, []);

    if (!isLoaded) {
        return <div className="py-12 text-center text-gray-400">Loading cart...</div>;
    }

    if (cartItems.length === 0) {
        return (
            <div className="py-16 text-center bg-white rounded-lg shadow-sm">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800">Your Cart is Empty</h2>
                <p className="mb-8 text-gray-600">Looks like you haven't added anything to your cart yet.</p>
                <a
                    href="/"
                    className="inline-flex items-center px-6 py-3 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Start Shopping
                </a>
            </div>
        );
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;

    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden text-gray-800">
                    <ul className="divide-y divide-gray-200">
                        {cartItems.map((item) => (
                            <li key={item.product.id} className="flex p-4 sm:p-6">
                                <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                        src={item.product.imageUrl}
                                        alt={item.product.name}
                                        className="object-cover w-full h-full"
                                    />
                                </div>

                                <div className="flex flex-col flex-1 ml-4 sm:ml-6">
                                    <div className="flex justify-between">
                                        <div>
                                            <h3 className="text-base font-medium text-gray-900">
                                                {item.product.name}
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">{item.product.category}</p>
                                        </div>
                                        <p className="text-base font-medium text-gray-900">
                                            ${(item.product.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>

                                    <div className="flex items-end justify-between flex-1 mt-4">
                                        <div className="flex items-center border border-gray-300 rounded-md">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-8 text-center text-gray-900">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.product.id)}
                                            className="text-sm font-medium text-red-600 hover:text-red-500 flex items-center"
                                        >
                                            <Trash2 className="w-4 h-4 mr-1" />
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="p-4 border-t border-gray-200 bg-gray-50 sm:p-6 flex justify-between items-center">
                        <button
                            onClick={clearCart}
                            className="text-sm font-medium text-gray-600 hover:text-gray-900"
                        >
                            Clear Cart
                        </button>
                        <a href="/" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                            Continue Shopping
                        </a>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 text-gray-800">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                    <div className="flow-root">
                        <dl className="-my-4 text-sm divide-y divide-gray-200">
                            <div className="flex items-center justify-between py-4">
                                <dt className="text-gray-600">Subtotal</dt>
                                <dd className="font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
                            </div>
                            <div className="flex items-center justify-between py-4">
                                <dt className="text-gray-600">Tax (8%)</dt>
                                <dd className="font-medium text-gray-900">${tax.toFixed(2)}</dd>
                            </div>
                            <div className="flex items-center justify-between py-4">
                                <dt className="text-gray-600">Shipping</dt>
                                <dd className="font-medium text-gray-900">Free</dd>
                            </div>
                            <div className="flex items-center justify-between py-4">
                                <dt className="text-base font-medium text-gray-900">Order Total</dt>
                                <dd className="text-base font-medium text-gray-900">${total.toFixed(2)}</dd>
                            </div>
                        </dl>
                    </div>

                    <div className="mt-6">
                        <button
                            type="button"
                            className="w-full px-4 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-50"
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
