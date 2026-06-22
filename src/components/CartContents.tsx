import React, { useState, useEffect } from 'react';
import { Trash2, X } from 'lucide-react';
import { getCart, removeFromCart, subscribeToCart } from '../utils/cart';
import type { CartItem } from '../types';

export default function CartContents() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const updateCart = () => {
            setCartItems(getCart());
        };

        updateCart();
        const unsubscribe = subscribeToCart(updateCart);
        return unsubscribe;
    }, []);

    const closeCart = () => {
        const dialog = document.getElementById('cart-modal') as HTMLDialogElement;
        if (dialog) {
            dialog.close();
        }
    };

    const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <div className="bg-white text-black p-6 rounded-lg w-full max-w-md mx-auto relative shadow-xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Your Cart</h2>
                <button onClick={closeCart} className="p-1 hover:bg-gray-100 rounded-full">
                    <X size={24} />
                </button>
            </div>

            {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty.</p>
            ) : (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                    {cartItems.map((item) => (
                        <div key={item.product.id} className="flex gap-4 border-b pb-4">
                            <img
                                src={item.product.imageUrl}
                                alt={item.product.name}
                                className="w-20 h-20 object-cover rounded"
                            />
                            <div className="flex-1">
                                <h3 className="font-semibold">{item.product.name}</h3>
                                <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.product.id)}
                                className="text-red-500 hover:text-red-700 p-2 h-fit"
                                aria-label="Remove item"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {cartItems.length > 0 && (
                <div className="mt-6 pt-4 border-t">
                    <div className="flex justify-between items-center mb-4 text-xl font-bold">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                        Checkout
                    </button>
                </div>
            )}
        </div>
    );
}
