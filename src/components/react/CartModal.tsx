import React, { useState, useEffect, useRef } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { getCart, updateQuantity, removeFromCart, clearCart, toggleCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export const CartModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        // Initial load
        setCartItems(getCart());

        // Listen for cart updates
        const handleCartUpdate = () => {
            setCartItems(getCart());
        };

        // Listen for toggle events
        const handleToggle = (e: Event) => {
            const customEvent = e as CustomEvent<{ open?: boolean }>;
            const shouldOpen = customEvent.detail?.open ?? !isOpen;
            setIsOpen(shouldOpen);
        };

        window.addEventListener('cart-updated', handleCartUpdate);
        window.addEventListener('toggle-cart', handleToggle);

        return () => {
            window.removeEventListener('cart-updated', handleCartUpdate);
            window.removeEventListener('toggle-cart', handleToggle);
        };
    }, [isOpen]);

    // Manage dialog native state
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen && !dialog.open) {
            dialog.showModal();
        } else if (!isOpen && dialog.open) {
            dialog.close();
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleCheckout = () => {
        alert('Checkout successful! Thank you for shopping.');
        clearCart();
        setIsOpen(false);
    };

    const totalAmount = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

    return (
        <dialog
            ref={dialogRef}
            onClose={handleClose}
            className="backdrop:bg-gray-900/50 backdrop:backdrop-blur-sm p-0 bg-transparent m-0 max-w-none w-full h-full sm:h-auto sm:w-[450px] sm:ml-auto sm:mr-0 fixed inset-y-0 right-0 z-50 open:flex flex-col"
        >
            <div className="bg-white text-gray-900 h-full w-full flex flex-col shadow-2xl sm:rounded-l-2xl overflow-hidden animate-slide-left">
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <ShoppingBag className="text-primary" />
                        Your Cart
                    </h2>
                    <button
                        onClick={handleClose}
                        className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Close cart"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-4">
                            <ShoppingBag size={48} className="text-gray-300" />
                            <p>Your cart is empty</p>
                            <button
                                onClick={handleClose}
                                className="text-primary font-medium hover:underline mt-2"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {cartItems.map((item) => (
                                <li key={item.product.id} className="flex gap-4 bg-gray-50 p-3 rounded-lg">
                                    <div className="w-20 h-24 bg-white rounded-md overflow-hidden shrink-0">
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-semibold text-sm leading-tight">{item.product.name}</h3>
                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                                                aria-label={`Remove ${item.product.name}`}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <p className="text-gray-500 text-xs mt-1">{item.product.category}</p>
                                        <div className="flex items-center justify-between mt-auto pt-2">
                                            <div className="flex items-center gap-2 bg-white rounded border border-gray-200">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="p-1 hover:bg-gray-100 text-gray-600 rounded-l"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="p-1 hover:bg-gray-100 text-gray-600 rounded-r"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <span className="font-bold text-primary">
                                                ${(item.product.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="border-t border-gray-100 p-4 bg-white">
                        <div className="flex justify-between items-center mb-4 text-lg font-bold">
                            <span>Total</span>
                            <span>${totalAmount.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                        >
                            Checkout <ShoppingBag size={18} />
                        </button>
                    </div>
                )}
            </div>
            <style>{`
                @keyframes slide-left {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                .animate-slide-left {
                    animation: slide-left 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }
            `}</style>
        </dialog>
    );
};
