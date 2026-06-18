import React from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const handleAddToCart = () => {
        addToCart(product);
        // Optional: you could show a toast notification here
    };

    return (
        <div className="flex flex-col bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-700">
            <div className="relative pt-[120%] bg-gray-900">
                <img
                    src={product.image}
                    alt={product.name}
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                    loading="lazy"
                />
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white">{product.name}</h3>
                    <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-400 mb-4 flex-grow">{product.description}</p>
                <div className="flex justify-between items-center mt-auto">
                    <span className="text-xs font-medium bg-gray-700 text-gray-300 px-2 py-1 rounded">
                        {product.category}
                    </span>
                    <button
                        onClick={handleAddToCart}
                        className="btn py-1.5 px-4 text-sm bg-primary hover:bg-primary/90 text-primary-content rounded font-semibold transition-colors"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};
