import React, { useEffect, useState } from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem } from '../types';

interface CartProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const loadCart = () => {
        const cartStr = window.localStorage.getItem('fashion_store_cart');
        if (cartStr) {
            try {
                setCart(JSON.parse(cartStr));
            } catch (e) {
                console.error(e);
            }
        } else {
            setCart([]);
        }
    };

    useEffect(() => {
        if (isOpen) {
            loadCart();
        }
        window.addEventListener('cart-updated', loadCart);
        return () => window.removeEventListener('cart-updated', loadCart);
    }, [isOpen]);

    const saveCart = (newCart: CartItem[]) => {
        window.localStorage.setItem('fashion_store_cart', JSON.stringify(newCart));
        window.dispatchEvent(new Event('cart-updated'));
    };

    const updateQuantity = (id: string, delta: number) => {
        const newCart = cart.map(item => {
            if (item.id === id) {
                const newQuantity = item.quantity + delta;
                return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
            }
            return item;
        });
        saveCart(newCart);
    };

    const removeItem = (id: string) => {
        const newCart = cart.filter(item => item.id !== id);
        saveCart(newCart);
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />
            <div className="relative w-full max-w-md bg-white h-full shadow-xl flex flex-col">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold">Your Cart</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {cart.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">Your cart is empty.</p>
                    ) : (
                        <ul className="space-y-4">
                            {cart.map(item => (
                                <li key={item.id} className="flex gap-4 border-b pb-4">
                                    <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded" />
                                    <div className="flex-1">
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <p className="text-gray-600">${item.price.toFixed(2)}</p>

                                        <div className="flex items-center gap-2 mt-2">
                                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-gray-100 rounded">
                                                <Minus size={16} />
                                            </button>
                                            <span className="w-8 text-center">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-gray-100 rounded">
                                                <Plus size={16} />
                                            </button>
                                            <button onClick={() => removeItem(item.id)} className="ml-auto p-2 text-red-500 hover:bg-red-50 rounded transition-colors">
                                                <Trash2 size={16} />
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
                        <div className="flex justify-between items-center mb-4 text-lg font-bold">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
