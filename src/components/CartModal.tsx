import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { getCart, updateQuantity, removeFromCart, CART_UPDATED_EVENT } from '../utils/cart';
import type { CartItem } from '../types';

export default function CartModal() {
    const [cart, setCart] = useState<CartItem[]>([]);

    const loadCart = () => {
        setCart(getCart());
    };

    useEffect(() => {
        loadCart();
        window.addEventListener(CART_UPDATED_EVENT, loadCart);
        return () => window.removeEventListener(CART_UPDATED_EVENT, loadCart);
    }, []);

    const closeCartModal = () => {
        const modal = document.getElementById('cart-modal') as HTMLDialogElement;
        if (modal) modal.close();
    };

    const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

    return (
        <dialog id="cart-modal" className="backdrop:bg-black/50 p-0 rounded-lg shadow-xl m-auto w-full max-w-md max-h-[90vh] bg-white text-gray-900 overflow-hidden">
            <div className="flex flex-col h-full max-h-[90vh]">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <ShoppingBag /> Your Cart
                    </h2>
                    <button onClick={closeCartModal} className="p-1 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                        <X />
                    </button>
                </div>

                <div className="flex-grow p-4 overflow-y-auto">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-48 text-gray-500">
                            <ShoppingBag size={48} className="mb-4 opacity-20" />
                            <p>Your cart is empty.</p>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {cart.map((item) => (
                                <li key={item.product.id} className="flex gap-4 p-2 bg-gray-50 rounded-lg">
                                    <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-md" />
                                    <div className="flex flex-col flex-grow">
                                        <h3 className="font-semibold text-sm line-clamp-1">{item.product.name}</h3>
                                        <p className="text-gray-500 text-sm">${item.product.price.toFixed(2)}</p>

                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="flex items-center border rounded bg-white">
                                                <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 hover:bg-gray-100 text-gray-600">
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-8 text-center text-sm">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 hover:bg-gray-100 text-gray-600">
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <button onClick={() => removeFromCart(item.product.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="p-4 border-t bg-gray-50">
                        <div className="flex justify-between mb-4 font-bold text-lg">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <button className="w-full py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </dialog>
    );
}
