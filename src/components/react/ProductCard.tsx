import React from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1">
            <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform hover:scale-105"
                />
            </div>
            <div className="flex flex-col flex-grow p-4">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight">{product.name}</h3>
                    <span className="font-bold text-gray-900 ml-2">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4 flex-grow">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{product.category}</span>
                    <button
                        onClick={() => addToCart(product)}
                        className="flex items-center justify-center gap-2 bg-primary text-white py-2 px-4 rounded hover:bg-primary/90 transition-colors"
                        aria-label={`Add ${product.name} to cart`}
                    >
                        <ShoppingCart size={18} />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};