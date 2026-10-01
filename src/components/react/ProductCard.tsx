import React from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="group relative border rounded-xl overflow-hidden bg-white hover:shadow-lg transition-all duration-300">
            <div className="aspect-[4/5] overflow-hidden bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="p-5">
                <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider">{product.category}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <button
                        onClick={() => addToCart(product)}
                        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                        <ShoppingBag size={16} />
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}
