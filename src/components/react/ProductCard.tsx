import React from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';
import { ShoppingCart } from 'lucide-react';

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden text-gray-900 flex flex-col h-full transition-transform hover:-translate-y-1">
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <span className="font-bold">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4 flex-grow">{product.description}</p>
                <button
                    onClick={() => addToCart(product)}
                    className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
                >
                    <ShoppingCart size={18} />
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
