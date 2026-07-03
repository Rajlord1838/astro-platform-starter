import React, { useState, useEffect } from 'react';
import type { Product } from '../types';
import { Trash2 } from 'lucide-react';

export default function Cart() {
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const loadCart = () => {
            const cartString = localStorage.getItem('fashion_store_cart');
            if (cartString) {
                setCartItems(JSON.parse(cartString));
            }
        };

        loadCart();

        window.addEventListener('cart-updated', loadCart);
        return () => window.removeEventListener('cart-updated', loadCart);
    }, []);

    const removeFromCart = (indexToRemove: number) => {
        const newCart = cartItems.filter((_, index) => index !== indexToRemove);
        setCartItems(newCart);
        localStorage.setItem('fashion_store_cart', JSON.stringify(newCart));
        window.dispatchEvent(new Event('cart-updated'));
    };

    if (!isMounted) {
        return <div className="py-10 text-center text-gray-500">Loading cart...</div>;
    }

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="max-w-4xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
            <h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-900">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className="py-12 text-center bg-white rounded-lg shadow-sm">
                    <p className="mb-4 text-lg text-gray-500">Your cart is empty.</p>
                    <a href="/" className="btn">Continue Shopping</a>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    <div className="lg:col-span-8">
                        <ul className="divide-y divide-gray-200">
                            {cartItems.map((item, index) => (
                                <li key={`${item.id}-${index}`} className="flex py-6">
                                    <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-md sm:w-32 sm:h-32 bg-gray-100">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="object-cover object-center w-full h-full"
                                        />
                                    </div>

                                    <div className="flex flex-col flex-1 ml-4 sm:ml-6">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>{item.name}</h3>
                                                <p className="ml-4">${item.price.toFixed(2)}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                                        </div>
                                        <div className="flex items-end justify-between flex-1 text-sm">
                                            <button
                                                type="button"
                                                onClick={() => removeFromCart(index)}
                                                className="flex items-center gap-1 font-medium text-red-600 hover:text-red-500"
                                            >
                                                <Trash2 size={16} />
                                                <span>Remove</span>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-4">
                        <div className="p-6 bg-gray-50 rounded-lg">
                            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
                            <div className="flex justify-between pt-4 mt-6 text-base font-medium text-gray-900 border-t border-gray-200">
                                <p>Subtotal</p>
                                <p>${total.toFixed(2)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                            <div className="mt-6">
                                <button className="w-full btn btn-lg">Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
