import React from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="relative aspect-square">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>
            <div className="p-5 flex flex-col gap-2">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 leading-tight">{product.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                    </div>
                    <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mt-2 flex-grow">{product.description}</p>
                <button
                    onClick={() => addToCart(product)}
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white px-4 py-2.5 rounded-lg font-medium transition-colors cursor-pointer"
                >
                    <ShoppingCart size={18} />
                    Add to Cart
                </button>
            </div>
        </div>
    );
};
