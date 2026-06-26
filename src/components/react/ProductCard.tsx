import React from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="flex flex-col overflow-hidden rounded-lg shadow-lg bg-white border border-gray-200">
            <div className="flex-shrink-0 h-64 overflow-hidden">
                <img className="h-full w-full object-cover object-center" src={product.image} alt={product.name} />
            </div>
            <div className="flex-1 flex flex-col justify-between p-6">
                <div className="flex-1">
                    <p className="text-sm font-medium text-blue-600 mb-1">
                        {product.category || 'Clothing'}
                    </p>
                    <h3 className="text-xl font-semibold text-gray-900">
                        {product.name}
                    </h3>
                    <p className="mt-3 text-base text-gray-500 line-clamp-2">
                        {product.description}
                    </p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                    <p className="text-xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                    </p>
                    <button
                        onClick={handleAddToCart}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};
