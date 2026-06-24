import React from 'react';
import type { Product, CartItem } from '../types';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const handleAddToCart = () => {
        const cartData = localStorage.getItem('fashion_store_cart');
        let cart: CartItem[] = cartData ? JSON.parse(cartData) : [];

        const existingItemIndex = cart.findIndex((item) => item.product.id === product.id);

        if (existingItemIndex >= 0) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({ product, quantity: 1 });
        }

        localStorage.setItem('fashion_store_cart', JSON.stringify(cart));

        // Dispatch custom event to notify CartIcon
        window.dispatchEvent(new Event('cart-updated'));
    };

    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col">
            <div className="relative h-64 overflow-hidden">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">{product.name}</h3>
                    <span className="text-lg font-semibold text-primary">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-gray-400 text-sm mb-4 flex-grow">{product.description}</p>
                <div className="flex justify-between items-center mt-auto">
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-gray-700 text-gray-300">
                        {product.category}
                    </span>
                    <button
                        onClick={handleAddToCart}
                        className="btn text-sm py-2 px-4"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};
