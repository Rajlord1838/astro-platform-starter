import React, { useEffect, useState } from 'react';
import { Trash2, X, ShoppingBag } from 'lucide-react';
import type { CartItem } from '../types';
import { getCart, removeFromCart, clearCart } from '../utils/cart';

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
        const updateCart = () => {
            setCart(getCart());
        };

        // Initial load
        updateCart();

        // Listen for updates
        window.addEventListener('cart-updated', updateCart);
        return () => window.removeEventListener('cart-updated', updateCart);
    }, []);

    if (!isOpen) return null;
    if (!isHydrated) return null;

    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-lg bg-gray-900 border border-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900/50">
                    <div className="flex items-center gap-2 text-xl font-bold">
                        <ShoppingBag className="text-primary" />
                        <h2>Your Cart</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                        aria-label="Close cart"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-grow overflow-y-auto p-4 space-y-4">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
                            <ShoppingBag size={48} className="mb-4 opacity-20" />
                            <p className="text-lg">Your cart is empty.</p>
                            <p className="text-sm mt-1">Looks like you haven't added anything yet.</p>
                            <button
                                onClick={onClose}
                                className="mt-6 text-primary hover:underline"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.product.id} className="flex gap-4 p-3 bg-gray-800/50 rounded-lg border border-gray-800">
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-20 h-20 object-cover rounded bg-gray-800"
                                />
                                <div className="flex-grow flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-semibold text-white line-clamp-1 pr-2">
                                            {item.product.name}
                                        </h3>
                                        <button
                                            onClick={() => removeFromCart(item.product.id)}
                                            className="text-gray-500 hover:text-red-400 transition-colors"
                                            aria-label={`Remove ${item.product.name} from cart`}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-end mt-2">
                                        <div className="text-sm text-gray-400">
                                            Qty: {item.quantity}
                                        </div>
                                        <div className="font-bold text-primary">
                                            ${(item.product.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="p-4 border-t border-gray-800 bg-gray-900/50">
                        <div className="flex justify-between items-center mb-4 text-lg font-bold">
                            <span>Total</span>
                            <span className="text-primary">${total.toFixed(2)}</span>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={clearCart}
                                className="px-4 py-2 text-sm font-semibold text-gray-400 bg-gray-800 rounded hover:bg-gray-700 hover:text-white transition-colors"
                            >
                                Clear Cart
                            </button>
                            <button
                                className="flex-grow bg-primary text-primary-content font-bold py-2 px-4 rounded hover:bg-primary/85 transition-colors"
                                onClick={() => {
                                    alert('Checkout functionality coming soon!');
                                }}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
