import React, { useEffect, useState, useRef } from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { getCart, updateQuantity, removeFromCart, clearCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function CartModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        // Handle toggling the modal
        const handleToggle = (e: Event) => {
            const customEvent = e as CustomEvent;
            const shouldOpen = customEvent.detail?.open ?? !isOpen;
            setIsOpen(shouldOpen);
        };

        // Handle cart updates
        const updateItems = () => {
            setCartItems(getCart());
        };

        // Initial load
        updateItems();

        window.addEventListener('toggle-cart', handleToggle);
        window.addEventListener('cart-updated', updateItems);

        return () => {
            window.removeEventListener('toggle-cart', handleToggle);
            window.removeEventListener('cart-updated', updateItems);
        };
    }, [isOpen]);

    // Handle native dialog show/close
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
        alert('Checkout functionality would go here!');
        clearCart();
        setIsOpen(false);
    };

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <dialog
            ref={dialogRef}
            onClose={handleClose}
            className="backdrop:bg-black/70 bg-transparent p-0 m-auto fixed inset-0 w-full max-w-md h-full max-h-[85vh] sm:rounded-xl shadow-2xl cart-modal open:animate-in open:fade-in open:zoom-in-95"
        >
            <div className="bg-gray-900 text-white flex flex-col h-full border border-gray-700 sm:rounded-xl overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b border-gray-800 bg-gray-900/95 sticky top-0 z-10">
                    <h2 className="text-xl font-bold">Your Cart</h2>
                    <button
                        onClick={handleClose}
                        className="p-1 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-white"
                        aria-label="Close cart"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto p-4 space-y-4">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400 min-h-[300px]">
                            <p className="text-lg">Your cart is empty</p>
                            <button
                                onClick={handleClose}
                                className="mt-4 text-primary hover:underline"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4 bg-gray-800/50 p-3 rounded-lg cart-item">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded bg-gray-900"
                                />
                                <div className="flex-grow flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold leading-tight line-clamp-1">{item.name}</h3>
                                            <p className="text-gray-400 text-sm">${item.price.toFixed(2)}</p>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-500 hover:text-red-400 transition-colors"
                                            aria-label={`Remove ${item.name}`}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-3 mt-2">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="w-7 h-7 flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded text-white"
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="w-4 text-center font-medium">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-7 h-7 flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded text-white"
                                            aria-label="Increase quantity"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="p-4 border-t border-gray-800 bg-gray-900/95 sticky bottom-0 z-10">
                        <div className="flex justify-between items-center mb-4 text-lg font-bold">
                            <span>Total</span>
                            <span className="text-primary">${total.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="w-full btn btn-lg py-3 rounded-lg text-lg checkout-button"
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </dialog>
    );
}
