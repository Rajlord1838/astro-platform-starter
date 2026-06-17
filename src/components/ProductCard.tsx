import React from 'react';
import type { Product } from '../types';
import AddToCartButton from './AddToCartButton';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="group relative border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none lg:h-80">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full transition-transform group-hover:scale-105"
                />
            </div>
            <div className="p-4 flex flex-col gap-2">
                <div>
                    <h3 className="text-sm font-medium text-gray-900">
                        {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
                <div className="mt-2">
                    <AddToCartButton product={product} />
                </div>
            </div>
        </div>
    );
}
