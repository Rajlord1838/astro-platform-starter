import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { getCart, updateQuantity, removeFromCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        setCart(getCart());

        const handleCartUpdated = () => setCart(getCart());
        const handleToggleCart = (e: CustomEvent) => setIsOpen(e.detail);

        window.addEventListener('cart-updated', handleCartUpdated);
        window.addEventListener('toggle-cart', handleToggleCart as EventListener);

        return () => {
            window.removeEventListener('cart-updated', handleCartUpdated);
            window.removeEventListener('toggle-cart', handleToggleCart as EventListener);
        };
    }, []);

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 text-white hover:text-primary transition-colors"
                aria-label="Open cart"
            >
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                    <span className="absolute top-0 right-0 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {totalItems}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex justify-end bg-black/50" onClick={() => setIsOpen(false)}>
                    <div
                        className="w-full max-w-md h-full bg-white text-gray-900 shadow-xl flex flex-col"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-xl font-bold">Your Cart</h2>
                            <button onClick={() => setIsOpen(false)} aria-label="Close cart" className="p-2 hover:bg-gray-100 rounded-full">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-grow overflow-y-auto p-4">
                            {cart.length === 0 ? (
                                <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
                            ) : (
                                <ul className="space-y-4">
                                    {cart.map(item => (
                                        <li key={item.product.id} className="flex gap-4 border-b pb-4">
                                            <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded" />
                                            <div className="flex-grow">
                                                <h3 className="font-semibold">{item.product.name}</h3>
                                                <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <button onClick={() => updateQuantity(item.product.id, -1)} className="p-1 bg-gray-100 rounded hover:bg-gray-200">
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="w-8 text-center">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.product.id, 1)} className="p-1 bg-gray-100 rounded hover:bg-gray-200">
                                                        <Plus size={14} />
                                                    </button>
                                                    <button onClick={() => removeFromCart(item.product.id)} className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="p-4 border-t bg-gray-50">
                            <div className="flex justify-between items-center mb-4 text-lg font-bold">
                                <span>Total:</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <button
                                className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 disabled:opacity-50 transition-colors"
                                disabled={cart.length === 0}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
