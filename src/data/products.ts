export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Classic White T-Shirt',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
    description: 'A comfortable, 100% cotton classic white t-shirt. Perfect for everyday wear.'
  },
  {
    id: 'p2',
    name: 'Vintage Blue Jeans',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80',
    description: 'Classic vintage blue denim jeans with a comfortable straight fit.'
  },
  {
    id: 'p3',
    name: 'Leather Jacket',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80',
    description: 'Genuine leather motorcycle jacket with asymmetric zip fastening.'
  },
  {
    id: 'p4',
    name: 'Canvas Sneakers',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&q=80',
    description: 'Durable and stylish canvas low-top sneakers in off-white.'
  },
  {
    id: 'p5',
    name: 'Wool Fedora Hat',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1529566652340-2c41a5cebcad?w=500&q=80',
    description: 'Classic wide-brim wool fedora for a sharp, sophisticated look.'
  },
  {
    id: 'p6',
    name: 'Silk Scarf',
    price: 35.50,
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&q=80',
    description: 'Elegant patterned silk scarf to accessorize any outfit.'
  }
];
