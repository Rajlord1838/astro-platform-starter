import React from 'react';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100">
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            <div className="flex flex-col flex-1 p-5 text-primary-content">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight">{product.name}</h3>
                    <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
                </div>

                <p className="text-sm text-gray-500 mb-6 line-clamp-2">{product.description}</p>

                <div className="mt-auto">
                    <button
                        onClick={() => addToCart(product)}
                        className="w-full btn bg-primary hover:bg-primary/90 text-white rounded-xl py-3 flex justify-center items-center gap-2 font-semibold transition-all shadow-sm hover:shadow"
                    >
                        <ShoppingCart size={18} />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
