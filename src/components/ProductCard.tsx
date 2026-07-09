import React from 'react';
import type { Product, CartItem } from '../types';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const handleAddToCart = () => {
        const cartStr = localStorage.getItem('fashion_store_cart');
        const cart: CartItem[] = cartStr ? JSON.parse(cartStr) : [];

        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('fashion_store_cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cart-updated'));
    };

    return (
        <div className="flex flex-col bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800 transition-transform hover:scale-[1.02]">
            <div className="h-64 overflow-hidden relative bg-gray-800">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white leading-tight">{product.name}</h3>
                    <span className="text-lg font-semibold text-primary ml-4 shrink-0">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-gray-400 text-sm mb-6 flex-grow">{product.description}</p>
                <button
                    onClick={handleAddToCart}
                    className="w-full btn flex items-center justify-center gap-2 mt-auto"
                >
                    <ShoppingCart size={18} />
                    <span>Add to Cart</span>
                </button>
            </div>
        </div>
    );
}