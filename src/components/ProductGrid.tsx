import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

export default function ProductGrid() {
  const [filter, setFilter] = useState<string | null>(null);

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = filter
    ? products.filter(p => p.category === filter)
    : products;

  return (
    <div className="py-12 w-full text-black">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold tracking-tight text-white">Our Collection</h2>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === null
                ? 'bg-primary text-primary-content'
                : 'bg-white text-gray-800 hover:bg-gray-100'
            }`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === category
                  ? 'bg-primary text-primary-content'
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-white">
          <p className="text-xl">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}
