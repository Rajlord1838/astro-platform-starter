import React, { useState } from 'react';
import type { Product } from '../../types';
import { addToCart } from '../../utils/cart';
import { ShoppingBag } from 'lucide-react';

export default function AddToCartButton({ product }: { product: Product }) {
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <button
            onClick={handleAdd}
            className={`w-full py-2 px-4 rounded font-semibold flex items-center justify-center gap-2 transition-colors ${
                added ? 'bg-green-600 text-white' : 'bg-primary text-primary-content hover:bg-primary/80'
            }`}
        >
            <ShoppingBag size={18} />
            {added ? 'Added to Cart' : 'Add to Cart'}
        </button>
    );
}
