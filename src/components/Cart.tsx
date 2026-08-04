import React, { useEffect, useState } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import type { CartItem } from '../types';
import { getCart, getCartTotal, subscribeToCart, updateQuantity, removeFromCart } from '../utils/cart';

export const Cart: React.FC = () => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const updateState = () => {
            setItems(getCart());
            setTotal(getCartTotal());
        };

        // Initial load
        updateState();

        // Subscribe to changes
        const unsubscribe = subscribeToCart(updateState);

        return unsubscribe;
    }, []);

    const closeCart = () => {
        const modal = document.getElementById('cart-modal') as HTMLDialogElement | null;
        modal?.close();
    };

    return (
        <dialog id="cart-modal" className="modal bg-transparent p-0 m-0 ml-auto mr-0 h-full max-h-none w-full max-w-md backdrop:bg-gray-950/80 fixed right-0 shadow-2xl transition-all">
            <div className="bg-complementary text-white h-full flex flex-col p-6 w-full ml-auto">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <ShoppingCart /> Your Cart
                    </h2>
                    <button onClick={closeCart} className="hover:text-primary transition-colors" aria-label="Close cart">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto pr-2">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
                            <ShoppingCart size={48} className="opacity-20" />
                            <p>Your cart is empty.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4 items-center">
                                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                                    <div className="flex-grow">
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
                                        <div className="flex items-center gap-3 mt-2">
                                            <div className="flex items-center border border-gray-600 rounded bg-gray-800">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="px-2 py-1 hover:text-primary"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="w-8 text-center text-sm">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="px-2 py-1 hover:text-primary"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-400 hover:text-red-400 ml-auto"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-700">
                        <div className="flex justify-between text-xl font-bold mb-6">
                            <span>Total</span>
                            <span className="text-primary">${total.toFixed(2)}</span>
                        </div>
                        <button className="btn w-full btn-lg">Checkout</button>
                    </div>
                )}
            </div>
            {/* Click outside to close (backdrop) handles differently in native dialogs. A wrapper form method="dialog" could work, but this simple structure suffices if they click close or we add backdrop logic later. */}
            <form method="dialog" className="modal-backdrop absolute inset-0 -z-10" onClick={closeCart}>
                <button aria-label="close" className="w-full h-full cursor-default"></button>
            </form>
        </dialog>
    );
};
