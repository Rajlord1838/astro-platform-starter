import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { getCart, updateQuantity, removeFromCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function CartDrawer() {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // We only want to access window/localStorage on the client
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        setCartItems(getCart());

        const handleCartUpdated = () => setCartItems(getCart());
        const handleToggleCart = () => setIsOpen(prev => !prev);

        window.addEventListener('cart-updated', handleCartUpdated);
        window.addEventListener('toggle-cart', handleToggleCart);

        return () => {
            window.removeEventListener('cart-updated', handleCartUpdated);
            window.removeEventListener('toggle-cart', handleToggleCart);
        };
    }, []);

    if (!isMounted) return null;

    const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Drawer */}
            <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Header */}
                <div className="px-4 py-6 border-b border-gray-200 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" />
                        Shopping Cart
                    </h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Close cart"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-4">
                            <ShoppingBag className="w-16 h-16 text-gray-300" />
                            <p className="text-lg">Your cart is empty</p>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-primary hover:underline font-medium"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <ul className="space-y-6">
                            {cartItems.map((item) => (
                                <li key={item.product.id} className="flex gap-4 py-2 border-b border-gray-50 last:border-0">
                                    <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
                                        <img
                                            src={item.product.imageUrl}
                                            alt={item.product.name}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>

                                    <div className="flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3 className="line-clamp-2 pr-4">{item.product.name}</h3>
                                                <p className="ml-4 whitespace-nowrap">${(item.product.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">{item.product.category}</p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <div className="flex items-center border border-gray-200 rounded-md">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="p-1 text-gray-600 hover:bg-gray-100"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="px-3 font-medium text-gray-900">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="p-1 text-gray-600 hover:bg-gray-100"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="font-medium text-red-500 hover:text-red-400"
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
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6 bg-gray-50 mt-auto">
                        <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                            <p>Subtotal</p>
                            <p>${total.toFixed(2)}</p>
                        </div>
                        <p className="text-sm text-gray-500 mb-6">Shipping and taxes calculated at checkout.</p>
                        <button
                            onClick={() => alert("Checkout not implemented in demo")}
                            className="w-full flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-primary-content shadow-sm hover:bg-primary/90 transition-colors"
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
