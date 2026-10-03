import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { getCart, removeFromCart, updateQuantity, getCartTotal, toggleCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
        const updateCart = () => setCartItems(getCart());
        const handleToggle = () => setIsOpen(prev => !prev);

        updateCart();
        window.addEventListener('cart-updated', updateCart);
        window.addEventListener('toggle-cart', handleToggle);

        return () => {
            window.removeEventListener('cart-updated', updateCart);
            window.removeEventListener('toggle-cart', handleToggle);
        };
    }, []);

    if (!isHydrated) return null;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={() => setIsOpen(false)}
            />

            <div className="relative w-full max-w-md h-full bg-white shadow-xl flex flex-col animate-slide-in">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold flex items-center gap-2 text-primary-content">
                        <ShoppingBag />
                        Your Cart
                    </h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-100"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 text-primary-content">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
                            <ShoppingBag size={48} className="opacity-20" />
                            <p>Your cart is empty.</p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.product.id} className="flex gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50">
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-20 h-24 object-cover rounded-lg shadow-sm"
                                />
                                <div className="flex flex-1 flex-col justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                                        <p className="font-medium text-primary">${item.product.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                className="p-1 hover:bg-gray-100 text-gray-600 rounded-l-lg"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                className="p-1 hover:bg-gray-100 text-gray-600 rounded-r-lg"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.product.id)}
                                            className="text-sm text-red-500 hover:text-red-700 font-medium"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                        <div className="flex justify-between items-center mb-4 text-primary-content">
                            <span className="font-semibold text-gray-600">Total</span>
                            <span className="text-2xl font-bold text-gray-900">${getCartTotal(cartItems).toFixed(2)}</span>
                        </div>
                        <button className="w-full btn btn-lg py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold transition-all shadow-md">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
