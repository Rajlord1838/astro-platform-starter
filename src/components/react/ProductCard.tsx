import React from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="flex flex-col bg-white text-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative aspect-[3/4] overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 text-xs font-semibold rounded text-gray-700">
                    {product.category}
                </div>
            </div>
            <div className="p-4 flex flex-col grow">
                <h3 className="text-lg font-bold mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2 grow">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                    <button
                        onClick={() => addToCart(product)}
                        className="bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors"
                        aria-label={`Add ${product.name} to cart`}
                    >
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};
