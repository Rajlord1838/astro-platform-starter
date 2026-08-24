import React, { useState } from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';
import { ShoppingCart } from 'lucide-react';

interface Props {
    product: Product;
}

export default function AddToCartButton({ product }: Props) {
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <button
            onClick={handleAdd}
            className={`w-full py-2 px-4 flex items-center justify-center gap-2 rounded-md transition-colors ${
                added ? 'bg-green-600 hover:bg-green-700' : 'bg-primary hover:bg-primary/85'
            } text-white font-medium`}
            aria-label={added ? 'Added to Cart' : 'Add to Cart'}
        >
            <ShoppingCart size={18} />
            {added ? 'Added!' : 'Add to Cart'}
        </button>
    );
}
