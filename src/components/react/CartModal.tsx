import React, { useEffect, useState, useRef } from 'react';
import { ShoppingBag, X, Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem } from '../../types';
import { getCart, removeFromCart, updateQuantity, clearCart } from '../../utils/cart';

export default function CartModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);
    const modalRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const updateCart = () => setCart(getCart());
        updateCart();
        window.addEventListener('cart-updated', updateCart);
        return () => window.removeEventListener('cart-updated', updateCart);
    }, []);

    useEffect(() => {
        const modal = modalRef.current;
        if (!modal) return;
        if (isOpen) {
            modal.showModal();
        } else {
            modal.close();
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="btn text-white bg-transparent border border-white hover:bg-white/10"
                aria-label="Open Cart"
            >
                <ShoppingBag className="w-5 h-5 mr-2" />
                View Cart
            </button>

            <dialog
                ref={modalRef}
                className="backdrop:bg-black/60 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-xl w-full max-w-md m-auto max-h-[90vh] overflow-hidden p-0"
                onClick={(e) => {
                    if (e.target === modalRef.current) setIsOpen(false);
                }}
            >
                <div className="flex flex-col h-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                        <h2 className="text-xl font-bold">Your Cart</h2>
                        <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full" aria-label="Close cart">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {cart.length === 0 ? (
                            <div className="text-center py-10 text-gray-500">
                                Your cart is empty.
                            </div>
                        ) : (
                            cart.map(item => (
                                <div key={item.id} className="flex gap-4 items-center bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-sm leading-tight">{item.name}</h3>
                                        <p className="text-primary font-medium mt-1">${item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <div className="flex items-center gap-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-primary" aria-label="Decrease quantity">
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-primary" aria-label="Increase quantity">
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 text-sm flex items-center gap-1" aria-label={`Remove ${item.name}`}>
                                            <Trash2 className="w-4 h-4" /> Remove
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {cart.length > 0 && (
                        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                            <div className="flex justify-between items-center mb-4 text-lg font-bold">
                                <span>Total:</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={clearCart} className="btn bg-gray-200 text-gray-800 hover:bg-gray-300 w-1/3">Clear</button>
                                <button className="btn bg-primary text-white w-2/3" onClick={() => { alert('Checkout not implemented in demo.'); setIsOpen(false); }}>Checkout</button>
                            </div>
                        </div>
                    )}
                </div>
            </dialog>
        </>
    );
}
