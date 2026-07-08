import React, { useState, useEffect } from 'react';
import type { CartItem } from '../types';
import { ShoppingBag, X, Plus, Minus } from 'lucide-react';

export const Cart: React.FC = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const loadCart = () => {
        const cartData = localStorage.getItem('fashion_store_cart');
        if (cartData) {
            setCart(JSON.parse(cartData));
        } else {
            setCart([]);
        }
    };

    useEffect(() => {
        loadCart();
        window.addEventListener('cart-updated', loadCart);
        return () => {
            window.removeEventListener('cart-updated', loadCart);
        };
    }, []);

    const updateQuantity = (productId: string, delta: number) => {
        const newCart = cart.map(item => {
            if (item.product.id === productId) {
                const newQuantity = item.quantity + delta;
                return { ...item, quantity: Math.max(0, newQuantity) };
            }
            return item;
        }).filter(item => item.quantity > 0);

        localStorage.setItem('fashion_store_cart', JSON.stringify(newCart));
        window.dispatchEvent(new Event('cart-updated'));
    };

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-white hover:text-neutral-300 transition-colors"
                aria-label="Toggle cart"
            >
                <ShoppingBag size={24} />
                {totalItems > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                        {totalItems}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white text-neutral-900 rounded-xl shadow-xl overflow-hidden z-50 border border-neutral-200">
                    <div className="p-4 bg-neutral-50 border-b border-neutral-200 flex justify-between items-center">
                        <h2 className="font-semibold text-lg">Your Cart</h2>
                        <button onClick={() => setIsOpen(false)} className="text-neutral-500 hover:text-neutral-900">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="max-h-96 overflow-y-auto p-4 flex flex-col gap-4">
                        {cart.length === 0 ? (
                            <p className="text-center text-neutral-500 py-8">Your cart is empty.</p>
                        ) : (
                            cart.map(item => (
                                <div key={item.product.id} className="flex gap-4 items-center">
                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h4 className="font-medium text-sm line-clamp-1">{item.product.name}</h4>
                                        <div className="text-sm text-neutral-500">${item.product.price.toFixed(2)}</div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, -1)}
                                                className="p-1 rounded-full bg-neutral-100 hover:bg-neutral-200"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, 1)}
                                                className="p-1 rounded-full bg-neutral-100 hover:bg-neutral-200"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="font-semibold">
                                        ${(item.product.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {cart.length > 0 && (
                        <div className="p-4 border-t border-neutral-200 bg-neutral-50">
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-semibold">Total:</span>
                                <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span>
                            </div>
                            <button className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                                Checkout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
