import { useState, useEffect } from 'react';
import { getCart, updateQuantity, removeFromCart, clearCart } from '../utils/cart';
import type { CartItem } from '../types';
import { products } from '../data/products';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

export default function CartView() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setCartItems(getCart());
        setIsLoaded(true);

        const handleCartUpdate = () => {
            setCartItems(getCart());
        };

        window.addEventListener('cart-updated', handleCartUpdate as EventListener);
        return () => {
            window.removeEventListener('cart-updated', handleCartUpdate as EventListener);
        };
    }, []);

    if (!isLoaded) {
        return <div className="py-12 text-center text-gray-400">Loading cart...</div>;
    }

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex items-center justify-center w-24 h-24 mb-6 bg-gray-900 rounded-full">
                    <Trash2 className="w-10 h-10 text-gray-500" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                <p className="mb-8 text-gray-400">Looks like you haven't added anything to your cart yet.</p>
                <a href="/" className="btn btn-lg">Continue Shopping</a>
            </div>
        );
    }

    const cartProducts = cartItems.map(item => {
        const product = products.find(p => p.id === item.productId);
        return {
            ...item,
            product
        };
    }).filter(item => item.product !== undefined);

    const subtotal = cartProducts.reduce((total, item) => total + (item.product!.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + shipping;

    return (
        <div className="flex flex-col gap-8 lg:flex-row">
            <div className="flex-grow">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-800">
                    <h2 className="text-2xl font-bold">Shopping Cart ({cartItems.length} items)</h2>
                    <button
                        onClick={clearCart}
                        className="text-sm text-red-400 hover:text-red-300 transition-colors"
                    >
                        Clear Cart
                    </button>
                </div>

                <div className="flex flex-col gap-6">
                    {cartProducts.map((item) => (
                        <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-900 border border-gray-800 rounded-lg">
                            <div className="w-full sm:w-24 h-24 flex-shrink-0 bg-gray-800 rounded-md overflow-hidden">
                                <img
                                    src={item.product!.image}
                                    alt={item.product!.name}
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            <div className="flex flex-col flex-grow justify-between">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-lg">{item.product!.name}</h3>
                                        <p className="text-sm text-gray-400">{item.product!.category}</p>
                                    </div>
                                    <span className="font-bold">${(item.product!.price * item.quantity).toFixed(2)}</span>
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center bg-gray-800 rounded-md">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="p-2 text-gray-400 hover:text-white transition-colors"
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-2 text-gray-400 hover:text-white transition-colors"
                                            aria-label="Increase quantity"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="flex items-center gap-1 text-sm text-gray-400 hover:text-red-400 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        <span>Remove</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full lg:w-80 flex-shrink-0">
                <div className="p-6 bg-gray-900 border border-gray-800 rounded-lg sticky top-6">
                    <h3 className="text-lg font-bold mb-4 pb-4 border-b border-gray-800">Order Summary</h3>

                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-gray-400">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                            <span>Shipping</span>
                            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                        </div>
                        {shipping > 0 && (
                            <p className="text-xs text-gray-500">Free shipping on orders over $100</p>
                        )}
                    </div>

                    <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-800">
                        <span className="font-bold text-lg">Total</span>
                        <span className="font-bold text-xl">${total.toFixed(2)}</span>
                    </div>

                    <button className="w-full btn flex justify-center items-center gap-2">
                        Checkout <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
