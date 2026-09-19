import React, { useEffect, useState } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { getCart, removeFromCart, updateQuantity } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function CartModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        // Initialize state
        setCartItems(getCart());

        const handleToggle = () => setIsOpen((prev) => !prev);
        const handleCartUpdated = (e: Event) => {
            const customEvent = e as CustomEvent<CartItem[]>;
            setCartItems(customEvent.detail);
        };

        window.addEventListener('toggle-cart', handleToggle);
        window.addEventListener('cart-updated', handleCartUpdated);

        return () => {
            window.removeEventListener('toggle-cart', handleToggle);
            window.removeEventListener('cart-updated', handleCartUpdated);
        };
    }, []);

    if (!isOpen) return null;

    const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm transition-opacity">
            <div className="w-full max-w-md h-full bg-white text-gray-900 shadow-2xl flex flex-col animate-slide-in-right relative">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <ShoppingBag className="text-primary" />
                        Your Cart
                    </h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 text-gray-500 hover:text-gray-800 transition-colors focus:outline-none rounded-full hover:bg-gray-100"
                        aria-label="Close Cart"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-grow overflow-y-auto p-6">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <ShoppingBag size={64} className="mb-4 opacity-50" />
                            <p className="text-lg">Your cart is empty.</p>
                        </div>
                    ) : (
                        <ul className="space-y-6">
                            {cartItems.map((item) => (
                                <li key={item.product.id} className="flex gap-4">
                                    <div className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col flex-grow justify-between">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-semibold text-gray-800 line-clamp-1">{item.product.name}</h3>
                                                <p className="font-bold ml-4">${(item.product.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">${item.product.price.toFixed(2)} each</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center border border-gray-300 rounded-md">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="p-1 text-gray-500 hover:text-primary transition-colors focus:outline-none"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="p-1 text-gray-500 hover:text-primary transition-colors focus:outline-none"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="text-sm text-red-500 hover:text-red-700 underline focus:outline-none"
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

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="border-t border-gray-200 p-6 bg-gray-50">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold text-gray-700">Subtotal</span>
                            <span className="text-2xl font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                        </div>
                        <button className="w-full btn bg-primary text-primary-content py-3 rounded-md font-bold text-lg hover:bg-primary/90 transition-colors shadow-sm">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
