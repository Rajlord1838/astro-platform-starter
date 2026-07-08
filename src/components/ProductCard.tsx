import React from 'react';
import type { Product, CartItem } from '../types';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const handleAddToCart = () => {
        const cartData = localStorage.getItem('fashion_store_cart');
        let cart: CartItem[] = cartData ? JSON.parse(cartData) : [];

        const existingItem = cart.find(item => item.product.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ product, quantity: 1 });
        }

        localStorage.setItem('fashion_store_cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cart-updated'));
    };

    return (
        <div className="bg-white text-neutral-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-[4/5] relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full"
                />
                <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 text-xs font-semibold rounded uppercase tracking-wide">
                    {product.category}
                </div>
            </div>
            <div className="p-4 flex flex-col gap-2">
                <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
                    <span className="font-bold whitespace-nowrap">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-neutral-500 line-clamp-2">{product.description}</p>
                <button
                    onClick={handleAddToCart}
                    className="mt-2 w-full bg-neutral-900 hover:bg-neutral-800 text-white font-medium py-2 px-4 rounded transition-colors"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};
