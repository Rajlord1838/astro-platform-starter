import React, { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { addToCart } from '../../utils/cart';
import type { Product } from '../../types';

interface Props {
    product: Product;
}

export const AddToCartButton = ({ product }: Props) => {
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(product, 1);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 px-4 rounded-md font-medium transition-all flex items-center justify-center gap-2 cursor-pointer ${
                added
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-primary text-white hover:bg-primary/90'
            }`}
            aria-label={`Add ${product.name} to cart`}
        >
            {added ? (
                <>
                    <Check size={20} />
                    <span>Added!</span>
                </>
            ) : (
                <>
                    <ShoppingBag size={20} />
                    <span>Add to Cart</span>
                </>
            )}
        </button>
    );
};
