import React from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';
import { Plus } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const handleAddToCart = () => {
        addToCart(product, 1);
    };

    return (
        <div className="flex flex-col bg-slate-800 rounded-xl overflow-hidden shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl">
            <div className="relative h-64 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
                <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold uppercase tracking-wider text-slate-200">
                    {product.category}
                </div>
            </div>

            <div className="flex flex-col p-5 grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white line-clamp-1">{product.name}</h3>
                    <span className="text-lg font-semibold text-emerald-400 whitespace-nowrap ml-2">
                        ${product.price.toFixed(2)}
                    </span>
                </div>

                <p className="text-slate-400 text-sm mb-4 line-clamp-2 grow">
                    {product.description}
                </p>

                <button
                    onClick={handleAddToCart}
                    className="flex items-center justify-center w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors group"
                >
                    <Plus size={18} className="mr-2 group-hover:scale-110 transition-transform" />
                    Add to Cart
                </button>
            </div>
        </div>
    );
};
