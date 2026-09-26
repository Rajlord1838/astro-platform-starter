import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem } from '../../types';
import { getCart, updateQuantity, removeFromCart, clearCart } from '../../utils/cart';

export const CartModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const updateCart = () => setCartItems(getCart());
        const toggleCart = () => setIsOpen((prev) => !prev);

        updateCart();
        window.addEventListener('cart-updated', updateCart);
        window.addEventListener('toggle-cart', toggleCart);

        return () => {
            window.removeEventListener('cart-updated', updateCart);
            window.removeEventListener('toggle-cart', toggleCart);
        };
    }, []);

    const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const handleCheckout = () => {
        alert('Proceeding to checkout...');
        clearCart();
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50" onClick={() => setIsOpen(false)}>
            <div
                className="w-full max-w-md bg-gray-900 h-full shadow-xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                    <h2 className="text-2xl font-bold text-white">Your Cart</h2>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {cartItems.length === 0 ? (
                        <p className="text-gray-400 text-center">Your cart is empty.</p>
                    ) : (
                        <ul className="space-y-6">
                            {cartItems.map((item) => (
                                <li key={item.product.id} className="flex gap-4">
                                    <img src={item.product.imageUrl} alt={item.product.name} className="w-20 h-24 object-cover rounded" />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-white">{item.product.name}</h3>
                                        <p className="text-primary font-bold">${item.product.price.toFixed(2)}</p>

                                        <div className="flex items-center gap-3 mt-2">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                className="p-1 text-gray-400 hover:text-white bg-gray-800 rounded cursor-pointer"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="text-white w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                className="p-1 text-gray-400 hover:text-white bg-gray-800 rounded cursor-pointer"
                                            >
                                                <Plus size={16} />
                                            </button>

                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="ml-auto p-2 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="p-6 border-t border-gray-700 bg-gray-800">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold text-white">Total</span>
                            <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="w-full bg-primary text-primary-content py-3 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors cursor-pointer"
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
