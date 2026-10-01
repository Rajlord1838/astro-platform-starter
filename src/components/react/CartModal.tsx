import React, { useEffect, useState } from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { getCart, getCartTotal, updateQuantity, removeFromCart, toggleCartModal } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function CartModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const handleToggle = () => setIsOpen((prev) => !prev);

        const handleCartUpdated = (e: Event) => {
            const customEvent = e as CustomEvent<CartItem[]>;
            setCart(customEvent.detail);
        };

        window.addEventListener('toggle-cart', handleToggle);
        window.addEventListener('cart-updated', handleCartUpdated);

        // Initialize cart
        setCart(getCart());

        return () => {
            window.removeEventListener('toggle-cart', handleToggle);
            window.removeEventListener('cart-updated', handleCartUpdated);
        };
    }, []);

    if (!isOpen) return null;

    const total = getCartTotal(cart);

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md h-full bg-white shadow-xl flex flex-col animate-slide-in-right">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-semibold">Shopping Cart</h2>
                    <button onClick={toggleCartModal} className="p-2 hover:bg-gray-100 rounded-full">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {cart.length === 0 ? (
                        <div className="text-center text-gray-500 mt-10">
                            Your cart is empty
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.product.id} className="flex gap-4 border-b pb-4">
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-20 h-24 object-cover rounded-md"
                                />
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                                        <p className="text-sm text-gray-500">${item.product.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center border rounded-md">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                className="p-1 hover:bg-gray-100"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                className="p-1 hover:bg-gray-100"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.product.id)}
                                            className="text-red-500 hover:text-red-700 p-2"
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

                <div className="p-6 border-t bg-gray-50">
                    <div className="flex justify-between items-center mb-4 text-lg font-semibold">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <button
                        className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                        disabled={cart.length === 0}
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}
