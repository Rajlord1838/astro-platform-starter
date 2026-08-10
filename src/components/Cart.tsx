import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import type { CartItem } from '../types';
import { getCart, removeFromCart, updateQuantity, getCartTotal, clearCart } from '../utils/cart';
import { CartButton } from './CartButton';

export const Cart: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const updateCartState = () => {
        setCartItems(getCart());
    };

    useEffect(() => {
        updateCartState();
        window.addEventListener('cart-updated', updateCartState);
        return () => window.removeEventListener('cart-updated', updateCartState);
    }, []);

    // Lock body scroll when cart is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const total = getCartTotal(cartItems);

    return (
        <>
            <CartButton onClick={() => setIsOpen(true)} />

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Slide-out Cart */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col text-gray-900 ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
                role="dialog"
                aria-label="Shopping Cart"
            >
                {/* Cart Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold flex items-center gap-2 m-0">
                        <ShoppingBag size={24} />
                        Your Cart
                    </h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                        aria-label="Close cart"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-grow overflow-y-auto p-4">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                            <ShoppingBag size={64} className="opacity-20" />
                            <p className="text-lg">Your cart is empty</p>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-primary hover:underline"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {cartItems.map((item) => (
                                <li key={item.product.id} className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="w-20 h-24 object-cover rounded-md"
                                    />
                                    <div className="flex flex-col flex-grow">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-semibold text-sm line-clamp-2 m-0">{item.product.name}</h3>
                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                                aria-label={`Remove ${item.product.name} from cart`}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <div className="text-primary font-bold mt-1">
                                            ${item.product.price.toFixed(2)}
                                        </div>

                                        <div className="flex items-center gap-3 mt-auto pt-2">
                                            <div className="flex items-center border border-gray-200 rounded-md">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="p-1 hover:bg-gray-100 transition-colors"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-8 text-center text-sm font-medium">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="p-1 hover:bg-gray-100 transition-colors"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Cart Footer */}
                {cartItems.length > 0 && (
                    <div className="border-t border-gray-200 p-4 bg-gray-50">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-medium">Subtotal</span>
                            <span className="text-xl font-bold text-gray-900">${total.toFixed(2)}</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">Shipping and taxes calculated at checkout.</p>
                        <button
                            className="w-full btn btn-lg"
                            onClick={() => {
                                alert('Checkout process would start here!');
                                clearCart();
                                setIsOpen(false);
                            }}
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};
