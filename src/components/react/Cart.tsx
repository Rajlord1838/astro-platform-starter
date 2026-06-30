import React, { useState, useEffect } from 'react';
import { ShoppingCart, X } from 'lucide-react';
import type { CartItem } from '../../types';

export default function Cart() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);

    const loadCart = () => {
        const cartStr = localStorage.getItem('fashion_store_cart');
        if (cartStr) {
            try {
                setCart(JSON.parse(cartStr));
            } catch (e) {
                console.error('Failed to parse cart', e);
            }
        }
    };

    useEffect(() => {
        setIsClient(true);
        loadCart();
        const handleCartUpdate = () => loadCart();
        window.addEventListener('cart-updated', handleCartUpdate);
        return () => window.removeEventListener('cart-updated', handleCartUpdate);
    }, []);

    const toggleCart = () => setIsOpen(!isOpen);

    const removeFromCart = (productId: string) => {
        const updatedCart = cart.filter(item => item.product.id !== productId);
        setCart(updatedCart);
        localStorage.setItem('fashion_store_cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('cart-updated'));
    };

    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

    if (!isClient) return null; // Avoid hydration mismatch

    return (
        <div className="relative">
            <button
                onClick={toggleCart}
                className="relative p-2 text-white hover:text-primary transition-colors flex items-center gap-2"
                aria-label="Shopping Cart"
            >
                <ShoppingCart size={24} />
                {itemCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary rounded-full transform translate-x-1/2 -translate-y-1/2">
                        {itemCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 text-gray-800 border border-gray-200">
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-lg font-bold">Your Cart</h2>
                        <button onClick={toggleCart} className="text-gray-500 hover:text-gray-700">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-4 max-h-96 overflow-y-auto">
                        {cart.length === 0 ? (
                            <p className="text-center text-gray-500 my-4">Your cart is empty.</p>
                        ) : (
                            <ul className="space-y-4">
                                {cart.map((item) => (
                                    <li key={item.product.id} className="flex justify-between items-center">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {item.product.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Qty: {item.quantity} x ${item.product.price.toFixed(2)}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm font-semibold">
                                                ${(item.quantity * item.product.price).toFixed(2)}
                                            </span>
                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="text-red-500 hover:text-red-700 text-sm"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {cart.length > 0 && (
                        <div className="p-4 border-t border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-bold">Total:</span>
                                <span className="font-bold">${totalPrice.toFixed(2)}</span>
                            </div>
                            <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition-colors">
                                Checkout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
