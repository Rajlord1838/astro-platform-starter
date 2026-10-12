import React from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden text-gray-800 transition-transform hover:-translate-y-1">
            <div className="relative pt-[125%] bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    loading="lazy"
                />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold line-clamp-1">{product.name}</h3>
                    <span className="font-bold whitespace-nowrap ml-2">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{product.category}</span>
                    <button
                        onClick={() => addToCart(product)}
                        className="flex items-center gap-2 bg-primary text-primary-content hover:bg-primary/90 px-3 py-2 rounded transition-colors text-sm font-medium"
                    >
                        <ShoppingCart size={16} />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};
