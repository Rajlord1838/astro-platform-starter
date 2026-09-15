import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { getCartItems, updateQuantity, clearCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function CartModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        // Load initial cart
        setCartItems(getCartItems());

        // Listen for cart updates
        const handleCartUpdate = () => setCartItems(getCartItems());
        window.addEventListener('cart-updated', handleCartUpdate);

        // Listen for toggle modal event
        const handleToggleCart = () => setIsOpen(prev => !prev);
        window.addEventListener('toggle-cart', handleToggleCart);

        return () => {
            window.removeEventListener('cart-updated', handleCartUpdate);
            window.removeEventListener('toggle-cart', handleToggleCart);
        };
    }, []);

    const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right text-gray-900">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-bold">Your Cart</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                    {cartItems.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                            <p>Your cart is empty</p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.product.id} className="flex gap-4 border-b pb-4">
                                <img
                                    src={item.product.imageUrl}
                                    alt={item.product.name}
                                    className="w-20 h-24 object-cover rounded"
                                />
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-semibold text-sm line-clamp-1">{item.product.name}</h3>
                                        <p className="text-gray-600 font-medium">${item.product.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center border rounded">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                className="p-1 hover:bg-gray-100"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                className="p-1 hover:bg-gray-100"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => updateQuantity(item.product.id, 0)}
                                            className="text-red-500 p-1 hover:bg-red-50 rounded"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="p-4 border-t bg-gray-50">
                        <div className="flex justify-between items-center mb-4 text-lg font-bold">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <button
                            className="w-full bg-primary text-primary-content py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors"
                            onClick={() => {
                                alert('Checkout not implemented in this demo');
                                clearCart();
                                setIsOpen(false);
                            }}
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
