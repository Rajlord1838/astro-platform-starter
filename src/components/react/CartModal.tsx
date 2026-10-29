import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import type { CartItem } from '../../types';
import { getCart, updateQuantity, removeFromCart, getCartTotal, toggleCart } from '../../utils/cart';

export default function CartModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const dialogRef = useRef<HTMLDialogElement>(null);

    const refreshCart = () => {
        setCartItems(getCart());
    };

    useEffect(() => {
        refreshCart();

        const handleToggle = (e: CustomEvent<boolean>) => {
            setIsOpen(e.detail);
        };

        const handleUpdate = () => {
            refreshCart();
        };

        window.addEventListener('toggle-cart', handleToggle as EventListener);
        window.addEventListener('cart-updated', handleUpdate);

        return () => {
            window.removeEventListener('toggle-cart', handleToggle as EventListener);
            window.removeEventListener('cart-updated', handleUpdate);
        };
    }, []);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (isOpen && dialog) {
            dialog.showModal();
        } else if (!isOpen && dialog) {
            dialog.close();
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsOpen(false);
        toggleCart(false);
    };

    const total = getCartTotal();

    return (
        <dialog
            ref={dialogRef}
            onClose={handleClose}
            className="fixed inset-y-0 right-0 m-0 w-full max-w-md h-full max-h-full bg-white shadow-xl backdrop:bg-black/50 backdrop:backdrop-blur-sm open:animate-slide-in-right border-0"
        >
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold flex items-center gap-2 m-0">
                        <ShoppingBag />
                        Your Cart
                    </h2>
                    <button
                        onClick={handleClose}
                        className="p-2 text-gray-400 hover:text-gray-900 transition-colors bg-transparent border-none cursor-pointer"
                        aria-label="Close cart"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto p-4">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                            <ShoppingBag size={48} className="text-gray-300" />
                            <p>Your cart is empty.</p>
                            <button onClick={handleClose} className="btn mt-4">Continue Shopping</button>
                        </div>
                    ) : (
                        <ul className="space-y-4 m-0 p-0 list-none">
                            {cartItems.map((item) => (
                                <li key={item.product.id} className="flex gap-4 py-2 border-b border-gray-50 last:border-0">
                                    <div className="w-20 h-24 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                                        <img
                                            src={item.product.imageUrl}
                                            alt={item.product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="flex flex-col flex-grow">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-base font-medium text-gray-900 m-0 line-clamp-1">{item.product.name}</h3>
                                            <span className="font-bold ml-2">${(item.product.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1 mb-2">${item.product.price.toFixed(2)} each</p>

                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="flex items-center border border-gray-200 rounded">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="p-1 text-gray-500 hover:text-gray-900 hover:bg-gray-50 bg-transparent border-none cursor-pointer"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="p-1 text-gray-500 hover:text-gray-900 hover:bg-gray-50 bg-transparent border-none cursor-pointer"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="text-red-500 hover:text-red-700 p-1 bg-transparent border-none cursor-pointer flex items-center"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="border-t border-gray-100 p-4 bg-gray-50">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-medium text-gray-900">Total</span>
                            <span className="text-xl font-bold text-gray-900">${total.toFixed(2)}</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">Shipping and taxes calculated at checkout.</p>
                        <button className="btn w-full py-3 text-lg">Checkout</button>
                    </div>
                )}
            </div>
            <style>{`
                @keyframes slideInRight {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                .animate-slide-in-right {
                    animation: slideInRight 0.3s ease-out forwards;
                }
            `}</style>
        </dialog>
    );
}
