import React from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:-translate-y-1">
            <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover" />
            <div className="p-4">
                <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
                <p className="text-gray-400 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-primary text-xl font-bold">${product.price.toFixed(2)}</span>
                    <button
                        onClick={() => addToCart(product)}
                        className="bg-primary text-primary-content px-4 py-2 rounded font-semibold hover:bg-primary/80 transition-colors"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};
