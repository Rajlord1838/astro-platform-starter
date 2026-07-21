import { useState } from 'react';
import { addToCart } from '../utils/cart';
import type { Product } from '../data/products';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart(product.id);
        setTimeout(() => setIsAdding(false), 500);
    };

    return (
        <div className="flex flex-col overflow-hidden transition-transform bg-gray-900 border border-gray-800 rounded-lg shadow-sm hover:-translate-y-1 hover:shadow-md">
            <div className="relative aspect-square">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full"
                    loading="lazy"
                />
                <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 text-xs font-medium text-white bg-gray-800/80 rounded-md backdrop-blur-sm">
                        {product.category}
                    </span>
                </div>
            </div>
            <div className="flex flex-col flex-grow p-5">
                <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                <p className="mt-2 text-sm text-gray-400 line-clamp-2 flex-grow">{product.description}</p>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-white">${product.price.toFixed(2)}</span>
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                            isAdding
                                ? 'bg-green-600 text-white'
                                : 'bg-primary text-primary-content hover:bg-primary/90'
                        }`}
                        aria-label={`Add ${product.name} to cart`}
                    >
                        <ShoppingBag className="w-4 h-4" />
                        {isAdding ? 'Added!' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
}
