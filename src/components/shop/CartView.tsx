import React, { useEffect, useState } from 'react';
import { getCart, getCartTotal, removeFromCart, updateQuantity, CART_EVENT } from '../../utils/cart';
import type { CartItem } from '../../types';

export const CartView: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        setCartItems(getCart());

        const handleCartUpdate = () => {
            setCartItems(getCart());
        };

        window.addEventListener(CART_EVENT, handleCartUpdate);
        return () => window.removeEventListener(CART_EVENT, handleCartUpdate);
    }, []);

    if (!isClient) {
        return <div className="text-center py-8">Loading cart...</div>;
    }

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-16 bg-white/5 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <p className="mb-8 text-gray-300">Looks like you haven't added any items yet.</p>
                <a href="/" className="btn btn-lg">Start Shopping</a>
            </div>
        );
    }

    const total = getCartTotal(cartItems);

    return (
        <div className="bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 border-b pb-4">Shopping Cart</h2>

                <div className="space-y-6">
                    {cartItems.map((item) => (
                        <div key={item.product.id} className="flex flex-col sm:flex-row items-center gap-4 py-4 border-b last:border-0">
                            <img
                                src={item.product.imageUrl}
                                alt={item.product.name}
                                className="w-24 h-24 object-cover rounded-md"
                            />

                            <div className="flex-grow text-center sm:text-left">
                                <h3 className="text-lg font-semibold">{item.product.name}</h3>
                                <p className="text-gray-500 text-sm">{item.product.category}</p>
                                <div className="text-primary font-bold mt-1">${item.product.price.toFixed(2)}</div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex items-center border rounded-md">
                                    <button
                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-l-md transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-1 font-medium">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-r-md transition-colors"
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item.product.id)}
                                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                                    title="Remove item"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-gray-50 p-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                    <div className="text-gray-500 mb-1">Subtotal</div>
                    <div className="text-3xl font-bold">${total.toFixed(2)}</div>
                </div>
                <button className="w-full sm:w-auto btn btn-lg bg-green-600 hover:bg-green-700 text-white">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};
