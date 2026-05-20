import React, { useState, useEffect } from 'react';
import { getCart, removeFromCart, updateQuantity, clearCart, type CartItem } from '../utils/cart';

export default function CartDisplay() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
        const fetchCart = () => setCartItems(getCart());
        fetchCart();

        window.addEventListener('cart-updated', fetchCart);
        return () => window.removeEventListener('cart-updated', fetchCart);
    }, []);

    if (!isHydrated) {
        return <div className="text-center py-10">Loading cart...</div>;
    }

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-20 bg-gray-800 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4 text-gray-200">Your cart is empty</h2>
                <a href="/" className="text-blue-400 hover:text-blue-300 underline">Continue Shopping</a>
            </div>
        );
    }

    const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-white border-b border-gray-700 pb-4">Shopping Cart</h2>

            <div className="space-y-6">
                {cartItems.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-4 py-4 border-b border-gray-700 last:border-0 bg-gray-900/50 p-4 rounded">
                        <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-24 h-24 object-cover rounded bg-gray-700"
                        />
                        <div className="flex-grow">
                            <h3 className="text-lg font-semibold text-white">{item.product.name}</h3>
                            <p className="text-gray-400">${item.product.price.toFixed(2)}</p>

                            <div className="flex items-center gap-3 mt-3">
                                <label className="text-sm text-gray-400">Qty:</label>
                                <select
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value))}
                                    className="bg-gray-700 text-white border border-gray-600 rounded px-2 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                        <option key={n} value={n}>{n}</option>
                                    ))}
                                </select>
                                <button
                                    onClick={() => removeFromCart(item.product.id)}
                                    className="text-red-400 hover:text-red-300 text-sm underline ml-4"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                        <div className="text-xl font-bold text-white">
                            ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-700 flex justify-between items-center">
                <button
                    onClick={clearCart}
                    className="text-gray-400 hover:text-white underline text-sm"
                >
                    Clear Cart
                </button>
                <div className="text-right">
                    <p className="text-gray-400 mb-1">Subtotal</p>
                    <p className="text-3xl font-bold text-white">${total.toFixed(2)}</p>
                    <button className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow transition-colors text-lg">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}
