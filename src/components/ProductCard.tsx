import React from 'react';
import type { Product } from '../types';
import { addToCart } from '../utils/cart';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg flex flex-col h-full text-gray-900">
            <div className="relative h-64 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold font-sans text-gray-900 line-clamp-2">{product.name}</h3>
                    <span className="text-lg font-bold text-primary ml-2">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">{product.description}</p>
                <button
                    onClick={() => addToCart(product)}
                    className="w-full btn"
                    aria-label={`Add ${product.name} to cart`}
                >
                    <ShoppingCart size={18} />
                    Add to Cart
                </button>
            </div>
        </div>
    );
};
