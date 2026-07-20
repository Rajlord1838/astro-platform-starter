import React, { useState, useEffect } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import type { CartItem } from '../types';
import { getCart, removeFromCart, updateQuantity } from '../utils/cart';
import { CartIcon } from './CartIcon';

export const CartDrawer: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);

    // Disable SSR for local storage dependent things to prevent hydration errors
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const fetchCart = () => setCart(getCart());

        fetchCart();
        window.addEventListener('cart-updated', fetchCart);
        return () => window.removeEventListener('cart-updated', fetchCart);
    }, []);

    const toggleCart = () => setIsOpen(!isOpen);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (!mounted) return <div className="p-2"><CartIcon onClick={() => {}} /></div>;

    return (
        <>
            <CartIcon onClick={toggleCart} />

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                    onClick={toggleCart}
                />
            )}

            {/* Drawer */}
            <div className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white text-gray-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-bold">Shopping Cart</h2>
                    <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                    {cart.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">Your cart is empty.</p>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="flex gap-4 p-2 border rounded-lg items-center">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                <div className="flex-1">
                                    <h4 className="font-semibold">{item.name}</h4>
                                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                                    <div className="flex items-center gap-3 mt-2">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="p-1 bg-gray-100 rounded hover:bg-gray-200"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-1 bg-gray-100 rounded hover:bg-gray-200"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="border-t p-4 bg-gray-50">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-bold">Total:</span>
                            <span className="text-xl font-bold">${total.toFixed(2)}</span>
                        </div>
                        <button className="w-full py-3 bg-primary text-primary-content font-bold rounded-lg hover:bg-primary/90 transition-colors">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};
