import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Minus, Plus, Trash2 } from 'lucide-react';
import { getCart, removeFromCart, updateQuantity } from '../../utils/cart';
import type { CartItem } from '../../types';

export function HeaderCart() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Initial load
        setCart(getCart());

        const handleCartUpdate = () => {
            setCart(getCart());
        };

        const handleOpenCart = () => {
            setIsOpen(true);
        };

        window.addEventListener('cart-updated', handleCartUpdate);
        window.addEventListener('open-cart', handleOpenCart);

        return () => {
            window.removeEventListener('cart-updated', handleCartUpdate);
            window.removeEventListener('open-cart', handleOpenCart);
        };
    }, []);

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 text-gray-700 hover:text-primary transition-colors cursor-pointer"
                aria-label="Open cart"
            >
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full border-2 border-white -mt-1 -mr-1">
                        {totalItems}
                    </span>
                )}
            </button>

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar Cart */}
            <div className={`fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <ShoppingCart /> Your Cart
                    </h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-full cursor-pointer"
                        aria-label="Close cart"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-4">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
                            <ShoppingCart size={48} className="opacity-20" />
                            <p>Your cart is empty.</p>
                            <button onClick={() => setIsOpen(false)} className="btn mt-4">Continue Shopping</button>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="flex gap-4 p-2 border border-gray-100 rounded-lg shadow-sm">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                                <div className="flex-grow flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-semibold text-sm leading-tight text-gray-900">{item.name}</h3>
                                        <p className="font-bold text-primary text-sm mt-1">${item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center border rounded-md">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-1 text-gray-500 hover:bg-gray-100 cursor-pointer rounded-l-md"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-1 text-gray-500 hover:bg-gray-100 cursor-pointer rounded-r-md"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
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
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-semibold text-gray-700">Subtotal</span>
                            <span className="font-bold text-xl">${totalPrice.toFixed(2)}</span>
                        </div>
                        <button className="btn w-full py-3 text-lg" onClick={() => alert('Checkout initiated!')}>
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
