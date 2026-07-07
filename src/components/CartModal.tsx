import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import type { CartItem } from '../types';

export default function CartModal() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const loadCart = () => {
        try {
            const storedCart = localStorage.getItem('fashion_store_cart');
            if (storedCart) {
                setCartItems(JSON.parse(storedCart));
            } else {
                setCartItems([]);
            }
        } catch (e) {
            console.error('Failed to load cart', e);
        }
    };

    useEffect(() => {
        loadCart();

        const handleCartUpdate = () => {
            loadCart();
        };

        window.addEventListener('cart-updated', handleCartUpdate);
        return () => window.removeEventListener('cart-updated', handleCartUpdate);
    }, []);

    const saveCart = (newCart: CartItem[]) => {
        localStorage.setItem('fashion_store_cart', JSON.stringify(newCart));
        setCartItems(newCart);
        window.dispatchEvent(new Event('cart-updated'));
    };

    const updateQuantity = (productId: string, delta: number) => {
        const newCart = cartItems.map(item => {
            if (item.product.id === productId) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        saveCart(newCart);
    };

    const removeItem = (productId: string) => {
        const newCart = cartItems.filter(item => item.product.id !== productId);
        saveCart(newCart);
    };

    const closeModal = () => {
        const modal = document.getElementById('cart-modal') as HTMLDialogElement | null;
        if (modal) {
            modal.close();
        }
    };

    const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <div className="flex flex-col h-full bg-white text-gray-900 w-full max-w-md ml-auto">
            <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-bold">Your Cart</h2>
                <button onClick={closeModal} className="p-2 transition hover:text-primary">
                    <X size={24} />
                </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
                {cartItems.length === 0 ? (
                    <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
                ) : (
                    <ul className="space-y-4">
                        {cartItems.map((item) => (
                            <li key={item.product.id} className="flex gap-4 p-2 border rounded">
                                <img src={item.product.imageUrl} alt={item.product.name} className="object-cover w-20 h-20 rounded" />
                                <div className="flex-1">
                                    <h3 className="font-semibold">{item.product.name}</h3>
                                    <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <button onClick={() => updateQuantity(item.product.id, -1)} className="p-1 text-gray-500 hover:text-primary" aria-label="Decrease quantity">
                                            <Minus size={16} />
                                        </button>
                                        <span className="w-8 text-center">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.product.id, 1)} className="p-1 text-gray-500 hover:text-primary" aria-label="Increase quantity">
                                            <Plus size={16} />
                                        </button>
                                        <div className="flex-1 text-right">
                                            <button onClick={() => removeItem(item.product.id)} className="p-1 text-red-500 hover:text-red-700" aria-label="Remove item">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {cartItems.length > 0 && (
                <div className="p-4 border-t bg-gray-50">
                    <div className="flex justify-between mb-4 text-xl font-bold">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <button className="w-full py-3 font-bold text-white rounded bg-primary hover:bg-primary/90" onClick={() => {
                        alert('Checkout flow not implemented');
                        closeModal();
                    }}>
                        Checkout
                    </button>
                </div>
            )}
        </div>
    );
}
