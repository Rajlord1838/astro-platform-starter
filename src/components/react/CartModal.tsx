import React, { useState, useEffect, useRef } from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { getCart, updateQuantity, removeFromCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export const CartModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        setCart(getCart());

        const handleCartUpdate = (e: Event) => {
            const customEvent = e as CustomEvent<CartItem[]>;
            setCart(customEvent.detail);
        };

        const handleToggleCart = (e: Event) => {
            const customEvent = e as CustomEvent<boolean | undefined>;
            if (customEvent.detail !== undefined) {
                setIsOpen(customEvent.detail);
            } else {
                setIsOpen((prev) => !prev);
            }
        };

        window.addEventListener('cart-updated', handleCartUpdate);
        window.addEventListener('toggle-cart', handleToggleCart);

        return () => {
            window.removeEventListener('cart-updated', handleCartUpdate);
            window.removeEventListener('toggle-cart', handleToggleCart);
        };
    }, []);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen) {
            dialog.showModal();
            document.body.style.overflow = 'hidden';
        } else {
            dialog.close();
            document.body.style.overflow = '';
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsOpen(false);
    };

    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <dialog
            ref={dialogRef}
            onClose={handleClose}
            className="backdrop:bg-black/50 p-0 m-0 ml-auto h-full max-h-screen w-full max-w-md bg-gray-900 text-white shadow-xl transition-[display,overlay] allow-discrete"
        >
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <h2 className="text-xl font-bold">Your Cart</h2>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:text-primary transition-colors"
                        aria-label="Close cart"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-4">
                    {cart.length === 0 ? (
                        <div className="text-center text-gray-400 py-8">
                            Your cart is empty.
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.product.id} className="flex gap-4 p-2 bg-gray-800 rounded-lg">
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-20 h-24 object-cover rounded-md"
                                />
                                <div className="flex flex-col flex-grow">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-sm leading-tight">{item.product.name}</h3>
                                        <button
                                            onClick={() => removeFromCart(item.product.id)}
                                            className="text-gray-400 hover:text-red-400 p-1"
                                            aria-label={`Remove ${item.product.name} from cart`}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <div className="text-primary font-medium mt-1">
                                        ${item.product.price.toFixed(2)}
                                    </div>
                                    <div className="flex items-center gap-3 mt-auto pt-2">
                                        <div className="flex items-center bg-gray-900 rounded border border-gray-700">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                className="p-1 hover:text-primary transition-colors"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                className="p-1 hover:text-primary transition-colors"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="p-4 border-t border-gray-800 bg-gray-900">
                        <div className="flex justify-between items-center mb-4 text-lg font-bold">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <button className="btn w-full btn-lg">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </dialog>
    );
};
