import React from 'react';
import type { Product } from '../data/products';
import { addToCart } from './CartState';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addToCart(product);
        alert(`${product.name} added to cart!`);
    };

    return (
        <a href={`/product/${product.id}`} className="group block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                <div className="mt-4 flex items-center justify-between">
                    <p className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
                    <button
                        onClick={handleAddToCart}
                        className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </a>
    );
}
