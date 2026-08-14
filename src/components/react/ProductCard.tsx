import React from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const handleAdd = () => {
        addToCart(product);
        window.dispatchEvent(new Event('open-cart'));
    };

    return (
        <div className="flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-[4/5] relative bg-gray-100 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full"
                    loading="lazy"
                />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-lg text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-3 flex-grow">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                    <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                    <button
                        onClick={handleAdd}
                        className="btn py-2 px-4 rounded-md flex items-center gap-2"
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
