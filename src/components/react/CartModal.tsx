import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { getCart, updateQuantity, removeFromCart } from '../../utils/cart';
import { products } from '../../data/products';
import type { CartItem } from '../../utils/cart';

export default function CartModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const handleToggleCart = () => setIsOpen(prev => !prev);
        const handleCartUpdated = () => setCartItems(getCart());

        window.addEventListener('toggle-cart', handleToggleCart);
        window.addEventListener('cart-updated', handleCartUpdated);

        // Initial load
        setCartItems(getCart());

        return () => {
            window.removeEventListener('toggle-cart', handleToggleCart);
            window.removeEventListener('cart-updated', handleCartUpdated);
        };
    }, []);

    if (!isOpen) return null;

    const cartDetails = cartItems.map(item => {
        const product = products.find(p => p.id === item.id);
        return { ...item, product };
    }).filter(item => item.product); // Filter out any items where product wasn't found

    const total = cartDetails.reduce((sum, item) => {
        return sum + (item.product?.price || 0) * item.quantity;
    }, 0);

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md h-full bg-complementary shadow-xl flex flex-col transform transition-transform text-white border-l border-white/10">
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <h2 className="text-xl font-bold">Your Cart</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        aria-label="Close Cart"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cartDetails.length === 0 ? (
                        <div className="text-center text-gray-400 mt-10">
                            Your cart is empty.
                        </div>
                    ) : (
                        cartDetails.map(({ id, quantity, product }) => (
                            <div key={id} className="flex gap-4 p-3 bg-white/5 rounded-lg">
                                <img
                                    src={product!.image}
                                    alt={product!.name}
                                    className="w-20 h-24 object-cover rounded-md"
                                />
                                <div className="flex-1 flex flex-col">
                                    <div className="flex justify-between">
                                        <h3 className="font-semibold">{product!.name}</h3>
                                        <p className="font-bold text-primary">${product!.price}</p>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-auto">{product!.category}</p>

                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-3 bg-black/20 rounded-lg p-1">
                                            <button
                                                onClick={() => updateQuantity(id, quantity - 1)}
                                                className="p-1 hover:text-primary transition-colors"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="w-4 text-center">{quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(id, quantity + 1)}
                                                className="p-1 hover:text-primary transition-colors"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(id)}
                                            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                                            aria-label="Remove item"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cartDetails.length > 0 && (
                    <div className="p-6 border-t border-white/10 bg-black/10">
                        <div className="flex justify-between mb-4 text-lg font-bold">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <button className="w-full btn btn-lg">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
