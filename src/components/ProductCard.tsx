import React from 'react';
import type { Product } from '../utils/mockData';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = () => {
    // Get existing cart
    const existingCart = localStorage.getItem('cart');
    const cart = existingCart ? JSON.parse(existingCart) : [];

    // Check if product already exists in cart
    const existingProductIndex = cart.findIndex((item: any) => item.product.id === product.id);

    if (existingProductIndex >= 0) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ product, quantity: 1 });
    }

    // Save back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Dispatch custom event to notify Cart component
    window.dispatchEvent(new Event('cart-updated'));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden text-gray-900 flex flex-col h-full">
      <div className="relative h-64 overflow-hidden group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold">{product.name}</h3>
          <span className="text-lg font-semibold text-primary">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{product.description}</p>
        <button
          onClick={addToCart}
          className="w-full bg-gray-900 text-white py-2 px-4 rounded font-medium hover:bg-gray-800 transition-colors mt-auto"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
