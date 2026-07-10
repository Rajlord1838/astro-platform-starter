import React from 'react';
import type { Product } from '../types';
import { addToCart } from '../utils/cart';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="group flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <div className="text-xs font-semibold tracking-wider text-gray-500 uppercase mb-1">
                    {product.category}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                    {product.description}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <span className="text-xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                    </span>
                    <button
                        onClick={handleAddToCart}
                        className="flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm"
                    >
                        <ShoppingCart size={16} />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
