import React, { useEffect, useState } from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem } from '../types';
import { getCart, getCartTotal, updateQuantity, removeFromCart, onCartUpdate, clearCart } from '../utils/cart';

const Cart: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [total, setTotal] = useState(0);

    const loadCart = () => {
        setCartItems(getCart());
        setTotal(getCartTotal());
    };

    useEffect(() => {
        // Initial load
        loadCart();

        // Listen for updates from other components
        const unsubscribeCart = onCartUpdate(loadCart);

        // Listen for open event from CartIcon
        const handleOpenCart = () => setIsOpen(true);
        window.addEventListener('open-cart', handleOpenCart);

        // Handle escape key
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            unsubscribeCart();
            window.removeEventListener('open-cart', handleOpenCart);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // Prevent body scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity">
            {/* Modal backdrop */}
            <div
                className="absolute inset-0"
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
            />

            {/* Cart Panel */}
            <div className="relative w-full max-w-md h-full bg-neutral-900 border-l border-neutral-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-neutral-800">
                    <h2 className="text-xl font-semibold text-white">Shopping Cart</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 text-neutral-400 hover:text-white transition-colors rounded-full hover:bg-neutral-800"
                        aria-label="Close cart"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-neutral-400 gap-4">
                            <ShoppingCartIcon className="w-16 h-16 opacity-20" />
                            <p>Your cart is empty</p>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="mt-4 text-white underline hover:text-gray-300"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.product.id} className="flex gap-4 bg-neutral-800/50 p-3 rounded-lg border border-neutral-800">
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-20 h-24 object-cover rounded-md bg-neutral-800"
                                />
                                <div className="flex flex-col flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-medium text-white line-clamp-1">{item.product.name}</h3>
                                        <span className="font-semibold text-white ml-2">
                                            ${(item.product.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-neutral-400 mb-2">${item.product.price.toFixed(2)} each</p>

                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex items-center gap-3 bg-neutral-900 rounded-md border border-neutral-700">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                className="p-1 text-neutral-400 hover:text-white transition-colors disabled:opacity-50"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                className="p-1 text-neutral-400 hover:text-white transition-colors"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.product.id)}
                                            className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-md transition-colors"
                                            aria-label="Remove item"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="p-4 border-t border-neutral-800 bg-neutral-900/95 backdrop-blur">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-neutral-300 font-medium">Subtotal</span>
                            <span className="text-xl font-bold text-white">${total.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-neutral-500 mb-4">Shipping and taxes calculated at checkout.</p>
                        <button
                            onClick={() => {
                                alert('Checkout functionality would go here!');
                                clearCart();
                                setIsOpen(false);
                            }}
                            className="w-full bg-white text-black py-3 px-4 rounded-md font-semibold hover:bg-neutral-200 transition-colors flex justify-center items-center gap-2"
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// Simple placeholder icon for empty state
const ShoppingCartIcon = (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
);

export default Cart;
