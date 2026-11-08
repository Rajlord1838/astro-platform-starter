import React, { useState, useEffect } from 'react';
import type { CartItem } from '../../types';
import { getCart, getCartTotal, updateQuantity, removeFromCart, toggleCart } from '../../utils/cart';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';

export default function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState<CartItem[]>([]);

    // Check if we are running in the browser before using document/window
    const isBrowser = typeof window !== 'undefined';

    const refreshCart = () => {
        setItems(getCart());
    };

    useEffect(() => {
        if (!isBrowser) return;

        // Initial load
        refreshCart();

        // Listen for custom events
        const handleCartUpdated = () => refreshCart();
        const handleToggleCart = (e: Event) => {
            const customEvent = e as CustomEvent<boolean | undefined>;
            if (customEvent.detail !== undefined) {
                setIsOpen(customEvent.detail);
            } else {
                setIsOpen(prev => !prev);
            }
        };

        window.addEventListener('cart-updated', handleCartUpdated);
        window.addEventListener('toggle-cart', handleToggleCart);

        return () => {
            window.removeEventListener('cart-updated', handleCartUpdated);
            window.removeEventListener('toggle-cart', handleToggleCart);
        };
    }, [isBrowser]);

    // Handle body scroll locking
    useEffect(() => {
        if (isBrowser) {
            if (isOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'unset';
            }
        }
    }, [isOpen, isBrowser]);

    const total = getCartTotal(items);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            {/* Cart Toggle Button */}
            <button
                onClick={() => toggleCart()}
                className="relative p-2 text-gray-700 hover:text-primary transition-colors"
                aria-label="Open cart"
            >
                <ShoppingBag size={24} />
                {itemCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full">
                        {itemCount}
                    </span>
                )}
            </button>

            {/* Cart Modal Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                    onClick={() => toggleCart(false)}
                    aria-hidden="true"
                />
            )}

            {/* Cart Drawer */}
            <div
                className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
                role="dialog"
                aria-modal="true"
                aria-label="Shopping Cart"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <ShoppingBag className="text-primary" />
                        Your Cart
                    </h2>
                    <button
                        onClick={() => toggleCart(false)}
                        className="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Close cart"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-500">
                            <ShoppingBag size={48} className="text-gray-300" />
                            <p className="text-lg">Your cart is empty.</p>
                            <button
                                onClick={() => toggleCart(false)}
                                className="text-primary hover:underline font-medium"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <ul className="space-y-6">
                            {items.map((item) => (
                                <li key={item.product.id} className="flex gap-4">
                                    <div className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                                        <img
                                            src={item.product.imageUrl}
                                            alt={item.product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col">
                                        <div className="flex justify-between">
                                            <h3 className="text-base font-medium text-gray-900 line-clamp-1">
                                                {item.product.name}
                                            </h3>
                                            <p className="ml-4 text-base font-medium text-gray-900">
                                                ${(item.product.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">{item.product.category}</p>
                                        <div className="flex items-center justify-between mt-auto pt-2">
                                            <div className="flex items-center border rounded-md">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-50"
                                                    aria-label={`Decrease quantity of ${item.product.name}`}
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="px-3 text-sm font-medium text-gray-900 min-w-[2rem] text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                                    aria-label={`Increase quantity of ${item.product.name}`}
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="text-red-500 hover:text-red-700 p-1 flex items-center gap-1 text-sm font-medium transition-colors"
                                                aria-label={`Remove ${item.product.name} from cart`}
                                            >
                                                <Trash2 size={16} />
                                                <span className="sr-only">Remove</span>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t p-6 bg-gray-50">
                        <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                            <p>Subtotal</p>
                            <p>${total.toFixed(2)}</p>
                        </div>
                        <p className="text-sm text-gray-500 mb-6">Shipping and taxes calculated at checkout.</p>
                        <button
                            className="w-full bg-primary text-white py-3 px-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors shadow-sm"
                            onClick={() => alert('Checkout flow would start here!')}
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
