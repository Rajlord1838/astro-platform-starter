import type { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
    description: 'A timeless classic. 100% organic cotton.',
    category: 'Tops'
  },
  {
    id: '2',
    name: 'Denim Jacket',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&q=80',
    description: 'Vintage wash denim jacket with a comfortable fit.',
    category: 'Outerwear'
  },
  {
    id: '3',
    name: 'Black Skinny Jeans',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80',
    description: 'Premium stretch denim for all-day comfort.',
    category: 'Bottoms'
  },
  {
    id: '4',
    name: 'Minimalist Sneakers',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80',
    description: 'Clean design with comfortable cushioning.',
    category: 'Shoes'
  },
  {
    id: '5',
    name: 'Wool Blend Coat',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500&q=80',
    description: 'Elegant winter coat suitable for any occasion.',
    category: 'Outerwear'
  },
  {
    id: '6',
    name: 'Summer Dress',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80',
    description: 'Lightweight and breathable floral dress.',
    category: 'Dresses'
  }
];
