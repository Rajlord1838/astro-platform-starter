import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import type { CartItem } from '../../types';
import { getCart, subscribeToCart, updateQuantity, removeFromCart } from '../../utils/cart';

export const CartModal: React.FC = () => {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        // Hydrate from localStorage on mount
        setCart(getCart());

        // Listen for updates
        const unsubscribe = subscribeToCart(setCart);
        return unsubscribe;
    }, []);

    const closeCartModal = () => {
        const modal = document.getElementById('cart-modal') as HTMLDialogElement;
        if (modal) {
            modal.close();
        }
    };

    const totalCost = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

    return (
        <dialog id="cart-modal" className="backdrop:bg-black/50 p-0 rounded-xl shadow-2xl max-w-md w-full ml-auto mr-4 mt-4 h-[calc(100vh-2rem)] md:h-auto md:max-h-[80vh] overflow-hidden m-0 z-50 transition-all">
            <div className="flex flex-col h-full bg-white text-gray-900">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-bold">Your Cart</h2>
                    <button
                        onClick={closeCartModal}
                        className="p-1 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Close cart"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-4">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
                            <p>Your cart is empty.</p>
                            <button onClick={closeCartModal} className="text-primary underline hover:no-underline">Continue Shopping</button>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.product.id} className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
                                <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded bg-gray-100" />
                                <div className="flex-grow flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-sm">{item.product.name}</h3>
                                            <p className="text-xs text-gray-500">{item.product.category}</p>
                                        </div>
                                        <span className="font-bold text-sm">${(item.product.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center border rounded">
                                            <button
                                                className="p-1 hover:bg-gray-100 transition-colors"
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="px-3 text-sm font-medium">{item.quantity}</span>
                                            <button
                                                className="p-1 hover:bg-gray-100 transition-colors"
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                aria-label="Increase quantity"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <button
                                            className="text-red-500 hover:text-red-700 p-1"
                                            onClick={() => removeFromCart(item.product.id)}
                                            aria-label="Remove item"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="border-t p-4 bg-gray-50">
                        <div className="flex justify-between items-center mb-4 text-lg font-bold">
                            <span>Total</span>
                            <span>${totalCost.toFixed(2)}</span>
                        </div>
                        <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </dialog>
    );
};