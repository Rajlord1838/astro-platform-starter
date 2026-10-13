import React from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] duration-300 flex flex-col h-full border border-gray-100">
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
                {product.category && (
                    <span className="absolute top-2 left-2 bg-white/90 px-2 py-1 text-xs font-semibold rounded text-gray-800 shadow-sm">
                        {product.category}
                    </span>
                )}
            </div>

            <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-2xl font-bold text-primary mb-3">${product.price.toFixed(2)}</p>

                {product.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">{product.description}</p>
                )}

                <button
                    onClick={() => addToCart(product)}
                    className="w-full btn mt-auto cursor-pointer flex items-center justify-center gap-2"
                    aria-label={`Add ${product.name} to cart`}
                >
                    <ShoppingCart size={18} />
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
