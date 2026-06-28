import React, { useEffect, useState } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { getCart, removeFromCart, updateQuantity, clearCart } from '../utils/cart';
import type { CartItem } from '../types';

export default function CartView() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isClient, setIsClient] = useState(false);

    const loadCart = () => {
        setCartItems(getCart());
    };

    useEffect(() => {
        setIsClient(true);
        loadCart();
        window.addEventListener('cart-updated', loadCart);
        return () => window.removeEventListener('cart-updated', loadCart);
    }, []);

    const handleUpdateQuantity = (id: string, newQuantity: number) => {
        updateQuantity(id, newQuantity);
    };

    const handleRemove = (id: string) => {
        removeFromCart(id);
    };

    const handleCheckout = () => {
        alert('Thank you for your purchase!');
        clearCart();
    };

    if (!isClient) return null; // Avoid hydration mismatch

    const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
                <a href="/" className="inline-block bg-black text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">
                    Start Shopping
                </a>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-grow">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h2>
                <div className="divide-y divide-gray-200">
                    {cartItems.map((item) => (
                        <div key={item.product.id} className="py-6 flex gap-6">
                            <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-24 h-24 object-cover rounded-md"
                            />
                            <div className="flex-grow flex flex-col justify-between">
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="text-base font-medium text-gray-900">{item.product.name}</h3>
                                        <p className="mt-1 text-sm text-gray-500">{item.product.category}</p>
                                    </div>
                                    <p className="text-base font-medium text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</p>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center border border-gray-300 rounded-md">
                                        <button
                                            onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                                            className="p-1 text-gray-600 hover:text-black"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="px-4 text-sm font-medium">{item.quantity}</span>
                                        <button
                                            onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                                            className="p-1 text-gray-600 hover:text-black"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => handleRemove(item.product.id)}
                                        className="text-sm font-medium text-red-600 hover:text-red-500 flex items-center gap-1"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full lg:w-96">
                <div className="bg-gray-50 rounded-lg p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                    <div className="flow-root">
                        <dl className="-my-4 text-sm divide-y divide-gray-200">
                            <div className="py-4 flex items-center justify-between">
                                <dt className="text-gray-600">Subtotal</dt>
                                <dd className="font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
                            </div>
                            <div className="py-4 flex items-center justify-between">
                                <dt className="text-gray-600">Shipping</dt>
                                <dd className="font-medium text-gray-900">Free</dd>
                            </div>
                            <div className="py-4 flex items-center justify-between">
                                <dt className="text-base font-bold text-gray-900">Order Total</dt>
                                <dd className="text-base font-bold text-gray-900">${subtotal.toFixed(2)}</dd>
                            </div>
                        </dl>
                    </div>
                    <button
                        onClick={handleCheckout}
                        className="w-full mt-6 bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}
