import React, { useState, useEffect } from 'react';
import { Trash2, X, ShoppingBag } from 'lucide-react';
import type { CartItem } from '../types';
import { getCart, removeFromCart, subscribeToCartChanges, clearCart } from '../utils/cart';

export const Cart: React.FC = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const updateCart = () => {
            setCart(getCart());
        };

        // Initial load
        updateCart();

        // Subscribe to changes
        const unsubscribe = subscribeToCartChanges(updateCart);

        return () => unsubscribe();
    }, []);

    const closeCart = () => {
        const dialog = document.getElementById('cart-modal') as HTMLDialogElement;
        if (dialog) {
            dialog.close();
        }
    };

    const handleCheckout = () => {
        alert('Thank you for your purchase!');
        clearCart();
        closeCart();
    };

    if (!isMounted) return null;

    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <div className="flex flex-col h-full bg-gray-900 text-white w-full max-w-md sm:w-96 rounded-xl overflow-hidden shadow-2xl border border-gray-800">
            <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900/50">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <ShoppingBag size={20} />
                    Your Cart
                </h2>
                <button
                    onClick={closeCart}
                    className="p-1 rounded-full hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
                    aria-label="Close cart"
                >
                    <X size={20} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
                        <ShoppingBag size={48} className="opacity-20" />
                        <p>Your cart is empty.</p>
                        <button
                            onClick={closeCart}
                            className="text-primary hover:underline mt-2"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <ul className="space-y-4">
                        {cart.map((item) => (
                            <li key={item.product.id} className="flex gap-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
                                <div className="w-20 h-20 shrink-0 bg-gray-800 rounded overflow-hidden">
                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex flex-col flex-1 min-w-0">
                                    <h3 className="font-medium text-sm line-clamp-2 mb-1 text-gray-100">
                                        {item.product.name}
                                    </h3>
                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="text-sm">
                                            <span className="text-gray-400">Qty:</span> {item.quantity}
                                        </div>
                                        <div className="font-semibold text-primary">
                                            ${(item.product.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.product.id)}
                                    className="p-2 self-start text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                                    aria-label={`Remove ${item.product.name} from cart`}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {cart.length > 0 && (
                <div className="p-4 border-t border-gray-800 bg-gray-900/80 backdrop-blur-md">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-400 font-medium">Subtotal</span>
                        <span className="text-xl font-bold text-white">${total.toFixed(2)}</span>
                    </div>
                    <button
                        onClick={handleCheckout}
                        className="w-full bg-primary text-primary-content font-bold py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        Checkout
                    </button>
                </div>
            )}
        </div>
    );
};
