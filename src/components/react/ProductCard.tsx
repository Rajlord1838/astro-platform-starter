import React from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';
import { ShoppingBag } from 'lucide-react';

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    return (
        <div className="group relative border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-[4/5] w-full overflow-hidden bg-gray-200">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
                />
            </div>
            <div className="p-4 flex flex-col gap-2">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-sm text-gray-700 font-medium">
                            {product.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">${product.price}</p>
                </div>
                <button
                    onClick={() => addToCart(product)}
                    className="mt-2 flex items-center justify-center gap-2 w-full bg-gray-900 text-white px-4 py-2 text-sm font-medium rounded hover:bg-gray-800 transition-colors"
                >
                    <ShoppingBag size={16} />
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
