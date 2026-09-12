import React from 'react';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="group relative rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
            <div className="aspect-[4/5] overflow-hidden rounded-t-lg bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <button
                        onClick={() => addToCart(product)}
                        className="flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-content transition-colors hover:bg-primary/85"
                        aria-label={`Add ${product.name} to cart`}
                    >
                        <ShoppingCart size={18} />
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}
