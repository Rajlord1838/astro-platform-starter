import React, { useState } from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';
import { ShoppingCart, Check } from 'lucide-react';

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
        <div className="group relative flex flex-col overflow-hidden rounded-xl bg-gray-900 border border-gray-800 shadow-md transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="aspect-[4/5] overflow-hidden bg-gray-800">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                />
            </div>
            <div className="flex flex-1 flex-col p-5">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">
                        {product.name}
                    </h3>
                    <p className="text-lg font-bold text-primary whitespace-nowrap ml-2">
                        ${product.price.toFixed(2)}
                    </p>
                </div>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-1">
                    {product.description}
                </p>
                <button
                    onClick={handleAddToCart}
                    className={`mt-auto flex w-full items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-semibold transition-colors ${
                        added
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-primary text-primary-content hover:bg-primary/90'
                    }`}
                >
                    {added ? (
                        <>
                            <Check className="h-5 w-5" />
                            Added to Cart
                        </>
                    ) : (
                        <>
                            <ShoppingCart className="h-5 w-5" />
                            Add to Cart
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
