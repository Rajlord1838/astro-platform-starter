import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import type { CartItem } from '../../types';
import { getCart, updateQuantity, removeFromCart, CART_UPDATED_EVENT } from '../../utils/cart';

export const CartFlyout: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const refreshCart = () => {
        setCartItems(getCart());
    };

    useEffect(() => {
        // Initial load
        refreshCart();

        // Listen for updates
        const handleCartUpdate = () => {
            refreshCart();
        };

        window.addEventListener(CART_UPDATED_EVENT, handleCartUpdate);

        return () => {
            window.removeEventListener(CART_UPDATED_EVENT, handleCartUpdate);
        };
    }, []);

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 text-white hover:text-primary transition-colors focus:outline-none"
                aria-label="Open cart"
            >
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-complementary -mt-1 -mr-1">
                        {totalItems}
                    </span>
                )}
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Flyout Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <ShoppingCart size={20} />
                        Your Cart ({totalItems})
                    </h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-1 hover:bg-gray-800 rounded transition-colors"
                        aria-label="Close cart"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-4">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
                            <ShoppingCart size={48} className="opacity-20" />
                            <p>Your cart is empty.</p>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-primary hover:underline"
                            >
                                Continue shopping
                            </button>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.product.id} className="flex gap-4 p-3 bg-gray-800 rounded-lg">
                                <img
                                    src={item.product.imageUrl}
                                    alt={item.product.name}
                                    className="w-20 h-20 object-cover rounded bg-gray-700"
                                />
                                <div className="flex-grow flex flex-col">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-semibold text-sm line-clamp-2 pr-2">{item.product.name}</h3>
                                        <button
                                            onClick={() => removeFromCart(item.product.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                            aria-label="Remove item"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <p className="text-primary font-bold mt-1">${item.product.price.toFixed(2)}</p>

                                    <div className="mt-auto flex items-center gap-3 bg-gray-900 w-fit rounded border border-gray-700">
                                        <button
                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                            className="p-1 hover:bg-gray-700 transition-colors rounded-l"
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                            className="p-1 hover:bg-gray-700 transition-colors rounded-r"
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
                    <div className="p-4 border-t border-gray-800 bg-gray-900">
                        <div className="flex justify-between items-center mb-4 text-lg">
                            <span className="font-semibold text-gray-300">Total:</span>
                            <span className="font-bold text-xl text-white">${totalPrice.toFixed(2)}</span>
                        </div>
                        <button className="w-full btn btn-lg bg-primary text-primary-content hover:bg-primary/90 flex justify-center py-3">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};
