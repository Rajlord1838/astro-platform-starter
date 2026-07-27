import React from 'react';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../types';
import { addToCart } from '../utils/cart';

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <div className="flex flex-col overflow-hidden rounded-lg shadow-lg bg-white transition-transform hover:scale-[1.02]">
            <div className="flex-shrink-0">
                <img className="h-64 w-full object-cover" src={product.image} alt={product.name} />
            </div>
            <div className="flex flex-1 flex-col justify-between p-6">
                <div className="flex-1">
                    <p className="text-sm font-medium text-primary">
                        {product.category}
                    </p>
                    <div className="mt-2 block">
                        <p className="text-xl font-semibold text-gray-900">{product.name}</p>
                        <p className="mt-3 text-base text-gray-500 line-clamp-2">{product.description}</p>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <button
                        onClick={() => addToCart(product)}
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors cursor-pointer"
                        aria-label={`Add ${product.name} to cart`}
                    >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};
