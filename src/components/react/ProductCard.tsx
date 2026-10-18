import React from 'react';
import { Plus } from 'lucide-react';
import { addToCart } from '../../utils/cart';
import type { Product } from '../../types';

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    return (
        <div className="group flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                />
            </div>

            <div className="flex flex-col p-5 flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{product.category}</p>
                        <h3 className="text-lg font-bold text-gray-900 leading-tight">{product.name}</h3>
                    </div>
                    <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2 flex-grow mb-4">
                    {product.description}
                </p>

                <button
                    onClick={() => addToCart(product)}
                    className="w-full mt-auto flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white py-2.5 px-4 rounded-lg font-medium transition-colors cursor-pointer"
                >
                    <Plus size={18} />
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
