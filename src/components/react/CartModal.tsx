import React, { useEffect, useState, useRef } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { getCart, updateQuantity, removeFromCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function CartModal() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const updateItems = () => {
            setCartItems(getCart());
        };

        updateItems();
        window.addEventListener('cart-updated', updateItems);

        return () => window.removeEventListener('cart-updated', updateItems);
    }, []);

    const closeCart = () => {
        dialogRef.current?.close();
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        if (e.target === dialogRef.current) {
            closeCart();
        }
    };

    const total = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    return (
        <dialog
            id="cart-modal"
            ref={dialogRef}
            onClick={handleBackdropClick}
            className="backdrop:bg-black/60 bg-transparent m-auto p-0 rounded-xl shadow-2xl overflow-hidden max-w-md w-full sm:w-[90vw] open:animate-in open:fade-in open:zoom-in-95"
        >
            <div className="bg-gray-900 text-white flex flex-col max-h-[85vh]">
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <ShoppingBag size={20} />
                        Your Cart
                    </h2>
                    <button
                        onClick={closeCart}
                        className="p-1 hover:bg-gray-800 rounded-full transition-colors"
                        aria-label="Close cart"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                            <ShoppingBag size={48} className="mx-auto mb-4 opacity-50" />
                            <p>Your cart is empty.</p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.product.id} className="flex gap-4 items-center bg-gray-800/50 p-3 rounded-lg">
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <h3 className="font-medium text-sm sm:text-base leading-tight mb-1">{item.product.name}</h3>
                                    <p className="text-primary font-bold">${item.product.price.toFixed(2)}</p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <button
                                        onClick={() => removeFromCart(item.product.id)}
                                        className="text-gray-400 hover:text-red-400 text-xs transition-colors"
                                    >
                                        Remove
                                    </button>
                                    <div className="flex items-center bg-gray-900 rounded border border-gray-700">
                                        <button
                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                            className="p-1 hover:bg-gray-700 transition-colors"
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                            className="p-1 hover:bg-gray-700 transition-colors"
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
                    <div className="p-4 border-t border-gray-800 bg-gray-900/95 sticky bottom-0">
                        <div className="flex justify-between items-center mb-4 text-lg font-bold">
                            <span>Total:</span>
                            <span className="text-primary">${total.toFixed(2)}</span>
                        </div>
                        <button className="w-full btn btn-lg">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </dialog>
    );
}
