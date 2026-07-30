import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Minus, Plus, Trash2 } from 'lucide-react';
import { getCart, removeFromCart, updateQuantity, CART_UPDATED_EVENT } from '../utils/cart';
import type { CartItem } from '../types';

export default function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        setCartItems(getCart());

        const handleCartUpdate = () => {
            setCartItems(getCart());
        };

        window.addEventListener(CART_UPDATED_EVENT, handleCartUpdate);
        return () => window.removeEventListener(CART_UPDATED_EVENT, handleCartUpdate);
    }, []);

    const toggleCart = () => setIsOpen(!isOpen);

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    return (
        <>
            <button
                onClick={toggleCart}
                className="relative p-2 text-white hover:text-primary transition-colors cursor-pointer"
                aria-label="Shopping Cart"
            >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full">
                        {cartCount}
                    </span>
                )}
            </button>

            {/* Cart Sidebar Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                    onClick={toggleCart}
                ></div>
            )}

            {/* Cart Sidebar */}
            <div className={`fixed inset-y-0 right-0 w-full md:w-[400px] bg-complementary shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <h2 className="text-xl font-bold text-white">Your Cart</h2>
                    <button
                        onClick={toggleCart}
                        className="p-2 text-gray-300 hover:text-white cursor-pointer"
                        aria-label="Close cart"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cartItems.length === 0 ? (
                        <div className="text-center text-gray-400 mt-10">
                            <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
                            <p>Your cart is empty.</p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.product.id} className="flex gap-4 bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-20 h-24 object-cover rounded-md"
                                />
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-semibold text-white line-clamp-1">{item.product.name}</h3>
                                        <p className="text-primary font-medium">${item.product.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center bg-gray-700 rounded-md">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                className="p-1 text-gray-300 hover:text-white cursor-pointer"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                className="p-1 text-gray-300 hover:text-white cursor-pointer"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.product.id)}
                                            className="text-gray-400 hover:text-red-400 p-1 cursor-pointer"
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

                {cartItems.length > 0 && (
                    <div className="p-4 border-t border-gray-700 bg-gray-900/50">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-300">Subtotal:</span>
                            <span className="text-xl font-bold text-white">${cartTotal.toFixed(2)}</span>
                        </div>
                        <button
                            className="w-full btn btn-lg cursor-pointer"
                            onClick={() => alert('Checkout functionality would go here!')}
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
