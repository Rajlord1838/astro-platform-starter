import React from 'react';
import type { Product } from '../../types';
import { ProductCard } from './ProductCard';

interface Props {
    products: Product[];
}

export const ProductList: React.FC<Props> = ({ products }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};
