import type { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    description: 'A timeless classic. 100% cotton, comfortable fit, perfect for any casual occasion.',
    price: 25,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
    category: 'Tops'
  },
  {
    id: '2',
    name: 'Slim Fit Denim Jeans',
    description: 'Durable and stylish. These jeans are designed to provide both comfort and a flattering silhouette.',
    price: 60,
    image: 'https://images.unsplash.com/photo-1542272604-780c8e501614?auto=format&fit=crop&q=80&w=800',
    category: 'Bottoms'
  },
  {
    id: '3',
    name: 'Leather Biker Jacket',
    description: 'Add some edge to your outfit with this genuine leather biker jacket. Features multiple pockets and an asymmetrical zip.',
    price: 150,
    image: 'https://images.unsplash.com/photo-1520975954732-57dd22299614?auto=format&fit=crop&q=80&w=800',
    category: 'Outerwear'
  },
  {
    id: '4',
    name: 'Casual Canvas Sneakers',
    description: 'Everyday comfort meets simple style. These canvas sneakers are perfect for a day out in the city.',
    price: 45,
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=800',
    category: 'Footwear'
  },
  {
    id: '5',
    name: 'Wool Blend Fedora',
    description: 'A stylish accessory that adds a touch of class to any look. Made from a premium wool blend.',
    price: 35,
    image: 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?auto=format&fit=crop&q=80&w=800',
    category: 'Accessories'
  },
  {
    id: '6',
    name: 'Silk Blend Scarf',
    description: 'Soft, lightweight, and versatile. Perfect for both warm and cool weather.',
    price: 30,
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=800',
    category: 'Accessories'
  }
];
