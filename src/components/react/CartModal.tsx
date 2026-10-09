import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { getCart, updateQuantity, removeFromCart, clearCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function CartModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const updateCartData = () => {
            setCart(getCart());
        };

        const toggleCart = () => {
            setIsOpen(prev => !prev);
        };

        updateCartData();
        window.addEventListener('cart-updated', updateCartData);
        window.addEventListener('toggle-cart', toggleCart);

        return () => {
            window.removeEventListener('cart-updated', updateCartData);
            window.removeEventListener('toggle-cart', toggleCart);
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleCheckout = () => {
        alert('Checkout process would start here!');
        clearCart();
        setIsOpen(false);
    };

    const totalPrice = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

    return (
        <dialog
            ref={dialogRef}
            onClose={handleClose}
            className="backdrop:bg-black/60 bg-gray-900 text-white w-full max-w-md p-0 rounded-lg shadow-xl"
        >
            <div className="flex flex-col h-full max-h-[80vh]">
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <h2 className="text-xl font-bold">Your Cart</h2>
                    <button onClick={handleClose} className="p-1 hover:bg-gray-800 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cart.length === 0 ? (
                        <p className="text-gray-400 text-center py-8">Your cart is empty.</p>
                    ) : (
                        cart.map((item) => (
                            <div key={item.product.id} className="flex gap-4 bg-gray-800 p-3 rounded-md">
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-semibold text-sm line-clamp-1">{item.product.name}</h3>
                                        <p className="text-gray-400 text-sm">${item.product.price.toFixed(2)}</p>
                                    </div>

                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center bg-gray-700 rounded-md">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                className="p-1 hover:bg-gray-600 rounded-l-md transition-colors"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                className="p-1 hover:bg-gray-600 rounded-r-md transition-colors"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.product.id)}
                                            className="p-1 text-red-400 hover:text-red-300 hover:bg-gray-700 rounded-md transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="p-4 border-t border-gray-700 bg-gray-900">
                        <div className="flex justify-between items-center mb-4 text-lg font-bold">
                            <span>Total</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md transition-colors"
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </dialog>
    );
}
