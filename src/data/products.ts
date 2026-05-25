export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    price: 29.99,
    description: 'A timeless classic white t-shirt made from 100% organic cotton.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '2',
    name: 'Denim Jacket',
    price: 89.99,
    description: 'Vintage wash denim jacket with a relaxed fit.',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '3',
    name: 'Black Skinny Jeans',
    price: 59.99,
    description: 'High-waisted black skinny jeans with comfortable stretch.',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '4',
    name: 'Summer Floral Dress',
    price: 49.99,
    description: 'Lightweight midi dress with a delicate floral print.',
    image: 'https://images.unsplash.com/photo-1572804013309-8c98e0965dbd?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '5',
    name: 'Leather Crossbody Bag',
    price: 129.99,
    description: 'Genuine leather crossbody bag with gold hardware.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '6',
    name: 'Canvas Sneakers',
    price: 65.00,
    description: 'Comfortable everyday canvas sneakers in off-white.',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=600'
  }
];
