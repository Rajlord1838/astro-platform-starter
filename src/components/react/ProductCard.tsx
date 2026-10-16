import React from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
            <div className="aspect-[4/5] bg-gray-100 overflow-hidden relative">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                />
            </div>
            <div className="flex flex-1 flex-col p-4">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-500 flex-1">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <button
                        onClick={handleAddToCart}
                        className="flex items-center gap-2 rounded-md bg-pink-500 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                        aria-label={`Add ${product.name} to cart`}
                    >
                        <ShoppingCart size={16} />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
