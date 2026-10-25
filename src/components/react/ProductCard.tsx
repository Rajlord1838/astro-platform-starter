import React from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const handleAdd = () => {
        addToCart(product);
    };

    return (
        <div className="flex flex-col overflow-hidden rounded-xl bg-gray-900 shadow-md transition hover:shadow-lg border border-gray-800">
            <div className="relative aspect-[3/2] overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform hover:scale-105"
                />
            </div>
            <div className="flex flex-col grow p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                    <span className="font-bold text-primary">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-gray-400 text-sm mb-4 grow">{product.description}</p>
                <button
                    onClick={handleAdd}
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-content py-2 px-4 rounded-lg font-medium transition-colors"
                >
                    <ShoppingBag size={18} />
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
