import React, { useState, useEffect } from 'react';
import type { CartItem } from '../types';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

export default function Cart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    const loadCart = () => {
        const cartStr = localStorage.getItem('fashion_store_cart');
        if (cartStr) {
            setCartItems(JSON.parse(cartStr));
        } else {
            setCartItems([]);
        }
    };

    useEffect(() => {
        setIsMounted(true);
        loadCart();

        const handleCartUpdate = () => {
            loadCart();
        };

        window.addEventListener('cart-updated', handleCartUpdate);
        return () => window.removeEventListener('cart-updated', handleCartUpdate);
    }, []);

    const updateQuantity = (id: string, delta: number) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(updatedCart);
        localStorage.setItem('fashion_store_cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('cart-updated'));
    };

    const removeItem = (id: string) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('fashion_store_cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('cart-updated'));
    };

    if (!isMounted) {
        return null; // Prevents hydration mismatch
    }

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-gray-900 rounded-lg border border-gray-800 text-center">
                <ShoppingBag size={48} className="text-gray-500 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                <p className="text-gray-400 mb-6">Looks like you haven't added any items to your cart yet.</p>
                <a href="/" className="btn">Continue Shopping</a>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 pb-4 border-b border-gray-800">Shopping Cart</h2>

            <div className="space-y-6 mb-8">
                {cartItems.map(item => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-4 items-center pb-6 border-b border-gray-800 last:border-0 last:pb-0">
                        <div className="w-24 h-24 shrink-0 rounded overflow-hidden bg-gray-800">
                            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-grow text-center sm:text-left">
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                            <p className="text-primary font-medium">${item.price.toFixed(2)}</p>
                        </div>

                        <div className="flex items-center gap-3 bg-gray-800 rounded-lg p-1">
                            <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-1 hover:bg-gray-700 rounded transition-colors text-gray-300 hover:text-white disabled:opacity-50"
                                disabled={item.quantity <= 1}
                                aria-label="Decrease quantity"
                            >
                                <Minus size={16} />
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-1 hover:bg-gray-700 rounded transition-colors text-gray-300 hover:text-white"
                                aria-label="Increase quantity"
                            >
                                <Plus size={16} />
                            </button>
                        </div>

                        <div className="w-24 text-right font-bold text-lg hidden sm:block">
                            ${(item.price * item.quantity).toFixed(2)}
                        </div>

                        <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-gray-400 hover:text-red-400 transition-colors rounded-full hover:bg-gray-800"
                            aria-label="Remove item"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="bg-gray-800 rounded-lg p-6 flex flex-col md:flex-row justify-between items-center gap-6 mt-8">
                <div>
                    <p className="text-gray-400 mb-1">Total Amount</p>
                    <p className="text-3xl font-bold">${total.toFixed(2)}</p>
                </div>
                <button className="btn btn-lg w-full md:w-auto">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}