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
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 flex flex-col">
            <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-900">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white">{product.name}</h3>
                    <span className="text-primary font-bold">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-400 mb-4 flex-grow">{product.description}</p>

                <button
                    onClick={handleAddToCart}
                    className={`w-full py-2 px-4 rounded font-bold flex items-center justify-center gap-2 transition-colors ${
                        added ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-primary hover:bg-primary/90 text-primary-content'
                    }`}
                >
                    <ShoppingCart size={18} />
                    {added ? 'Added!' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
}
