import React from 'react';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../types';
import { addToCart } from '../utils/cart';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden text-gray-800 transition-transform hover:-translate-y-1">
            <div className="relative h-64 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-primary/90 text-white text-xs font-bold px-2 py-1 rounded">
                    {product.category}
                </div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-500 text-sm mb-4 flex-grow line-clamp-2">
                    {product.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                    </span>
                    <button
                        onClick={() => addToCart(product)}
                        className="bg-primary hover:bg-primary/90 text-white p-2 rounded-full transition-colors flex items-center justify-center"
                        aria-label={`Add ${product.title} to cart`}
                    >
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};
