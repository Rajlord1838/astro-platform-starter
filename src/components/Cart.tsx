import React, { useEffect, useState } from 'react';
import { ShoppingCart, X, Plus, Minus } from 'lucide-react';
import { getCart, removeFromCart, updateQuantity, type CartItem } from '../utils/cart';

export default function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState<CartItem[]>([]);

    useEffect(() => {
        setItems(getCart());

        const handleCartUpdate = () => {
            setItems(getCart());
        };

        window.addEventListener('cart-updated', handleCartUpdate);
        return () => window.removeEventListener('cart-updated', handleCartUpdate);
    }, []);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Open Cart"
            >
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                        {totalItems}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
                    <div className="w-full max-w-md bg-white h-full flex flex-col shadow-xl">
                        <div className="p-4 flex justify-between items-center border-b">
                            <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
                            <button onClick={() => setIsOpen(false)} className="p-2 text-gray-500 hover:text-gray-800">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4">
                            {items.length === 0 ? (
                                <p className="text-center text-gray-500 mt-8">Your cart is empty.</p>
                            ) : (
                                <ul className="space-y-4">
                                    {items.map(item => (
                                        <li key={item.id} className="flex gap-4 border-b pb-4">
                                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                                <p className="text-gray-600">${item.price}</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 border rounded hover:bg-gray-100 text-black">
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className="w-8 text-center text-black">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 border rounded hover:bg-gray-100 text-black">
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                            <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 h-fit" aria-label="Remove item">
                                                <X size={20} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="p-4 border-t bg-gray-50">
                            <div className="flex justify-between items-center mb-4 text-black">
                                <span className="font-semibold text-lg">Total</span>
                                <span className="font-bold text-xl">${totalPrice.toFixed(2)}</span>
                            </div>
                            <button
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={items.length === 0}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
