import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import type { CartItem } from '../types';

export default function CartList() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const loadCart = () => {
        try {
            const stored = localStorage.getItem('fashion_store_cart');
            if (stored) {
                setCartItems(JSON.parse(stored));
            } else {
                setCartItems([]);
            }
        } catch (e) {
            console.error('Failed to load cart', e);
        } finally {
            setIsLoaded(true);
        }
    };

    useEffect(() => {
        loadCart();
        window.addEventListener('cart-updated', loadCart);
        return () => window.removeEventListener('cart-updated', loadCart);
    }, []);

    const updateQuantity = (productId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        const newCart = cartItems.map(item =>
            item.product.id === productId ? { ...item, quantity: newQuantity } : item
        );
        saveCart(newCart);
    };

    const removeItem = (productId: string) => {
        const newCart = cartItems.filter(item => item.product.id !== productId);
        saveCart(newCart);
    };

    const saveCart = (newCart: CartItem[]) => {
        setCartItems(newCart);
        localStorage.setItem('fashion_store_cart', JSON.stringify(newCart));
        window.dispatchEvent(new Event('cart-updated'));
    };

    if (!isLoaded) {
        return <div className="py-12 text-center">Loading cart...</div>;
    }

    if (cartItems.length === 0) {
        return (
            <div className="py-16 text-center bg-gray-800/50 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <p className="text-gray-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
                <a href="/products" className="btn btn-lg">Browse Products</a>
            </div>
        );
    }

    const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    return (
        <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
                {cartItems.map((item) => (
                    <div key={item.product.id} className="flex gap-6 p-4 bg-gray-800/50 rounded-lg">
                        <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-24 h-24 object-cover rounded bg-gray-700"
                        />
                        <div className="flex-grow flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-lg">{item.product.name}</h3>
                                    <p className="text-gray-400">${item.product.price.toFixed(2)}</p>
                                </div>
                                <button
                                    onClick={() => removeItem(item.product.id)}
                                    className="p-2 text-gray-400 hover:text-primary transition-colors cursor-pointer"
                                    aria-label="Remove item"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex items-center gap-4">
                                <label htmlFor={`qty-${item.product.id}`} className="sr-only">Quantity</label>
                                <div className="flex items-center border border-gray-600 rounded">
                                    <button
                                        className="px-3 py-1 hover:bg-gray-700 cursor-pointer"
                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                    >-</button>
                                    <span className="px-3 py-1 border-x border-gray-600">{item.quantity}</span>
                                    <button
                                        className="px-3 py-1 hover:bg-gray-700 cursor-pointer"
                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                    >+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-6 bg-gray-800/80 rounded-lg h-fit space-y-4">
                <h2 className="text-xl font-bold border-b border-gray-700 pb-4">Order Summary</h2>
                <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span>Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-gray-700 pt-4 mt-4">
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <button className="w-full py-4 mt-6 btn bg-white text-gray-900 hover:bg-gray-200">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}
