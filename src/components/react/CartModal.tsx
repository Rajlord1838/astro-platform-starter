import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { getCart, updateQuantity, removeFromCart, toggleCartModal } from '../../utils/cart';
import type { CartItem } from '../../types';

export const CartModal: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const dialogRef = useRef<HTMLDialogElement>(null);

    const loadCart = () => setCartItems(getCart());

    useEffect(() => {
        loadCart();

        const handleCartUpdate = () => loadCart();
        const handleToggleCart = (e: Event) => {
            const customEvent = e as CustomEvent;
            setIsOpen(prev => customEvent.detail?.forceOpen ?? !prev);
        };

        window.addEventListener('cart-updated', handleCartUpdate);
        window.addEventListener('toggle-cart', handleToggleCart);

        return () => {
            window.removeEventListener('cart-updated', handleCartUpdate);
            window.removeEventListener('toggle-cart', handleToggleCart);
        };
    }, []);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen && !dialog.open) {
            dialog.showModal();
            // Prevent scrolling on body when modal is open
            document.body.style.overflow = 'hidden';
        } else if (!isOpen && dialog.open) {
            dialog.close();
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        if (e.target === dialogRef.current) {
            handleClose();
        }
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <dialog
            ref={dialogRef}
            onClose={handleClose}
            onClick={handleBackdropClick}
            className="backdrop:bg-black/50 p-0 m-0 fixed top-0 right-0 h-full max-h-full w-full max-w-md bg-white text-gray-900 shadow-2xl overflow-hidden animate-slide-in-right open:flex flex-col ml-auto rounded-l-2xl border-0"
        >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold">Your Cart</h2>
                <button
                    onClick={handleClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer text-gray-500 hover:text-gray-900"
                    aria-label="Close cart"
                >
                    <X size={24} />
                </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-6">
                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
                        <div className="p-4 bg-gray-50 rounded-full">
                            <X size={48} className="text-gray-400" />
                        </div>
                        <p className="text-lg">Your cart is empty.</p>
                        <button
                            onClick={handleClose}
                            className="mt-2 text-primary hover:underline font-medium cursor-pointer"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    cartItems.map((item) => (
                        <div key={item.product.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                            <img
                                src={item.product.imageUrl}
                                alt={item.product.name}
                                className="w-20 h-24 object-cover rounded-lg bg-white"
                            />
                            <div className="flex flex-col flex-grow justify-between py-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 line-clamp-1">{item.product.name}</h3>
                                        <p className="text-sm text-gray-500">{item.product.category}</p>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.product.id)}
                                        className="text-gray-400 hover:text-red-500 p-1 cursor-pointer transition-colors"
                                        aria-label="Remove item"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <div className="flex items-center gap-3 bg-white rounded-lg px-2 py-1 border border-gray-200">
                                        <button
                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                            className="p-1 text-gray-500 hover:text-gray-900 cursor-pointer"
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="w-4 text-center font-medium text-sm">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                            className="p-1 text-gray-500 hover:text-gray-900 cursor-pointer"
                                            aria-label="Increase quantity"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                    <p className="font-bold text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {cartItems.length > 0 && (
                <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-gray-600 font-medium">Subtotal</span>
                        <span className="text-2xl font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
                    </div>
                    <button className="w-full py-4 bg-gray-900 hover:bg-black text-white rounded-xl font-bold text-lg transition-colors cursor-pointer shadow-md hover:shadow-lg">
                        Checkout
                    </button>
                </div>
            )}
        </dialog>
    );
};
