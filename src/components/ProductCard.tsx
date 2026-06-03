import React from 'react';

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
};

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = () => {
    // Read current cart
    const cartStr = localStorage.getItem('fashion_store_cart');
    let cart = cartStr ? JSON.parse(cartStr) : [];

    // Add item
    cart.push(product);

    // Save cart
    localStorage.setItem('fashion_store_cart', JSON.stringify(cart));

    // Dispatch custom event to notify Cart component
    window.dispatchEvent(new Event('cart-updated'));
  };

  return (
    <div className="group relative border border-slate-200 rounded-lg overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-slate-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between">
          <h3 className="text-sm font-medium text-slate-900">
            {product.name}
          </h3>
          <p className="text-sm font-medium text-slate-900">${product.price.toFixed(2)}</p>
        </div>
        <p className="mt-1 text-sm text-slate-500 mb-4">{product.description}</p>
        <div className="mt-auto">
            <button
            onClick={addToCart}
            className="w-full bg-slate-900 text-white py-2 px-4 rounded-md hover:bg-slate-800 transition-colors"
            >
            Add to Cart
            </button>
        </div>
      </div>
    </div>
  );
};
