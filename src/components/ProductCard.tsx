import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const handleAddToCart = () => {
        const cartStr = localStorage.getItem('fashion_store_cart');
        let cart = cartStr ? JSON.parse(cartStr) : [];
        const existingItem = cart.find((item: any) => item.product.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ product, quantity: 1 });
        }

        localStorage.setItem('fashion_store_cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cart-updated'));
    };

    return (
        <div className="flex flex-col overflow-hidden bg-white rounded-lg shadow-md">
            <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-64" />
            <div className="flex flex-col flex-grow p-4">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mt-auto pt-4">
                    <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <button
                        onClick={handleAddToCart}
                        className="px-4 py-2 text-sm font-medium text-white transition-colors bg-primary rounded-md hover:bg-primary/90"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};
