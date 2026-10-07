import type { Product } from '../types';

export const products: Product[] = [
    {
        id: '1',
        name: 'Classic White T-Shirt',
        description: 'A timeless classic. 100% cotton, ethically sourced.',
        price: 25.00,
        image: 'https://placehold.co/400x600/f67280/ffffff?text=Classic+T-Shirt',
        category: 'Tops'
    },
    {
        id: '2',
        name: 'Denim Jacket',
        description: 'Vintage wash denim jacket with classic styling.',
        price: 85.00,
        image: 'https://placehold.co/400x600/355c7d/ffffff?text=Denim+Jacket',
        category: 'Outerwear'
    },
    {
        id: '3',
        name: 'Slim Fit Jeans',
        description: 'Comfortable stretch denim in a modern slim fit.',
        price: 65.00,
        image: 'https://placehold.co/400x600/101828/ffffff?text=Slim+Jeans',
        category: 'Bottoms'
    },
    {
        id: '4',
        name: 'Canvas Sneakers',
        description: 'Everyday casual sneakers with durable canvas upper.',
        price: 55.00,
        image: 'https://placehold.co/400x600/f67280/ffffff?text=Canvas+Sneakers',
        category: 'Shoes'
    },
    {
        id: '5',
        name: 'Summer Dress',
        description: 'Lightweight floral dress perfect for warm weather.',
        price: 45.00,
        image: 'https://placehold.co/400x600/355c7d/ffffff?text=Summer+Dress',
        category: 'Dresses'
    },
    {
        id: '6',
        name: 'Leather Belt',
        description: 'Genuine leather belt with classic buckle.',
        price: 35.00,
        image: 'https://placehold.co/400x600/101828/ffffff?text=Leather+Belt',
        category: 'Accessories'
    }
];
