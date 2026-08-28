import React, { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import { getCart, removeFromCart, getCartTotal, CART_UPDATED_EVENT, type CartItem } from '../../utils/cart';
import { CartIcon } from './CartIcon';

export const CartModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [total, setTotal] = useState(0);

    const updateCartState = () => {
        setCartItems(getCart());
        setTotal(getCartTotal());
    };

    useEffect(() => {
        updateCartState();
        window.addEventListener(CART_UPDATED_EVENT, updateCartState);
        return () => window.removeEventListener(CART_UPDATED_EVENT, updateCartState);
    }, []);

    // Disable body scroll when modal is open
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
            <CartIcon onClick={() => setIsOpen(true)} />

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="bg-gray-900 rounded-xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col border border-gray-800 relative z-50">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-800">
                            <h2 className="text-xl font-bold text-white">Your Cart</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 text-gray-400 hover:text-white transition-colors cursor-pointer"
                                aria-label="Close cart"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {cartItems.length === 0 ? (
                                <div className="text-center text-gray-400 py-8">
                                    <p>Your cart is empty.</p>
                                </div>
                            ) : (
                                <ul className="space-y-4">
                                    {cartItems.map((item) => (
                                        <li key={item.product.id} className="flex items-center gap-4 bg-gray-800/50 p-3 rounded-lg">
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <div className="flex-1">
                                                <h4 className="font-medium text-white">{item.product.name}</h4>
                                                <div className="text-sm text-gray-400">
                                                    ${item.product.price.toFixed(2)} x {item.quantity}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="p-2 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                                                aria-label={`Remove ${item.product.name} from cart`}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="p-4 border-t border-gray-800 bg-gray-900 rounded-b-xl">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-lg font-medium text-gray-300">Total</span>
                                    <span className="text-xl font-bold text-white">${total.toFixed(2)}</span>
                                </div>
                                <button className="w-full btn btn-lg cursor-pointer">
                                    Checkout
                                </button>
                            </div>
                        )}
                    </div>
                    {/* Backdrop click to close */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                        aria-hidden="true"
                    />
                </div>
            )}
        </>
    );
};
