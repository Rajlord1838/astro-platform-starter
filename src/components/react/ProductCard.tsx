import React from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="flex flex-col bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 transition-transform hover:scale-105">
            <div className="relative aspect-[4/5] overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full"
                    loading="lazy"
                />
                <div className="absolute top-2 right-2 bg-primary text-primary-content text-xs font-bold px-2 py-1 rounded">
                    {product.category}
                </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-white mb-1">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-4 flex-grow">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-bold text-white">${product.price.toFixed(2)}</span>
                    <button
                        onClick={() => addToCart(product)}
                        className="btn px-3 py-2 rounded-md flex items-center gap-2"
                        aria-label={`Add ${product.name} to cart`}
                    >
                        <ShoppingCart size={18} />
                        <span>Add</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
