import React, { useEffect, useState } from 'react';
import { getCart, removeFromCart, updateQuantity, getCartTotal, type CartItem } from '../../utils/cart';
import CartBadge from './CartBadge';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';

export default function CartFlyout() {
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        // Initial load
        setCart(getCart());

        // Listen for updates
        const handleCartUpdate = () => {
            setCart(getCart());
        };

        window.addEventListener('cart-updated', handleCartUpdate);
        return () => window.removeEventListener('cart-updated', handleCartUpdate);
    }, []);

    // Prevent body scroll when flyout is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            <CartBadge onClick={() => setIsOpen(true)} />

            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-hidden">
                    <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={() => setIsOpen(false)} />

                    <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <div className="w-screen max-w-md transform transition-transform duration-300 ease-in-out bg-white shadow-xl flex flex-col h-full">

                            {/* Header */}
                            <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200 sm:px-6">
                                <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
                                <button
                                    type="button"
                                    className="p-2 -mr-2 text-gray-400 hover:text-gray-500"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span className="sr-only">Close panel</span>
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Cart Items */}
                            <div className="flex-1 px-4 py-6 overflow-y-auto sm:px-6">
                                {cart.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
                                        <ShoppingBag size={48} className="text-gray-300" />
                                        <p>Your cart is empty.</p>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="btn btn-outline mt-4"
                                        >
                                            Continue Shopping
                                        </button>
                                    </div>
                                ) : (
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {cart.map((item) => (
                                            <li key={item.product.id} className="flex py-6">
                                                <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-md border border-gray-200">
                                                    <img
                                                        src={item.product.image}
                                                        alt={item.product.name}
                                                        className="object-cover object-center w-full h-full"
                                                    />
                                                </div>

                                                <div className="flex flex-col flex-1 ml-4">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>{item.product.name}</h3>
                                                            <p className="ml-4">${(item.product.price * item.quantity).toFixed(2)}</p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500">{item.product.category}</p>
                                                    </div>

                                                    <div className="flex items-end justify-between flex-1 text-sm">
                                                        <div className="flex items-center border border-gray-300 rounded">
                                                            <button
                                                                className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                            >
                                                                <Minus size={16} />
                                                            </button>
                                                            <span className="px-4 py-1 font-medium">{item.quantity}</span>
                                                            <button
                                                                className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                            >
                                                                <Plus size={16} />
                                                            </button>
                                                        </div>

                                                        <button
                                                            type="button"
                                                            className="font-medium text-red-600 hover:text-red-500"
                                                            onClick={() => removeFromCart(item.product.id)}
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Footer */}
                            {cart.length > 0 && (
                                <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                                        <p>Subtotal</p>
                                        <p>${getCartTotal(cart).toFixed(2)}</p>
                                    </div>
                                    <p className="mt-0.5 text-sm text-gray-500 mb-6">Shipping and taxes calculated at checkout.</p>
                                    <button
                                        className="w-full btn btn-lg"
                                        onClick={() => alert("Checkout not implemented in demo")}
                                    >
                                        Checkout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
