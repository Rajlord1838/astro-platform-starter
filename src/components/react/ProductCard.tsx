import React from 'react';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';

interface Props {
    product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
    return (
        <div className="flex flex-col border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow">
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full"
                    loading="lazy"
                />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-xl font-bold text-gray-900 mb-4">${product.price.toFixed(2)}</p>
                <button
                    onClick={() => addToCart(product)}
                    className="mt-auto flex items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                    <ShoppingCart size={18} />
                    <span>Add to Cart</span>
                </button>
            </div>
        </div>
    );
};
