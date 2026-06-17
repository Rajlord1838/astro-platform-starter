import React, { useEffect, useState } from 'react';
import type { CartItem } from '../types';
import { Trash2 } from 'lucide-react';

export default function Cart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const cartString = localStorage.getItem('fashion_store_cart');
        if (cartString) {
            setCartItems(JSON.parse(cartString));
        }
        setIsLoaded(true);
    }, []);

    const updateCart = (newCart: CartItem[]) => {
        setCartItems(newCart);
        localStorage.setItem('fashion_store_cart', JSON.stringify(newCart));
        window.dispatchEvent(new Event('cart-updated'));
    };

    const handleQuantityChange = (id: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        const newCart = cartItems.map(item =>
            item.product.id === id ? { ...item, quantity: newQuantity } : item
        );
        updateCart(newCart);
    };

    const handleRemoveItem = (id: string) => {
        const newCart = cartItems.filter(item => item.product.id !== id);
        updateCart(newCart);
    };

    if (!isLoaded) return null;

    const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    return (
        <div className="bg-white">
            {cartItems.length === 0 ? (
                <div className="text-center py-16">
                    <h2 className="text-2xl font-medium text-gray-900 mb-4">Your cart is empty</h2>
                    <a href="/products" className="text-indigo-600 hover:text-indigo-500 font-medium">
                        Continue Shopping
                    </a>
                </div>
            ) : (
                <div className="mt-8 border-t border-gray-200">
                    <ul role="list" className="divide-y divide-gray-200">
                        {cartItems.map((item) => (
                            <li key={item.product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                        src={item.product.imageUrl}
                                        alt={item.product.name}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <h3>{item.product.name}</h3>
                                            <p className="ml-4">${(item.product.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">{item.product.category}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <label htmlFor={`quantity-${item.product.id}`} className="text-gray-500">
                                                Qty
                                            </label>
                                            <input
                                                id={`quantity-${item.product.id}`}
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value))}
                                                className="w-16 rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm px-2"
                                            />
                                        </div>

                                        <div className="flex">
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveItem(item.product.id)}
                                                className="font-medium text-indigo-600 hover:text-indigo-500 flex items-center gap-1"
                                            >
                                                <Trash2 size={16} />
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6 mt-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>${total.toFixed(2)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6">
                            <button
                                onClick={() => alert('Checkout flow is not implemented in this demo.')}
                                className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800"
                            >
                                Checkout
                            </button>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                                or{' '}
                                <a href="/products" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Continue Shopping
                                    <span aria-hidden="true"> &rarr;</span>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
