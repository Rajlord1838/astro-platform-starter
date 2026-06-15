import React from 'react';
import { useCart, updateQuantity } from '../utils/cartStore';
import { X, Plus, Minus } from 'lucide-react';

export default function Cart() {
    const cart = useCart();

    const totalPrice = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

    const closeCart = () => {
        const dialog = document.getElementById('cart-modal') as HTMLDialogElement;
        if (dialog) {
            dialog.close();
        }
    };

    return (
        <div className="flex flex-col h-full bg-white text-gray-800">
            <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-bold">Shopping Cart</h2>
                <button onClick={closeCart} className="p-2 text-gray-500 hover:text-gray-700 cursor-pointer" aria-label="Close cart">
                    <X size={24} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                        <p>Your cart is empty.</p>
                        <button onClick={closeCart} className="mt-4 text-primary hover:underline cursor-pointer">
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <ul className="space-y-4">
                        {cart.map((item) => (
                            <li key={item.product.id} className="flex gap-4 p-2 bg-gray-50 rounded shadow-sm">
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-20 h-20 object-cover rounded"
                                />
                                <div className="flex flex-col justify-between flex-1">
                                    <div>
                                        <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                                        <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                            className="p-1 text-gray-500 hover:text-gray-700 bg-gray-200 rounded cursor-pointer"
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                            className="p-1 text-gray-500 hover:text-gray-700 bg-gray-200 rounded cursor-pointer"
                                            aria-label="Increase quantity"
                                        >
                                            <Plus size={16} />
                                        </button>
                                        <button
                                            onClick={() => updateQuantity(item.product.id, 0)}
                                            className="ml-auto text-sm text-red-500 hover:underline cursor-pointer"
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

            {cart.length > 0 && (
                <div className="p-4 border-t bg-gray-50">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-semibold">Total</span>
                        <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
                    </div>
                    <button className="w-full py-3 text-white bg-primary rounded font-semibold hover:bg-primary/90 transition-colors cursor-pointer">
                        Checkout
                    </button>
                </div>
            )}
        </div>
    );
}
