import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { products } from '../../data/products';

export default function ProductList() {
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = filter === 'All'
    ? products
    : products.filter(p => p.category === filter);

  return (
    <div className="py-8">
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === category
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
