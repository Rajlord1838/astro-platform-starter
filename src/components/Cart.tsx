import React, { useState, useEffect } from 'react';
import type { CartItem } from '../types';
import { ShoppingCart, Trash2, X } from 'lucide-react';

export const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const loadCart = () => {
        const cartData = localStorage.getItem('fashion_store_cart');
        if (cartData) {
            try {
                setCartItems(JSON.parse(cartData));
            } catch (e) {
                console.error('Failed to parse cart data', e);
            }
        } else {
            setCartItems([]);
        }
    };

    useEffect(() => {
        loadCart();
        window.addEventListener('cart-updated', loadCart);
        return () => window.removeEventListener('cart-updated', loadCart);
    }, []);

    const removeFromCart = (productId: string) => {
        const updatedCart = cartItems.filter(item => item.product.id !== productId);
        setCartItems(updatedCart);
        localStorage.setItem('fashion_store_cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('cart-updated'));
    };

    const updateQuantity = (productId: string, delta: number) => {
        const updatedCart = cartItems.map(item => {
            if (item.product.id === productId) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(updatedCart);
        localStorage.setItem('fashion_store_cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('cart-updated'));
    }

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 text-white hover:text-primary transition-colors"
                aria-label="Open Cart"
            >
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                        {totalItems}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
                    <div className="w-full max-w-md h-full bg-gray-900 shadow-xl flex flex-col transform transition-transform border-l border-gray-800">
                        <div className="flex items-center justify-between p-4 border-b border-gray-800">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <ShoppingCart size={24} />
                                Your Cart
                            </h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-white"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                    <ShoppingCart size={48} className="mb-4 opacity-50" />
                                    <p>Your cart is empty.</p>
                                </div>
                            ) : (
                                <ul className="space-y-4">
                                    {cartItems.map((item) => (
                                        <li key={item.product.id} className="flex gap-4 p-3 bg-gray-800 rounded-lg">
                                            <div className="w-20 h-20 flex-shrink-0 bg-gray-700 rounded overflow-hidden">
                                                <img
                                                    src={item.product.imageUrl}
                                                    alt={item.product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 flex flex-col">
                                                <div className="flex justify-between">
                                                    <h3 className="font-semibold text-sm line-clamp-2">{item.product.name}</h3>
                                                    <span className="font-bold ml-2">${(item.product.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                                <div className="mt-auto flex items-center justify-between">
                                                    <div className="flex items-center gap-2 bg-gray-900 rounded p-1">
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, -1)}
                                                            className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-700"
                                                        >-</button>
                                                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, 1)}
                                                            className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-700"
                                                        >+</button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.product.id)}
                                                        className="text-red-400 hover:text-red-300 p-1"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="p-4 border-t border-gray-800 bg-gray-900">
                                <div className="flex justify-between items-center mb-4 text-lg font-bold">
                                    <span>Total:</span>
                                    <span className="text-primary">${totalPrice.toFixed(2)}</span>
                                </div>
                                <button className="w-full btn">
                                    Checkout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
