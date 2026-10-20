import React from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';
import { ShoppingCart } from 'lucide-react';

interface Props {
    product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
    return (
        <div className="flex flex-col bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800 transition hover:border-primary">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full"
                    loading="lazy"
                />
            </div>
            <div className="flex flex-col flex-grow p-4 gap-2">
                <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">{product.category}</div>
                <h3 className="text-lg font-bold text-white">{product.name}</h3>
                <p className="text-sm text-gray-300 flex-grow">{product.description}</p>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-white">${product.price.toFixed(2)}</span>
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
};
