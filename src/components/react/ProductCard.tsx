import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { addToCart } from '../../utils/cart';
import type { Product } from '../../types';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="group flex flex-col bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all duration-300">
            <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur-sm">
                        {product.category}
                    </span>
                </div>
            </div>

            <div className="flex flex-col flex-1 p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-slate-900 line-clamp-1" title={product.name}>
                        {product.name}
                    </h3>
                    <p className="text-lg font-bold text-indigo-600 ml-2 shrink-0">
                        ${product.price.toFixed(2)}
                    </p>
                </div>

                <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">
                    {product.description}
                </p>

                <button
                    onClick={handleAddToCart}
                    className="mt-auto w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-indigo-600 transition-colors focus:ring-4 focus:ring-indigo-100 outline-none"
                    aria-label={`Add ${product.name} to cart`}
                >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                </button>
            </div>
        </div>
    );
}
