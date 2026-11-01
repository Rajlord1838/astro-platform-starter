import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { getCart, updateQuantity, removeFromCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        // Initialize cart from local storage
        setCartItems(getCart());

        // Listen for cart updates
        const handleCartUpdated = (e: Event) => {
            const customEvent = e as CustomEvent<CartItem[]>;
            setCartItems(customEvent.detail);
        };

        // Listen for toggle cart modal
        const handleToggleCart = (e: Event) => {
            const customEvent = e as CustomEvent<boolean>;
            setIsOpen(customEvent.detail);
        };

        window.addEventListener('cart-updated', handleCartUpdated);
        window.addEventListener('toggle-cart', handleToggleCart);

        return () => {
            window.removeEventListener('cart-updated', handleCartUpdated);
            window.removeEventListener('toggle-cart', handleToggleCart);
        };
    }, []);

    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalAmount = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

    return (
        <>
            {/* Cart Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 text-white hover:text-primary transition-colors cursor-pointer"
                aria-label="Open cart"
            >
                <ShoppingCart size={24} />
                {itemCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full">
                        {itemCount}
                    </span>
                )}
            </button>

            {/* Cart Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex justify-end bg-black/50" aria-modal="true" role="dialog">
                    <div className="w-full max-w-md h-full bg-complementary flex flex-col shadow-xl">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-700">
                            <h2 className="text-xl font-bold">Shopping Cart ({itemCount})</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-gray-800 rounded-full transition-colors cursor-pointer"
                                aria-label="Close cart"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                            {cartItems.length === 0 ? (
                                <div className="text-center text-gray-400 mt-10">
                                    Your cart is empty.
                                </div>
                            ) : (
                                cartItems.map((item) => (
                                    <div key={item.product.id} className="flex gap-4 p-3 bg-gray-900 rounded-lg">
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            className="w-20 h-24 object-cover rounded"
                                        />
                                        <div className="flex-1 flex flex-col">
                                            <h3 className="font-semibold">{item.product.name}</h3>
                                            <p className="text-primary font-medium">${item.product.price.toFixed(2)}</p>

                                            <div className="mt-auto flex items-center justify-between">
                                                <div className="flex items-center gap-2 bg-gray-800 rounded-md">
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                        className="p-1 hover:text-primary transition-colors cursor-pointer"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className="w-6 text-center text-sm">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                        className="p-1 hover:text-primary transition-colors cursor-pointer"
                                                        aria-label="Increase quantity"
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => removeFromCart(item.product.id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                                                    aria-label="Remove item"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="p-4 border-t border-gray-700 bg-gray-900">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-lg font-medium">Subtotal:</span>
                                    <span className="text-2xl font-bold text-primary">${totalAmount.toFixed(2)}</span>
                                </div>
                                <button className="w-full bg-primary text-primary-content font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors cursor-pointer">
                                    Checkout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
