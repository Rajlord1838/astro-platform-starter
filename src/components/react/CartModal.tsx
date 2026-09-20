import React, { useEffect, useState } from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import type { CartItem } from '../../types';
import { getCart, updateQuantity, removeFromCart } from '../../utils/cart';

export default function CartModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);

    const updateCartState = () => {
        setCart(getCart());
    };

    useEffect(() => {
        updateCartState();

        const handleToggle = () => setIsOpen(prev => !prev);
        const handleCartUpdate = () => updateCartState();

        window.addEventListener('toggle-cart', handleToggle);
        window.addEventListener('cart-updated', handleCartUpdate);

        return () => {
            window.removeEventListener('toggle-cart', handleToggle);
            window.removeEventListener('cart-updated', handleCartUpdate);
        };
    }, []);

    if (!isOpen) return null;

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white text-gray-900 rounded-lg shadow-xl w-full max-w-md max-h-[80vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <ShoppingBag /> Your Cart
                    </h2>
                    <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-4 flex-1 overflow-y-auto">
                    {cart.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">Your cart is empty.</p>
                    ) : (
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-4 items-center border-b pb-4 last:border-0 last:pb-0">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-sm line-clamp-1">{item.name}</h3>
                                        <p className="text-primary font-medium">${item.price}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-gray-100 rounded border">
                                            <Minus size={16} />
                                        </button>
                                        <span className="w-6 text-center text-sm">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-gray-100 rounded border">
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="border-t p-4 bg-gray-50 rounded-b-lg">
                        <div className="flex justify-between items-center font-bold text-lg mb-4">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <button className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
