import React from 'react';
import { useCart, removeFromCart, updateCartQuantity, clearCart } from '../utils/cart';
import { products } from '../utils/data';

export default function CartDisplay() {
    const cartItems = useCart();

    const cartProducts = cartItems.map(item => {
        const product = products.find(p => p.id === item.id);
        return {
            ...item,
            product
        };
    }).filter(item => item.product !== undefined); // Ensure product exists

    const total = cartProducts.reduce((sum, item) => sum + (item.product!.price * item.quantity), 0);

    if (cartItems.length === 0) {
        return (
            <div className="py-12 text-center">
                <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
                <a href="/products" className="text-primary underline">Continue Shopping</a>
            </div>
        );
    }

    return (
        <div className="py-8">
            <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
            <div className="space-y-6 mb-8">
                {cartProducts.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-4 w-full sm:w-auto mb-4 sm:mb-0">
                            <img src={item.product!.image} alt={item.product!.name} className="w-20 h-20 object-cover rounded" />
                            <div>
                                <h3 className="font-semibold">{item.product!.name}</h3>
                                <p className="text-gray-600">${item.product!.price.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                            <div className="flex items-center border border-gray-300 rounded">
                                <button
                                    className="px-3 py-1 bg-white hover:bg-gray-100"
                                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                >
                                    -
                                </button>
                                <span className="px-3 py-1 font-semibold">{item.quantity}</span>
                                <button
                                    className="px-3 py-1 bg-white hover:bg-gray-100"
                                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                            <p className="font-bold w-20 text-right">
                                ${(item.product!.price * item.quantity).toFixed(2)}
                            </p>
                            <button
                                className="text-red-500 hover:text-red-700"
                                onClick={() => removeFromCart(item.id)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-col items-end border-t border-gray-200 pt-6">
                <p className="text-xl mb-4">Total: <span className="font-bold">${total.toFixed(2)}</span></p>
                <div className="flex gap-4">
                    <button
                        onClick={() => clearCart()}
                        className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
                    >
                        Clear Cart
                    </button>
                    <button
                        className="px-8 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
                        onClick={() => alert("Checkout not implemented in this demo")}
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}
