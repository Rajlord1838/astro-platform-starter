import React, { useEffect, useState } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import type { CartItem } from '../../types';
import { getCart, subscribeToCartChanges, updateCartItemQuantity, removeFromCart, clearCart } from '../../utils/cart';

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const updateItems = () => setCartItems(getCart());

        // Initial fetch
        updateItems();

        // Subscribe to changes
        const unsubscribe = subscribeToCartChanges(updateItems);
        return unsubscribe;
    }, []);

    // Close on escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleQuantityChange = (productId: string, currentQuantity: number, change: number) => {
        updateCartItemQuantity(productId, currentQuantity + change);
    };

    const handleCheckout = () => {
        alert('Checkout process initiated!');
        clearCart();
        onClose();
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-slate-900 border-l border-slate-800 shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex items-center justify-between p-5 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                        <ShoppingBag className="text-emerald-500" />
                        <h2 className="text-xl font-bold text-white">Your Cart</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                        aria-label="Close cart"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-4">
                            <ShoppingBag size={48} className="opacity-20" />
                            <p>Your cart is empty.</p>
                            <button
                                onClick={onClose}
                                className="mt-4 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <ul className="space-y-6">
                            {cartItems.map((item) => (
                                <li key={item.product.id} className="flex gap-4">
                                    <div className="w-20 h-20 rounded-md overflow-hidden shrink-0 bg-slate-800">
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col grow justify-between">
                                        <div>
                                            <div className="flex justify-between items-start gap-2">
                                                <h3 className="font-semibold text-white line-clamp-2 leading-tight">
                                                    {item.product.name}
                                                </h3>
                                                <button
                                                    onClick={() => removeFromCart(item.product.id)}
                                                    className="text-slate-500 hover:text-red-400 p-1 -mt-1 -mr-1"
                                                    aria-label="Remove item"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                            <p className="text-emerald-400 font-medium text-sm mt-1">
                                                ${item.product.price.toFixed(2)}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center border border-slate-700 rounded-md bg-slate-800">
                                                <button
                                                    onClick={() => handleQuantityChange(item.product.id, item.quantity, -1)}
                                                    className="p-1 text-slate-300 hover:text-white hover:bg-slate-700 rounded-l-md transition-colors"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="px-3 text-sm font-medium text-white min-w-[32px] text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleQuantityChange(item.product.id, item.quantity, 1)}
                                                    className="p-1 text-slate-300 hover:text-white hover:bg-slate-700 rounded-r-md transition-colors"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <p className="font-semibold text-white">
                                                ${(item.product.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="border-t border-slate-800 p-5 bg-slate-900/95 backdrop-blur-sm">
                        <div className="flex justify-between items-center mb-4 text-slate-300">
                            <span className="text-lg">Subtotal</span>
                            <span className="text-xl font-bold text-white">${subtotal.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-slate-500 mb-6">Shipping and taxes calculated at checkout.</p>
                        <button
                            onClick={handleCheckout}
                            className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};
