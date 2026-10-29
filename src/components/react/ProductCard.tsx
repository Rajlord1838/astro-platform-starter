import React from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
                    </div>
                    <span className="font-bold text-gray-900">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
                <button
                    onClick={() => addToCart(product)}
                    className="btn w-full mt-auto flex items-center justify-center gap-2"
                >
                    <ShoppingBag size={18} />
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
