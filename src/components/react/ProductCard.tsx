import React, { useState } from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="flex flex-col bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
            <div className="relative aspect-square overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
                <div className="absolute top-2 right-2 bg-gray-900/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-gray-200">
                    {product.category}
                </div>
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-white leading-tight">{product.name}</h3>
                    <span className="text-lg font-bold text-primary ml-2">${product.price.toFixed(2)}</span>
                </div>

                <p className="text-gray-400 text-sm mb-4 flex-grow">{product.description}</p>

                <button
                    onClick={handleAddToCart}
                    className="w-full btn mt-auto flex items-center justify-center gap-2"
                >
                    <ShoppingCart size={18} />
                    {added ? 'Added to Cart!' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
}
