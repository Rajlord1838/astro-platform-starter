import React from 'react';
import type { Product, CartItem } from '../types';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const handleAddToCart = () => {
        const cartData = localStorage.getItem('fashion_store_cart');
        let cart: CartItem[] = [];
        if (cartData) {
            try {
                cart = JSON.parse(cartData);
            } catch (e) {
                console.error('Failed to parse cart data', e);
            }
        }

        const existingItemIndex = cart.findIndex(item => item.product.id === product.id);
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({ product, quantity: 1 });
        }

        localStorage.setItem('fashion_store_cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cart-updated'));
    };

    return (
        <div className="flex flex-col bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700">
            <div className="relative h-64 w-full">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-white">{product.name}</h3>
                    <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-gray-400 text-sm mb-4 flex-grow">{product.description}</p>
                <button
                    onClick={handleAddToCart}
                    className="w-full btn mt-auto"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};
