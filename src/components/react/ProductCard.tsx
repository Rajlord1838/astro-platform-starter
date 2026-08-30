import React, { useState } from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';

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
        <div className="flex flex-col bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700 transition-transform hover:-translate-y-1">
            <div className="relative pt-[120%] bg-slate-200">
                <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-white">{product.name}</h3>
                    <span className="font-bold text-primary">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-slate-400 text-sm mb-4 flex-grow">{product.description}</p>
                <button
                    onClick={handleAddToCart}
                    className="btn w-full mt-auto"
                >
                    {added ? 'Added to Cart!' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
}
