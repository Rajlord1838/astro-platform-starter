import React from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="flex flex-col bg-white text-gray-900 rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold">{product.name}</h3>
                    <span className="font-semibold text-primary">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4 flex-grow">{product.description}</p>
                <div className="flex justify-between items-center mt-auto">
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded-full text-gray-700">{product.category}</span>
                    <button
                        onClick={() => addToCart(product)}
                        className="btn btn-sm"
                        aria-label={`Add ${product.name} to cart`}
                    >
                        <ShoppingCart size={18} />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
