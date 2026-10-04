import React from 'react';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="flex flex-col bg-slate-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl">
            <div className="relative aspect-[4/5] overflow-hidden bg-slate-700">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full"
                    loading="lazy"
                />
                <div className="absolute top-2 right-2 bg-slate-900/80 text-white text-xs px-2 py-1 rounded-full uppercase tracking-wider font-semibold">
                    {product.category}
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white line-clamp-2">{product.name}</h3>
                    <span className="text-lg font-bold text-teal-400 whitespace-nowrap ml-4">
                        ${product.price.toFixed(2)}
                    </span>
                </div>

                <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-grow">
                    {product.description}
                </p>

                <button
                    onClick={handleAddToCart}
                    className="mt-auto w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold py-2 px-4 rounded transition-colors"
                    aria-label={`Add ${product.name} to cart`}
                >
                    <ShoppingCart size={18} />
                    <span>Add to Cart</span>
                </button>
            </div>
        </div>
    );
}
