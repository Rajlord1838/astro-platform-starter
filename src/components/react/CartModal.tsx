import React, { useState, useEffect, useRef } from 'react';
import { X, Trash2 } from 'lucide-react';
import { getCartItems, removeFromCart, clearCart } from '../../utils/cart';
import type { CartItem } from '../../types';

export default function CartModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState<CartItem[]>([]);
    const dialogRef = useRef<HTMLDialogElement>(null);

    const updateItems = () => {
        setItems(getCartItems());
    };

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        updateItems();
        window.addEventListener('cart-updated', updateItems);
        window.addEventListener('toggle-cart', handleToggle);
        return () => {
            window.removeEventListener('cart-updated', updateItems);
            window.removeEventListener('toggle-cart', handleToggle);
        };
    }, []);

    useEffect(() => {
        if (isOpen && dialogRef.current) {
            dialogRef.current.showModal();
        } else if (!isOpen && dialogRef.current) {
            dialogRef.current.close();
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        if (e.target === dialogRef.current) {
            handleClose();
        }
    };

    const totalPrice = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);

    return (
        <dialog
            ref={dialogRef}
            onClick={handleBackdropClick}
            className="backdrop:bg-black/50 p-0 rounded-lg shadow-xl max-w-md w-full bg-white text-gray-800 m-auto mt-20"
        >
            <div className="p-6 flex flex-col h-full max-h-[80vh]">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h2 className="text-2xl font-bold">Your Cart</h2>
                    <button onClick={handleClose} className="p-1 hover:text-red-500 transition-colors" aria-label="Close cart">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto mb-4">
                    {items.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">Your cart is empty.</p>
                    ) : (
                        <ul className="space-y-4">
                            {items.map((item) => (
                                <li key={item.product.id} className="flex justify-between items-center border-b pb-4">
                                    <div className="flex items-center gap-4">
                                        <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                                        <div>
                                            <h4 className="font-semibold">{item.product.name}</h4>
                                            <p className="text-sm text-gray-600">${item.product.price.toFixed(2)} x {item.quantity}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.product.id)}
                                        className="text-red-500 hover:text-red-700 p-2"
                                        aria-label={`Remove ${item.product.name} from cart`}
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4 font-bold text-lg">
                            <span>Total:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={clearCart}
                                className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded transition-colors font-semibold"
                            >
                                Clear Cart
                            </button>
                            <button
                                className="flex-1 py-2 px-4 bg-primary hover:bg-primary/90 text-white rounded transition-colors font-semibold"
                                onClick={() => alert('Checkout not implemented')}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </dialog>
    );
}
