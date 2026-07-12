import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import type { CartItem } from '../types';

export default function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const loadCart = () => {
        const cartStr = localStorage.getItem('fashion_store_cart');
        if (cartStr) {
            try {
                setCartItems(JSON.parse(cartStr));
            } catch (e) {
                console.error('Failed to parse cart', e);
            }
        } else {
            setCartItems([]);
        }
    };

    useEffect(() => {
        loadCart();

        const handleOpenCart = () => setIsOpen(true);
        const handleCartUpdated = () => loadCart();

        window.addEventListener('open-cart', handleOpenCart);
        window.addEventListener('cart-updated', handleCartUpdated);

        return () => {
            window.removeEventListener('open-cart', handleOpenCart);
            window.removeEventListener('cart-updated', handleCartUpdated);
        };
    }, []);

    const saveCart = (newCart: CartItem[]) => {
        localStorage.setItem('fashion_store_cart', JSON.stringify(newCart));
        setCartItems(newCart);
        window.dispatchEvent(new CustomEvent('cart-updated'));
    };

    const updateQuantity = (productId: string, delta: number) => {
        const newCart = cartItems.map(item => {
            if (item.product.id === productId) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        saveCart(newCart);
    };

    const removeItem = (productId: string) => {
        const newCart = cartItems.filter(item => item.product.id !== productId);
        saveCart(newCart);
    };

    const total = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
            ></div>

            <div className="relative w-full max-w-md h-full bg-color-primary-content text-white shadow-2xl flex flex-col border-l border-white/20">
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <h2 className="text-xl font-bold">Your Cart</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        aria-label="Close cart"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                    {cartItems.length === 0 ? (
                        <div className="text-center text-white/60 mt-10">
                            Your cart is empty.
                        </div>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.product.id} className="flex gap-4 items-center">
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-20 h-20 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-sm">{item.product.name}</h3>
                                    <p className="text-primary font-bold text-sm mt-1">${item.product.price.toFixed(2)}</p>

                                    <div className="flex items-center gap-3 mt-2">
                                        <div className="flex items-center border border-white/20 rounded">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, -1)}
                                                className="p-1 hover:bg-white/10 transition-colors"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="text-xs px-2 w-6 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, 1)}
                                                className="p-1 hover:bg-white/10 transition-colors"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeItem(item.product.id)}
                                    className="p-2 text-red-400 hover:bg-red-400/10 rounded-full transition-colors"
                                    aria-label="Remove item"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="p-6 border-t border-white/10 bg-black/20">
                        <div className="flex items-center justify-between font-bold text-lg mb-6">
                            <span>Total</span>
                            <span className="text-primary">${total.toFixed(2)}</span>
                        </div>
                        <button className="w-full btn btn-lg">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
