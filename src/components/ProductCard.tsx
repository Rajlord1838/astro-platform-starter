import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { addToCart } from '../utils/cart';
import type { Product } from '../types';

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-64 overflow-hidden group">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2">
                    <span className="bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-700 capitalize shadow-sm">
                        {product.category}
                    </span>
                </div>
            </div>
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                    <span className="text-lg font-bold text-blue-600">${product.price}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <button
                    onClick={() => addToCart(product)}
                    className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                    <ShoppingBag size={18} />
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
